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
    const client = createClient()
    setSupabase(client)
    client.auth.getSession().then(({ data: { session } }) => {
      if (session) router.replace('/dashboard')
    })
  }, [router])

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    if (!supabase) return
    await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: `${location.origin}/auth/callback` },
    })
    setSent(true)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a] px-4">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px]
                      bg-[#c9a96e]/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative w-full max-w-sm animate-fade-in-up">
        <div className="text-center mb-8">
          <p className="text-2xl font-bold text-[#c9a96e] tracking-tight mb-1">ReelEstate AI</p>
          <p className="text-[#666] text-sm">Sign in to your account</p>
        </div>

        <div className="bg-[#111] border border-[#1f1f1f] rounded-2xl p-8">
          {sent ? (
            <div className="text-center py-4 space-y-3">
              <div className="text-4xl">📬</div>
              <p className="font-semibold text-white">Check your email</p>
              <p className="text-[#666] text-sm">
                We sent a magic link to{' '}
                <span className="text-[#c9a96e]">{email}</span>
              </p>
            </div>
          ) : (
            <form onSubmit={handleLogin} className="space-y-4">
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="w-full px-4 py-3 rounded-xl bg-[#0a0a0a] border border-[#1f1f1f]
                           text-white placeholder:text-[#444] text-sm
                           focus:outline-none focus:border-[#c9a96e]/40 transition-colors"
              />
              <button
                type="submit"
                className="w-full bg-[#c9a96e] text-black py-3 rounded-xl font-semibold text-sm
                           hover:bg-[#d4b87a] transition-colors">
                Send magic link
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
