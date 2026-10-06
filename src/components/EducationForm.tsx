import {
  brazilianStates,
  educationTypes,
  months,
} from '../data/resumeData'

import type { Education } from '../types/resume'

type EducationFormProps = {
  educationList: Education[]
  onAdd: () => void
  onRemove: (id: number) => void
  onUpdate: (
    id: number,
    field: keyof Education,
    value: string,
  ) => void
}

function EducationForm({
  educationList,
  onAdd,
  onRemove,
  onUpdate,
}: EducationFormProps) {
  const inputClass =
    'mt-2 w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10'

  const selectClass =
    'mt-2 w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10'

  return (
    <div>
      <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h3 className="text-xl font-bold">
            Formação acadêmica
          </h3>

          <p className="mt-1 max-w-2xl text-sm leading-6 text-slate-500">
            Adicione sua formação escolar, técnica,
            universitária ou complementar.
          </p>
        </div>

        <button
          type="button"
          onClick={onAdd}
          className="rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-700"
        >
          + Adicionar formação
        </button>
      </div>

      <div className="space-y-6">
        {educationList.map(
          (education, index) => {
            const isStudying = education.status === 'andamento'

            return (
              <div
                key={education.id}
                className="rounded-2xl border border-slate-200 bg-slate-50 p-5 sm:p-6"
              >
                <div className="mb-5 flex items-center justify-between gap-4">
                  <span className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">
                    Formação {index + 1}
                  </span>

                  {educationList.length > 1 && (
                    <button
                      type="button"
                      onClick={() =>
                        onRemove(education.id)
                      }
                      className="rounded-lg border border-red-200 bg-white px-3 py-2 text-xs font-semibold text-red-600 transition hover:bg-red-50"
                    >
                      Remover
                    </button>
                  )}
                </div>

                <div className="grid gap-5 sm:grid-cols-[minmax(0,1fr)_220px] sm:items-end">
                  <label className="block text-sm font-medium text-slate-700">
                    Tipo de formação

                    <select
                      value={education.type}
                      onChange={(event) =>
                        onUpdate(
                          education.id,
                          'type',
                          event.target.value,
                        )
                      }
                      className={selectClass}
                    >
                      <option value="">
                        Selecione
                      </option>

                      {educationTypes.map(
                        (type) => (
                          <option
                            key={type}
                            value={type}
                          >
                            {type}
                          </option>
                        ),
                      )}
                    </select>
                  </label>

                  <label className="flex min-h-[42px] cursor-pointer items-center gap-3 rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:border-slate-400">
                    <input
                      type="checkbox"
                      checked={isStudying}
                      onChange={(event) =>
                        onUpdate(
                          education.id,
                          'status',
                          event.target.checked
                            ? 'andamento'
                            : 'concluido',
                        )
                      }
                      className="h-4 w-4 accent-slate-900"
                    />

                    <span>Cursando</span>
                  </label>
                </div>

                <div className="mt-5 grid gap-5 sm:grid-cols-2">
                  <label className="block text-sm font-medium text-slate-700">
                    Curso / formação

                    <input
                      type="text"
                      value={education.course}
                      onChange={(event) =>
                        onUpdate(
                          education.id,
                          'course',
                          event.target.value,
                        )
                      }
                      placeholder="Ex.: Administração Pública"
                      spellCheck={false}
                      className={inputClass}
                    />
                  </label>

                  <label className="block text-sm font-medium text-slate-700">
                    Instituição

                    <input
                      type="text"
                      value={education.institution}
                      onChange={(event) =>
                        onUpdate(
                          education.id,
                          'institution',
                          event.target.value,
                        )
                      }
                      placeholder="Ex.: Universidade Federal de Lavras"
                      spellCheck={false}
                      className={inputClass}
                    />
                  </label>
                </div>

                <div className="mt-5 grid gap-5 sm:grid-cols-[1fr_140px]">
                  <label className="block text-sm font-medium text-slate-700">
                    Cidade

                    <input
                      type="text"
                      value={education.city}
                      onChange={(event) =>
                        onUpdate(
                          education.id,
                          'city',
                          event.target.value,
                        )
                      }
                      placeholder="Ex.: Lavras"
                      spellCheck={false}
                      className={inputClass}
                    />
                  </label>

                  <label className="block text-sm font-medium text-slate-700">
                    UF

                    <select
                      value={education.state}
                      onChange={(event) =>
                        onUpdate(
                          education.id,
                          'state',
                          event.target.value,
                        )
                      }
                      className={selectClass}
                    >
                      <option value="">
                        UF
                      </option>

                      {brazilianStates.map(
                        (state) => (
                          <option
                            key={state}
                            value={state}
                          >
                            {state}
                          </option>
                        ),
                      )}
                    </select>
                  </label>
                </div>

                <div
                  className={`mt-5 grid gap-6 ${
                    isStudying ? '' : 'lg:grid-cols-2'
                  }`}
                >
                  <div>
                    <span className="block text-sm font-medium text-slate-700">
                      Início
                    </span>

                    <div className="mt-2 grid grid-cols-2 gap-3">
                      <select
                        value={education.startMonth}
                        onChange={(event) =>
                          onUpdate(
                            education.id,
                            'startMonth',
                            event.target.value,
                          )
                        }
                        className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10"
                      >
                        <option value="">Mês</option>

                        {months.map((month, monthIndex) => (
                          <option
                            key={month}
                            value={String(monthIndex + 1)}
                          >
                            {month}
                          </option>
                        ))}
                      </select>

                      <input
                        type="text"
                        inputMode="numeric"
                        maxLength={4}
                        value={education.startYear}
                        onChange={(event) =>
                          onUpdate(
                            education.id,
                            'startYear',
                            event.target.value.replace(/\D/g, ''),
                          )
                        }
                        placeholder="Ano"
                        spellCheck={false}
                        className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none transition placeholder:text-slate-400 focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10"
                      />
                    </div>
                  </div>

                  {!isStudying && (
                    <div>
                      <span className="block text-sm font-medium text-slate-700">
                        Conclusão
                      </span>

                      <div className="mt-2 grid grid-cols-2 gap-3">
                        <input
                          type="text"
                          inputMode="numeric"
                          maxLength={2}
                          value={education.endMonth}
                          onChange={(event) =>
                            onUpdate(
                              education.id,
                              'endMonth',
                              event.target.value.replace(/\D/g, '').slice(0, 2),
                            )
                          }
                          placeholder="Mês"
                          spellCheck={false}
                          className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none transition placeholder:text-slate-400 focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10"
                        />

                        <input
                          type="text"
                          inputMode="numeric"
                          maxLength={4}
                          value={education.endYear}
                          onChange={(event) =>
                            onUpdate(
                              education.id,
                              'endYear',
                              event.target.value.replace(/\D/g, ''),
                            )
                          }
                          placeholder="Ano"
                          spellCheck={false}
                          className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none transition placeholder:text-slate-400 focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )
          },
        )}
      </div>
    </div>
  )
}

export default EducationForm
