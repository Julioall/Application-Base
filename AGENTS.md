# AGENTS.md

## Projeto

Aplicação base com backend .NET 10, frontend React com Vite e RavenDB.

## Arquitetura

O backend usa Onion Architecture com SOLID, Repository Pattern, Dependency Injection e Dependency Inversion Principle.

## Banco de dados

O banco de dados é RavenDB.

Regras:

- Services não devem depender de RavenDB diretamente.
- Services devem depender de interfaces de repositories.
- Interfaces ficam em `Domain` ou `Application`, conforme a responsabilidade do contrato.
- Implementações concretas ficam em `Infrastructure`.
- `IDocumentStore` deve ser registrado via DI como singleton.
- Sessões RavenDB devem ser abertas dentro de repositories ou unidade de trabalho.
- Não expor `IAsyncDocumentSession`, `IDocumentStore` ou tipos RavenDB na camada `Application`.

## Camadas esperadas

```txt
src/
├── Project.Domain/
├── Project.Application/
├── Project.Infrastructure/
└── Project.Api/

tests/
└── Project.Application.Tests/
```

## Regras para agentes

- Leia `.github/copilot-instructions.md`.
- Siga as instruções em `.github/instructions`.
- Use `.github/agents/orchestrator.agent.md` como ponto de entrada quando a solicitação precisar acionar especialistas em sequência.
- Preserve Onion Architecture.
- Não colocar regra de negócio em controllers.
- Não colocar regra de negócio em repositories.
- Services devem depender de interfaces.
- Implementações concretas ficam em Infrastructure.
- Registrar dependências via DI.
- Testar somente Services no backend.
- Usar React + Vite + TypeScript no frontend.
- Usar xUnit nos testes backend.
- Usar Vitest e Testing Library no frontend conforme configuração existente.
- Não migrar runner de testes sem pedido explícito.

## Comandos

Backend:

```bash
dotnet restore
dotnet build --configuration Release
dotnet test --configuration Release
```

Frontend:

```bash
cd frontend/Client
npm ci
npm run lint
npm run test
npm run build
```

Docker:

```bash
docker compose config
docker compose up -d ravendb
docker compose --profile project up --build
```

## Antes de finalizar

Informe:

- Arquivos alterados.
- Camadas afetadas.
- Testes adicionados.
- Comandos executados.
- Falhas ou limitações encontradas.
