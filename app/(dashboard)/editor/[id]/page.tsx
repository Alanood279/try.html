'use client'

import { useState, useRef, useEffect } from 'react'
import { useParams } from 'next/navigation'
import dynamic from 'next/dynamic'
import { 
  Type, 
  Image as ImageIcon, 
  Square, 
  Circle, 
  Triangle,
  Download,
  Save,
  Undo,
  Redo,
  ZoomIn,
  ZoomOut,
  Trash2,
  Layers,
  Palette,
  Settings,
  ChevronRight
} from 'lucide-react'

// Dynamic import for Konva (client-side only)
const Stage = dynamic(() => import('react-konva').then(mod => mod.Stage), { ssr: false })
const Layer = dynamic(() => import('react-konva').then(mod => mod.Layer), { ssr: false })
const Rect = dynamic(() => import('react-konva').then(mod => mod.Rect), { ssr: false })
const Circle = dynamic(() => import('react-konva').then(mod => mod.Circle), { ssr: false })
const Text = dynamic(() => import('react-konva').then(mod => mod.Text), { ssr: false })
const Transformer = dynamic(() => import('react-konva').then(mod => mod.Transformer), { ssr: false })

interface Element {
  id: string
  type: 'text' | 'rect' | 'circle' | 'image'
  x: number
  y: number
  width?: number
  height?: number
  fill?: string
  text?: string
  fontSize?: number
  draggable: boolean
  rotation?: number
  scaleX?: number
  scaleY?: number
}

