'use client'
import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'

export default function LandingPage() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'done' | 'error'>('idle')
  const [supabase, setSupabase] = useState<ReturnType<typeof createClient> | null>(null)

  useEffect(() => {
    setSupabase(createClient())
  }, [])

  async function handleWaitlist(e: React.FormEvent) {
    e.preventDefault()
    if (!email || !supabase) return
    setStatus('loading')

    const { error } = await supabase
      .from('waitlist')
      .insert({ email })

    setStatus(error ? 'error' : 'done')
  }

  return (
    <main className="min-h-screen bg-white text-slate-900 font-sans">

      {/* Nav */}
      <nav className="flex items-center justify-between px-8 py-5 border-b border-slate-100">
        <span className="text-xl font-extrabold text-[#1E3A8A] tracking-tight">
          Reel<span className="text-[#10B981]">Estate</span> AI
        </span>
        <a href="/login"
          className="bg-[#1E3A8A] text-white text-sm font-semibold px-5 py-2 rounded-lg hover:bg-[#2d55c8] transition-colors">
          Sign in
        </a>
      </nav>

      {/* Hero */}
      <section className="max-w-3xl mx-auto px-6 py-24 text-center">
        <div className="inline-block bg-blue-50 text-[#1E3A8A] border border-blue-200 text-xs font-bold
                        px-4 py-1.5 rounded-full mb-8 tracking-wide uppercase">
          AI-Powered Real Estate Reels
        </div>
        <h1 className="text-5xl md:text-6xl font-extrabold leading-[1.08] tracking-tight mb-6">
          Turn listings into{' '}
          <span className="text-[#1E3A8A]">viral reels</span>{' '}
          in{' '}
          <span className="text-[#10B981]">60 seconds</span>
        </h1>
        <p className="text-xl text-slate-500 leading-relaxed max-w-xl mx-auto mb-10">
          Upload property photos. AI writes the script, records the voiceover,
          and renders a finished TikTok-ready reel. No editing skills needed.
        </p>

        {/* Waitlist form */}
        {status === 'done' ? (
          <div className="text-[#10B981] font-semibold text-lg">
            ✓ You&apos;re on the list! We&apos;ll be in touch soon.
          </div>
        ) : (
          <form onSubmit={handleWaitlist}
            className="flex gap-3 max-w-md mx-auto mb-4">
            <input
              type="email"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="flex-1 px-4 py-3 border-2 border-slate-200 rounded-xl text-base
                         focus:outline-none focus:border-[#1E3A8A] transition-colors"
            />
            <button
              type="submit"
              disabled={status === 'loading'}
              className="bg-[#1E3A8A] text-white px-6 py-3 rounded-xl font-bold text-base
                         hover:bg-[#2d55c8] transition-colors disabled:opacity-60 whitespace-nowrap">
              {status === 'loading' ? 'Joining...' : 'Get early access'}
            </button>
          </form>
        )}
        <p className="text-sm text-slate-400">
          <span className="text-[#10B981] font-semibold">Free trial included</span> — no credit card required
        </p>
      </section>

      {/* How it works — add features + pricing sections below */}
    </main>
  )
}
