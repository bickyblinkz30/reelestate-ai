import { createServerSupabaseClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export default async function DashboardPage() {
  const supabase = await createServerSupabaseClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: projects } = await supabase
    .from('projects')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <div className="min-h-screen bg-slate-50">
      <nav className="bg-white border-b border-slate-200 px-8 py-4 flex items-center justify-between">
        <span className="text-lg font-extrabold text-[#1E3A8A] tracking-tight">
          Reel<span className="text-[#10B981]">Estate</span> AI
        </span>
        <span className="text-sm text-slate-500">{user.email}</span>
      </nav>

      <main className="max-w-5xl mx-auto px-6 py-10">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-extrabold text-slate-800 tracking-tight">My reels</h1>
          <button
            className="bg-[#1E3A8A] text-white px-5 py-2.5 rounded-xl font-bold text-sm
                       hover:bg-[#2d55c8] transition-colors opacity-50 cursor-not-allowed"
            title="Coming in Phase 2">
            + New reel
          </button>
        </div>

        {(!projects || projects.length === 0) && (
          <div className="border-2 border-dashed border-slate-200 rounded-2xl py-20 text-center">
            <div className="text-4xl mb-4">🎬</div>
            <p className="font-semibold text-slate-700 text-lg">No reels yet</p>
            <p className="text-slate-400 text-sm mt-2">
              AI video generation coming in the next update.
            </p>
          </div>
        )}
      </main>
    </div>
  )
}
