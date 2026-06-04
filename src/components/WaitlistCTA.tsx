'use client'
import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import AnimateOnScroll from './AnimateOnScroll'

export default function WaitlistCTA() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'done' | 'error'>('idle')
  const [supabase, setSupabase] = useState<ReturnType<typeof createClient> | null>(null)

  useEffect(() => { setSupabase(createClient()) }, [])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!supabase || !email) return
    setStatus('loading')
    const { error } = await supabase.from('waitlist').insert({ email })
    setStatus(error ? 'error' : 'done')
  }

  return (
    <section className="py-28 px-6 bg-[#0c0c0c] border-t border-[#1f1f1f]">
      <div className="max-w-2xl mx-auto text-center">
        <AnimateOnScroll>
          <p className="text-xs uppercase tracking-widest text-[#c9a96e] mb-4">Early access</p>
          <h2
            className="text-4xl lg:text-5xl font-bold leading-tight mb-5"
            style={{ fontFamily: 'var(--font-serif)' }}>
            Stop losing leads to agents with better content
          </h2>
          <p className="text-[#666] text-lg mb-12 leading-relaxed">
            Get early access and a free video to try with your next listing.
          </p>

          {status === 'done' ? (
            <div className="flex flex-col items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-[#c9a96e]/15 flex items-center justify-center text-2xl">
                ✓
              </div>
              <p className="text-white font-semibold">You&apos;re on the list!</p>
              <p className="text-[#666] text-sm">We&apos;ll notify you at launch.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="flex-1 px-5 py-3.5 rounded-xl bg-[#111] border border-[#1f1f1f]
                           text-white placeholder:text-[#444] text-sm
                           focus:outline-none focus:border-[#c9a96e]/40 transition-colors"
              />
              <button
                type="submit"
                disabled={status === 'loading'}
                className="bg-[#c9a96e] text-black font-semibold px-7 py-3.5 rounded-xl text-sm
                           hover:bg-[#d4b87a] transition-colors disabled:opacity-60 whitespace-nowrap">
                {status === 'loading' ? 'Joining...' : 'Join waitlist'}
              </button>
            </form>
          )}

          {status === 'error' && (
            <p className="text-red-400 text-sm mt-3">Something went wrong. Please try again.</p>
          )}

          <p className="text-[#444] text-xs mt-5">
            We&apos;ll only use your email to notify you at launch. No spam.
          </p>
        </AnimateOnScroll>
      </div>
    </section>
  )
}
