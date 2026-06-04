import AnimateOnScroll from './AnimateOnScroll'

const STEPS = [
  {
    num: '01',
    title: 'Drop your photos',
    body: 'Upload 4 to 20 photos from any listing. The AI recognises each space — kitchen, living room, master bedroom, terrace, pool — and picks the best angles.',
  },
  {
    num: '02',
    title: 'We handle the production',
    body: 'Each photo gets cinematic camera movement. A professional script is written from your listing details. Then voiceover, music, and transitions are layered automatically.',
  },
  {
    num: '03',
    title: 'Post it everywhere',
    body: 'Download in 16:9, 9:16, or 1:1. Share directly to listing portals, Instagram, TikTok, YouTube, or WhatsApp. No editing software needed.',
  },
]

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-28 px-6 border-t border-[#1f1f1f]">
      <div className="max-w-7xl mx-auto">
        <AnimateOnScroll>
          <p className="text-xs uppercase tracking-widest text-[#c9a96e] mb-4 text-center">How it works</p>
          <h2
            className="text-4xl lg:text-5xl font-bold text-center leading-tight max-w-2xl mx-auto mb-20"
            style={{ fontFamily: 'var(--font-serif)' }}>
            From listing photos to a polished video in under 10 minutes
          </h2>
        </AnimateOnScroll>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-16">
          {STEPS.map((step, i) => (
            <AnimateOnScroll key={step.num} delay={i * 120}>
              <div className="group">
                <p className="text-7xl font-bold text-[#1a1a1a] mb-6 group-hover:text-[#c9a96e]/20 transition-colors"
                   style={{ fontFamily: 'var(--font-serif)' }}>
                  {step.num}
                </p>
                <h3 className="text-xl font-semibold text-white mb-3">{step.title}</h3>
                <p className="text-[#666] leading-relaxed text-sm">{step.body}</p>
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  )
}
