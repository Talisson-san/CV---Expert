import { useState } from 'react'
import { sections } from '../data/resumeData'

type SectionNavigationProps = {
  activeSection: number
  completedSections: boolean[]
  onSelectSection: (index: number) => void
}

function SectionNavigation({
  activeSection,
  completedSections,
  onSelectSection,
}: SectionNavigationProps) {
  const [mobileOpen, setMobileOpen] = useState(false)

  const selectSection = (index: number) => {
    onSelectSection(index)
    setMobileOpen(false)
  }

  const navigation = (
    <nav className="space-y-2" aria-label="Etapas do currículo">
      {sections.map((section, index) => {
        const active = activeSection === index
        const complete = completedSections[index]

        return (
          <button
            key={section}
            type="button"
            onClick={() => selectSection(index)}
            className={`flex w-full items-center gap-3 rounded-xl border px-3 py-3 text-left text-sm font-medium transition ${
              active
                ? 'border-slate-900 bg-slate-900 text-white shadow-sm'
                : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-100'
            }`}
            aria-current={active ? 'step' : undefined}
          >
            <span
              className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                active
                  ? 'bg-white text-slate-900'
                  : complete
                    ? 'bg-emerald-100 text-emerald-700'
                    : 'bg-slate-100 text-slate-500'
              }`}
              aria-hidden="true"
            >
              {complete && !active ? '✓' : index + 1}
            </span>
            <span className="leading-5">{section}</span>
          </button>
        )
      })}
    </nav>
  )

  return (
    <>
      <aside className="hidden w-[288px] shrink-0 border-r border-slate-300 bg-slate-50 lg:block">
        <div className="sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto p-5">
          <div className="mb-5">
            <span className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
              Editor
            </span>
            <h2 className="mt-1 text-lg font-bold tracking-tight text-slate-900">
              Etapas do currículo
            </h2>
            <p className="mt-2 text-xs leading-5 text-slate-500">
              Navegue pelas etapas. As alterações aparecem no preview em tempo real.
            </p>
          </div>
          {navigation}
        </div>
      </aside>

      {!mobileOpen && (
        <button
          type="button"
          onClick={() => setMobileOpen(true)}
          className="fixed left-0 top-20 z-40 flex items-center gap-1 rounded-r-xl border border-l-0 border-slate-300 bg-white px-2 py-3 text-sm font-semibold text-slate-700 shadow-lg lg:hidden"
          aria-label="Abrir etapas do currículo"
        >
          <span className="text-xl">›</span>
          <span className="[writing-mode:vertical-rl]">Etapas</span>
        </button>
      )}

      {mobileOpen && (
        <>
          <button
            type="button"
            onClick={() => setMobileOpen(false)}
            className="fixed inset-x-0 bottom-0 top-16 z-40 bg-slate-950/30 lg:hidden"
            aria-label="Fechar menu de etapas"
          />

          <aside className="fixed bottom-0 left-0 top-16 z-50 w-[min(288px,calc(100vw-24px))] overflow-y-auto border-r border-slate-300 bg-slate-50 shadow-2xl lg:hidden">
            <div className="sticky top-0 z-10 flex h-14 items-center justify-between border-b border-slate-200 bg-white px-4">
              <div>
                <span className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">
                  Editor
                </span>
                <h2 className="text-sm font-semibold text-slate-900">Etapas</h2>
              </div>
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-300 bg-white text-xl text-slate-700"
                aria-label="Recolher etapas"
              >
                ‹
              </button>
            </div>
            <div className="p-4">{navigation}</div>
          </aside>
        </>
      )}
    </>
  )
}

export default SectionNavigation
