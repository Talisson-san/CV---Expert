type ExportCreditModalProps = {
  open: boolean
  fileName: string
  onCancel: () => void
  onConfirm: () => void
}

function ExportCreditModal({
  open,
  fileName,
  onCancel,
  onConfirm,
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
          Ao exportar, você consumirá um crédito. Será criado um arquivo na aba “Clientes” e futuramente você poderá editá-lo por lá.
        </p>

        <div className="mt-4 rounded-lg border border-slate-200 bg-slate-50 px-3 py-3">
          <span className="text-xs font-medium text-slate-500">Nome sugerido do arquivo</span>
          <p className="mt-1 break-all text-sm font-semibold text-slate-900">{fileName}</p>
        </div>

        <p className="mt-3 rounded-lg bg-amber-50 px-3 py-2 text-xs leading-5 text-amber-800">
          Ambiente local: o desconto do crédito e o registro em Clientes serão conectados quando implementarmos contas e persistência. Na janela de impressão do Chrome, deixe “Cabeçalhos e rodapés” desativado para não incluir data e endereço da página no PDF.
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
            className="rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-700"
          >
            Continuar e exportar
          </button>
        </div>
      </div>
    </div>
  )
}

export default ExportCreditModal
