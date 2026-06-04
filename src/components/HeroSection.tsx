import Link from 'next/link'

const H1_WORDS = ['Your', 'listings', 'deserve', 'more', 'than', 'photos']

const LOGOS = [
  'Zillow', 'Idealista', 'Rightmove', 'Instagram Reels',
  'TikTok', 'YouTube', 'Fotocasa', 'Realtor.com',
]

const AVATARS = ['#c9a96e', '#a07840', '#ffffff', '#c9a96e', '#888888']

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-20 pb-0 px-6 overflow-hidden">
      {/* Radial glow background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px]
                      bg-[#c9a96e]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-16 items-center">
        {/* ── Left: copy ── */}
        <div>
          {/* Badge */}
          <div
            className="inline-flex items-center gap-2 border border-[#c9a96e]/30 bg-[#c9a96e]/8
                       text-[#c9a96e] text-xs font-medium px-4 py-1.5 rounded-full mb-8"
            style={{ animation: 'fadeInUp 0.5s ease forwards', opacity: 0 }}>
            <span className="w-1.5 h-1.5 rounded-full bg-[#c9a96e] animate-pulse" />
            For real estate agents who close faster
          </div>

          {/* H1 — word-by-word stagger */}
          <h1
            className="text-5xl lg:text-6xl xl:text-[4.5rem] font-bold leading-[1.05] tracking-tight mb-6"
            style={{ fontFamily: 'var(--font-serif)' }}>
            {H1_WORDS.map((word, i) => (
              <span
                key={word + i}
                className="inline-block mr-[0.22em]"
                style={{ animation: `fadeInUp 0.55s ease forwards ${100 + i * 80}ms`, opacity: 0 }}>
                {word}
              </span>
            ))}
          </h1>

          {/* Subtext */}
          <p
            className="text-[#888] text-lg leading-relaxed max-w-md mb-10"
            style={{ animation: 'fadeInUp 0.6s ease forwards 700ms', opacity: 0 }}>
            Drop your listing photos. Get back a cinematic video with smooth camera movement,
            professional voiceover, and ambient music. Ready to post in minutes, not days.
          </p>

          {/* CTAs */}
          <div
            className="flex flex-wrap gap-4 mb-10"
            style={{ animation: 'fadeInUp 0.6s ease forwards 850ms', opacity: 0 }}>
            <Link
              href="/login"
              className="bg-[#c9a96e] text-black font-semibold px-7 py-3.5 rounded-full
                         hover:bg-[#d4b87a] transition-all hover:scale-[1.02] text-sm">
              Create your first video
            </Link>
            <a
              href="#how-it-works"
              className="border border-[#333] text-white font-semibold px-7 py-3.5 rounded-full
                         hover:border-[#555] transition-colors text-sm">
              See how it works
            </a>
          </div>

          {/* Social proof */}
          <div
            className="flex items-center gap-3"
            style={{ animation: 'fadeInUp 0.6s ease forwards 1000ms', opacity: 0 }}>
            <div className="flex -space-x-2">
              {AVATARS.map((bg, i) => (
                <div
                  key={i}
                  className="w-8 h-8 rounded-full border-2 border-[#0a0a0a] flex items-center justify-center
                             text-[10px] font-bold"
                  style={{ background: bg, color: bg === '#ffffff' ? '#000' : '#fff' }}>
                  {String.fromCharCode(65 + i)}
                </div>
              ))}
            </div>
            <span className="text-sm text-[#888]">
              <span className="text-white font-semibold">2,400+</span> agents on the waitlist
            </span>
          </div>
        </div>

        {/* ── Right: floating card ── */}
        <div className="flex justify-center lg:justify-end" style={{ animation: 'fadeInUp 0.7s ease forwards 300ms', opacity: 0 }}>
          <div className="relative animate-float">
            <div className="w-80 bg-[#111] border border-[#1f1f1f] rounded-2xl overflow-hidden shadow-2xl">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=520&h=400&fit=crop&q=80"
                alt="Modern Villa preview"
                className="w-full h-44 object-cover"
              />
              <div className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="font-semibold text-white text-sm">Modern Villa</p>
                    <p className="text-[#666] text-xs mt-0.5">Marbella, Spain — $1.8M</p>
                  </div>
                  <button className="w-8 h-8 rounded-full bg-[#c9a96e]/15 flex items-center justify-center">
                    <svg className="w-3 h-3 text-[#c9a96e] ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </button>
                </div>

                {/* Progress */}
                <div className="bg-[#1f1f1f] rounded-full h-0.5 mb-2">
                  <div className="bg-[#c9a96e] h-0.5 rounded-full w-5/12" />
                </div>
                <div className="flex justify-between text-[#444] text-xs mb-4">
                  <span>0:42</span><span>1:48</span>
                </div>

                {/* Badges */}
                <div className="flex gap-1.5 flex-wrap">
                  {['HD Ready', 'AI Voiceover', 'Music'].map(b => (
                    <span key={b} className="bg-[#1a1a1a] border border-[#2a2a2a] text-[#888] text-[10px] px-2.5 py-1 rounded-lg">
                      {b}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Gold glow */}
            <div className="absolute -inset-6 bg-[#c9a96e]/6 rounded-3xl blur-2xl -z-10" />
          </div>
        </div>
      </div>

      {/* ── Logo ticker ── */}
      <div className="w-full max-w-7xl mx-auto mt-24 mb-8">
        <p className="text-center text-[#444] text-xs uppercase tracking-widest mb-8">
          Distribute everywhere
        </p>
        <div className="overflow-hidden relative">
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-[#0a0a0a] to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-[#0a0a0a] to-transparent z-10" />
          <div className="flex animate-marquee whitespace-nowrap">
            {[...LOGOS, ...LOGOS].map((logo, i) => (
              <span key={i} className="inline-block text-[#333] font-semibold text-sm tracking-wide mx-10 hover:text-[#888] transition-colors">
                {logo}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
