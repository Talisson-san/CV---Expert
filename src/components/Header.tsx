type HeaderProps = {
  accountEmail: string | null
  authLoading: boolean
  signOutPending: boolean
  onOpenAuth: () => void
  onSignOut: () => void
  onOpenPreview: () => void
  onOpenExport: () => void
  onNewResume: () => void
}

function Header({
  accountEmail,
  authLoading,
  signOutPending,
  onOpenAuth,
  onSignOut,
  onOpenPreview,
  onOpenExport,
  onNewResume,
}: HeaderProps) {
  return (
    <header className="sticky top-0 z-[60] border-b border-slate-200 bg-white">
      <div className="flex h-16 items-center justify-between gap-2 px-3 sm:gap-3 sm:px-6 lg:px-8">
        <div className="min-w-0">
          <h1 className="truncate text-lg font-bold tracking-tight text-slate-950 sm:text-xl">
            CV Expert
          </h1>
          <p className="hidden text-xs text-slate-500 sm:block">
            Crie seu currículo profissional
          </p>
        </div>

        <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
          {accountEmail ? (
            <div className="flex items-center gap-1.5 sm:gap-2">
              <span className="hidden max-w-32 truncate text-xs text-slate-600 xl:inline" title={accountEmail}>{accountEmail}</span>
              <button type="button" disabled={signOutPending} onClick={onSignOut} className="rounded-lg border border-slate-300 px-2 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-50">Sair</button>
            </div>
          ) : (
            <button type="button" disabled={authLoading} onClick={onOpenAuth} className="rounded-lg border border-slate-300 px-2 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-50">Entrar</button>
          )}
          <button
            type="button"
            onClick={onNewResume}
            className="rounded-lg border border-slate-300 bg-white px-2.5 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-50 sm:px-3 sm:text-sm"
          >
            <span className="sm:hidden">Novo</span>
            <span className="hidden sm:inline">Novo currículo</span>
          </button>

          <button
            type="button"
            onClick={onOpenPreview}
            className="hidden rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 lg:inline-flex"
          >
            Visualizar currículo
          </button>

          <button
            type="button"
            onClick={onOpenExport}
            className="rounded-lg bg-slate-900 px-2.5 py-2 text-xs font-semibold text-white transition hover:bg-slate-700 sm:px-4 sm:text-sm"
          >
            Exportar PDF
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header
