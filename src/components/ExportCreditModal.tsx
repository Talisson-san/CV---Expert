type ExportCreditModalProps = {
  open: boolean
  fileName: string
  onFileNameChange: (nextValue: string) => void
  onCancel: () => void
  onConfirm: () => void
  localOnly: boolean
}

function ExportCreditModal({
  open,
  fileName,
  onFileNameChange,
  onCancel,
  onConfirm,
  localOnly,
}: ExportCreditModalProps) {
  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/55 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="export-title"
    >
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl">
        <span className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
          Exportação
        </span>
        <h2 id="export-title" className="mt-1 text-xl font-bold text-slate-950">
          Exportar currículo para PDF
        </h2>
        <p className="mt-4 text-sm leading-6 text-slate-600">
          A exportação oficial do PDF exigirá uma conta e um crédito disponível. O sistema de créditos ainda está em implementação.
        </p>

        <div className="mt-4">
          <label htmlFor="export-file-name" className="block text-xs font-semibold text-slate-600">
            Nome do arquivo
          </label>
          <div className="mt-2 flex items-center rounded-lg border border-slate-300 bg-white focus-within:border-slate-600 focus-within:ring-2 focus-within:ring-slate-200">
            <input
              id="export-file-name"
              type="text"
              value={fileName}
              onChange={(event) => onFileNameChange(event.target.value)}
              autoComplete="off"
              spellCheck={false}
              maxLength={100}
              className="min-w-0 flex-1 rounded-l-lg px-3 py-2.5 text-sm font-medium text-slate-900 outline-none"
              aria-describedby="export-file-name-help"
            />
            <span className="select-none border-l border-slate-200 bg-slate-50 px-3 py-2.5 text-sm font-semibold text-slate-500">
              .pdf
            </span>
          </div>
          <p id="export-file-name-help" className="mt-1 text-xs text-slate-500">
            Você pode alterar o nome. A extensão PDF é adicionada automaticamente.
          </p>
        </div>

        <p className="mt-3 rounded-lg bg-amber-50 px-3 py-2 text-xs leading-5 text-amber-800">
          {localOnly ? 'Teste local: esta impressão não consome créditos e não registra arquivos. Desative “Cabeçalhos e rodapés” no Chrome.' : 'Exportação desativada nesta versão até a implementação do débito seguro e da geração autorizada do PDF no servidor.'}
        </p>

        <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onCancel}
            className="rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={!localOnly || !fileName.trim()}
            className="rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {localOnly ? 'Continuar e exportar (teste)' : 'Exportação em preparação'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default ExportCreditModal
