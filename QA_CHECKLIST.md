# CV Expert — Checklist de validação do MVP v0.1.2

## Desktop — referência 1440×900

- Sidebar de etapas com 288 px à esquerda.
- Fundo geral cinza, sidebar clara e formulário branco claramente separados.
- Dados pessoais, objetivo e demais etapas simples sem rolagem excessiva.
- Preview abre pela direita e recolhe pela seta superior.
- Etapas preenchidas recebem indicador de conclusão.

## Mobile

- Aba **Etapas** abre pela esquerda e recolhe pela seta superior.
- Aba **Preview** abre pela direita e recolhe pela seta superior.
- Cabeçalho mantém **Novo** e **Exportar PDF** acessíveis.
- Campos não provocam zoom indevido por fonte menor que 16 px.
- Não existe rolagem horizontal na área principal.

## Editor

1. Dados pessoais atualizam o preview, incluindo o campo opcional **Número** do endereço.
2. Objetivo profissional aceita texto livre e sugestões por perfil.
3. Formação acadêmica permite adicionar e remover registros; a checkbox **Cursando** controla o estado em andamento. Quando desmarcada, aparecem os campos de texto **Conclusão — Mês / Ano**.
4. Experiência profissional permite múltiplos registros e emprego atual.
5. Qualificações permite cursos/certificações com ano e carga horária opcional.
6. Habilidades permite adicionar por botão/Enter, remover tags e usar sugestões coerentes com a área escolhida em **Objetivo profissional**.
7. Idiomas permite múltiplos idiomas e níveis.

## Preview / PDF

- Seções vazias não aparecem na impressão.
- Preview mantém placeholders apenas para orientar o preenchimento.
- **Exportar PDF** abre a confirmação de crédito antes do diálogo de impressão.
- A confirmação exibe o nome sugerido no padrão `nome-do-cliente-curriculo.pdf`.
- No diálogo do navegador, selecionar **Salvar como PDF**, papel A4 e manter **Cabeçalhos e rodapés** desativado.
- O PDF não deve conter menus, sidebar, modal, botões ou placeholders vazios.
- Habilidades aparecem com marcadores legíveis.
- Idiomas aparecem separados em linhas.

## Novo currículo

- Com dados preenchidos, solicita confirmação antes de limpar.
- Após confirmar, volta para a etapa 1 e limpa todos os dados da sessão.

## Limitação intencional desta versão

O consumo real de crédito e o registro persistente na futura aba **Clientes** dependem da etapa posterior de autenticação, banco de dados e contas. O modal já comunica o fluxo definitivo, mas no ambiente local apenas inicia a exportação para PDF.
