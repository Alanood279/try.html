'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  ArrowLeft,
  Chrome
} from 'lucide-react'

export default function LoginPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    // TODO: Implement actual auth
    setTimeout(() => {
      setIsLoading(false)
      router.push('/dashboard')
    }, 1500)
  }

  const handleGoogleLogin = () => {
    // TODO: Implement Google OAuth
    console.log('Google login')
  }

  return (
    <div className="glass rounded-3xl p-8">
      {/* Logo */}
      <div className="text-center mb-8">
        <Link href="/" className="inline-flex items-center gap-2">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center text-white font-bold text-2xl">
            B
          </div>
          <span className="font-bold text-2xl gradient-text">BildFlow</span>
        </Link>
        <h1 className="text-2xl font-bold mt-6 mb-2">تسجيل الدخول</h1>
        <p className="text-gray-400 text-sm">أهلاً بعودتك! سجل دخولك للمتابعة</p>
      </div>

      {/* Google Login */}
      <button
        onClick={handleGoogleLogin}
        className="w-full bg-white text-gray-900 py-3 rounded-xl font-bold flex items-center justify-center gap-3 hover:bg-gray-100 transition-colors mb-6"
      >
        <Chrome className="w-5 h-5 text-blue-500" />
        تسجيل الدخول بحساب Google
      </button>

      <div className="relative mb-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-700" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-gray-800 text-gray-400">أو</span>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">البريد الإلكتروني</label>
          <div className="relative">
            <Mail className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 pr-10 text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all"
              placeholder="your@email.com"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">كلمة المرور</label>
          <div className="relative">
            <Lock className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type={showPassword ? 'text' : 'password'}
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 pr-10 text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all"
              placeholder="••••••••"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" className="rounded bg-gray-900 border-gray-700 text-orange-500 focus:ring-orange-500" />
            <span className="text-gray-400">تذكرني</span>
          </label>
          <Link href="/forgot-password" className="text-orange-500 hover:text-orange-400">
            نسيت كلمة المرور؟
          </Link>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full btn-primary flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {isLoading ? (
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <>
              تسجيل الدخول
              <ArrowLeft className="w-4 h-4" />
            </>
          )}
        </button>
      </form>

      {/* Sign Up Link */}
      <p className="text-center mt-6 text-gray-400 text-sm">
        ليس لديك حساب؟{' '}
        <Link href="/signup" className="text-orange-500 hover:text-orange-400 font-bold">
          سجل الآن
        </Link>
      </p>
    </div>
  )
}
