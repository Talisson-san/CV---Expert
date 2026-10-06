import type {
  Education,
  Experience,
  Language,
  PersonalData,
  Qualification,
  Skill,
} from '../types/resume'
import ResumeDocument from './ResumeDocument'

type ResumePreviewProps = {
  open: boolean
  onOpen: () => void
  onClose: () => void
  personalData: PersonalData
  professionalObjective: string
  educationList: Education[]
  experienceList: Experience[]
  qualificationList: Qualification[]
  skills: Skill[]
  languages: Language[]
}

function ResumePreview({
  open,
  onOpen,
  onClose,
  personalData,
  professionalObjective,
  educationList,
  experienceList,
  qualificationList,
  skills,
  languages,
}: ResumePreviewProps) {
  if (!open) {
    return (
      <button
        type="button"
        onClick={onOpen}
        className="fixed right-0 top-20 z-40 flex items-center gap-1 rounded-l-xl border border-r-0 border-slate-300 bg-white px-2 py-3 text-sm font-semibold text-slate-700 shadow-lg transition hover:bg-slate-50 lg:top-1/2 lg:-translate-y-1/2 lg:px-3 lg:py-5"
        aria-label="Abrir visualização do currículo"
      >
        <span className="[writing-mode:vertical-rl]">Preview</span>
        <span className="text-xl">‹</span>
      </button>
    )
  }

  return (
    <>
      <button
        type="button"
        onClick={onClose}
        className="fixed inset-x-0 bottom-0 top-16 z-40 bg-slate-950/30 lg:hidden"
        aria-label="Fechar preview"
      />

      <aside
        className="fixed bottom-0 right-0 top-16 z-50 flex flex-col border-l border-slate-400 bg-[#d7d7d7] shadow-2xl"
        style={{ width: 'min(860px, calc(100vw - 12px))' }}
      >
        <div className="flex h-14 shrink-0 items-center justify-between border-b border-slate-300 bg-slate-50 px-4 sm:px-5">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
              Preview
            </span>
            <h2 className="text-sm font-semibold text-slate-900">Currículo A4</h2>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden rounded-md border border-slate-200 bg-white px-3 py-1 text-xs text-slate-500 sm:block">
              210 × 297 mm
            </span>
            <button
              type="button"
              onClick={onClose}
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-300 bg-white text-xl text-slate-700 transition hover:bg-slate-50"
              aria-label="Recolher visualização"
            >
              ›
            </button>
          </div>
        </div>

        <div className="min-h-0 flex-1 overflow-auto p-3 sm:p-6">
          <div className="mx-auto w-[210mm]">
            <ResumeDocument
              personalData={personalData}
              professionalObjective={professionalObjective}
              educationList={educationList}
              experienceList={experienceList}
              qualificationList={qualificationList}
              skills={skills}
              languages={languages}
              showPlaceholders
            />
          </div>
        </div>
      </aside>
    </>
  )
}

export default ResumePreview
