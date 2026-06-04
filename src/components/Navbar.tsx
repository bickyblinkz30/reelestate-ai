'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [currency, setCurrency] = useState<'EUR' | 'USD'>('EUR')
  const [lang, setLang] = useState<'EN' | 'ES'>('EN')

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-[#0a0a0a]/90 backdrop-blur-md border-b border-[#1f1f1f]' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="text-lg font-bold tracking-tight text-[#c9a96e]">
          ReelEstate AI
        </Link>

        {/* Center — desktop */}
        <div className="hidden md:flex items-center gap-8">
          <a href="#how-it-works" className="text-sm text-[#888] hover:text-white transition-colors">
            How it works
          </a>
          <a href="#pricing" className="text-sm text-[#888] hover:text-white transition-colors">
            Pricing
          </a>
        </div>

        {/* Right — desktop */}
        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={() => setCurrency(c => c === 'EUR' ? 'USD' : 'EUR')}
            className="text-xs text-[#888] border border-[#1f1f1f] px-2.5 py-1 rounded-lg hover:text-white hover:border-[#333] transition-colors">
            {currency}
          </button>
          <button
            onClick={() => setLang(l => l === 'EN' ? 'ES' : 'EN')}
            className="text-xs text-[#888] border border-[#1f1f1f] px-2.5 py-1 rounded-lg hover:text-white hover:border-[#333] transition-colors">
            {lang}
          </button>
          <Link href="/login" className="text-sm text-[#888] hover:text-white transition-colors px-2">
            Log in
          </Link>
          <Link
            href="/login"
            className="bg-[#c9a96e] text-black text-sm font-semibold px-5 py-2 rounded-full hover:bg-[#d4b87a] transition-colors">
            Get started
          </Link>
        </div>

        {/* Hamburger — mobile */}
        <button className="md:hidden text-white p-1" onClick={() => setOpen(o => !o)}>
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile drawer */}
      <div className={`md:hidden overflow-hidden transition-all duration-300 ${open ? 'max-h-96' : 'max-h-0'}`}>
        <div className="bg-[#0a0a0a] border-t border-[#1f1f1f] px-6 py-6 space-y-5">
          <a href="#how-it-works" onClick={() => setOpen(false)} className="block text-sm text-[#888] hover:text-white">
            How it works
          </a>
          <a href="#pricing" onClick={() => setOpen(false)} className="block text-sm text-[#888] hover:text-white">
            Pricing
          </a>
          <Link href="/login" onClick={() => setOpen(false)} className="block text-sm text-[#888] hover:text-white">
            Log in
          </Link>
          <Link
            href="/login"
            onClick={() => setOpen(false)}
            className="block bg-[#c9a96e] text-black text-sm font-semibold px-5 py-3 rounded-full text-center">
            Get started
          </Link>
        </div>
      </div>
    </nav>
  )
}
