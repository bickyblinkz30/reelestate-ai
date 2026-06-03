import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import SignOutButton from '@/components/SignOutButton'

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: reels } = await supabase
    .from('projects')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })

  return (
    <div className="min-h-screen bg-slate-50">
      <nav className="bg-white border-b border-slate-200 px-8 py-4 flex items-center justify-between">
        <span className="text-lg font-extrabold text-[#1E3A8A] tracking-tight">
          Reel<span className="text-[#10B981]">Estate</span> AI
        </span>
        <div className="flex items-center gap-6">
          <span className="text-sm text-slate-500">{user.email}</span>
          <SignOutButton />
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-6 py-10">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-extrabold text-slate-800 tracking-tight">Your Reels</h1>
          <button
            className="bg-[#1E3A8A] text-white px-5 py-2.5 rounded-xl font-bold text-sm
                       hover:bg-[#2d55c8] transition-colors">
            + Create New Reel
          </button>
        </div>

        {(!reels || reels.length === 0) && (
          <div className="border-2 border-dashed border-slate-200 rounded-2xl py-24 text-center">
            <div className="text-5xl mb-4">🎬</div>
            <p className="font-semibold text-slate-700 text-lg">No reels yet.</p>
            <p className="text-slate-400 text-sm mt-2">
              Click &apos;Create New Reel&apos; to get started.
            </p>
          </div>
        )}
      </main>
    </div>
  )
}
