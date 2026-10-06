import { brazilianStates, months } from '../data/resumeData'
import type { Experience } from '../types/resume'

type ExperienceFormProps = {
  experienceList: Experience[]
  onAdd: () => void
  onRemove: (id: number) => void
  onUpdate: (
    id: number,
    field: keyof Experience,
    value: string | boolean,
  ) => void
}

function ExperienceForm({
  experienceList,
  onAdd,
  onRemove,
  onUpdate,
}: ExperienceFormProps) {
  const inputClass =
    'mt-2 w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10'
  const selectClass =
    'mt-2 w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10'

  return (
    <div>
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h3 className="text-xl font-bold">Experiência profissional</h3>
          <p className="mt-1 max-w-2xl text-sm leading-6 text-slate-500">
            Informe experiências relevantes, começando pelas mais recentes.
          </p>
        </div>
        <button
          type="button"
          onClick={onAdd}
          className="rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-700"
        >
          + Adicionar experiência
        </button>
      </div>

      <div className="space-y-5">
        {experienceList.map((experience, index) => (
          <div
            key={experience.id}
            className="rounded-2xl border border-slate-200 bg-slate-50 p-5 sm:p-6"
          >
            <div className="mb-5 flex items-center justify-between gap-4">
              <span className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">
                Experiência {index + 1}
              </span>
              {experienceList.length > 1 && (
                <button
                  type="button"
                  onClick={() => onRemove(experience.id)}
                  className="rounded-lg border border-red-200 bg-white px-3 py-2 text-xs font-semibold text-red-600 transition hover:bg-red-50"
                >
                  Remover
                </button>
              )}
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <label className="block text-sm font-medium text-slate-700">
                Cargo / função
                <input
                  type="text"
                  value={experience.role}
                  onChange={(event) =>
                    onUpdate(experience.id, 'role', event.target.value)
                  }
                  placeholder="Ex.: Assistente administrativo"
                  className={inputClass}
                />
              </label>
              <label className="block text-sm font-medium text-slate-700">
                Empresa
                <input
                  type="text"
                  value={experience.company}
                  onChange={(event) =>
                    onUpdate(experience.id, 'company', event.target.value)
                  }
                  placeholder="Nome da empresa"
                  className={inputClass}
                />
              </label>
            </div>

            <div className="mt-5 grid gap-5 sm:grid-cols-[1fr_140px]">
              <label className="block text-sm font-medium text-slate-700">
                Cidade
                <input
                  type="text"
                  value={experience.city}
                  onChange={(event) =>
                    onUpdate(experience.id, 'city', event.target.value)
                  }
                  placeholder="Ex.: Lavras"
                  className={inputClass}
                />
              </label>
              <label className="block text-sm font-medium text-slate-700">
                UF
                <select
                  value={experience.state}
                  onChange={(event) =>
                    onUpdate(experience.id, 'state', event.target.value)
                  }
                  className={selectClass}
                >
                  <option value="">UF</option>
                  {brazilianStates.map((state) => (
                    <option key={state} value={state}>
                      {state}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <div className="mt-5 grid gap-6 lg:grid-cols-2">
              <div>
                <span className="block text-sm font-medium text-slate-700">Início</span>
                <div className="mt-2 grid grid-cols-2 gap-3">
                  <select
                    value={experience.startMonth}
                    onChange={(event) =>
                      onUpdate(experience.id, 'startMonth', event.target.value)
                    }
                    className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10"
                  >
                    <option value="">Mês</option>
                    {months.map((month, monthIndex) => (
                      <option key={month} value={String(monthIndex + 1)}>
                        {month}
                      </option>
                    ))}
                  </select>
                  <input
                    type="text"
                    inputMode="numeric"
                    maxLength={4}
                    value={experience.startYear}
                    onChange={(event) =>
                      onUpdate(
                        experience.id,
                        'startYear',
                        event.target.value.replace(/\D/g, ''),
                      )
                    }
                    placeholder="Ano"
                    className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none transition placeholder:text-slate-400 focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between gap-3">
                  <span className="block text-sm font-medium text-slate-700">Término</span>
                  <label className="flex items-center gap-2 text-xs font-medium text-slate-600">
                    <input
                      type="checkbox"
                      checked={experience.current}
                      onChange={(event) =>
                        onUpdate(experience.id, 'current', event.target.checked)
                      }
                      className="h-4 w-4 rounded border-slate-300"
                    />
                    Emprego atual
                  </label>
                </div>
                <div className="mt-2 grid grid-cols-2 gap-3">
                  <select
                    value={experience.endMonth}
                    disabled={experience.current}
                    onChange={(event) =>
                      onUpdate(experience.id, 'endMonth', event.target.value)
                    }
                    className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none transition disabled:bg-slate-100 disabled:text-slate-400 focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10"
                  >
                    <option value="">Mês</option>
                    {months.map((month, monthIndex) => (
                      <option key={month} value={String(monthIndex + 1)}>
                        {month}
                      </option>
                    ))}
                  </select>
                  <input
                    type="text"
                    inputMode="numeric"
                    maxLength={4}
                    disabled={experience.current}
                    value={experience.endYear}
                    onChange={(event) =>
                      onUpdate(
                        experience.id,
                        'endYear',
                        event.target.value.replace(/\D/g, ''),
                      )
                    }
                    placeholder={experience.current ? 'Atual' : 'Ano'}
                    className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none transition placeholder:text-slate-400 disabled:bg-slate-100 disabled:text-slate-400 focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10"
                  />
                </div>
              </div>
            </div>

            <label className="mt-5 block text-sm font-medium text-slate-700">
              Atividades e resultados
              <textarea
                value={experience.description}
                onChange={(event) =>
                  onUpdate(experience.id, 'description', event.target.value)
                }
                rows={4}
                maxLength={900}
                placeholder="Descreva responsabilidades, atividades e resultados relevantes."
                className="mt-2 w-full resize-y rounded-lg border border-slate-300 bg-white px-3 py-3 text-sm leading-6 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10"
              />
              <span className="mt-1 block text-right text-xs text-slate-400">
                {experience.description.length}/900
              </span>
            </label>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ExperienceForm
