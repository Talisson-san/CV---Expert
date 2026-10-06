import { useState } from 'react'

type PersonalData = {
  name: string
  phone: string
  email: string
  address: string
  birthDay: string
  birthMonth: string
  birthYear: string
}

type EducationStatus =
  | 'concluido'
  | 'andamento'
  | 'trancado'

type Education = {
  id: number
  type: string
  course: string
  institution: string
  city: string
  state: string
  status: EducationStatus
  startMonth: string
  startYear: string
  endMonth: string
  endYear: string
}

const sections = [
  'Dados pessoais',
  'Objetivo profissional',
  'Formação acadêmica',
  'Experiência profissional',
  'Qualificações',
  'Habilidades e competências',
  'Idiomas',
]

const months = [
  'Jan',
  'Fev',
  'Mar',
  'Abr',
  'Mai',
  'Jun',
  'Jul',
  'Ago',
  'Set',
  'Out',
  'Nov',
  'Dez',
]

const brazilianStates = [
  'AC',
  'AL',
  'AP',
  'AM',
  'BA',
  'CE',
  'DF',
  'ES',
  'GO',
  'MA',
  'MT',
  'MS',
  'MG',
  'PA',
  'PB',
  'PR',
  'PE',
  'PI',
  'RJ',
  'RN',
  'RS',
  'RO',
  'RR',
  'SC',
  'SP',
  'SE',
  'TO',
]

const educationTypes = [
  'Ensino Fundamental',
  'Ensino Médio',
  'Curso Técnico',
  'Graduação',
  'Pós-graduação',
  'Curso complementar',
  'Outro',
]

const educationStatusLabels: Record<
  EducationStatus,
  string
> = {
  concluido: 'Concluído',
  andamento: 'Em andamento',
  trancado: 'Trancado',
}

