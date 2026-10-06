import {
  educationStatusLabels,
  months,
} from '../data/resumeData'

import type {
  Education,
  PersonalData,
} from '../types/resume'

type ResumePreviewProps = {
  open: boolean
  onOpen: () => void
  onClose: () => void
  personalData: PersonalData
  professionalObjective: string
  educationList: Education[]
}

function ResumePreview({
  open,
  onOpen,
  onClose,
  personalData,
  professionalObjective,
  educationList,
}: ResumePreviewProps) {
  const dateComplete =
    personalData.birthDay &&
    personalData.birthMonth &&
    personalData.birthYear

  const formattedBirthDate = dateComplete
    ? `${personalData.birthDay}/${
        months[
          Number(personalData.birthMonth) - 1
        ]
      }/${personalData.birthYear}`
    : ''

  const contactItems = [
    personalData.phone,
    personalData.email,
    personalData.address,
    formattedBirthDate,
  ].filter(Boolean)

  const formatEducationPeriod = (
    education: Education,
  ) => {
    const start =
      education.startMonth &&
      education.startYear
        ? `${
            months[
              Number(education.startMonth) - 1
            ]
          }/${education.startYear}`
        : education.startYear || ''

    const end =
      education.endMonth &&
      education.endYear
        ? `${
            months[
              Number(education.endMonth) - 1
            ]
          }/${education.endYear}`
        : education.endYear || ''

    if (start && end) {
      return `${start} - ${end}`
    }

    if (
      start &&
      education.status === 'andamento'
    ) {
      return `${start} - Atual`
    }

    return start || end
  }

  if (!open) {
    return (
      <button
        type="button"
        onClick={onOpen}
        className="fixed right-0 top-1/2 z-40 flex -translate-y-1/2 items-center gap-2 rounded-l-xl border border-r-0 border-slate-300 bg-white px-3 py-5 text-sm font-semibold text-slate-700 shadow-lg transition hover:bg-slate-50"
        aria-label="Abrir visualização do currículo"
      >
        <span className="text-xl">
          ‹
        </span>

        <span className="[writing-mode:vertical-rl]">
          Preview
        </span>
      </button>
    )
  }

  return (
    <aside
      className="fixed inset-y-0 right-0 z-50 border-l border-slate-300 bg-slate-100 shadow-2xl"
      style={{
        width:
          'min(860px, calc(100vw - 24px))',
      }}
    >
      <div className="flex h-16 items-center justify-between border-b border-slate-200 bg-white px-5">
        <div>
          <span className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
            Preview
          </span>

          <h2 className="text-sm font-semibold">
            Currículo A4
          </h2>
        </div>

        <div className="flex items-center gap-3">
          <span className="rounded-md border border-slate-200 bg-white px-3 py-1 text-xs text-slate-500">
            210 × 297 mm
          </span>

          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-300 bg-white text-xl text-slate-700 transition hover:bg-slate-50"
            aria-label="Fechar visualização"
          >
            ›
          </button>
        </div>
      </div>

      <div className="h-[calc(100vh-64px)] overflow-auto p-6">
        <div
          className="mx-auto bg-white shadow-xl"
          style={{
            width: '210mm',
            minHeight: '297mm',
          }}
        >
          <div className="p-[18mm]">
            <header className="border-b border-slate-300 pb-6">
              <h1 className="text-3xl font-bold uppercase tracking-tight text-slate-900">
                {personalData.name ||
                  'Seu nome completo'}
              </h1>

              <p className="mt-3 text-sm leading-6 text-slate-500">
                {contactItems.length > 0
                  ? contactItems.join(' • ')
                  : 'Telefone • E-mail • Endereço • Data de nascimento'}
              </p>
            </header>

            <section className="py-8">
              <h2 className="text-sm font-bold uppercase tracking-wide text-slate-900">
                Objetivo profissional
              </h2>

              <p className="mt-3 max-w-2xl whitespace-pre-line text-sm leading-6 text-slate-600">
                {professionalObjective ||
                  'Seu objetivo profissional será exibido aqui.'}
              </p>
            </section>

            <section className="border-t border-slate-200 py-8">
              <h2 className="text-sm font-bold uppercase tracking-wide text-slate-900">
                Formação acadêmica
              </h2>

              <div className="mt-5 space-y-5">
                {educationList.some(
                  (education) =>
                    education.type ||
                    education.course ||
                    education.institution,
                ) ? (
                  educationList.map(
                    (education) => {
                      const location = [
                        education.city,
                        education.state,
                      ]
                        .filter(Boolean)
                        .join(' - ')

                      const period =
                        formatEducationPeriod(
                          education,
                        )

                      return (
                        <div
                          key={education.id}
                        >
                          <h3 className="text-sm font-semibold text-slate-900">
                            {education.course ||
                              education.type ||
                              'Formação'}
                          </h3>

                          {education.type &&
                            education.course && (
                              <p className="mt-1 text-xs font-medium text-slate-500">
                                {education.type}
                              </p>
                            )}

                          {education.institution && (
                            <p className="mt-1 text-sm text-slate-600">
                              {
                                education.institution
                              }
                            </p>
                          )}

                          <div className="mt-1 flex flex-wrap gap-x-2 text-xs text-slate-500">
                            {location && (
                              <span>
                                {location}
                              </span>
                            )}

                            {location &&
                              period && (
                                <span>
                                  •
                                </span>
                              )}

                            {period && (
                              <span>
                                {period}
                              </span>
                            )}

                            {(location ||
                              period) && (
                              <span>
                                •
                              </span>
                            )}

                            <span>
                              {
                                educationStatusLabels[
                                  education.status
                                ]
                              }
                            </span>
                          </div>
                        </div>
                      )
                    },
                  )
                ) : (
                  <p className="text-sm text-slate-400">
                    Sua formação acadêmica será exibida
                    aqui.
                  </p>
                )}
              </div>
            </section>

            <section className="border-t border-slate-200 pt-8">
              <p className="text-sm text-slate-400">
                As próximas seções serão adicionadas
                conforme o preenchimento do currículo.
              </p>
            </section>
          </div>
        </div>
      </div>
    </aside>
  )
}

export default ResumePreview