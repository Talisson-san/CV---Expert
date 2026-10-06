import type { Qualification } from '../types/resume'

type QualificationsFormProps = {
  qualificationList: Qualification[]
  onAdd: () => void
  onRemove: (id: number) => void
  onUpdate: (
    id: number,
    field: keyof Qualification,
    value: string,
  ) => void
}

function QualificationsForm({
  qualificationList,
  onAdd,
  onRemove,
  onUpdate,
}: QualificationsFormProps) {
  const inputClass =
    'mt-2 w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10'

  return (
    <div>
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h3 className="text-xl font-bold">Qualificações</h3>
          <p className="mt-1 max-w-2xl text-sm leading-6 text-slate-500">
            Inclua cursos, certificações, treinamentos e formações complementares relevantes.
          </p>
        </div>
        <button
          type="button"
          onClick={onAdd}
          className="rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-700"
        >
          + Adicionar qualificação
        </button>
      </div>

      <div className="space-y-5">
        {qualificationList.map((qualification, index) => (
          <div
            key={qualification.id}
            className="rounded-2xl border border-slate-200 bg-slate-50 p-5 sm:p-6"
          >
            <div className="mb-5 flex items-center justify-between gap-4">
              <span className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">
                Qualificação {index + 1}
              </span>
              {qualificationList.length > 1 && (
                <button
                  type="button"
                  onClick={() => onRemove(qualification.id)}
                  className="rounded-lg border border-red-200 bg-white px-3 py-2 text-xs font-semibold text-red-600 transition hover:bg-red-50"
                >
                  Remover
                </button>
              )}
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <label className="block text-sm font-medium text-slate-700">
                Curso / certificação
                <input
                  type="text"
                  value={qualification.title}
                  onChange={(event) =>
                    onUpdate(qualification.id, 'title', event.target.value)
                  }
                  placeholder="Ex.: Excel intermediário"
                  className={inputClass}
                />
              </label>
              <label className="block text-sm font-medium text-slate-700">
                Instituição
                <input
                  type="text"
                  value={qualification.institution}
                  onChange={(event) =>
                    onUpdate(qualification.id, 'institution', event.target.value)
                  }
                  placeholder="Ex.: SENAC"
                  className={inputClass}
                />
              </label>
            </div>

            <div className="mt-5 grid gap-5 sm:grid-cols-2">
              <label className="block text-sm font-medium text-slate-700">
                Ano
                <input
                  type="text"
                  inputMode="numeric"
                  maxLength={4}
                  value={qualification.year}
                  onChange={(event) =>
                    onUpdate(
                      qualification.id,
                      'year',
                      event.target.value.replace(/\D/g, ''),
                    )
                  }
                  placeholder="Ex.: 2026"
                  className={inputClass}
                />
              </label>
              <label className="block text-sm font-medium text-slate-700">
                Carga horária <span className="font-normal text-slate-400">(opcional)</span>
                <input
                  type="text"
                  value={qualification.workload}
                  onChange={(event) =>
                    onUpdate(qualification.id, 'workload', event.target.value)
                  }
                  placeholder="Ex.: 40 horas"
                  className={inputClass}
                />
              </label>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default QualificationsForm
