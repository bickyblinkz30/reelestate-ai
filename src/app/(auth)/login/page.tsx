'use client'
import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const [supabase, setSupabase] = useState<ReturnType<typeof createClient> | null>(null)
  const router = useRouter()

  useEffect(() => {
    setSupabase(createClient())
  }, [])

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    if (!supabase) return
    await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: `${location.origin}/auth/callback` }
    })
    setSent(true)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="bg-white border border-slate-200 rounded-2xl p-10 w-full max-w-sm shadow-sm">
        <h1 className="text-2xl font-extrabold text-[#1E3A8A] mb-2 tracking-tight">
          Reel<span className="text-[#10B981]">Estate</span> AI
        </h1>
        <p className="text-slate-500 text-sm mb-8">Sign in to your account</p>

        {sent ? (
          <div className="text-center">
            <div className="text-3xl mb-4">📬</div>
            <p className="font-semibold text-slate-800">Check your email</p>
            <p className="text-slate-500 text-sm mt-2">
              We sent a magic link to <strong>{email}</strong>
            </p>
          </div>
        ) : (
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="email" required value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl text-sm
                         focus:outline-none focus:border-[#1E3A8A]"
            />
            <button type="submit"
              className="w-full bg-[#1E3A8A] text-white py-3 rounded-xl font-bold text-sm
                         hover:bg-[#2d55c8] transition-colors">
              Send magic link
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
