'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Search, Filter, ArrowLeft } from 'lucide-react'

const categories = ['الكل', 'سوشيال ميديا', 'شعارات', 'عروض تقديمية', 'مطبوعات', 'يوتيوب']

const templates = [
  { id: 1, name: 'بوست انستقرام - عرض خاص', category: 'سوشيال ميديا', image: '📱', color: 'from-pink-500 to-rose-500', likes: 234 },
  { id: 2, name: 'شعار شركة تقنية', category: 'شعارات', image: '🎨', color: 'from-blue-500 to-cyan-500', likes: 189 },
  { id: 3, name: 'ستوري - منتج جديد', category: 'سوشيال ميديا', image: '✨', color: 'from-purple-500 to-indigo-500', likes: 156 },
  { id: 4, name: 'عرض تقديمي احترافي', category: 'عروض تقديمية', image: '📊', color: 'from-green-500 to-teal-500', likes: 312 },
  { id: 5, name: 'كرت شخصي', category: 'مطبوعات', image: '💼', color: 'from-amber-500 to-yellow-500', likes: 98 },
  { id: 6, name: 'بنر يوتيوب', category: 'يوتيوب', image: '🎬', color: 'from-red-500 to-orange-500', likes: 276 },
  { id: 7, name: 'بوست فيسبوك', category: 'سوشيال ميديا', image: '👥', color: 'from-blue-600 to-blue-800', likes: 145 },
  { id: 8, name: 'شعار مطعم', category: 'شعارات', image: '🍽️', color: 'from-orange-500 to-red-500', likes: 203 },
]

export default function TemplatesPage() {
  const [activeCategory, setActiveCategory] = useState('الكل')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredTemplates = templates.filter(t => {
    const matchesCategory = activeCategory === 'الكل' || t.category === activeCategory
    const matchesSearch = t.name.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold mb-2">القوالب الجاهزة</h1>
        <p className="text-gray-400">اختر قالب وابدأ التعديل فوراً</p>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="ابحث في القوالب..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 pr-10 text-white placeholder-gray-500 focus:outline-none focus:border-orange-500"
          />
        </div>
        <button className="btn-secondary flex items-center gap-2">
          <Filter className="w-4 h-4" />
          تصفية
        </button>
      </div>

      {/* Categories */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
              activeCategory === cat
                ? 'bg-orange-500 text-white'
                : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Templates Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredTemplates.map((template) => (
          <div key={template.id} className="card group">
            <div className={`aspect-[4/3] rounded-xl mb-4 bg-gradient-to-br ${template.color} flex items-center justify-center text-6xl relative overflow-hidden`}>
              <span>{template.image}</span>
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
              <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <Link
                  href={`/editor/new?template=${template.id}`}
                  className="w-full bg-white text-gray-900 py-2 rounded-lg font-bold text-sm text-center block hover:bg-gray-100"
                >
                  استخدم القالب
                </Link>
              </div>
            </div>
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-bold text-sm mb-1">{template.name}</h3>
                <p className="text-xs text-gray-400">{template.category}</p>
              </div>
              <div className="flex items-center gap-1 text-xs text-gray-400">
                <span>⭐</span>
                <span>{template.likes}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredTemplates.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-400 text-lg">لا توجد قوالب مطابقة للبحث</p>
        </div>
      )}
    </div>
  )
}
