import Link from 'next/link'
import { ArrowLeft, Home } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 p-4">
      <div className="text-center">
        <div className="text-9xl font-black gradient-text mb-4">404</div>
        <h1 className="text-3xl font-bold mb-4">الصفحة غير موجودة</h1>
        <p className="text-gray-400 mb-8 max-w-md mx-auto">
          عذراً، الصفحة التي تبحث عنها غير موجودة أو قد تم نقلها.
        </p>
        <div className="flex gap-4 justify-center">
          <Link href="/" className="btn-primary flex items-center gap-2">
            <Home className="w-4 h-4" />
            الصفحة الرئيسية
          </Link>
          <Link href="/dashboard" className="btn-secondary flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            لوحة التحكم
          </Link>
        </div>
      </div>
    </div>
  )
}
