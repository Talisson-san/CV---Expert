# CV Expert — Ajustes do MVP v0.1.1

Implementados após a validação visual e funcional do MVP v0.1:

- Sugestões de habilidades e competências vinculadas à área escolhida em **Objetivo profissional**.
- Formação **Em andamento** sem campo de previsão de conclusão; o currículo exibe `Atual`.
- Campo opcional **Número** nos dados pessoais, separado do endereço.
- Nome sugerido do PDF derivado do cliente, no padrão `nome-do-cliente-curriculo.pdf`.
- Modal de exportação mostra o nome sugerido e lembra de desativar **Cabeçalhos e rodapés** no diálogo do Chrome.
- Endereço e número são combinados automaticamente no currículo.
- Habilidades usam marcadores textuais no documento, melhorando leitura e extração.
- Idiomas são exibidos em linhas separadas no documento.
- Checklist de QA atualizado para os novos comportamentos.

## Observação sobre a exportação

Nesta etapa o PDF continua usando o diálogo nativo de impressão do navegador. O nome do documento é ajustado antes da impressão para que o Chrome sugira o nome correto ao salvar. Cabeçalhos e rodapés do navegador são uma preferência do próprio Chrome e devem permanecer desativados.
