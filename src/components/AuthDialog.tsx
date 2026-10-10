import { useRef, useState } from 'react'
import type { FormEvent } from 'react'
import { Turnstile } from '@marsidev/react-turnstile'
import type { TurnstileInstance } from '@marsidev/react-turnstile'
import { supabase } from '../lib/supabase'

export type AuthMode = 'login' | 'register' | 'forgot' | 'update-password'

type AuthDialogProps = {
  mode: AuthMode
  onChangeMode: (mode: AuthMode) => void
  onClose: () => void
  onAuthenticated: () => void
  onPasswordUpdated: () => void
}

const captchaSiteKey = import.meta.env.VITE_TURNSTILE_SITE_KEY as string | undefined
const passwordPolicy = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{10,}$/

const titles: Record<AuthMode, string> = {
  login: 'Entrar na sua conta',
  register: 'Criar conta gratuita',
  forgot: 'Recuperar minha senha',
  'update-password': 'Definir nova senha',
}

function friendlyError(message: string) {
  if (/captcha/i.test(message)) return 'A verificação de segurança não foi aceita. Tente novamente.'
  if (/invalid login credentials/i.test(message)) return 'E-mail ou senha incorretos, ou cadastro ainda não confirmado.'
  if (/email not confirmed/i.test(message)) return 'Confirme seu e-mail antes de entrar.'
  if (/rate limit|too many requests/i.test(message)) return 'Muitas tentativas em pouco tempo. Aguarde alguns minutos.'
  if (/already registered|user already registered/i.test(message)) return 'Esse e-mail pode já estar cadastrado. Tente entrar ou recuperar sua senha.'
  if (/password/i.test(message)) return 'A senha não atende à política configurada. Revise e tente novamente.'
  return 'Não foi possível concluir a operação. Verifique sua conexão e tente novamente.'
}