const professionalProfiles = {
  'primeiro-emprego': {
    label: 'Primeiro emprego',
    objectives: [
      'Busco minha primeira oportunidade profissional, com disposição para aprender, desenvolver novas habilidades e contribuir com responsabilidade e dedicação para os resultados da empresa.',
      'Procuro uma oportunidade para ingressar no mercado de trabalho, colocando em prática minhas habilidades, adquirindo experiência profissional e contribuindo de forma positiva com a equipe.',
      'Busco meu primeiro emprego em uma empresa onde possa aprender, crescer profissionalmente e contribuir com comprometimento, organização e vontade de evoluir.',
    ],
  },

  atendimento: {
    label: 'Atendimento ao cliente',
    objectives: [
      'Atuar na área de atendimento ao cliente, contribuindo com comunicação clara, cordialidade e organização para proporcionar uma experiência positiva ao público.',
      'Busco uma oportunidade na área de atendimento, onde possa aplicar minhas habilidades de comunicação, organização e relacionamento com o público, contribuindo para a satisfação dos clientes.',
      'Atuar no atendimento ao público, oferecendo suporte eficiente e cordial, com foco na resolução de necessidades e na qualidade do relacionamento com os clientes.',
    ],
  },

  vendas: {
    label: 'Vendas',
    objectives: [
      'Atuar na área de vendas, contribuindo com atendimento de qualidade, identificação das necessidades dos clientes e alcance das metas comerciais da empresa.',
      'Busco oportunidade na área comercial para desenvolver minhas habilidades de negociação, atendimento e relacionamento com clientes, contribuindo para o crescimento das vendas.',
      'Atuar com vendas e atendimento ao cliente, buscando oferecer soluções adequadas, fortalecer o relacionamento com o público e contribuir para os resultados da empresa.',
    ],
  },

  administrativo: {
    label: 'Administrativo',
    objectives: [
      'Atuar na área administrativa, contribuindo com organização, controle de informações e suporte às rotinas internas da empresa.',
      'Busco oportunidade na área administrativa para aplicar minhas habilidades de organização, comunicação e execução de tarefas, contribuindo para a eficiência dos processos da empresa.',
      'Desenvolver atividades administrativas com responsabilidade, organização e atenção aos detalhes, colaborando com a equipe e com o bom funcionamento dos processos internos.',
    ],
  },

  farmacia: {
    label: 'Farmácia',
    objectives: [
      'Atuar na área de Farmácia, aplicando os conhecimentos adquiridos em minha formação e contribuindo com atendimento de qualidade, organização e responsabilidade.',
      'Busco oportunidade na área farmacêutica para desenvolver minhas competências profissionais, colaborar com as rotinas do setor e contribuir para um atendimento seguro e eficiente.',
      'Atuar na área de Farmácia, contribuindo para o atendimento ao cliente, organização dos processos e cumprimento das boas práticas relacionadas ao setor.',
    ],
  },

  enfermagem: {
    label: 'Enfermagem',
    objectives: [
      'Atuar na área de Enfermagem, prestando assistência responsável e humanizada, com atenção à segurança, ao bem-estar e às necessidades dos pacientes.',
      'Busco oportunidade na área de Enfermagem para aplicar meus conhecimentos técnicos, desenvolver experiência profissional e contribuir para a qualidade da assistência aos pacientes.',
      'Exercer atividades na área de Enfermagem com ética, responsabilidade e atenção aos protocolos, colaborando com a equipe e com a qualidade do atendimento.',
    ],
  },

  marketing: {
    label: 'Marketing e comunicação',
    objectives: [
      'Atuar na área de marketing e comunicação, contribuindo com criatividade, planejamento e desenvolvimento de ações voltadas ao fortalecimento da marca e ao relacionamento com o público.',
      'Busco oportunidade na área de marketing, onde possa aplicar conhecimentos em comunicação, criação de conteúdo e estratégias digitais, contribuindo para os resultados da empresa.',
      'Desenvolver atividades de marketing e comunicação com foco em planejamento, produção de conteúdo, presença digital e construção de relacionamento entre marca e público.',
    ],
  },

  tecnologia: {
    label: 'Tecnologia / Desenvolvimento',
    objectives: [
      'Atuar na área de tecnologia e desenvolvimento, aplicando conhecimentos técnicos na criação de soluções eficientes e buscando evolução profissional contínua.',
      'Busco oportunidade na área de tecnologia para desenvolver soluções, aprimorar minhas competências técnicas e contribuir para projetos e processos da empresa.',
      'Atuar com desenvolvimento de sistemas e soluções digitais, contribuindo com organização, raciocínio lógico, aprendizado contínuo e qualidade técnica.',
    ],
  },

  logistica: {
    label: 'Logística / Estoque',
    objectives: [
      'Atuar na área de logística e estoque, contribuindo com organização, controle de mercadorias e eficiência dos processos de recebimento, armazenamento e distribuição.',
      'Busco oportunidade na área de logística para aplicar minhas habilidades de organização, atenção aos detalhes e controle de materiais, contribuindo para o bom funcionamento das operações.',
      'Desenvolver atividades relacionadas a estoque e logística com responsabilidade, organização e atenção aos processos de entrada, armazenamento e saída de produtos.',
    ],
  },

  servicos: {
    label: 'Serviços gerais',
    objectives: [
      'Atuar na área de serviços gerais, contribuindo com organização, responsabilidade e dedicação para a manutenção adequada do ambiente de trabalho.',
      'Busco oportunidade na área de serviços gerais, realizando as atividades com comprometimento, atenção e respeito às normas e rotinas da empresa.',
      'Desenvolver atividades de apoio e serviços gerais com responsabilidade, organização e disposição para colaborar com as necessidades da equipe e da empresa.',
    ],
  },

  outro: {
    label: 'Outro / Personalizado',
    objectives: [],
  },
} as const

type ProfessionalArea =
  | keyof typeof professionalProfiles
  | ''

