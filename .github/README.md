# Estrutura `.github`

Esta pasta centraliza metadados do GitHub, automações e instruções para agentes.

## Arquivos principais

- `copilot-instructions.md`: instruções gerais para agentes LLM.
- `pull_request_template.md`: checklist padrão de PR.
- `CONTRIBUTING.md`: fluxo de contribuição.
- `SECURITY.md`: orientação de reporte e boas práticas de segurança.
- `dependabot.yml`: atualização automatizada de dependências.

## Pastas

- `ISSUE_TEMPLATE/`: formulários de bug, feature e tarefa técnica.
- `instructions/`: instruções granulares aplicadas por tipo de arquivo.
- `agents/`: perfis especializados de agentes.
- `prompts/`: prompts reutilizáveis para tarefas recorrentes.
- `skills/`: skills locais para orientar fluxos de implementação.
- `workflows/`: GitHub Actions para CI e validação de metadados.

## Docker

Os arquivos Docker ficam na raiz e em `docker/`:

- `compose.yml`: RavenDB local e profile `project` para API/web.
- `.env.example`: variáveis locais seguras.
- `.dockerignore`: exclusões do contexto de build.
- `docker/api/Dockerfile`: imagem da API .NET.
- `docker/web/Dockerfile`: build Angular e Nginx.
- `docker/web/nginx.conf`: servidor web e proxy reverso local.

## Regras de manutenção

- Preserve Onion Architecture nas instruções e checklists.
- Não exponha tipos RavenDB fora da Infrastructure.
- Não adicione secrets, URLs de produção ou certificados reais.
- Não altere runner de testes frontend sem pedido explícito.
- Mantenha comandos backend e frontend alinhados com `AGENTS.md`.