export default function AuthDialog({
  mode,
  onChangeMode,
  onClose,
  onAuthenticated,
  onPasswordUpdated,
}: AuthDialogProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [captchaToken, setCaptchaToken] = useState('')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const [notice, setNotice] = useState('')
  const captchaRef = useRef<TurnstileInstance | null>(null)
  const isUpdate = mode === 'update-password'
  const usesCaptcha = !isUpdate

  const changeMode = (next: AuthMode) => {
    setError('')
    setNotice('')
    setPassword('')
    setConfirmPassword('')
    setCaptchaToken('')
    captchaRef.current?.reset()
    onChangeMode(next)
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (busy) return
    setError('')
    setNotice('')

    if ((mode === 'register' || isUpdate) && !passwordPolicy.test(password)) {
      setError('Use pelo menos 10 caracteres, com maiúscula, minúscula, número e símbolo.')
      return
    }
    if ((mode === 'register' || isUpdate) && password !== confirmPassword) {
      setError('As senhas não coincidem.')
      return
    }
    if (usesCaptcha && !captchaToken) {
      setError('Conclua a verificação de segurança antes de continuar.')
      return
    }

    setBusy(true)
    try {
      const redirectTo = `${window.location.origin}${window.location.pathname}`
      if (mode === 'register') {
        const { data, error: authError } = await supabase.auth.signUp({
          email: email.trim().toLowerCase(),
          password,
          options: { emailRedirectTo: redirectTo, captchaToken },
        })
        if (authError) throw authError
        if (data.session) {
          onAuthenticated()
        } else {
          setPassword('')
          setConfirmPassword('')
          setNotice('Solicitação recebida. Se o cadastro puder ser concluído, você receberá uma mensagem para confirmar seu e-mail. Confira também o spam.')
        }
      } else if (mode === 'login') {
        const { error: authError } = await supabase.auth.signInWithPassword({
          email: email.trim().toLowerCase(),
          password,
          options: { captchaToken },
        })
        if (authError) throw authError
        onAuthenticated()
      } else if (mode === 'forgot') {
        const { error: authError } = await supabase.auth.resetPasswordForEmail(
          email.trim().toLowerCase(),
          { redirectTo, captchaToken },
        )
        if (authError) throw authError
        setNotice('Se existir uma conta com esse e-mail, enviaremos as instruções para redefinir a senha.')
      } else {
        const { error: authError } = await supabase.auth.updateUser({ password })
        if (authError) throw authError
        setPassword('')
        setConfirmPassword('')
        onPasswordUpdated()
      }
    } catch (caught) {
      setError(friendlyError(caught instanceof Error ? caught.message : ''))
    } finally {
      setBusy(false)
      if (usesCaptcha) {
        setCaptchaToken('')
        captchaRef.current?.reset()
      }
    }
  }

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center overflow-y-auto bg-slate-950/65 p-4" role="dialog" aria-modal="true" aria-labelledby="auth-dialog-title">
      <section className="my-auto w-full max-w-md rounded-2xl border border-slate-200 bg-white p-5 shadow-2xl sm:p-7">
        <div className="flex items-start justify-between gap-3">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">CV Expert · Conta</span>
            <h2 id="auth-dialog-title" className="mt-1 text-xl font-bold text-slate-950">{titles[mode]}</h2>
          </div>
          {!isUpdate && <button type="button" onClick={onClose} className="rounded-lg px-2 py-1 text-xl text-slate-500 hover:bg-slate-100" aria-label="Fechar cadastro ou login">×</button>}
        </div>

        {mode === 'register' && <p className="mt-3 text-sm leading-6 text-slate-600">Crie sua conta para preparar a exportação. O crédito gratuito será liberado somente após implementarmos o controle de créditos no servidor.</p>}
        {mode === 'forgot' && <p className="mt-3 text-sm leading-6 text-slate-600">Informe o e-mail cadastrado. Enviaremos um link para redefinir sua senha.</p>}
        {isUpdate && <p className="mt-3 text-sm leading-6 text-slate-600">Defina sua nova senha para concluir a recuperação de acesso.</p>}

        <form className="mt-5 space-y-4" onSubmit={handleSubmit}>
          {!isUpdate && (
            <div>
              <label htmlFor="auth-email" className="block text-sm font-semibold text-slate-700">E-mail</label>
              <input id="auth-email" name="email" type="email" autoComplete="email" required maxLength={254} value={email} onChange={(e) => setEmail(e.target.value)} placeholder="voce@exemplo.com" className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm text-slate-950 outline-none focus:border-slate-600 focus:ring-2 focus:ring-slate-200" />
            </div>
          )}
          {mode !== 'forgot' && (
            <div>
              <label htmlFor="auth-password" className="block text-sm font-semibold text-slate-700">{isUpdate ? 'Nova senha' : 'Senha'}</label>
              <input id="auth-password" name="password" type="password" autoComplete={mode === 'login' ? 'current-password' : 'new-password'} required minLength={mode === 'login' ? undefined : 10} value={password} onChange={(e) => setPassword(e.target.value)} className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm text-slate-950 outline-none focus:border-slate-600 focus:ring-2 focus:ring-slate-200" />
              {(mode === 'register' || isUpdate) && <p className="mt-1 text-xs text-slate-500">Mínimo de 10 caracteres, com maiúscula, minúscula, número e símbolo.</p>}
            </div>
          )}
          {(mode === 'register' || isUpdate) && (
            <div>
              <label htmlFor="auth-password-confirm" className="block text-sm font-semibold text-slate-700">Confirmar senha</label>
              <input id="auth-password-confirm" name="password-confirm" type="password" autoComplete="new-password" required minLength={10} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm text-slate-950 outline-none focus:border-slate-600 focus:ring-2 focus:ring-slate-200" />
            </div>
          )}
          {usesCaptcha && (
            <div className="rounded-lg border border-slate-200 bg-slate-50 p-2">
              {captchaSiteKey ? (
                <Turnstile
                  ref={captchaRef}
                  siteKey={captchaSiteKey}
                  onSuccess={setCaptchaToken}
                  onExpire={() => setCaptchaToken('')}
                  onError={() => { setCaptchaToken(''); setError('Falha ao carregar a verificação. Atualize a página ou tente novamente.') }}
                  options={{ theme: 'light', size: 'flexible' }}
                />
              ) : <p role="alert" className="text-sm text-red-700">Configure VITE_TURNSTILE_SITE_KEY no .env.local.</p>}
            </div>
          )}
          {error && <p role="alert" className="rounded-lg bg-red-50 p-3 text-sm text-red-800">{error}</p>}
          {notice && <p role="status" className="rounded-lg bg-blue-50 p-3 text-sm text-blue-900">{notice}</p>}
          <button type="submit" disabled={busy || (usesCaptcha && !captchaToken)} className="w-full rounded-lg bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-50">
            {busy ? 'Aguarde...' : mode === 'login' ? 'Entrar' : mode === 'register' ? 'Criar conta' : mode === 'forgot' ? 'Enviar link de recuperação' : 'Salvar nova senha'}
          </button>
        </form>

        {!isUpdate && (
          <div className="mt-5 flex flex-wrap gap-x-4 gap-y-2 border-t border-slate-200 pt-4 text-sm">
            {mode !== 'login' && <button type="button" onClick={() => changeMode('login')} className="font-semibold text-slate-800 underline underline-offset-2">Já tenho conta</button>}
            {mode !== 'register' && <button type="button" onClick={() => changeMode('register')} className="font-semibold text-slate-800 underline underline-offset-2">Criar conta</button>}
            {mode !== 'forgot' && <button type="button" onClick={() => changeMode('forgot')} className="font-semibold text-slate-800 underline underline-offset-2">Esqueci minha senha</button>}
          </div>
        )}
      </section>
    </div>
  )
}
