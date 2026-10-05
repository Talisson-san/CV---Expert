function App() {
  const sections = [
    'Dados pessoais',
    'Objetivo profissional',
    'Formação acadêmica',
    'Experiência profissional',
    'Qualificações',
    'Habilidades e competências',
    'Idiomas',
  ]

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex h-16 max-w-[1600px] items-center justify-between px-6">
          <div>
            <h1 className="text-xl font-bold tracking-tight">CV Expert</h1>
            <p className="text-xs text-slate-500">
              Crie seu currículo profissional
            </p>
          </div>

          <button
            type="button"
            className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-700"
          >
            Exportar PDF
          </button>
        </div>
      </header>

      <main className="mx-auto grid max-w-[1600px] grid-cols-1 lg:grid-cols-[380px_1fr]">
        <aside className="border-b border-slate-200 bg-white p-6 lg:min-h-[calc(100vh-64px)] lg:border-b-0 lg:border-r">
          <div className="mb-6">
            <span className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
              Editor
            </span>

            <h2 className="mt-1 text-lg font-semibold">
              Informações do currículo
            </h2>

            <p className="mt-1 text-sm leading-6 text-slate-500">
              Preencha as seções abaixo. As alterações aparecerão no currículo
              em tempo real.
            </p>
          </div>

          <nav className="space-y-2">
            {sections.map((section, index) => (
              <button
                key={section}
                type="button"
                className={`flex w-full items-center gap-3 rounded-lg border px-4 py-3 text-left text-sm font-medium transition ${
                  index === 0
                    ? 'border-slate-900 bg-slate-900 text-white'
                    : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                }`}
              >
                <span
                  className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs ${
                    index === 0
                      ? 'bg-white text-slate-900'
                      : 'bg-slate-100 text-slate-500'
                  }`}
                >
                  {index + 1}
                </span>

                {section}
              </button>
            ))}
          </nav>
        </aside>

        <section className="min-w-0 p-4 sm:p-6 lg:p-8">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <span className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
                Preview
              </span>
              <h2 className="text-lg font-semibold">Currículo A4</h2>
            </div>

            <span className="rounded-md border border-slate-200 bg-white px-3 py-1 text-xs text-slate-500">
              210 × 297 mm
            </span>
          </div>

          <div className="overflow-auto rounded-xl border border-slate-200 bg-slate-200/70 p-4 sm:p-8">
            <div
              className="mx-auto bg-white shadow-xl"
              style={{
                width: '210mm',
                minHeight: '297mm',
              }}
            >
              <div className="p-[18mm]">
                <div className="border-b border-slate-300 pb-6">
                  <p className="text-sm uppercase tracking-[0.2em] text-slate-400">
                    CV Expert
                  </p>

                  <h3 className="mt-3 text-3xl font-bold tracking-tight text-slate-900">
                    Seu nome
                  </h3>

                  <p className="mt-2 text-sm text-slate-500">
                    Telefone • E-mail • Cidade
                  </p>
                </div>

                <div className="py-8">
                  <h4 className="text-sm font-bold uppercase tracking-wide text-slate-900">
                    Objetivo profissional
                  </h4>

                  <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-500">
                    O conteúdo preenchido no editor será exibido aqui em tempo
                    real.
                  </p>
                </div>

                <div className="border-t border-slate-200 pt-8">
                  <p className="text-sm text-slate-400">
                    Primeiro template do CV Expert
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default App