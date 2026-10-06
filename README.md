# CV Expert

Editor de currículos profissionais desenvolvido pela Talisson Publicidade.

## Stack

- React 19
- TypeScript
- Vite
- Tailwind CSS 4

## Recursos do MVP

- Dados pessoais, incluindo número residencial opcional
- Objetivo profissional com sugestões por perfil
- Formação acadêmica com múltiplos registros, checkbox **Cursando** e conclusão por mês/ano
- Experiência profissional com múltiplos registros
- Qualificações e certificações
- Habilidades e competências com sugestões por área profissional
- Idiomas
- Preview A4 em tempo real
- Navegação lateral responsiva
- Exportação para PDF pelo diálogo de impressão do navegador, com nome sugerido a partir do cliente
- Novo currículo com limpeza segura da sessão

## Desenvolvimento

```powershell
npm.cmd install
npm.cmd run dev
```

Build de produção:

```powershell
npm.cmd run build
```

## Observações do MVP

O fluxo visual de créditos e criação de arquivo na futura aba **Clientes** já está representado na confirmação de exportação. O consumo real de créditos, persistência, autenticação, pagamentos e área de clientes serão conectados em uma etapa posterior.

Os dados preenchidos não são persistidos automaticamente no navegador nesta versão, evitando que informações de clientes permaneçam salvas em computadores compartilhados.
