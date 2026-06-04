'use client'
import { useEffect, useRef, useState } from 'react'
import AnimateOnScroll from './AnimateOnScroll'

function useCounter(target: number, duration = 1800, start = false) {
  const [value, setValue] = useState(0)
  useEffect(() => {
    if (!start) return
    const startTime = performance.now()
    const tick = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(Math.floor(eased * target))
      if (progress < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [start, target, duration])
  return value
}

export default function StatsSection() {
  const ref = useRef<HTMLDivElement>(null)
  const [started, setStarted] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setStarted(true); observer.disconnect() } },
      { threshold: 0.3 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const c20 = useCounter(20, 1600, started)
  const c4  = useCounter(4,  1400, started)
  const c10 = useCounter(10, 1500, started)

  return (
    <section className="py-28 px-6 bg-[#080808] border-y border-[#1f1f1f]" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <AnimateOnScroll>
          <h2
            className="text-4xl lg:text-5xl font-bold text-center leading-tight max-w-3xl mx-auto mb-6"
            style={{ fontFamily: 'var(--font-serif)' }}>
            Agents with video sell{' '}
            <span className="text-[#c9a96e]">20% faster</span> and get{' '}
            <span className="text-[#c9a96e]">4x more inquiries.</span>
          </h2>
          <p className="text-[#666] text-center max-w-2xl mx-auto mb-20 leading-relaxed">
            But professional video production costs $500–2,000 per property and takes days.
            Most agents can&apos;t justify it for every listing.
            ReelEstate AI makes it possible — every property, every time, in minutes.
          </p>
        </AnimateOnScroll>

        {/* Animated stats */}
        <div className="grid grid-cols-3 gap-8 mb-20">
          {[
            { value: c20, suffix: '%', label: 'Faster sales' },
            { value: c4,  suffix: 'x', label: 'More inquiries' },
            { value: c10, suffix: '',  label: 'Minutes to create', prefix: '<' },
          ].map(({ value, suffix, label, prefix }) => (
            <div key={label} className="text-center">
              <p
                className="text-5xl lg:text-6xl font-bold text-[#c9a96e] mb-2"
                style={{ fontFamily: 'var(--font-serif)' }}>
                {prefix}{value}{suffix}
              </p>
              <p className="text-[#666] text-sm">{label}</p>
            </div>
          ))}
        </div>

        {/* Before / after */}
        <AnimateOnScroll>
          <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            <div className="relative rounded-2xl overflow-hidden border border-[#1f1f1f]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=520&h=320&fit=crop&q=60&grayscale"
                alt="Static JPEG"
                className="w-full h-48 object-cover opacity-60"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-[#0a0a0a]/80 px-4 py-3">
                <p className="text-[#666] text-xs uppercase tracking-widest">Static JPEG — What you have</p>
              </div>
            </div>
            <div className="relative rounded-2xl overflow-hidden border border-[#c9a96e]/30">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=520&h=320&fit=crop&q=80"
                alt="ReelEstate AI video"
                className="w-full h-48 object-cover"
              />
              <div className="absolute top-3 right-3 bg-[#c9a96e] text-black text-[10px] font-bold px-2.5 py-1 rounded-full tracking-wider">
                REELESTATE AI
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-[#0a0a0a]/80 px-4 py-3">
                <p className="text-[#c9a96e] text-xs uppercase tracking-widest">Cinematic video — What buyers see</p>
              </div>
            </div>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  )
}
