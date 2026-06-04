import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import SignOutButton from '@/components/SignOutButton'

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: videos } = await supabase
    .from('projects')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })

  const firstName = user.email?.split('@')[0] ?? 'there'

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Nav */}
      <nav className="border-b border-[#1f1f1f] px-8 py-4 flex items-center justify-between">
        <span className="text-lg font-bold text-[#c9a96e] tracking-tight">ReelEstate AI</span>
        <div className="flex items-center gap-6">
          <span className="text-sm text-[#555]">{user.email}</span>
          <SignOutButton />
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-6 py-14">
        {/* Welcome */}
        <div className="mb-12">
          <p className="text-xs uppercase tracking-widest text-[#c9a96e] mb-2">Dashboard</p>
          <h1 className="text-4xl font-bold tracking-tight" style={{ fontFamily: 'var(--font-serif)' }}>
            Welcome back, <span className="text-[#888]">{firstName}</span>
          </h1>
        </div>

        {/* CTA */}
        <div className="mb-14">
          <button className="bg-[#c9a96e] text-black px-7 py-3.5 rounded-xl font-semibold text-sm
                             hover:bg-[#d4b87a] transition-all hover:scale-[1.02]">
            + Create New Video
          </button>
        </div>

        {/* Videos */}
        <div>
          <h2 className="text-sm uppercase tracking-widest text-[#555] mb-6">Your Videos</h2>

          {(!videos || videos.length === 0) ? (
            <div className="border border-[#1f1f1f] rounded-2xl py-24 text-center bg-[#0e0e0e]">
              <div className="w-14 h-14 rounded-2xl bg-[#c9a96e]/10 flex items-center justify-center mx-auto mb-5">
                <svg className="w-6 h-6 text-[#c9a96e]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                    d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z" />
                </svg>
              </div>
              <p className="text-[#666] font-medium">No videos yet.</p>
              <p className="text-[#444] text-sm mt-2">Create your first cinematic listing video.</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {videos.map((video) => (
                <div key={video.id}
                  className="border border-[#1f1f1f] rounded-2xl p-5 bg-[#0e0e0e]
                             hover:border-[#c9a96e]/30 transition-all">
                  <p className="font-medium text-white truncate">{video.property_title ?? 'Untitled'}</p>
                  <p className="text-xs text-[#555] mt-1 capitalize">{video.status}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
