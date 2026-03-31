'use client'

import { useState } from 'react'
import { 
  User, 
  Mail, 
  Camera, 
  CreditCard, 
  Bell, 
  Shield,
  Save
} from 'lucide-react'

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState('profile')
  const [isEditing, setIsEditing] = useState(false)

  const tabs = [
    { id: 'profile', label: 'الملف الشخصي', icon: User },
    { id: 'subscription', label: 'الاشتراك', icon: CreditCard },
    { id: 'notifications', label: 'الإشعارات', icon: Bell },
    { id: 'security', label: 'الأمان', icon: Shield },
  ]

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">إعدادات الحساب</h1>

      {/* Tabs */}
      <div className="flex gap-2 mb-8 border-b border-gray-700 pb-4">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-3 rounded-xl transition-all ${
              activeTab === tab.id
                ? 'bg-orange-500 text-white'
                : 'text-gray-400 hover:bg-gray-800'
            }`}
          >
            <tab.icon className="w-5 h-5" />
            <span className="font-medium">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Profile Tab */}
      {activeTab === 'profile' && (
        <div className="space-y-6">
          {/* Avatar */}
          <div className="card flex items-center gap-6">
            <div className="relative">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center text-3xl font-bold">
                أ
              </div>
              <button className="absolute bottom-0 right-0 w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center border-2 border-gray-700 hover:bg-orange-500 transition-colors">
                <Camera className="w-4 h-4" />
              </button>
            </div>
            <div>
              <h3 className="font-bold text-xl">أحمد محمد</h3>
              <p className="text-gray-400">ahmed@email.com</p>
            </div>
          </div>

          {/* Form */}
          <div className="card space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">الاسم الأول</label>
                <input
                  type="text"
                  defaultValue="أحمد"
                  className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">الاسم الأخير</label>
                <input
                  type="text"
                  defaultValue="محمد"
                  className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">البريد الإلكتروني</label>
              <div className="relative">
                <Mail className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  defaultValue="ahmed@email.com"
                  className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 pr-10 text-white focus:outline-none focus:border-orange-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">نبذة عني</label>
              <textarea
                rows={4}
                className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500 resize-none"
                placeholder="اكتب نبذة قصيرة عنك..."
              />
            </div>

            <div className="flex justify-end">
              <button className="btn-primary flex items-center gap-2">
                <Save className="w-4 h-4" />
                حفظ التغييرات
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Subscription Tab */}
      {activeTab === 'subscription' && (
        <div className="space-y-6">
          <div className="card bg-gradient-to-r from-orange-500/20 to-orange-600/20 border-orange-500/30">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-bold text-xl">الخطة المجانية</h3>
                <p className="text-gray-400 text-sm">تم التجديد تلقائياً</p>
              </div>
              <span className="px-3 py-1 rounded-full bg-orange-500 text-white text-sm font-bold">نشط</span>
            </div>
            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">التصاميم المتبقية</span>
                <span>8 / 10</span>
              </div>
              <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                <div className="h-full bg-orange-500 rounded-full" style={{ width: '80%' }} />
              </div>
            </div>
            <button className="w-full btn-primary">
              ترقية للخطة الاحترافية
            </button>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            {[
              { name: 'مجاني', price: '0', features: ['10 تصاميم', 'تصدير PNG', 'قوالب أساسية'] },
              { name: 'احترافي', price: '29', features: ['100 تصميم', 'تصدير PNG+PDF', 'جميع القوالب', 'دعم فني'] },
              { name: 'أعمال', price: '99', features: ['تصاميم غير محدودة', 'جميع الصيغ', 'قوالب حصرية', 'أولوية الدعم'] },
            ].map((plan, i) => (
              <div key={i} className={`card ${plan.name === 'احترافي' ? 'border-orange-500' : ''}`}>
                <h4 className="font-bold text-lg mb-2">{plan.name}</h4>
                <div className="text-3xl font-bold mb-4">
                  ${plan.price}
                  <span className="text-sm text-gray-400 font-normal">/شهر</span>
                </div>
                <ul className="space-y-2 mb-6">
                  {plan.features.map((f, j) => (
                    <li key={j} className="flex items-center gap-2 text-sm text-gray-400">
                      <span className="text-green-500">✓</span>
                      {f}
                    </li>
                  ))}
                </ul>
                <button className={`w-full py-2 rounded-lg font-bold transition-all ${
                  plan.name === 'مجاني' 
                    ? 'bg-gray-700 text-white' 
                    : 'btn-primary'
                }`}>
                  {plan.name === 'مجاني' ? 'الخطة الحالية' : 'اختيار الخطة'}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Notifications Tab */}
      {activeTab === 'notifications' && (
        <div className="card space-y-4">
          {[
            { label: 'إشعارات البريد الإلكتروني', desc: 'استلام تحديثات وعروض', checked: true },
            { label: 'إشعارات التصميم', desc: 'عند اكتمال التصدير', checked: true },
            { label: 'النشرات الإخبارية', desc: 'نصائح وإلهام أسبوعي', checked: false },
            { label: 'إشعارات المنتج', desc: 'ميزات جديدة وتحديثات', checked: true },
          ].map((item, i) => (
            <div key={i} className="flex items-center justify-between py-3 border-b border-gray-700 last:border-0">
              <div>
                <h4 className="font-medium">{item.label}</h4>
                <p className="text-sm text-gray-400">{item.desc}</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" defaultChecked={item.checked} className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:right-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
              </label>
            </div>
          ))}
        </div>
      )}

      {/* Security Tab */}
      {activeTab === 'security' && (
        <div className="space-y-6">
          <div className="card">
            <h3 className="font-bold text-lg mb-4">تغيير كلمة المرور</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">كلمة المرور الحالية</label>
                <input
                  type="password"
                  className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">كلمة المرور الجديدة</label>
                <input
                  type="password"
                  className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">تأكيد كلمة المرور</label>
                <input
                  type="password"
                  className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500"
                />
              </div>
              <button className="btn-primary">تحديث كلمة المرور</button>
            </div>
          </div>

          <div className="card">
            <h3 className="font-bold text-lg mb-4 text-red-400">منطقة الخطر</h3>
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">حذف الحساب</h4>
                <p className="text-sm text-gray-400">هذا الإجراء لا يمكن التراجع عنه</p>
              </div>
              <button className="px-4 py-2 rounded-lg border border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition-colors">
                حذف الحساب
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
