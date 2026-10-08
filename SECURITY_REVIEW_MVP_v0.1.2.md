# CV Expert — revisão de segurança do MVP v0.1.2

Data da revisão: 07/10/2026

## Escopo revisado

- React/Vite/Tailwind estático, sem backend, banco, autenticação ou APIs próprias.
- Fluxo de preenchimento do currículo, preview e impressão/PDF.
- Arquivos públicos, configuração do Vite, dependências declaradas e lockfile.
- Busca por segredos, chaves, tokens e persistência local.

## Resultado resumido

Nenhum segredo, token, chave privada ou credencial foi encontrado no projeto.
Nenhum uso de `dangerouslySetInnerHTML`, `innerHTML`, `eval`, cookies, `localStorage`, `sessionStorage`, `fetch` ou chamadas a APIs externas foi encontrado.
Os dados preenchidos permanecem apenas no estado em memória da página nesta versão e não são enviados pelo aplicativo para servidor algum.

O conteúdo digitado pelo usuário é renderizado pelo React como texto, sem HTML arbitrário, reduzindo o risco de XSS no estado atual.

## Hardening aplicado

- Adicionado `public/_headers` para Cloudflare Pages com CSP e cabeçalhos de segurança.
- Bloqueio de embedding em iframe (`frame-ancestors 'none'` e `X-Frame-Options: DENY`).
- `X-Content-Type-Options: nosniff`.
- `Referrer-Policy: strict-origin-when-cross-origin`.
- `Permissions-Policy` desabilitando sensores e permissões que o CV Expert não usa.
- COOP/CORP restritivos.
- CSP restrita a recursos locais, com exceções apenas para Cloudflare Web Analytics.
- URLs `*.pages.dev` e previews recebem `X-Robots-Tag: noindex, nofollow`.
- Removido o único `style` inline do preview para permitir CSP sem `style-src 'unsafe-inline'`.

## Pontos positivos do MVP atual

- Não existe backend exposto.
- Não existem endpoints de autenticação, pagamento ou upload.
- Não há persistência automática de dados pessoais no navegador.
- Não há scripts de terceiros no HTML atual.
- O nome sugerido do PDF é normalizado antes de ser usado como título/arquivo.
- O Vite é dependência de desenvolvimento; o site publicado contém apenas os artefatos estáticos da build.

## Itens obrigatórios quando a Fase 2 começar

1. Créditos, permissões, plano e cobrança nunca devem ser validados apenas no navegador. A autoridade deverá ficar no servidor.
2. Login deve usar sessão segura ou tokens mantidos de forma adequada; evitar armazenar token sensível em `localStorage`.
3. Banco de dados deverá aplicar isolamento por cliente/tenant e autorização em toda leitura e escrita.
4. Limites de tamanho e quantidade deverão existir também no backend, independentemente dos limites da interface.
5. Uploads futuros deverão validar tipo, tamanho e conteúdo no servidor.
6. APIs deverão ter rate limiting, validação de entrada, logs e proteção contra abuso.
7. Currículos salvos passarão a ser dados pessoais e deverão receber controles de acesso, retenção e exclusão coerentes com LGPD.

## Dependências

O `package-lock.json` contém integridade para os pacotes registrados e fixa as versões efetivamente resolvidas.

A auditoria online do npm (`npm audit`) não pôde ser concluída no ambiente desta revisão porque o acesso ao registry.npmjs.org estava indisponível. Antes do deploy final, executar localmente:

```powershell
npm.cmd audit
npm.cmd run build
npm.cmd run lint
```

Se o `npm audit` apontar vulnerabilidade, avaliar a dependência afetada antes de publicar.

## Observação sobre React Server Components

O projeto não contém pacotes `react-server-dom-*` e não usa React Server Components/Server Functions. As vulnerabilidades recentes específicas desse conjunto não se aplicam ao desenho atual do CV Expert.

## Observação sobre Vite em rede local

O dev server não deve ser usado como servidor de produção. O comando `vite --host` deve ser usado apenas em rede local confiável para testes. A publicação deve usar a pasta `dist` gerada pela build em Cloudflare Pages.
