import { ReactNode } from 'react'
import Link from 'next/link'
import { 
  LayoutDashboard, 
  Palette, 
  FolderOpen, 
  User, 
  Settings,
  LogOut,
  Plus
} from 'lucide-react'

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const sidebarItems = [
    { href: '/dashboard', icon: LayoutDashboard, label: 'لوحة التحكم' },
    { href: '/templates', icon: Palette, label: 'القوالب' },
    { href: '/my-designs', icon: FolderOpen, label: 'تصاميمي' },
    { href: '/profile', icon: User, label: 'الحساب' },
  ]

  return (
    <div className="min-h-screen flex bg-gray-900" dir="rtl">
      {/* Sidebar */}
      <aside className="w-72 bg-gray-800 border-l border-gray-700 flex flex-col fixed h-screen">
        {/* Logo */}
        <div className="p-6 border-b border-gray-700">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center text-white font-bold text-xl">
              B
            </div>
            <span className="font-bold text-xl gradient-text">BildFlow</span>
          </Link>
        </div>

        {/* New Design Button */}
        <div className="p-4">
          <Link 
            href="/editor/new"
            className="w-full btn-primary flex items-center justify-center gap-2"
          >
            <Plus className="w-5 h-5" />
            تصميم جديد
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-1">
          {sidebarItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:bg-gray-700 hover:text-white transition-all group"
            >
              <item.icon className="w-5 h-5 group-hover:text-orange-500 transition-colors" />
              <span className="font-medium">{item.label}</span>
            </Link>
          ))}
        </nav>

        {/* User Section */}
        <div className="p-4 border-t border-gray-700">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center text-white font-bold">
              أ
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-bold text-sm truncate">أحمد محمد</p>
              <p className="text-xs text-gray-400">الخطة المجانية</p>
            </div>
          </div>
          
          <div className="flex gap-2">
            <button className="flex-1 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 text-xs transition-colors flex items-center justify-center gap-1">
              <Settings className="w-4 h-4" />
              الإعدادات
            </button>
            <Link 
              href="/"
              className="flex-1 py-2 rounded-lg bg-gray-700 hover:bg-red-900/30 text-xs transition-colors flex items-center justify-center gap-1 text-red-400"
            >
              <LogOut className="w-4 h-4" />
              خروج
            </Link>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 mr-72 p-8">
        {children}
      </main>
    </div>
  )
}
