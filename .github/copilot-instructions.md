# Instruções gerais para agentes LLM

## Stack do projeto

Este projeto usa:

- Backend: .NET 10 com ASP.NET Core Web API.
- Frontend: React com Vite, TypeScript, Tailwind CSS, shadcn/ui, Radix UI, React Router, TanStack React Query, React Hook Form e Zod.
- Banco de dados: RavenDB.
- Testes backend: xUnit.
- Testes frontend: Vitest e Testing Library.
- Arquitetura: Onion Architecture.
- Princípios: SOLID, Dependency Injection e Dependency Inversion Principle.
- Persistência: Repository Pattern.
- Testes backend devem cobrir somente Services.

## Arquitetura backend

O backend deve seguir Onion Architecture.

Camadas esperadas:

```txt
src/
├── Project.Domain/
├── Project.Application/
├── Project.Infrastructure/
└── Project.Api/

tests/
└── Project.Application.Tests/
```

## Responsabilidade das camadas

### Domain

A camada `Domain` contém:

- Entidades.
- Value Objects.
- Enums.
- Regras de domínio puras.
- Interfaces de repositórios quando forem contratos do domínio.

A camada `Domain` não deve depender de nenhuma outra camada.

### Application

A camada `Application` contém:

- Services.
- Use cases.
- DTOs.
- Interfaces de serviços externos.
- Interfaces de repositories quando o contrato for orientado a caso de uso.
- Validações de aplicação.
- Orquestração de regras de negócio.

A camada `Application` pode depender de `Domain`.

### Infrastructure

A camada `Infrastructure` contém:

- Implementações de repositories RavenDB.
- Configuração do `IDocumentStore`.
- Integrações externas.
- Serviços de e-mail, storage, mensageria e APIs externas.
- Configurações técnicas.

A camada `Infrastructure` pode depender de `Application` e `Domain`.

### Api

A camada `Api` contém:

- Controllers.
- Middlewares.
- Configuração de DI.
- Configuração de autenticação/autorização.
- Swagger/OpenAPI.
- Program.cs.

Controllers devem ser finos. Não colocar regra de negócio em controllers.

## RavenDB

Regras obrigatórias:

- Registrar `IDocumentStore` como singleton.
- Inicializar o `DocumentStore` uma única vez por aplicação.
- Abrir `IAsyncDocumentSession` dentro da Infrastructure.
- Não vazar tipos RavenDB para `Application`, `Domain` ou DTOs de API.
- Repositories implementam contratos definidos em `Application` ou `Domain`.
- Services dependem apenas de abstrações.
- Chamar `SaveChangesAsync` quando a operação modificar documentos.
- Usar `CancellationToken` em operações assíncronas.
- Não retornar `IQueryable` de repositories.

## Regras obrigatórias

- Aplicar SOLID.
- Aplicar Dependency Inversion Principle.
- Usar Dependency Injection para dependências.
- Não instanciar repositories ou services diretamente com `new` fora de composição/testes.
- Controllers chamam services, não repositories diretamente.
- Services podem depender de interfaces de repositories.
- Repositories implementam interfaces.
- Testes backend devem focar somente Services.
- Não criar testes unitários para controllers, repositories ou entidades simples sem necessidade explícita.
- Não retornar entidades diretamente em endpoints.
- Usar DTOs para entrada e saída.
- Usar `CancellationToken` em operações assíncronas.
- Métodos assíncronos devem terminar com `Async`.
- Não usar `.Result` ou `.Wait()`.

## Comandos backend

```bash
dotnet restore
dotnet build --configuration Release
dotnet test --configuration Release
```

## Comandos frontend

Ajustar o diretório se o frontend estiver fora de `frontend/Client`.

```bash
cd frontend/Client
npm ci
npm run lint
npm run test
npm run build
```

## Política de testes backend

Testar somente a camada de Services/Application.

Os testes devem validar:

- Regras de negócio.
- Validações.
- Fluxos de sucesso.
- Fluxos de erro.
- Chamadas esperadas aos repositories mockados.
- Comportamento diante de dados inexistentes.
- Comportamento diante de entrada inválida.

Não testar:

- Controllers.
- Repositories.
- RavenDB real.
- `IDocumentStore`.
- `IAsyncDocumentSession`.
- Migrations, pois RavenDB não usa migrations relacionais tradicionais.
- Getters/setters.
- Entidades sem comportamento relevante.

## Política de alterações

Antes de alterar código:

1. Identifique a camada correta.
2. Verifique se já existe service, repository, DTO ou entidade relacionada.
3. Preserve a direção das dependências.
4. Faça alterações pequenas.
5. Atualize ou crie testes de service.
6. Execute build e testes quando possível.

## Saída esperada em PRs

Toda alteração feita por agente deve informar:

- Resumo da alteração.
- Camadas afetadas.
- Services alterados/criados.
- Repositories RavenDB alterados/criados.
- Testes adicionados/alterados.
- Comandos executados.
- Riscos ou limitações.
