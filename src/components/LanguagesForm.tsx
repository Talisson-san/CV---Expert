import { languageLevelLabels } from '../data/resumeData'
import type { Language, LanguageLevel } from '../types/resume'

type LanguagesFormProps = {
  languages: Language[]
  onAdd: () => void
  onRemove: (id: number) => void
  onUpdate: (
    id: number,
    field: keyof Language,
    value: string,
  ) => void
}

function LanguagesForm({
  languages,
  onAdd,
  onRemove,
  onUpdate,
}: LanguagesFormProps) {
  const inputClass =
    'mt-2 w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10'

  return (
    <div>
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h3 className="text-xl font-bold">Idiomas</h3>
          <p className="mt-1 max-w-2xl text-sm leading-6 text-slate-500">
            Informe os idiomas que você domina e o nível de proficiência.
          </p>
        </div>
        <button
          type="button"
          onClick={onAdd}
          className="rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-700"
        >
          + Adicionar idioma
        </button>
      </div>

      <div className="space-y-4">
        {languages.map((language, index) => (
          <div
            key={language.id}
            className="grid gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-5 sm:grid-cols-[1fr_220px_auto] sm:items-end"
          >
            <label className="block text-sm font-medium text-slate-700">
              Idioma {index + 1}
              <input
                type="text"
                value={language.name}
                onChange={(event) =>
                  onUpdate(language.id, 'name', event.target.value)
                }
                placeholder="Ex.: Inglês"
                className={inputClass}
              />
            </label>

            <label className="block text-sm font-medium text-slate-700">
              Nível
              <select
                value={language.level}
                onChange={(event) =>
                  onUpdate(
                    language.id,
                    'level',
                    event.target.value as LanguageLevel,
                  )
                }
                className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10"
              >
                {Object.entries(languageLevelLabels).map(([value, label]) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
            </label>

            {languages.length > 1 && (
              <button
                type="button"
                onClick={() => onRemove(language.id)}
                className="h-[42px] rounded-lg border border-red-200 bg-white px-3 text-xs font-semibold text-red-600 transition hover:bg-red-50"
              >
                Remover
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default LanguagesForm
