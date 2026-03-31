import Link from 'next/link'
import { 
  Sparkles, 
  Zap, 
  Palette, 
  Layers, 
  Download, 
  ArrowLeft,
  Star,
  CheckCircle
} from 'lucide-react'

export default function LandingPage() {
  const features = [
    {
      icon: <Zap className="w-8 h-8 text-orange-500" />,
      title: 'سريع وسهل',
      desc: 'صمم تصميمك في دقائق بدون خبرة مسبقة'
    },
    {
      icon: <Palette className="w-8 h-8 text-blue-500" />,
      title: 'تصاميم احترافية',
      desc: 'قوالب جاهزة وأدوات متقدمة للتصميم'
    },
    {
      icon: <Layers className="w-8 h-8 text-purple-500" />,
      title: 'طبقات متقدمة',
      desc: 'تحكم كامل في كل عنصر بالتصميم'
    },
    {
      icon: <Download className="w-8 h-8 text-green-500" />,
      title: 'تصدير متعدد',
      desc: 'PNG, PDF, JPG - جودة عالية للطباعة'
    }
  ]

  const templates = [
    { name: 'بوست انستقرام', color: 'from-pink-500 to-rose-500', icon: '📱' },
    { name: 'ستوري', color: 'from-purple-500 to-indigo-500', icon: '✨' },
    { name: 'بنر يوتيوب', color: 'from-red-500 to-orange-500', icon: '🎬' },
    { name: 'شعار احترافي', color: 'from-blue-500 to-cyan-500', icon: '🎨' },
    { name: 'بوستر', color: 'from-green-500 to-teal-500', icon: '📄' },
    { name: 'كرت شخصي', color: 'from-amber-500 to-yellow-500', icon: '💼' },
  ]

  return (
    <main className="min-h-screen bg-gray-900">
      {/* Navigation */}
      <nav className="fixed w-full z-50 glass">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center text-white font-bold text-xl">
                B
              </div>
              <span className="font-bold text-2xl gradient-text">BildFlow</span>
            </Link>
            
            <div className="flex items-center gap-4">
              <Link href="/login" className="text-gray-300 hover:text-white transition-colors">
                تسجيل الدخول
              </Link>
              <Link href="/signup" className="btn-primary flex items-center gap-2">
                ابدأ مجاناً
                <ArrowLeft className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 right-10 w-72 h-72 bg-orange-500/20 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-20 left-10 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '-2s' }} />
        </div>

        <div className="max-w-7xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-8 animate-float">
            <Sparkles className="w-4 h-4 text-orange-500" />
            <span className="text-sm font-medium">✨ مجاني تماماً للجميع</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight">
            صمم تصاميم
            <span className="gradient-text block mt-2">احترافية في دقائق</span>
          </h1>

          <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
            منصة BildFlow الذكية تتيح لك إنشاء تصاميم مذهلة بسهولة.
            قوالب جاهزة، أدوات متقدمة، وتصدير بجودة عالية.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link href="/signup" className="btn-primary text-lg flex items-center justify-center gap-2">
              ابدأ التصميم الآن
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <Link href="/templates" className="btn-secondary text-lg flex items-center justify-center gap-2">
              استكشف القوالب
            </Link>
          </div>

          {/* Stats */}
          <div className="flex justify-center gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-orange-500">50K+</div>
              <div className="text-sm text-gray-400">مستخدم</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-500">100+</div>
              <div className="text-sm text-gray-400">قالب</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-500">1M+</div>
              <div className="text-sm text-gray-400">تصميم</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-gray-800/50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">لماذا BildFlow؟</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f, i) => (
              <div key={i} className="card text-center group">
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gray-700 flex items-center justify-center group-hover:scale-110 transition-transform">
                  {f.icon}
                </div>
                <h3 className="font-bold text-xl mb-2">{f.title}</h3>
                <p className="text-gray-400 text-sm">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Templates Preview */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">قوالب جاهزة للاستخدام</h2>
          <p className="text-gray-400 text-center mb-12">اختر قالب وابدأ التعديل فوراً</p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {templates.map((t, i) => (
              <Link 
                key={i} 
                href={`/editor/new?template=${i}`}
                className="group relative overflow-hidden rounded-2xl aspect-[4/3] bg-gradient-to-br ${t.color} p-8 flex flex-col items-center justify-center hover:scale-105 transition-transform"
              >
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                <span className="text-6xl mb-4 relative z-10">{t.icon}</span>
                <h3 className="font-bold text-xl text-white relative z-10">{t.name}</h3>
                <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="bg-white/20 backdrop-blur text-white px-4 py-2 rounded-full text-sm font-bold">
                    استخدم القالب
                  </span>
                </div>
              </Link>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link href="/templates" className="btn-secondary inline-flex items-center gap-2">
              عرض كل القوالب
              <ArrowLeft className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center bg-gradient-to-r from-orange-500 to-orange-600 rounded-3xl p-12 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSIyIi8+PC9nPjwvZz48L3N2Zz4=')] opacity-30" />
          <h2 className="text-3xl font-bold text-white mb-4 relative z-10">جاهز لبدء رحلتك التصميمية؟</h2>
          <p className="text-white/80 mb-8 relative z-10">انضم لـ 50,000+ مصمم يستخدمون BildFlow يومياً</p>
          <Link href="/signup" className="bg-white text-orange-600 px-8 py-4 rounded-xl font-bold hover:bg-gray-100 transition-colors inline-flex items-center gap-2 relative z-10">
            سجل مجاناً الآن
            <ArrowLeft className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 border-t border-gray-800 py-12 px-4">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-orange-500 flex items-center justify-center text-white font-bold">B</div>
              <span className="font-bold text-xl">BildFlow</span>
            </div>
            <p className="text-gray-400 text-sm">منصة التصميم الذكية للجميع</p>
          </div>
          <div>
            <h4 className="font-bold mb-4">المنتج</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="/templates" className="hover:text-white">القوالب</Link></li>
              <li><Link href="/features" className="hover:text-white">المميزات</Link></li>
              <li><Link href="/pricing" className="hover:text-white">الأسعار</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">الدعم</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="/help" className="hover:text-white">مركز المساعدة</Link></li>
              <li><Link href="/contact" className="hover:text-white">تواصل معنا</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">تابعنا</h4>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-orange-500 transition-colors">X</a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-orange-500 transition-colors">in</a>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-8 pt-8 border-t border-gray-800 text-center text-sm text-gray-500">
          © 2024 BildFlow. جميع الحقوق محفوظة.
        </div>
      </footer>
    </main>
  )
}
