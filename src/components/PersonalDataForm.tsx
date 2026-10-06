import { months } from '../data/resumeData'

import type { PersonalData } from '../types/resume'

type PersonalDataFormProps = {
  personalData: PersonalData
  onChange: (
    field: keyof PersonalData,
    value: string,
  ) => void
}

function PersonalDataForm({
  personalData,
  onChange,
}: PersonalDataFormProps) {
  const inputClass =
    'mt-2 w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10'

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

  return (
    <div className="mx-auto max-w-2xl">
      <div className="mb-7">
        <h3 className="text-xl font-bold">
          Dados pessoais
        </h3>

        <p className="mt-1 text-sm leading-6 text-slate-500">
          Informe os dados que serão exibidos no cabeçalho
          do currículo.
        </p>
      </div>

      <div className="space-y-5">
        <label className="block text-sm font-medium text-slate-700">
          Nome completo

          <input
            type="text"
            value={personalData.name}
            onChange={(event) =>
              onChange('name', event.target.value)
            }
            placeholder="Digite seu nome completo"
            spellCheck={false}
            autoCorrect="off"
            autoCapitalize="off"
            autoComplete="off"
            className={inputClass}
          />
        </label>

        <div className="grid gap-5 sm:grid-cols-2">
          <label className="block text-sm font-medium text-slate-700">
            Telefone

            <input
              type="tel"
              value={personalData.phone}
              onChange={(event) =>
                onChange('phone', event.target.value)
              }
              placeholder="(00) 00000-0000"
              spellCheck={false}
              autoCorrect="off"
              className={inputClass}
            />
          </label>

          <label className="block text-sm font-medium text-slate-700">
            E-mail

            <input
              type="email"
              value={personalData.email}
              onChange={(event) =>
                onChange('email', event.target.value)
              }
              placeholder="seuemail@exemplo.com"
              spellCheck={false}
              autoCorrect="off"
              autoCapitalize="off"
              className={inputClass}
            />
          </label>
        </div>

        <div className="grid gap-5 sm:grid-cols-[minmax(0,1fr)_160px]">
          <label className="block text-sm font-medium text-slate-700">
            Endereço

            <input
              type="text"
              value={personalData.address}
              onChange={(event) =>
                onChange('address', event.target.value)
              }
              placeholder="Rua, avenida, bairro ou cidade"
              spellCheck={false}
              autoCorrect="off"
              className={inputClass}
            />
          </label>

          <label className="block text-sm font-medium text-slate-700">
            Número <span className="font-normal text-slate-400">(opcional)</span>

            <input
              type="text"
              value={personalData.houseNumber}
              maxLength={12}
              onChange={(event) =>
                onChange('houseNumber', event.target.value)
              }
              placeholder="850 ou S/N"
              spellCheck={false}
              autoCorrect="off"
              className={inputClass}
            />
          </label>
        </div>

        <div>
          <span className="block text-sm font-medium text-slate-700">
            Data de nascimento
          </span>

          <div className="mt-2 grid grid-cols-[1fr_1.2fr_1.4fr] gap-3">
            <label>
              <span className="sr-only">
                Dia
              </span>

              <select
                value={personalData.birthDay}
                onChange={(event) =>
                  onChange(
                    'birthDay',
                    event.target.value,
                  )
                }
                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10"
              >
                <option value="">
                  Dia
                </option>

                {Array.from(
                  { length: 31 },
                  (_, index) => {
                    const day = String(
                      index + 1,
                    ).padStart(2, '0')

                    return (
                      <option
                        key={day}
                        value={day}
                      >
                        {day}
                      </option>
                    )
                  },
                )}
              </select>
            </label>

            <label>
              <span className="sr-only">
                Mês
              </span>

              <select
                value={personalData.birthMonth}
                onChange={(event) =>
                  onChange(
                    'birthMonth',
                    event.target.value,
                  )
                }
                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10"
              >
                <option value="">
                  Mês
                </option>

                {months.map(
                  (month, index) => (
                    <option
                      key={month}
                      value={String(index + 1)}
                    >
                      {month}
                    </option>
                  ),
                )}
              </select>
            </label>

            <label>
              <span className="sr-only">
                Ano
              </span>

              <input
                type="text"
                inputMode="numeric"
                maxLength={4}
                value={personalData.birthYear}
                onChange={(event) =>
                  onChange(
                    'birthYear',
                    event.target.value.replace(
                      /\D/g,
                      '',
                    ),
                  )
                }
                placeholder="Ano"
                spellCheck={false}
                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none transition placeholder:text-slate-400 focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10"
              />
            </label>
          </div>

          {dateComplete && (
            <p className="mt-2 text-xs text-slate-400">
              Será exibido como:{' '}
              {formattedBirthDate}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

export default PersonalDataForm