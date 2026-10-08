# CV Expert — MVP v0.1.3 Security Hardening

Data: 07/10/2026

## Alterações

- Adicionado `public/_headers` para Cloudflare Pages com Content Security Policy e cabeçalhos de segurança.
- Bloqueado carregamento do CV Expert dentro de iframes de outros sites.
- Restringidas permissões de navegador não utilizadas (câmera, microfone, geolocalização, sensores, pagamento e USB).
- Adicionado `noindex, nofollow` aos endereços de preview `*.pages.dev` por cabeçalho, preservando o domínio personalizado para publicação oficial.
- Removido o único estilo inline do Preview para permitir CSP sem `unsafe-inline` em `style-src`.
- Campos de dados pessoais receberam limites de comprimento razoáveis para evitar entradas acidentais excessivas.
- Autofill/autocomplete foi desativado nos campos pessoais mais sensíveis para reduzir retenção indesejada em computadores compartilhados.
- Adicionado `SECURITY_REVIEW_MVP_v0.1.2.md` com o resultado da revisão e requisitos para a Fase 2.

## Validação pendente no computador local

Antes da publicação:

```powershell
npm.cmd audit
npm.cmd run build
npm.cmd run lint
```

A auditoria online do npm não pôde ser executada no ambiente de revisão por indisponibilidade de acesso ao registry.npmjs.org.
