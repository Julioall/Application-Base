---
applyTo: "**/*.{cs,csproj,sln}"
---

# Estrutura da solução

## Projetos

- `Project.Domain`: entidades, value objects, enums e contratos de domínio.
- `Project.Application`: services, use cases, DTOs e interfaces de aplicação.
- `Project.Infrastructure`: RavenDB, repositories concretos e integrações externas.
- `Project.Api`: controllers, middlewares, DI e configuração HTTP.
- `Project.Application.Tests`: testes xUnit somente para Services.

## Dependências permitidas

- `Project.Domain`: nenhuma referência interna.
- `Project.Application`: referencia `Project.Domain`.
- `Project.Infrastructure`: referencia `Project.Application` e `Project.Domain`.
- `Project.Api`: referencia `Project.Application` e `Project.Infrastructure`.
- `Project.Application.Tests`: referencia `Project.Application` e pode mockar interfaces.

## Dependências proibidas

- `Project.Domain` não referencia ninguém.
- `Project.Application` não referencia `Infrastructure`.
- `Project.Application` não referencia `Api`.
- `Infrastructure` não referencia `Api`.

## RavenDB

Somente `Project.Infrastructure` deve referenciar `RavenDB.Client`.

Se `Project.Application` ou `Project.Domain` precisarem referenciar `RavenDB.Client`, a arquitetura foi violada.
