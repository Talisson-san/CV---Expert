import {
  professionalProfiles,
} from '../data/resumeData'

import type {
  ProfessionalArea,
} from '../data/resumeData'

type ObjectiveFormProps = {
  professionalArea: ProfessionalArea
  professionalObjective: string
  onAreaChange: (
    area: ProfessionalArea,
  ) => void
  onObjectiveChange: (
    objective: string,
  ) => void
}

function ObjectiveForm({
  professionalArea,
  professionalObjective,
  onAreaChange,
  onObjectiveChange,
}: ObjectiveFormProps) {
  const selectedProfile = professionalArea
    ? professionalProfiles[professionalArea]
    : null

  const selectClass =
    'mt-2 w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10'

  return (
    <div>
      <div className="mb-7">
        <h3 className="text-xl font-bold">
          Objetivo profissional
        </h3>

        <p className="mt-1 text-sm leading-6 text-slate-500">
          Escolha o tipo de oportunidade que procura para
          receber sugestões adequadas ao seu perfil.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px]">
        <div className="min-w-0 space-y-7">
          <div>
            <label className="block text-sm font-medium text-slate-700">
              Qual tipo de oportunidade você procura?

              <select
                value={professionalArea}
                onChange={(event) =>
                  onAreaChange(
                    event.target
                      .value as ProfessionalArea,
                  )
                }
                className={selectClass}
              >
                <option value="">
                  Selecione uma área
                </option>

                {Object.entries(
                  professionalProfiles,
                ).map(
                  ([key, profile]) => (
                    <option
                      key={key}
                      value={key}
                    >
                      {profile.label}
                    </option>
                  ),
                )}
              </select>
            </label>
          </div>

          {professionalArea === 'outro' && (
            <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-4">
              <p className="text-sm leading-6 text-slate-600">
                Escreva livremente seu objetivo
                profissional no campo abaixo.
              </p>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-slate-700">
              Seu objetivo

              <textarea
                value={professionalObjective}
                onChange={(event) =>
                  onObjectiveChange(
                    event.target.value,
                  )
                }
                maxLength={600}
                rows={10}
                placeholder="Escreva seu objetivo profissional ou escolha uma sugestão ao lado."
                spellCheck={false}
                className="mt-2 w-full resize-y rounded-lg border border-slate-300 bg-white px-3 py-3 text-sm leading-6 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10"
              />
            </label>

            <div className="mt-2 flex justify-between text-xs text-slate-400">
              <span>
                Você pode editar livremente o texto.
              </span>

              <span>
                {professionalObjective.length}/600
              </span>
            </div>
          </div>
        </div>

        <aside className="min-w-0">
          <div className="lg:sticky lg:top-24">
            {selectedProfile &&
            selectedProfile.objectives.length > 0 ? (
              <>
                <div className="mb-3">
                  <h4 className="text-sm font-semibold text-slate-900">
                    Sugestões para{' '}
                    {selectedProfile.label}
                  </h4>

                  <p className="mt-1 text-xs leading-5 text-slate-500">
                    Clique em + para usar uma sugestão
                    como ponto de partida.
                  </p>
                </div>

                <div className="space-y-3">
                  {selectedProfile.objectives.map(
                    (objective) => (
                      <div
                        key={objective}
                        className="rounded-xl border border-slate-200 bg-slate-50 p-4"
                      >
                        <div className="flex items-start gap-3">
                          <button
                            type="button"
                            onClick={() =>
                              onObjectiveChange(
                                objective,
                              )
                            }
                            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-slate-300 bg-white text-lg font-semibold text-slate-700 transition hover:border-slate-900 hover:bg-slate-900 hover:text-white"
                            aria-label="Usar esta sugestão"
                            title="Usar esta sugestão"
                          >
                            +
                          </button>

                          <p className="text-sm leading-6 text-slate-700">
                            {objective}
                          </p>
                        </div>
                      </div>
                    ),
                  )}
                </div>
              </>
            ) : professionalArea === 'outro' ? (
              <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-5">
                <p className="text-sm leading-6 text-slate-500">
                  Nesta opção, o objetivo é
                  totalmente personalizado.
                </p>
              </div>
            ) : (
              <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-5">
                <p className="text-sm leading-6 text-slate-500">
                  Selecione uma área para visualizar
                  sugestões de objetivo profissional.
                </p>
              </div>
            )}
          </div>
        </aside>
      </div>
    </div>
  )
}

export default ObjectiveForm