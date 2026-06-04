'use client'
import { useState } from 'react'
import Link from 'next/link'
import AnimateOnScroll from './AnimateOnScroll'
import { Check } from 'lucide-react'

const PLANS = [
  {
    name: 'Starter',
    desc: 'For solo agents getting started',
    eur: '€19', usd: '$29',
    features: ['10 videos per month', 'Up to 6 photos per video', 'Horizontal format', '1 language', 'Voiceover included', 'Email support'],
    popular: false,
    plan: 'starter',
  },
  {
    name: 'Pro',
    desc: 'For agents with a growing portfolio',
    eur: '€49', usd: '$59',
    features: ['25 videos per month', 'Up to 12 photos per video', 'All formats', '2 languages', 'Voice selection', 'Priority support'],
    popular: true,
    plan: 'pro',
  },
  {
    name: 'Agency',
    desc: 'For brokerages and teams',
    eur: '€149', usd: '$119',
    features: ['60 videos per month', 'Up to 20 photos per video', 'All formats', 'All languages', 'White label', 'Dedicated support'],
    popular: false,
    plan: 'agency',
  },
]

export default function PricingSection() {
  const [currency, setCurrency] = useState<'EUR' | 'USD'>('EUR')

  return (
    <section id="pricing" className="py-28 px-6 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto">
        <AnimateOnScroll>
          <p className="text-xs uppercase tracking-widest text-[#c9a96e] mb-4 text-center">Pricing</p>
          <h2
            className="text-4xl lg:text-5xl font-bold text-center leading-tight mb-4"
            style={{ fontFamily: 'var(--font-serif)' }}>
            Less than a coffee per listing video
          </h2>
          <p className="text-[#666] text-center max-w-md mx-auto mb-8">
            One closed deal pays for years of ReelEstate AI. No contracts, cancel anytime.
          </p>

          {/* Currency toggle */}
          <div className="flex justify-center mb-14">
            <div className="flex bg-[#111] border border-[#1f1f1f] rounded-full p-1">
              {(['EUR', 'USD'] as const).map(c => (
                <button
                  key={c}
                  onClick={() => setCurrency(c)}
                  className={`px-5 py-1.5 rounded-full text-sm font-medium transition-colors ${
                    currency === c ? 'bg-[#c9a96e] text-black' : 'text-[#666] hover:text-white'
                  }`}>
                  {c}
                </button>
              ))}
            </div>
          </div>
        </AnimateOnScroll>

        <div className="grid md:grid-cols-3 gap-6">
          {PLANS.map((plan, i) => (
            <AnimateOnScroll key={plan.name} delay={i * 100}>
              <div className={`relative flex flex-col rounded-2xl p-8 border transition-all duration-300 ${
                plan.popular
                  ? 'bg-[#111] border-[#c9a96e]/50 shadow-[0_0_40px_rgba(201,169,110,0.12)] scale-[1.02]'
                  : 'bg-[#0e0e0e] border-[#1f1f1f] hover:border-[#333]'
              }`}>
                {plan.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#c9a96e] text-black
                                  text-[10px] font-bold px-4 py-1 rounded-full tracking-wider uppercase">
                    Most Popular
                  </div>
                )}

                <p className="text-[#888] text-sm mb-1">{plan.name}</p>
                <p className={`text-4xl font-bold mb-1 ${plan.popular ? 'text-[#c9a96e]' : 'text-white'}`}
                   style={{ fontFamily: 'var(--font-serif)' }}>
                  {currency === 'EUR' ? plan.eur : plan.usd}
                  <span className="text-base font-normal text-[#555]">/mo</span>
                </p>
                <p className="text-[#555] text-xs mb-8">{plan.desc}</p>

                <ul className="space-y-3 mb-10 flex-1">
                  {plan.features.map(f => (
                    <li key={f} className="flex items-center gap-3 text-sm text-[#888]">
                      <Check size={13} className="text-[#c9a96e] shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>

                <Link
                  href={`/login?plan=${plan.plan}`}
                  className={`block text-center py-3 rounded-xl font-semibold text-sm transition-colors ${
                    plan.popular
                      ? 'bg-[#c9a96e] text-black hover:bg-[#d4b87a]'
                      : 'border border-[#2a2a2a] text-white hover:border-[#444]'
                  }`}>
                  Get started
                </Link>
              </div>
            </AnimateOnScroll>
          ))}
        </div>

        <AnimateOnScroll delay={200}>
          <p className="text-center text-[#555] text-sm mt-10">
            Just need one video?{' '}
            <span className="text-[#888]">€3.90–€8.90 per video — no subscription required.</span>
          </p>
        </AnimateOnScroll>
      </div>
    </section>
  )
}