export default function EditorPage() {
  const params = useParams()
  const [elements, setElements] = useState<Element[]>([
    {
      id: '1',
      type: 'text',
      x: 400,
      y: 300,
      text: 'اضغط هنا للتعديل',
      fontSize: 32,
      fill: '#f97316',
      draggable: true,
      rotation: 0,
    }
  ])
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [scale, setScale] = useState(1)
  const [color, setColor] = useState('#f97316')
  const [showColorPicker, setShowColorPicker] = useState(false)
  const [activeTab, setActiveTab] = useState('elements')
  const stageRef = useRef<any>(null)
  const transformerRef = useRef<any>(null)

  // Add element
  const addElement = (type: Element['type']) => {
    const newElement: Element = {
      id: Date.now().toString(),
      type,
      x: 300 + Math.random() * 100,
      y: 200 + Math.random() * 100,
      draggable: true,
      rotation: 0,
      scaleX: 1,
      scaleY: 1,
    }

    if (type === 'text') {
      newElement.text = 'نص جديد'
      newElement.fontSize = 24
      newElement.fill = color
    } else if (type === 'rect') {
      newElement.width = 150
      newElement.height = 100
      newElement.fill = color
    } else if (type === 'circle') {
      newElement.width = 100
      newElement.height = 100
      newElement.fill = color
    }

    setElements([...elements, newElement])
  }

  // Update element
  const updateElement = (id: string, updates: Partial<Element>) => {
    setElements(elements.map(el => el.id === id ? { ...el, ...updates } : el))
  }

  // Delete selected
  const deleteSelected = () => {
    if (selectedId) {
      setElements(elements.filter(el => el.id !== selectedId))
      setSelectedId(null)
    }
  }

  // Handle export
  const handleExport = async (format: 'png' | 'pdf') => {
    if (!stageRef.current) return
    
    const uri = stageRef.current.toDataURL({ pixelRatio: 2 })
    
    if (format === 'png') {
      const link = document.createElement('a')
      link.download = `bildflow-design-${Date.now()}.png`
      link.href = uri
      link.click()
    } else {
      // PDF export would require jsPDF
      alert('PDF export coming soon!')
    }
  }

  // Handle save
  const handleSave = () => {
    // TODO: Save to Firebase
    alert('تم حفظ التصميم!')
  }

  // Zoom
  const handleZoom = (delta: number) => {
    setScale(Math.max(0.5, Math.min(2, scale + delta)))
  }

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Delete' || e.key === 'Backspace') {
        deleteSelected()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [selectedId])

  // Colors palette
  const colors = [
    '#f97316', '#ef4444', '#f59e0b', '#10b981',
    '#3b82f6', '#6366f1', '#8b5cf6', '#ec4899',
    '#1e3a5f', '#374151', '#000000', '#ffffff'
  ]

  return (
    <div className="h-screen flex bg-gray-900" dir="rtl">
      {/* Left Sidebar - Tools */}
      <aside className="w-80 bg-gray-800 border-l border-gray-700 flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-gray-700 flex items-center justify-between">
          <Link href="/dashboard" className="flex items-center gap-2 text-gray-400 hover:text-white">
            <ChevronRight className="w-5 h-5" />
            <span className="text-sm">رجوع</span>
          </Link>
          <span className="font-bold">محرر BildFlow</span>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-700">
          {[
            { id: 'elements', icon: Square, label: 'عناصر' },
            { id: 'text', icon: Type, label: 'نص' },
            { id: 'images', icon: ImageIcon, label: 'صور' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 py-3 flex flex-col items-center gap-1 text-xs transition-all ${
                activeTab === tab.id 
                  ? 'text-orange-500 border-b-2 border-orange-500 bg-gray-700/50' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <tab.icon className="w-5 h-5" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="flex-1 overflow-y-auto p-4">
          {activeTab === 'elements' && (
            <div className="space-y-4">
              <h3 className="font-bold text-sm text-gray-400">الأشكال الأساسية</h3>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => addElement('rect')}
                  className="aspect-square bg-gray-700 hover:bg-gray-600 rounded-xl flex flex-col items-center justify-center gap-2 transition-all"
                >
                  <Square className="w-8 h-8" />
                  <span className="text-xs">مستطيل</span>
                </button>
                <button
                  onClick={() => addElement('circle')}
                  className="aspect-square bg-gray-700 hover:bg-gray-600 rounded-xl flex flex-col items-center justify-center gap-2 transition-all"
                >
                  <Circle className="w-8 h-8" />
                  <span className="text-xs">دائرة</span>
                </button>
              </div>

              <h3 className="font-bold text-sm text-gray-400 mt-6">الألوان</h3>
              <div className="grid grid-cols-4 gap-2">
                {colors.map(c => (
                  <button
                    key={c}
                    onClick={() => {
                      setColor(c)
                      if (selectedId) updateElement(selectedId, { fill: c })
                    }}
                    className={`aspect-square rounded-lg border-2 transition-all ${
                      color === c ? 'border-white scale-110' : 'border-transparent'
                    }`}
                    style={{ backgroundColor: c }}
                  />
                ))}
              </div>

              {selectedId && (
                <>
                  <h3 className="font-bold text-sm text-gray-400 mt-6">خصائص العنصر</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="text-xs text-gray-500">الحجم</label>
                      <input
                        type="range"
                        min="0.5"
                        max="2"
                        step="0.1"
                        defaultValue="1"
                        onChange={(e) => {
                          const val = parseFloat(e.target.value)
                          updateElement(selectedId, { scaleX: val, scaleY: val })
                        }}
                        className="w-full"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-gray-500">الدوران</label>
                      <input
                        type="range"
                        min="0"
                        max="360"
                        step="10"
                        defaultValue="0"
                        onChange={(e) => {
                          updateElement(selectedId, { rotation: parseInt(e.target.value) })
                        }}
                        className="w-full"
                      />
                    </div>
                  </div>
                </>
              )}
            </div>
          )}

          {activeTab === 'text' && (
            <div className="space-y-4">
              <button
                onClick={() => addElement('text')}
                className="w-full btn-primary"
              >
                إضافة نص
              </button>
              
              {selectedId && elements.find(e => e.id === selectedId)?.type === 'text' && (
                <div className="space-y-3 mt-4">
                  <div>
                    <label className="text-xs text-gray-500">النص</label>
                    <textarea
                      value={elements.find(e => e.id === selectedId)?.text || ''}
                      onChange={(e) => updateElement(selectedId, { text: e.target.value })}
                      className="w-full bg-gray-900 border border-gray-700 rounded-lg p-2 text-sm"
                      rows={3}
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-500">حجم الخط</label>
                    <input
                      type="number"
                      value={elements.find(e => e.id === selectedId)?.fontSize || 24}
                      onChange={(e) => updateElement(selectedId, { fontSize: parseInt(e.target.value) })}
                      className="w-full bg-gray-900 border border-gray-700 rounded-lg p-2 text-sm"
                    />
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'images' && (
            <div className="space-y-4">
              <label className="block w-full btn-secondary text-center cursor-pointer">
                📤 رفع صورة
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0]
                    if (file) {
                      // TODO: Handle image upload
                      alert('تم رفع الصورة!')
                    }
                  }}
                />
              </label>
            </div>
          )}
        </div>

        {/* Bottom Actions */}
        <div className="p-4 border-t border-gray-700 space-y-2">
          <button
            onClick={handleSave}
            className="w-full btn-primary flex items-center justify-center gap-2"
          >
            <Save className="w-4 h-4" />
            حفظ
          </button>
          <div className="flex gap-2">
            <button
              onClick={() => handleExport('png')}
              className="flex-1 btn-secondary text-sm flex items-center justify-center gap-1"
            >
              <Download className="w-4 h-4" />
              PNG
            </button>
            <button
              onClick={() => handleExport('pdf')}
              className="flex-1 btn-secondary text-sm flex items-center justify-center gap-1"
            >
              <Download className="w-4 h-4" />
              PDF
            </button>
          </div>
        </div>
      </aside>

      {/* Main Canvas Area */}
      <main className="flex-1 relative bg-gray-900 overflow-hidden">
        {/* Toolbar */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 glass rounded-full px-6 py-2 flex items-center gap-4 z-10">
          <button
            onClick={() => handleZoom(-0.1)}
            className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
          >
            <ZoomOut className="w-5 h-5" />
          </button>
          <span className="text-sm font-medium">{Math.round(scale * 100)}%</span>
          <button
            onClick={() => handleZoom(0.1)}
            className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
          >
            <ZoomIn className="w-5 h-5" />
          </button>
          <div className="w-px h-6 bg-gray-700" />
          <button
            onClick={deleteSelected}
            disabled={!selectedId}
            className="p-2 hover:bg-red-900/30 text-red-400 rounded-lg transition-colors disabled:opacity-50"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>

        {/* Canvas */}
        <div className="w-full h-full flex items-center justify-center p-8">
          <div
            className="bg-white rounded-lg shadow-2xl overflow-hidden"
            style={{
              width: 800 * scale,
              height: 600 * scale,
            }}
          >
            {typeof window !== 'undefined' && (
              <Stage
                width={800}
                height={600}
                scaleX={scale}
                scaleY={scale}
                ref={stageRef}
                onMouseDown={(e: any) => {
                  if (e.target === e.target.getStage()) {
                    setSelectedId(null)
                  }
                }}
              >
                <Layer>
                  {/* Background */}
                  <Rect width={800} height={600} fill="white" />
                  
                  {/* Grid pattern */}
                  {[...Array(8)].map((_, i) => (
                    <Rect
                      key={`v-${i}`}
                      x={i * 100}
                      y={0}
                      width={1}
                      height={600}
                      fill="#f3f4f6"
                    />
                  ))}
                  {[...Array(6)].map((_, i) => (
                    <Rect
                      key={`h-${i}`}
                      x={0}
                      y={i * 100}
                      width={800}
                      height={1}
                      fill="#f3f4f6"
                    />
                  ))}

                  {/* Elements */}
                  {elements.map((el) => {
                    const isSelected = el.id === selectedId
                    
                    if (el.type === 'text') {
                      return (
                        <Text
                          key={el.id}
                          {...el}
                          fontFamily="Tajawal"
                          onClick={() => setSelectedId(el.id)}
                          onTap={() => setSelectedId(el.id)}
                          onDragEnd={(e: any) => {
                            updateElement(el.id, { x: e.target.x(), y: e.target.y() })
                          }}
                          draggable
                          shadowColor={isSelected ? '#f97316' : 'transparent'}
                          shadowBlur={isSelected ? 10 : 0}
                        />
                      )
                    }

                    if (el.type === 'rect') {
                      return (
                        <Rect
                          key={el.id}
                          {...el}
                          onClick={() => setSelectedId(el.id)}
                          onTap={() => setSelectedId(el.id)}
                          onDragEnd={(e: any) => {
                            updateElement(el.id, { x: e.target.x(), y: e.target.y() })
                          }}
                          draggable
                          stroke={isSelected ? '#f97316' : undefined}
                          strokeWidth={isSelected ? 2 : 0}
                        />
                      )
                    }

                    if (el.type === 'circle') {
                      return (
                        <Circle
                          key={el.id
                                                      x={el.x}
                          y={el.y}
                          radius={(el.width || 100) / 2}
                          fill={el.fill}
                          onClick={() => setSelectedId(el.id)}
                          onTap={() => setSelectedId(el.id)}
                          onDragEnd={(e: any) => {
                            updateElement(el.id, { x: e.target.x(), y: e.target.y() })
                          }}
                          draggable
                          stroke={isSelected ? '#f97316' : undefined}
                          strokeWidth={isSelected ? 2 : 0}
                        />
                      )
                    }

                    return null
                  })}

                  {/* Transformer for selected element */}
                  {selectedId && (
                    <Transformer
                      ref={transformerRef}
                      boundBoxFunc={(oldBox: any, newBox: any) => {
                        if (Math.abs(newBox.width) < 5 || Math.abs(newBox.height) < 5) {
                          return oldBox
                        }
                        return newBox
                      }}
                    />
                  )}
                </Layer>
              </Stage>
            )}
          </div>
        </div>

        {/* Layers Panel (Right Side) */}
        <div className="absolute top-4 right-4 w-64 glass rounded-xl p-4 max-h-[calc(100vh-2rem)] overflow-y-auto">
          <h3 className="font-bold text-sm mb-3 flex items-center gap-2">
            <Layers className="w-4 h-4" />
            الطبقات ({elements.length})
          </h3>
          <div className="space-y-1">
            {elements.slice().reverse().map((el, index) => (
              <div
                key={el.id}
                onClick={() => setSelectedId(el.id)}
                className={`p-2 rounded-lg cursor-pointer flex items-center gap-2 text-sm transition-all ${
                  selectedId === el.id 
                    ? 'bg-orange-500/20 border border-orange-500/50' 
                    : 'bg-gray-800/50 hover:bg-gray-700'
                }`}
              >
                <span className="text-xs text-gray-500 w-6">{elements.length - index}</span>
                <span>
                  {el.type === 'text' && '📝'}
                  {el.type === 'rect' && '▭'}
                  {el.type === 'circle' && '○'}
                  {el.type === 'image' && '🖼️'}
                </span>
                <span className="flex-1 truncate">
                  {el.type === 'text' ? (el.text?.slice(0, 15) || 'نص') : el.type}
                </span>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    setElements(elements.filter(item => item.id !== el.id))
                    if (selectedId === el.id) setSelectedId(null)
                  }}
                  className="text-red-400 hover:text-red-300 p-1"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Instructions */}
        <div className="absolute bottom-4 left-4 glass rounded-xl p-4 text-xs text-gray-400 max-w-xs">
          <h4 className="font-bold text-white mb-2">💡 اختصارات:</h4>
          <ul className="space-y-1 list-disc list-inside">
            <li>انقر لتحديد عنصر</li>
            <li>اسحب لتحريك</li>
            <li>Delete لحذف</li>
            <li>Ctrl+S للحفظ</li>
          </ul>
        </div>
      </main>
    </div>
  )
}

// Missing import
import Link from 'next/link'

