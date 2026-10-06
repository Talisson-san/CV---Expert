type HeaderProps = {
  onOpenPreview: () => void
}

function Header({ onOpenPreview }: HeaderProps) {
  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white">
      <div className="mx-auto flex h-16 max-w-[1600px] items-center justify-between px-5 sm:px-8">
        <div>
          <h1 className="text-xl font-bold tracking-tight">
            CV Expert
          </h1>

          <p className="text-xs text-slate-500">
            Crie seu currículo profissional
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onOpenPreview}
            className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            Visualizar currículo
          </button>

          <button
            type="button"
            className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-700"
          >
            Exportar PDF
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header