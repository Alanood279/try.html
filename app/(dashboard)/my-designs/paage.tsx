'use client'

import { useState } from 'react'
import Link from 'next/link'
import { 
  Search, 
  Grid3X3, 
  List, 
  MoreVertical, 
  Download, 
  Edit2, 
  Trash2,
  FolderOpen
} from 'lucide-react'

const designs = [
  { id: 1, name: 'بوست انستقرام - عرض خاص', folder: 'سوشيال ميديا', date: '2024-03-15', size: '2.4 MB', thumbnail: '📱' },
  { id: 2, name: 'شعار الشركة الجديد', folder: 'شعارات', date: '2024-03-14', size: '1.8 MB', thumbnail: '🎨' },
  { id: 3, name: 'ستوري - منتج جديد', folder: 'سوشيال ميديا', date: '2024-03-12', size: '1.2 MB', thumbnail: '✨' },
  { id: 4, name: 'بنر يوتيوب', folder: 'يوتيوب', date: '2024-03-10', size: '3.1 MB', thumbnail: '🎬' },
  { id: 5, name: 'كرت شخصي', folder: 'مطبوعات', date: '2024-03-08', size: '0.9 MB', thumbnail: '💼' },
  { id: 6, name: 'بوستر حفلة', folder: 'مطبوعات', date: '2024-03-05', size: '4.2 MB', thumbnail: '🎉' },
]

const folders = ['الكل', 'سوشيال ميديا', 'شعارات', 'يوتيوب', 'مطبوعات']

export default function MyDesignsPage() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [activeFolder, setActiveFolder] = useState('الكل')
  const [searchQuery, setSearchQuery] = useState(')

  const filteredDesigns = designs.filter(d => {
    const matchesFolder = activeFolder === 'الكل' || d.folder === activeFolder
    const matchesSearch = d.name.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesFolder && matchesSearch
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">تصاميمي</h1>
          <p className="text-gray-400">{designs.length} تصميم</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-orange-500 text-white' : 'bg-gray-800 text-gray-400'}`}
          >
            <Grid3X3 className="w-5 h-5" />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-2 rounded-lg transition-colors ${viewMode === 'list' ? 'bg-orange-500 text-white' : 'bg-gray-800 text-gray-400'}`}
          >
            <List className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="ابحث في التصاميم..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 pr-10 text-white placeholder-gray-500 focus:outline-none focus:border-orange-500"
          />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2">
          {folders.map(folder => (
            <button
              key={folder}
              onClick={() => setActiveFolder(folder)}
              className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition-all ${
                activeFolder === folder
                  ? 'bg-orange-500 text-white'
                  : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
              }`}
            >
              {folder}
            </button>
          ))}
        </div>
      </div>

      {/* Designs Grid/List */}
      {viewMode === 'grid' ? (
        <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredDesigns.map(design => (
            <div key={design.id} className="card group">
              <div className="aspect-[4/3] bg-gray-700 rounded-xl mb-4 flex items-center justify-center text-6xl relative overflow-hidden">
                <span>{design.thumbnail}</span>
                <div className="absolute inset-0 bg-gray-900/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <Link
                    href={`/editor/${design.id}`}
                    className="bg-orange-500 text-white p-3 rounded-full hover:bg-orange-600 transition-colors"
                  >
                    <Edit2 className="w-5 h-5" />
                  </Link>
                  <button className="bg-blue-500 text-white p-3 rounded-full hover:bg-blue-600 transition-colors">
                    <Download className="w-5 h-5" />
                  </button>
                </div>
              </div>
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-bold text-sm mb-1 truncate">{design.name}</h3>
                  <p className="text-xs text-gray-400">{design.folder} • {design.date}</p>
                </div>
                <button className="text-gray-400 hover:text-white">
                  <MoreVertical className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-2">
          {filteredDesigns.map(design => (
            <div key={design.id} className="card flex items-center gap-4 p-4 group">
              <div className="w-16 h-16 bg-gray-700 rounded-lg flex items-center justify-center text-2xl flex-shrink-0">
                {design.thumbnail}
              </div>
              <div className="flex-1">
                <h3 className="font-bold mb-1">{design.name}</h3>
                <div className="flex items-center gap-4 text-xs text-gray-400">
                  <span className="flex items-center gap-1">
                    <FolderOpen className="w-3 h-3" />
                    {design.folder}
                  </span>
                  <span>{design.date}</span>
                  <span>{design.size}</span>
                </div>
              </div>
              <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <Link
                  href={`/editor/${design.id}`}
                  className="p-2 bg-orange-500/20 text-orange-500 rounded-lg hover:bg-orange-500 hover:text-white transition-colors"
                >
                  <Edit2 className="w-4 h-4" />
                </Link>
                <button className="p-2 bg-blue-500/20 text-blue-500 rounded-lg hover:bg-blue-500 hover:text-white transition-colors">
                  <Download className="w-4 h-4" />
                </button>
                <button className="p-2 bg-red-500/20 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {filteredDesigns.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-400 text-lg">لا توجد تصاميم في هذا المجلد</p>
        </div>
      )}
    </div>
  )
}
