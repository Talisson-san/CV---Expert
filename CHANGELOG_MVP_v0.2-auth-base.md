# CV Expert v0.2 — Base de autenticação (piloto gratuito)

Esta entrega preserva o editor do MVP v0.1.3 e adiciona uma interface de autenticação integrada ao Supabase.

## Implementado

- Cadastro por e-mail/senha e solicitação de confirmação de e-mail.
- Login, saída da conta e identificação de sessão existente.
- Recuperação de senha por e-mail e troca de senha após `PASSWORD_RECOVERY`.
- Cloudflare Turnstile no cadastro, login e solicitação de recuperação. Token é enviado ao Supabase Auth.
- Política de senha no formulário: mínimo 10 caracteres, maiúscula, minúscula, número e símbolo (a validação definitiva é no Supabase).
- Exportação exigindo login pela interface.
- Segurança de pré-lançamento: **a build de produção não contém o print-root e não libera exportação**. Impressão para teste só está disponível com `npm run dev`, depois do login.
- Conteúdo do currículo é apagado ao sair pela interface.
- CSP de Cloudflare Pages ajustada para o domínio Supabase configurado e para os scripts/iframes Turnstile.

## Não implementado — BLOQUEADORES para publicação pública

- Banco de créditos, débito transacional e cooldown de 24 horas no servidor.
- Geração autorizada de PDF pelo backend; bloqueio do front-end não é controle antifraude.
- SMTP próprio para cadastro/recuperação de usuários externos ao time Supabase.
- Auditoria operacional do fluxo completo com contas reais, captcha ativo, rate limits, RLS e observabilidade.
- Histórico de clientes, persistência dos currículos, pagamentos e métricas do piloto.

## Configuração local

O arquivo `.env.local` (não incluído e não deve ir ao Git) precisa conter:

```
VITE_SUPABASE_URL=https://<seu-projeto>.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=sb_publishable_...
VITE_TURNSTILE_SITE_KEY=<site-key-publica>
```

**Nunca** usar senhas, chaves `sb_secret_`, `service_role` ou segredo do Turnstile no frontend.

Deixe Supabase Attack Protection/Enable Captcha **desativado** até a interface estar instalada e testada no localhost. Depois, configure a **Secret Key** diretamente no Supabase e ative a proteção para validar que o token é reconhecido. Não envie segredos para esta conversa.

A sessão de autenticação do Supabase pode persistir no navegador; em computadores públicos use **Sair** e feche a aba. Os dados digitados do currículo não são enviados ao Supabase nesta fase.
