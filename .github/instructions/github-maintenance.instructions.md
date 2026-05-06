---
applyTo: ".github/**/*"
---

# Manutenção de GitHub

## Objetivo

Arquivos em `.github` devem orientar contribuição, revisão, automação e uso de agentes sem violar a arquitetura do projeto.

## Regras

- Manter instruções em português quando o arquivo já estiver em português.
- Não incluir secrets, tokens, certificados, URLs de produção ou dados sensíveis.
- Usar placeholders seguros em exemplos.
- Não adicionar automações que alterem a arquitetura esperada.
- Não migrar runner de testes frontend sem pedido explícito.
- Não criar workflows que dependam de serviços externos obrigatórios sem documentar o requisito.
- Pin ou versões principais de actions devem ser revisadas ao adicionar novas actions.

## Issue templates

- Pedir área afetada e camada principal quando aplicável.
- Critérios de aceite devem ser verificáveis.
- Bugs devem pedir passos de reprodução, resultado esperado e resultado atual.
- Evidências não devem conter dados sensíveis.

## Pull requests

PRs devem pedir:

- Resumo.
- Tipo de mudança.
- Camadas afetadas.
- Checklist de Onion Architecture.
- Checklist RavenDB quando backend for afetado.
- Testes e comandos executados.
- Riscos ou limitações.

## Workflows

- CI deve executar backend e frontend quando os respectivos projetos existirem.
- Backend deve usar `dotnet build --configuration Release` e `dotnet test --configuration Release`.
- Frontend deve usar `npm ci`, `npm run lint`, `npm run test` e `npm run build`, respeitando scripts existentes.
- Workflows de template devem ser tolerantes a repositórios ainda sem `src/` ou `src/ClientApp`.
- Docker deve ser validado com `docker compose config` quando `compose.yml` existir.
