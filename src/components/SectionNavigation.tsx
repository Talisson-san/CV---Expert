import { sections } from '../data/resumeData'

type SectionNavigationProps = {
  activeSection: number
  onSelectSection: (index: number) => void
}

function SectionNavigation({
  activeSection,
  onSelectSection,
}: SectionNavigationProps) {
  return (
    <nav className="mb-6 grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-4">
      {sections.map((section, index) => (
        <button
          key={section}
          type="button"
          onClick={() => onSelectSection(index)}
          className={`flex items-center gap-3 rounded-xl border px-4 py-3 text-left text-sm font-medium transition ${
            activeSection === index
              ? 'border-slate-900 bg-slate-900 text-white shadow-sm'
              : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50'
          }`}
        >
          <span
            className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs ${
              activeSection === index
                ? 'bg-white text-slate-900'
                : 'bg-slate-100 text-slate-500'
            }`}
          >
            {index + 1}
          </span>

          <span>{section}</span>
        </button>
      ))}
    </nav>
  )
}

export default SectionNavigation