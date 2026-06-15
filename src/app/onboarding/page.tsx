'use client'
import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

export default function OnboardingPage() {
  const [fullName, setFullName] = useState('')
  const [agency, setAgency] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [supabase, setSupabase] = useState<ReturnType<typeof createClient> | null>(null)
  const router = useRouter()

  useEffect(() => {
    const client = createClient()
    setSupabase(client)
    client.auth.getUser().then(({ data: { user } }) => {
      if (!user) router.replace('/login')
    })
  }, [router])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!supabase) return
    setLoading(true)
    setError(null)

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      router.replace('/login')
      return
    }

    const { error: updateError } = await supabase
      .from('users')
      .update({ full_name: fullName, agency: agency || null })
      .eq('id', user.id)

    if (updateError) {
      setError(updateError.message)
      setLoading(false)
      return
    }

    router.replace('/dashboard')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a] px-4">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px]
                      bg-[#c9a96e]/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative w-full max-w-sm animate-fade-in-up">
        <div className="text-center mb-8">
          <p className="text-2xl font-bold text-[#c9a96e] tracking-tight mb-1">Welcome to ReelEstate AI</p>
          <p className="text-[#666] text-sm">Tell us a little about yourself</p>
        </div>

        <div className="bg-[#111] border border-[#1f1f1f] rounded-2xl p-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="fullName" className="block text-sm text-[#999]">
                Full Name
              </label>
              <input
                id="fullName"
                type="text"
                required
                value={fullName}
                onChange={e => setFullName(e.target.value)}
                placeholder="Jane Doe"
                className="w-full px-4 py-3 rounded-xl bg-[#0a0a0a] border border-[#1f1f1f]
                           text-white placeholder:text-[#444] text-sm
                           focus:outline-none focus:border-[#c9a96e]/40 transition-colors"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="agency" className="block text-sm text-[#999]">
                Agency <span className="text-[#555]">(optional)</span>
              </label>
              <input
                id="agency"
                type="text"
                value={agency}
                onChange={e => setAgency(e.target.value)}
                placeholder="Acme Realty"
                className="w-full px-4 py-3 rounded-xl bg-[#0a0a0a] border border-[#1f1f1f]
                           text-white placeholder:text-[#444] text-sm
                           focus:outline-none focus:border-[#c9a96e]/40 transition-colors"
              />
            </div>

            {error && (
              <p className="text-sm text-red-400">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#c9a96e] text-black py-3 rounded-xl font-semibold text-sm
                         hover:bg-[#d4b87a] transition-colors
                         disabled:opacity-60 disabled:cursor-not-allowed">
              {loading ? 'Setting up…' : 'Continue'}
            </button>

            <p className="text-center text-xs text-[#666] pt-1">
              You get 3 free videos — no credit card needed
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}
