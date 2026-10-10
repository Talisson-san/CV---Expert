# Plano de teste — Autenticação CV Expert v0.2

## Validação local

1. Abrir projeto correto na branch `feature/piloto-contas-creditos` e preservar `.env.local`.
2. Executar `npm.cmd install`, `npm.cmd run build`, `npm.cmd run lint` e `npm.cmd audit`.
3. Rodar `npm.cmd run dev`; abrir `http://localhost:5173`.
4. Preencher currículo **sem login** e confirmar que preview e sete etapas funcionam.
5. Clicar Exportar PDF antes do login: deve abrir tela de conta, sem exportar.
6. Abrir Entrar, Criar conta, Esqueci minha senha; conferir Turnstile nos três fluxos.
7. Se o SMTP permitir envio, criar usuário de teste, confirmar e-mail, entrar.
8. Depois do login, no localhost, abrir a exportação **de teste** e confirmar impressão A4 sem cabeçalhos/rodapés (não debita créditos).
9. Sair: deve limpar os dados digitados e remover a sessão autenticada.
10. Solicitar recuperação, abrir o link e definir senha nova; confirmar acesso com senha atualizada.
11. Ativar CAPTCHA no Supabase apenas depois de integrar a Secret Key diretamente no painel; repetir cadastro/login/recuperação verificando erros e reset do widget.
12. Revisar DevTools/Console/Network e políticas de CSP quando houver deployment de staging.

## Bloqueadores para publicar

**Não publicar esta branch como serviço de PDF gratuito ainda.** Não existe controle de crédito de 24 horas no servidor nem geração de PDF autorizada. A build de produção deixa a exportação desativada deliberadamente. O simples fato de o usuário estar logado não confere crédito.
