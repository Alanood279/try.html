import Link from 'next/link'
import { 
  Plus, 
  Clock, 
  Star, 
  MoreVertical,
  ArrowLeft
} from 'lucide-react'

const recentDesigns = [
  { id: 1, name: 'بوست انستقرام - عرض خاص', type: 'social', date: 'منذ ساعة', thumbnail: '📱' },
  { id: 2, name: 'شعار الشركة الجديد', type: 'logo', date: 'منذ يوم', thumbnail: '🎨' },
  { id: 3, name: 'ستوري - منتج جديد', type: 'story', date: 'منذ يومين', thumbnail: '✨' },
  { id: 4, name: 'بنر يوتيوب', type: 'banner', date: 'منذ 3 أيام', thumbnail: '🎬' },
]

const templates = [
  { name: 'بوست انستقرام', icon: '📱', color: 'from-pink-500 to-rose-500' },
  { name: 'ستوري', icon: '✨', color: 'from-purple-500 to-indigo-500' },
  { name: 'شعار', icon: '🎨', color: 'from-blue-500 to-cyan-500' },
  { name: 'عرض تقديمي', icon: '📊', color: 'from-green-500 to-teal-500' },
]

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">أهلاً بعودتك، أحمد! 👋</h1>
          <p className="text-gray-400">مستعد لإنشاء تصميم جديد اليوم؟</p>
        </div>
        <Link 
          href="/editor/new"
          className="btn-primary flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          تصميم جديد
        </Link>
      </div>

      {/* Quick Start */}
      <section>
        <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
          <span>🚀</span> ابدأ بسرعة
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {templates.map((t, i) => (
            <Link
              key={i}
              href={`/editor/new?type=${t.name}`}
              className={`group relative overflow-hidden rounded-2xl aspect-[4/3] bg-gradient-to-br ${t.color} p-6 flex flex-col items-center justify-center hover:scale-105 transition-transform`}
            >
              <span className="text-5xl mb-2">{t.icon}</span>
              <span className="font-bold text-white text-sm">{t.name}</span>
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
            </Link>
          ))}
        </div>
      </section>

      {/* Recent Designs */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold flex items-center gap-2">
            <Clock className="w-5 h-5 text-orange-500" />
            التصاميم الأخيرة
          </h2>
          <Link href="/my-designs" className="text-sm text-orange-500 hover:text-orange-400 flex items-center gap-1">
            عرض الكل
            <ArrowLeft className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {recentDesigns.map((design) => (
            <div key={design.id} className="card group relative">
              <div className="aspect-[4/3] bg-gray-700 rounded-xl mb-4 flex items-center justify-center text-4xl">
                {design.thumbnail}
              </div>
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-bold text-sm mb-1 truncate">{design.name}</h3>
                  <p className="text-xs text-gray-400">{design.date}</p>
                </div>
                <button className="text-gray-400 hover:text-white">
                  <MoreVertical className="w-4 h-4" />
                </button>
              </div>
              <div className="absolute inset-0 bg-gray-900/80 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <Link 
                  href={`/editor/${design.id}`}
                  className="bg-orange-500 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-orange-600 transition-colors"
                >
                  تعديل
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Stats */}
      <section className="grid md:grid-cols-3 gap-6">
        <div className="card flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-orange-500/20 flex items-center justify-center">
            <span className="text-2xl">🎨</span>
          </div>
          <div>
            <p className="text-2xl font-bold text-orange-500">12</p>
            <p className="text-sm text-gray-400">تصميم هذا الشهر</p>
          </div>
        </div>
        <div className="card flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center">
            <span className="text-2xl">📥</span>
          </div>
          <div>
            <p className="text-2xl font-bold text-blue-500">48</p>
            <p className="text-sm text-gray-400">تحميلة</p>
          </div>
        </div>
        <div className="card flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center">
            <span className="text-2xl">⭐</span>
          </div>
          <div>
            <p className="text-2xl font-bold text-purple-500">5</p>
            <p className="text-sm text-gray-400">قوالب مفضلة</p>
          </div>
        </div>
      </section>
    </div>
  )
}
