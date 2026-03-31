# try  bildflow/
├── app/
│   ├── (auth)/
│   │   ├── login/
│   │   │   └── page.tsx
│   │   ├── signup/
│   │   │   └── page.tsx
│   │   └── layout.tsx
│   ├── (dashboard)/
│   │   ├── dashboard/
│   │   │   └── page.tsx
│   │   ├── templates/
│   │   │   └── page.tsx
│   │   ├── my-designs/
│   │   │   └── page.tsx
│   │   ├── profile/
│   │   │   └── page.tsx
│   │   ├── editor/
│   │   │   └── [id]/
│   │   │       └── page.tsx
│   │   └── layout.tsx
│   ├── api/
│   │   ├── auth/
│   │   ├── designs/
│   │   └── export/
│   ├── page.tsx                    # Landing Page
│   ├── layout.tsx
│   ├── globals.css
│   └── not-found.tsx               # 404 Page
├── components/
│   ├── ui/                         # مكونات عامة
│   ├── editor/                     # مكونات المحرر
│   ├── auth/                       # مكونات تسجيل الدخول
│   └── dashboard/                  # مكونات لوحة التحكم
├── lib/
│   ├── firebase.ts
│   ├── auth.ts
│   └── utils.ts
├── hooks/
│   ├── useAuth.ts
│   ├── useDesign.ts
│   └── useEditor.ts
├── types/
│   └── index.ts
├── public/
│   ├── templates/
│   └── assets/
└── package.json
 