function App() {
  const [activeSection, setActiveSection] = useState(0)
  const [previewOpen, setPreviewOpen] = useState(false)

  const [personalData, setPersonalData] =
    useState<PersonalData>({
      name: '',
      phone: '',
      email: '',
      address: '',
      birthDay: '',
      birthMonth: '',
      birthYear: '',
    })

  const [professionalArea, setProfessionalArea] =
    useState<ProfessionalArea>('')

  const [
    professionalObjective,
    setProfessionalObjective,
  ] = useState('')

  const [educationList, setEducationList] = useState<
    Education[]
  >([
    {
      id: 1,
      type: '',
      course: '',
      institution: '',
      city: '',
      state: '',
      status: 'andamento',
      startMonth: '',
      startYear: '',
      endMonth: '',
      endYear: '',
    },
  ])

  const updatePersonalData = (
    field: keyof PersonalData,
    value: string,
  ) => {
    setPersonalData((current) => ({
      ...current,
      [field]: value,
    }))
  }

  const updateEducation = (
    id: number,
    field: keyof Education,
    value: string,
  ) => {
    setEducationList((current) =>
      current.map((education) =>
        education.id === id
          ? {
              ...education,
              [field]: value,
            }
          : education,
      ),
    )
  }

  const addEducation = () => {
    setEducationList((current) => [
      ...current,
      {
        id: Date.now(),
        type: '',
        course: '',
        institution: '',
        city: '',
        state: '',
        status: 'andamento',
        startMonth: '',
        startYear: '',
        endMonth: '',
        endYear: '',
      },
    ])
  }

  const removeEducation = (id: number) => {
    setEducationList((current) =>
      current.filter(
        (education) => education.id !== id,
      ),
    )
  }

  const inputClass =
    'mt-2 w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10'

  const selectClass =
    'mt-2 w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10'

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

  const selectedProfile = professionalArea
    ? professionalProfiles[professionalArea]
    : null

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

    if (start && education.status === 'andamento') {
      return `${start} - Atual`
    }

    return start || end
  }

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white">
        <div className="mx-auto flex h-16 max-w-[1600px] items-center justify-between px-5 sm:px-8">
          <div>
            <h1 className="text-xl font-bold tracking-tight">
              CV Expert
            </h1>

            <p className="text-xs text-slate-500">
              Crie seu currículo profissional
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() =>
                setPreviewOpen(true)
              }
              className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              Visualizar currículo
            </button>

            <button
              type="button"
              className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-700"
            >
              Exportar PDF
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        <section className="mb-6">
          <span className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
            Editor
          </span>

          <h2 className="mt-1 text-2xl font-bold tracking-tight">
            Monte seu currículo
          </h2>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
            Preencha cada seção. As informações são
            atualizadas automaticamente no currículo.
          </p>
        </section>

        <nav className="mb-6 grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-4">
          {sections.map(
            (section, index) => (
              <button
                key={section}
                type="button"
                onClick={() =>
                  setActiveSection(index)
                }
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
            ),
          )}
        </nav>

        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8">
          {activeSection === 0 ? (
            <div className="mx-auto max-w-2xl">
              <div className="mb-7">
                <h3 className="text-xl font-bold">
                  Dados pessoais
                </h3>

                <p className="mt-1 text-sm leading-6 text-slate-500">
                  Informe os dados que serão
                  exibidos no cabeçalho do
                  currículo.
                </p>
              </div>

              <div className="space-y-5">
                <label className="block text-sm font-medium text-slate-700">
                  Nome completo

                  <input
                    type="text"
                    value={
                      personalData.name
                    }
                    onChange={(event) =>
                      updatePersonalData(
                        'name',
                        event.target.value,
                      )
                    }
                    placeholder="Digite seu nome completo"
                    spellCheck={false}
                    autoCorrect="off"
                    autoCapitalize="off"
                    autoComplete="off"
                    className={
                      inputClass
                    }
                  />
                </label>

                <div className="grid gap-5 sm:grid-cols-2">
                  <label className="block text-sm font-medium text-slate-700">
                    Telefone

                    <input
                      type="tel"
                      value={
                        personalData.phone
                      }
                      onChange={(event) =>
                        updatePersonalData(
                          'phone',
                          event.target.value,
                        )
                      }
                      placeholder="(00) 00000-0000"
                      spellCheck={false}
                      autoCorrect="off"
                      className={
                        inputClass
                      }
                    />
                  </label>

                  <label className="block text-sm font-medium text-slate-700">
                    E-mail

                    <input
                      type="email"
                      value={
                        personalData.email
                      }
                      onChange={(event) =>
                        updatePersonalData(
                          'email',
                          event.target.value,
                        )
                      }
                      placeholder="seuemail@exemplo.com"
                      spellCheck={false}
                      autoCorrect="off"
                      autoCapitalize="off"
                      className={
                        inputClass
                      }
                    />
                  </label>
                </div>

                <label className="block text-sm font-medium text-slate-700">
                  Endereço

                  <input
                    type="text"
                    value={
                      personalData.address
                    }
                    onChange={(event) =>
                      updatePersonalData(
                        'address',
                        event.target.value,
                      )
                    }
                    placeholder="Cidade, Estado ou endereço"
                    spellCheck={false}
                    autoCorrect="off"
                    className={
                      inputClass
                    }
                  />
                </label>

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
                        value={
                          personalData.birthDay
                        }
                        onChange={(
                          event,
                        ) =>
                          updatePersonalData(
                            'birthDay',
                            event.target
                              .value,
                          )
                        }
                        className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10"
                      >
                        <option value="">
                          Dia
                        </option>

                        {Array.from(
                          {
                            length: 31,
                          },
                          (
                            _,
                            index,
                          ) => {
                            const day =
                              String(
                                index +
                                  1,
                              ).padStart(
                                2,
                                '0',
                              )

                            return (
                              <option
                                key={
                                  day
                                }
                                value={
                                  day
                                }
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
                        value={
                          personalData.birthMonth
                        }
                        onChange={(
                          event,
                        ) =>
                          updatePersonalData(
                            'birthMonth',
                            event.target
                              .value,
                          )
                        }
                        className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10"
                      >
                        <option value="">
                          Mês
                        </option>

                        {months.map(
                          (
                            month,
                            index,
                          ) => (
                            <option
                              key={
                                month
                              }
                              value={String(
                                index +
                                  1,
                              )}
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
                        value={
                          personalData.birthYear
                        }
                        onChange={(
                          event,
                        ) => {
                          const value =
                            event.target.value.replace(
                              /\D/g,
                              '',
                            )

                          updatePersonalData(
                            'birthYear',
                            value,
                          )
                        }}
                        placeholder="Ano"
                        spellCheck={
                          false
                        }
                        className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none transition placeholder:text-slate-400 focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10"
                      />
                    </label>
                  </div>

                  {dateComplete && (
                    <p className="mt-2 text-xs text-slate-400">
                      Será exibido
                      como:{' '}
                      {
                        formattedBirthDate
                      }
                    </p>
                  )}
                </div>
              </div>
            </div>
          ) : activeSection === 1 ? (
            <div>
              <div className="mb-7">
                <h3 className="text-xl font-bold">
                  Objetivo profissional
                </h3>

                <p className="mt-1 text-sm leading-6 text-slate-500">
                  Escolha o tipo de
                  oportunidade que procura
                  para receber sugestões
                  adequadas ao seu perfil.
                </p>
              </div>

              <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px]">
                <div className="min-w-0 space-y-7">
                  <div>
                    <label className="block text-sm font-medium text-slate-700">
                      Qual tipo de
                      oportunidade você
                      procura?

                      <select
                        value={
                          professionalArea
                        }
                        onChange={(
                          event,
                        ) =>
                          setProfessionalArea(
                            event.target
                              .value as ProfessionalArea,
                          )
                        }
                        className={
                          selectClass
                        }
                      >
                        <option value="">
                          Selecione uma
                          área
                        </option>

                        {Object.entries(
                          professionalProfiles,
                        ).map(
                          ([
                            key,
                            profile,
                          ]) => (
                            <option
                              key={
                                key
                              }
                              value={
                                key
                              }
                            >
                              {
                                profile.label
                              }
                            </option>
                          ),
                        )}
                      </select>
                    </label>
                  </div>

                  {professionalArea ===
                    'outro' && (
                    <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-4">
                      <p className="text-sm leading-6 text-slate-600">
                        Escreva livremente
                        seu objetivo
                        profissional no
                        campo abaixo.
                      </p>
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-medium text-slate-700">
                      Seu objetivo

                      <textarea
                        value={
                          professionalObjective
                        }
                        onChange={(
                          event,
                        ) =>
                          setProfessionalObjective(
                            event.target
                              .value,
                          )
                        }
                        maxLength={
                          600
                        }
                        rows={10}
                        placeholder="Escreva seu objetivo profissional ou escolha uma sugestão ao lado."
                        spellCheck={
                          false
                        }
                        className="mt-2 w-full resize-y rounded-lg border border-slate-300 bg-white px-3 py-3 text-sm leading-6 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10"
                      />
                    </label>

                    <div className="mt-2 flex justify-between text-xs text-slate-400">
                      <span>
                        Você pode editar
                        livremente o texto.
                      </span>

                      <span>
                        {
                          professionalObjective.length
                        }
                        /600
                      </span>
                    </div>
                  </div>
                </div>

                <aside className="min-w-0">
                  <div className="lg:sticky lg:top-24">
                    {selectedProfile &&
                    selectedProfile
                      .objectives.length >
                      0 ? (
                      <>
                        <div className="mb-3">
                          <h4 className="text-sm font-semibold text-slate-900">
                            Sugestões para{' '}
                            {
                              selectedProfile.label
                            }
                          </h4>

                          <p className="mt-1 text-xs leading-5 text-slate-500">
                            Clique em + para
                            usar uma sugestão
                            como ponto de
                            partida.
                          </p>
                        </div>

                        <div className="space-y-3">
                          {selectedProfile.objectives.map(
                            (
                              objective,
                            ) => (
                              <div
                                key={
                                  objective
                                }
                                className="rounded-xl border border-slate-200 bg-slate-50 p-4"
                              >
                                <div className="flex items-start gap-3">
                                  <button
                                    type="button"
                                    onClick={() =>
                                      setProfessionalObjective(
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
                                    {
                                      objective
                                    }
                                  </p>
                                </div>
                              </div>
                            ),
                          )}
                        </div>
                      </>
                    ) : professionalArea ===
                      'outro' ? (
                      <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-5">
                        <p className="text-sm leading-6 text-slate-500">
                          Nesta opção, o
                          objetivo é
                          totalmente
                          personalizado.
                        </p>
                      </div>
                    ) : (
                      <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-5">
                        <p className="text-sm leading-6 text-slate-500">
                          Selecione uma área
                          para visualizar
                          sugestões de
                          objetivo
                          profissional.
                        </p>
                      </div>
                    )}
                  </div>
                </aside>
              </div>
            </div>
          ) : activeSection === 2 ? (
            <div>
              <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <h3 className="text-xl font-bold">
                    Formação acadêmica
                  </h3>

                  <p className="mt-1 max-w-2xl text-sm leading-6 text-slate-500">
                    Adicione sua formação
                    escolar, técnica,
                    universitária ou
                    complementar.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={addEducation}
                  className="rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-700"
                >
                  + Adicionar formação
                </button>
              </div>

              <div className="space-y-6">
                {educationList.map(
                  (
                    education,
                    index,
                  ) => (
                    <div
                      key={
                        education.id
                      }
                      className="rounded-2xl border border-slate-200 bg-slate-50 p-5 sm:p-6"
                    >
                      <div className="mb-5 flex items-center justify-between gap-4">
                        <div>
                          <span className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">
                            Formação{' '}
                            {index +
                              1}
                          </span>
                        </div>

                        {educationList.length >
                          1 && (
                          <button
                            type="button"
                            onClick={() =>
                              removeEducation(
                                education.id,
                              )
                            }
                            className="rounded-lg border border-red-200 bg-white px-3 py-2 text-xs font-semibold text-red-600 transition hover:bg-red-50"
                          >
                            Remover
                          </button>
                        )}
                      </div>

                      <div className="grid gap-5 sm:grid-cols-2">
                        <label className="block text-sm font-medium text-slate-700">
                          Tipo de formação

                          <select
                            value={
                              education.type
                            }
                            onChange={(
                              event,
                            ) =>
                              updateEducation(
                                education.id,
                                'type',
                                event.target
                                  .value,
                              )
                            }
                            className={
                              selectClass
                            }
                          >
                            <option value="">
                              Selecione
                            </option>

                            {educationTypes.map(
                              (
                                type,
                              ) => (
                                <option
                                  key={
                                    type
                                  }
                                  value={
                                    type
                                  }
                                >
                                  {
                                    type
                                  }
                                </option>
                              ),
                            )}
                          </select>
                        </label>

                        <label className="block text-sm font-medium text-slate-700">
                          Situação

                          <select
                            value={
                              education.status
                            }
                            onChange={(
                              event,
                            ) =>
                              updateEducation(
                                education.id,
                                'status',
                                event.target
                                  .value,
                              )
                            }
                            className={
                              selectClass
                            }
                          >
                            <option value="andamento">
                              Em andamento
                            </option>

                            <option value="concluido">
                              Concluído
                            </option>

                            <option value="trancado">
                              Trancado
                            </option>
                          </select>
                        </label>
                      </div>

                      <div className="mt-5 grid gap-5 sm:grid-cols-2">
                        <label className="block text-sm font-medium text-slate-700">
                          Curso / formação

                          <input
                            type="text"
                            value={
                              education.course
                            }
                            onChange={(
                              event,
                            ) =>
                              updateEducation(
                                education.id,
                                'course',
                                event.target
                                  .value,
                              )
                            }
                            placeholder="Ex.: Administração Pública"
                            spellCheck={
                              false
                            }
                            className={
                              inputClass
                            }
                          />
                        </label>

                        <label className="block text-sm font-medium text-slate-700">
                          Instituição

                          <input
                            type="text"
                            value={
                              education.institution
                            }
                            onChange={(
                              event,
                            ) =>
                              updateEducation(
                                education.id,
                                'institution',
                                event.target
                                  .value,
                              )
                            }
                            placeholder="Ex.: Universidade Federal de Lavras"
                            spellCheck={
                              false
                            }
                            className={
                              inputClass
                            }
                          />
                        </label>
                      </div>

                      <div className="mt-5 grid gap-5 sm:grid-cols-[1fr_140px]">
                        <label className="block text-sm font-medium text-slate-700">
                          Cidade

                          <input
                            type="text"
                            value={
                              education.city
                            }
                            onChange={(
                              event,
                            ) =>
                              updateEducation(
                                education.id,
                                'city',
                                event.target
                                  .value,
                              )
                            }
                            placeholder="Ex.: Lavras"
                            spellCheck={
                              false
                            }
                            className={
                              inputClass
                            }
                          />
                        </label>

                        <label className="block text-sm font-medium text-slate-700">
                          UF

                          <select
                            value={
                              education.state
                            }
                            onChange={(
                              event,
                            ) =>
                              updateEducation(
                                education.id,
                                'state',
                                event.target
                                  .value,
                              )
                            }
                            className={
                              selectClass
                            }
                          >
                            <option value="">
                              UF
                            </option>

                            {brazilianStates.map(
                              (
                                state,
                              ) => (
                                <option
                                  key={
                                    state
                                  }
                                  value={
                                    state
                                  }
                                >
                                  {
                                    state
                                  }
                                </option>
                              ),
                            )}
                          </select>
                        </label>
                      </div>

                      <div className="mt-5 grid gap-6 lg:grid-cols-2">
                        <div>
                          <span className="block text-sm font-medium text-slate-700">
                            Início
                          </span>

                          <div className="mt-2 grid grid-cols-2 gap-3">
                            <select
                              value={
                                education.startMonth
                              }
                              onChange={(
                                event,
                              ) =>
                                updateEducation(
                                  education.id,
                                  'startMonth',
                                  event
                                    .target
                                    .value,
                                )
                              }
                              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10"
                            >
                              <option value="">
                                Mês
                              </option>

                              {months.map(
                                (
                                  month,
                                  index,
                                ) => (
                                  <option
                                    key={
                                      month
                                    }
                                    value={String(
                                      index +
                                        1,
                                    )}
                                  >
                                    {
                                      month
                                    }
                                  </option>
                                ),
                              )}
                            </select>

                            <input
                              type="text"
                              inputMode="numeric"
                              maxLength={
                                4
                              }
                              value={
                                education.startYear
                              }
                              onChange={(
                                event,
                              ) =>
                                updateEducation(
                                  education.id,
                                  'startYear',
                                  event.target.value.replace(
                                    /\D/g,
                                    '',
                                  ),
                                )
                              }
                              placeholder="Ano"
                              spellCheck={
                                false
                              }
                              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none transition placeholder:text-slate-400 focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10"
                            />
                          </div>
                        </div>

                        <div>
                          <span className="block text-sm font-medium text-slate-700">
                            {education.status ===
                            'andamento'
                              ? 'Previsão de conclusão'
                              : 'Conclusão'}
                          </span>

                          <div className="mt-2 grid grid-cols-2 gap-3">
                            <select
                              value={
                                education.endMonth
                              }
                              onChange={(
                                event,
                              ) =>
                                updateEducation(
                                  education.id,
                                  'endMonth',
                                  event
                                    .target
                                    .value,
                                )
                              }
                              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10"
                            >
                              <option value="">
                                Mês
                              </option>

                              {months.map(
                                (
                                  month,
                                  index,
                                ) => (
                                  <option
                                    key={
                                      month
                                    }
                                    value={String(
                                      index +
                                        1,
                                    )}
                                  >
                                    {
                                      month
                                    }
                                  </option>
                                ),
                              )}
                            </select>

                            <input
                              type="text"
                              inputMode="numeric"
                              maxLength={
                                4
                              }
                              value={
                                education.endYear
                              }
                              onChange={(
                                event,
                              ) =>
                                updateEducation(
                                  education.id,
                                  'endYear',
                                  event.target.value.replace(
                                    /\D/g,
                                    '',
                                  ),
                                )
                              }
                              placeholder="Ano"
                              spellCheck={
                                false
                              }
                              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none transition placeholder:text-slate-400 focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  ),
                )}
              </div>
            </div>
          ) : (
            <div className="mx-auto max-w-2xl rounded-xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center">
              <span className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
                Etapa{' '}
                {activeSection + 1}
              </span>

              <h3 className="mt-2 text-lg font-semibold">
                {
                  sections[
                    activeSection
                  ]
                }
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Esta seção será
                implementada nas próximas
                etapas.
              </p>
            </div>
          )}
        </section>
      </main>

      {!previewOpen && (
        <button
          type="button"
          onClick={() =>
            setPreviewOpen(true)
          }
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
      )}

      {previewOpen && (
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
                onClick={() =>
                  setPreviewOpen(
                    false,
                  )
                }
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
                    {contactItems.length >
                    0
                      ? contactItems.join(
                          ' • ',
                        )
                      : 'Telefone • E-mail • Endereço • Data de nascimento'}
                  </p>
                </header>

                <section className="py-8">
                  <h2 className="text-sm font-bold uppercase tracking-wide text-slate-900">
                    Objetivo
                    profissional
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
                        (
                          education,
                        ) => {
                          const location =
                            [
                              education.city,
                              education.state,
                            ]
                              .filter(
                                Boolean,
                              )
                              .join(
                                ' - ',
                              )

                          const period =
                            formatEducationPeriod(
                              education,
                            )

                          return (
                            <div
                              key={
                                education.id
                              }
                            >
                              <h3 className="text-sm font-semibold text-slate-900">
                                {education.course ||
                                  education.type ||
                                  'Formação'}
                              </h3>

                              {education.type &&
                                education.course && (
                                  <p className="mt-1 text-xs font-medium text-slate-500">
                                    {
                                      education.type
                                    }
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
                                    {
                                      location
                                    }
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
                                    {
                                      period
                                    }
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
                                      education
                                        .status
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
                        Sua formação
                        acadêmica será
                        exibida aqui.
                      </p>
                    )}
                  </div>
                </section>

                <section className="border-t border-slate-200 pt-8">
                  <p className="text-sm text-slate-400">
                    As próximas seções
                    serão adicionadas
                    conforme o
                    preenchimento do
                    currículo.
                  </p>
                </section>
              </div>
            </div>
          </div>
        </aside>
      )}
    </div>
  )
}

export default App