import Link from 'next/link'

export default function FooterSection() {
  return (
    <footer className="bg-[#0a0a0a] border-t border-[#1f1f1f] px-6 py-16">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <p className="text-lg font-bold text-[#c9a96e] mb-3">ReelEstate AI</p>
            <p className="text-[#555] text-sm leading-relaxed max-w-xs">
              Cinematic listing videos from photos, powered by AI.
              Built for agents who refuse to blend in.
            </p>
          </div>

          {/* Product */}
          <div>
            <p className="text-xs uppercase tracking-widest text-[#555] mb-4">Product</p>
            <ul className="space-y-3">
              {[
                { label: 'Get started', href: '/login' },
                { label: 'Pricing', href: '#pricing' },
                { label: 'How it works', href: '#how-it-works' },
              ].map(({ label, href }) => (
                <li key={label}>
                  <Link href={href} className="text-sm text-[#666] hover:text-white transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <p className="text-xs uppercase tracking-widest text-[#555] mb-4">Legal</p>
            <ul className="space-y-3">
              {[
                { label: 'Privacy policy', href: '/privacy' },
                { label: 'Terms of service', href: '/terms' },
                { label: 'Cookies', href: '/cookies' },
              ].map(({ label, href }) => (
                <li key={label}>
                  <Link href={href} className="text-sm text-[#666] hover:text-white transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-[#1f1f1f] pt-8">
          <p className="text-[#444] text-sm">
            © 2026 ReelEstate AI. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
