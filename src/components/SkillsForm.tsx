import { useState } from 'react'
import {
  professionalProfiles,
  professionalSkillSuggestions,
} from '../data/resumeData'
import type { ProfessionalArea } from '../data/resumeData'
import type { Skill } from '../types/resume'

type SkillsFormProps = {
  skills: Skill[]
  professionalArea: ProfessionalArea
  onAdd: (name: string) => void
  onRemove: (id: number) => void
}

function SkillsForm({
  skills,
  professionalArea,
  onAdd,
  onRemove,
}: SkillsFormProps) {
  const [draft, setDraft] = useState('')

  const submitSkill = () => {
    const skill = draft.trim()
    if (!skill) return
    onAdd(skill)
    setDraft('')
  }

  const suggestions = professionalArea
    ? professionalSkillSuggestions[professionalArea]
    : []

  const selectedSkillNames = new Set(
    skills.map((skill) => skill.name.trim().toLocaleLowerCase('pt-BR')),
  )

  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-6">
        <h3 className="text-xl font-bold">Habilidades e competências</h3>
        <p className="mt-1 text-sm leading-6 text-slate-500">
          Adicione competências profissionais objetivas e relevantes para a vaga desejada.
        </p>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 sm:p-6">
        <label className="block text-sm font-medium text-slate-700">
          Nova habilidade
          <div className="mt-2 flex flex-col gap-2 sm:flex-row">
            <input
              type="text"
              value={draft}
              maxLength={80}
              onChange={(event) => setDraft(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === 'Enter') {
                  event.preventDefault()
                  submitSkill()
                }
              }}
              placeholder="Ex.: Atendimento ao cliente"
              className="min-w-0 flex-1 rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10"
            />
            <button
              type="button"
              onClick={submitSkill}
              className="rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-700"
            >
              Adicionar
            </button>
          </div>
        </label>

        {professionalArea && suggestions.length > 0 && (
          <div className="mt-6 border-t border-slate-200 pt-5">
            <div className="mb-3">
              <h4 className="text-sm font-semibold text-slate-900">
                Sugestões para {professionalProfiles[professionalArea].label}
              </h4>
              <p className="mt-1 text-xs leading-5 text-slate-500">
                Clique em + para adicionar competências coerentes com o objetivo profissional selecionado.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              {suggestions.map((suggestion) => {
                const selected = selectedSkillNames.has(
                  suggestion.trim().toLocaleLowerCase('pt-BR'),
                )

                return (
                  <button
                    key={suggestion}
                    type="button"
                    onClick={() => !selected && onAdd(suggestion)}
                    disabled={selected}
                    className={`inline-flex items-center gap-2 rounded-full border px-3 py-2 text-sm transition ${
                      selected
                        ? 'cursor-default border-emerald-200 bg-emerald-50 text-emerald-700'
                        : 'border-slate-300 bg-white text-slate-700 hover:border-slate-900 hover:bg-slate-900 hover:text-white'
                    }`}
                  >
                    <span className="font-semibold">{selected ? '✓' : '+'}</span>
                    <span>{suggestion}</span>
                  </button>
                )
              })}
            </div>
          </div>
        )}

        <div className="mt-5 flex flex-wrap gap-2">
          {skills.length > 0 ? (
            skills.map((skill) => (
              <span
                key={skill.id}
                className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700"
              >
                {skill.name}
                <button
                  type="button"
                  onClick={() => onRemove(skill.id)}
                  className="flex h-5 w-5 items-center justify-center rounded-full text-base leading-none text-slate-400 transition hover:bg-slate-100 hover:text-red-600"
                  aria-label={`Remover ${skill.name}`}
                >
                  ×
                </button>
              </span>
            ))
          ) : (
            <p className="text-sm text-slate-400">
              Nenhuma habilidade adicionada ainda.
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

export default SkillsForm
