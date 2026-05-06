---
applyTo: "**/*.{cs,csproj,sln}"
---

# Onion Architecture

## Direção das dependências

A direção das dependências deve sempre apontar para dentro.

Regra esperada:

```txt
Api -> Application -> Domain
Infrastructure -> Application -> Domain
Domain -> nenhuma camada
```

## Domain

Permitido:

- Entidades.
- Value Objects.
- Enums.
- Interfaces de repositories quando representarem contratos do domínio.
- Regras de domínio puras.

Proibido:

- RavenDB.
- ASP.NET Core.
- Controllers.
- DTOs de API.
- Implementações de infraestrutura.
- Dependências externas.

## Application

Permitido:

- Services.
- Use cases.
- DTOs.
- Interfaces.
- Validações.
- Regras de aplicação.

Proibido:

- `IDocumentStore`.
- `IAsyncDocumentSession`.
- Tipos RavenDB.
- HttpClient concreto sem abstração.
- Dependência direta de Infrastructure.
- Dependência direta de Api.

## Infrastructure

Permitido:

- Configuração RavenDB.
- `DocumentStore`.
- Repositories concretos RavenDB.
- Índices RavenDB.
- Integrações externas.
- Implementações de interfaces.

Proibido:

- Regras de negócio.
- DTOs de API.
- Controllers.

## Api

Permitido:

- Controllers.
- Middlewares.
- Program.cs.
- Configuração de DI.
- Configuração de Swagger.
- Filtros.
- Autenticação/autorização.

Proibido:

- Regra de negócio.
- Query complexa.
- Acesso direto ao RavenDB em controllers.
- Chamada direta a `IDocumentStore` ou `IAsyncDocumentSession` em controllers.

## Regra principal

Se a alteração contém regra de negócio, ela deve ficar em `Application` ou `Domain`, nunca em `Api` ou `Infrastructure`.
