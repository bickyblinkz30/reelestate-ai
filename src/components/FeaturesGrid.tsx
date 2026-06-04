import AnimateOnScroll from './AnimateOnScroll'
import { Film, Mic, LayoutGrid, Music, AlignLeft, Monitor, Sparkles, Box } from 'lucide-react'

const FEATURES = [
  {
    Icon: Film,
    title: 'Cinematic camera movement',
    body: 'Slow dolly-ins, smooth pans, elegant tracking shots — each tailored to the room.',
  },
  {
    Icon: Mic,
    title: 'Voiceover that sells',
    body: 'Script written from your listing data — price, location, features — spoken in a natural voice. Male or female. Multiple languages.',
  },
  {
    Icon: LayoutGrid,
    title: 'Every format, one click',
    body: 'Landscape for YouTube. Portrait for Reels and TikTok. Square for Instagram. Generate once, publish everywhere.',
  },
  {
    Icon: Music,
    title: 'Soundtrack that fits',
    body: 'Curated music matched to the property — modern luxury for penthouses, warm Mediterranean for villas.',
  },
  {
    Icon: AlignLeft,
    title: 'Subtitles included',
    body: 'Auto-generated captions synced to voiceover. 85% of social video is watched on mute.',
  },
  {
    Icon: Monitor,
    title: '1080p, no compromise',
    body: 'Full HD output with smooth crossfade transitions and professional colour grading.',
  },
  {
    Icon: Sparkles,
    title: 'AI photo enhancement',
    body: 'Fix dark interiors, swap grey skies for blue, remove clutter — all with one click.',
  },
  {
    Icon: Box,
    title: '3D virtual tours',
    body: 'Generate interactive panoramic views from your listing photos. No expensive 360° cameras needed.',
  },
]

export default function FeaturesGrid() {
  return (
    <section className="py-28 px-6 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto">
        <AnimateOnScroll>
          <p className="text-xs uppercase tracking-widest text-[#c9a96e] mb-4 text-center">Features</p>
          <h2
            className="text-4xl lg:text-5xl font-bold text-center leading-tight max-w-3xl mx-auto mb-20"
            style={{ fontFamily: 'var(--font-serif)' }}>
            The quality of a $2,000 video shoot.{' '}
            <span className="text-[#c9a96e]">The speed of sending an email.</span>
          </h2>
        </AnimateOnScroll>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {FEATURES.map(({ Icon, title, body }, i) => (
            <AnimateOnScroll key={title} delay={i * 60}>
              <div className="group bg-[#111] border border-[#1f1f1f] rounded-2xl p-6
                              hover:border-[#c9a96e]/30 hover:-translate-y-1 transition-all duration-300
                              hover:shadow-[0_0_30px_rgba(201,169,110,0.08)]">
                <div className="w-10 h-10 rounded-xl bg-[#c9a96e]/10 flex items-center justify-center mb-5
                                group-hover:bg-[#c9a96e]/20 transition-colors">
                  <Icon size={18} className="text-[#c9a96e]" />
                </div>
                <h3 className="font-semibold text-white text-sm mb-2">{title}</h3>
                <p className="text-[#666] text-xs leading-relaxed">{body}</p>
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  )
}
