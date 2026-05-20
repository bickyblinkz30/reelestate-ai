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
        {status === 'error' && (
          <div className="text-red-500 font-medium text-sm mb-2">
            Something went wrong, try again.
          </div>
        )}
        <p className="text-sm text-slate-400">
          <span className="text-[#10B981] font-semibold">Free trial included</span> — no credit card required
        </p>
      </section>

      {/* How it works */}
      <section className="bg-slate-50 py-24 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-4xl font-extrabold tracking-tight mb-4">
            How it{' '}
            <span className="text-[#1E3A8A]">works</span>
          </h2>
          <p className="text-slate-500 text-lg mb-16 max-w-lg mx-auto">
            Three simple steps to your next viral reel.
          </p>
          <div className="grid md:grid-cols-3 gap-10">
            {[
              { step: '01', title: 'Upload photos', desc: 'Drag & drop your property photos. We accept up to 20 high-res images per listing.' },
              { step: '02', title: 'AI creates', desc: 'Our AI writes a script, picks the best clips, and adds a professional voiceover.' },
              { step: '03', title: 'Post & go viral', desc: 'Download your TikTok-ready reel and share it in one tap. Watch the leads roll in.' },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-14 h-14 bg-[#1E3A8A] text-white rounded-2xl flex items-center justify-center
                                text-xl font-extrabold mx-auto mb-5 shadow-lg shadow-blue-200">
                  {item.step}
                </div>
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-slate-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-4xl font-extrabold tracking-tight mb-4">
            Everything you need{' '}
            <span className="text-[#10B981]">to grow</span>
          </h2>
          <p className="text-slate-500 text-lg mb-16 max-w-lg mx-auto">
            No editing skills? No problem. We handle the hard part.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
            {[
              { title: 'AI Script Writing', desc: 'Describe your property and the AI writes a hook, body, and CTA that converts.' },
              { title: 'Pro Voiceovers', desc: 'Choose from 20+ natural AI voices. Male, female — even your own language.' },
              { title: 'Auto Captions', desc: 'AI-generated captions with perfect sync. Great for silent scrollers.' },
              { title: 'Vertical Format', desc: 'Every reel is rendered in 9:16 — ready for TikTok, Reels, and Shorts.' },
              { title: '60-Second Delivery', desc: 'Hit generate and get your finished reel in under a minute.' },
              { title: 'Reel Library', desc: 'Store, organize, and re-download all your reels from one dashboard.' },
            ].map((feature) => (
              <div key={feature.title}
                className="bg-white border border-slate-100 rounded-2xl p-7 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-10 h-10 bg-[#1E3A8A]/10 rounded-xl flex items-center justify-center mb-4">
                  <div className="w-4 h-4 rounded-full bg-[#10B981]" />
                </div>
                <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
                <p className="text-slate-500 leading-relaxed text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="bg-slate-50 py-24 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-4xl font-extrabold tracking-tight mb-4">
            Simple{' '}
            <span className="text-[#1E3A8A]">pricing</span>
          </h2>
          <p className="text-slate-500 text-lg mb-16 max-w-lg mx-auto">
            Start free. Upgrade when you need more.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: 'Starter',
                price: '€19',
                reels: '10 reels / mo',
                features: ['AI script writer', 'Pro voiceovers', 'Auto captions', 'Vertical export'],
                popular: false,
              },
              {
                name: 'Pro',
                price: '€49',
                reels: '40 reels / mo',
                features: ['Everything in Starter', 'Priority processing', 'Custom voice cloning', 'Team collaboration'],
                popular: true,
              },
              {
                name: 'Agency',
                price: '€149',
                reels: 'Unlimited reels',
                features: ['Everything in Pro', 'White-label exports', 'API access', 'Dedicated support'],
                popular: false,
              },
            ].map((tier) => (
              <div key={tier.name}
                className={`rounded-2xl p-8 text-left relative flex flex-col ${tier.popular
                  ? 'bg-[#1E3A8A] text-white shadow-2xl scale-[1.03] border-2 border-[#1E3A8A]'
                  : 'bg-white border border-slate-200'
                }`}>
                {tier.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#10B981] text-white
                                  text-xs font-bold px-4 py-1 rounded-full tracking-wider uppercase">
                    Most Popular
                  </div>
                )}
                <h3 className={`text-lg font-semibold mb-1 ${tier.popular ? 'text-white' : 'text-slate-500'}`}>
                  {tier.name}
                </h3>
                <div className={`text-4xl font-extrabold mb-1 ${tier.popular ? 'text-white' : ''}`}>
                  {tier.price}<span className={`text-lg font-normal ${tier.popular ? 'text-white/70' : 'text-slate-400'}`}>/mo</span>
                </div>
                <p className={`text-sm mb-6 ${tier.popular ? 'text-white/70' : 'text-slate-400'}`}>{tier.reels}</p>
                <ul className="space-y-3 mb-8 flex-1">
                  {tier.features.map((f) => (
                    <li key={f} className="flex items-center gap-3 text-sm">
                      <span className={`${tier.popular ? 'text-[#10B981]' : 'text-[#10B981]'} font-bold`}>✓</span>
                      {f}
                    </li>
                  ))}
                </ul>
                <button
                  className={`w-full py-3 rounded-xl font-bold text-sm transition-colors ${
                    tier.popular
                      ? 'bg-white text-[#1E3A8A] hover:bg-slate-100'
                      : 'bg-[#1E3A8A] text-white hover:bg-[#2d55c8]'
                  }`}>
                  Get started
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1E3A8A] text-white py-12 px-6">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="text-lg font-extrabold tracking-tight">
            Reel<span className="text-[#10B981]">Estate</span> AI
          </span>
          <div className="flex gap-6 text-sm text-white/70">
            <a href="/privacy" className="hover:text-white transition-colors">Privacy</a>
            <a href="/terms" className="hover:text-white transition-colors">Terms</a>
          </div>
          <p className="text-sm text-white/50">
            &copy; {new Date().getFullYear()} ReelEstate AI. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  )
}
