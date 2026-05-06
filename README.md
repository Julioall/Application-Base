# Template Base para .NET 10 + Angular Standalone + RavenDB

Este pacote cria uma base de instruções para agentes LLM trabalharem em um projeto com:

- Onion Architecture
- SOLID
- Repository Pattern
- Dependency Injection
- Dependency Inversion Principle
- .NET 10
- Angular standalone
- RavenDB como banco de dados
- Docker Compose para desenvolvimento local
- xUnit testando somente Services no backend
- Jest ou Karma para Angular, conforme o runner já configurado no projeto

## Como usar

Copie o conteúdo deste pacote para a raiz do seu repositório.

A estrutura principal será:

```txt
.github/
├── README.md
├── CONTRIBUTING.md
├── SECURITY.md
├── copilot-instructions.md
├── instructions/
├── agents/
├── prompts/
├── skills/
├── ISSUE_TEMPLATE/
├── workflows/
├── pull_request_template.md
└── dependabot.yml

docker/
├── api/Dockerfile
└── web/
    ├── Dockerfile
    └── nginx.conf

compose.yml
.dockerignore
.env.example
AGENTS.md
```

## Ajustes obrigatórios após copiar

Substitua `Project` pelo nome real da solução/projeto.

Exemplo:

```txt
Project.Domain          -> MinhaEmpresa.MeuProduto.Domain
Project.Application     -> MinhaEmpresa.MeuProduto.Application
Project.Infrastructure  -> MinhaEmpresa.MeuProduto.Infrastructure
Project.Api             -> MinhaEmpresa.MeuProduto.Api
```

Ajuste também o diretório do Angular se não for `src/ClientApp`.

Ajuste `.env.example`, `compose.yml` e os Dockerfiles quando substituir `Project` pelo nome real da solução.

## RavenDB

Este template assume que:

- `IDocumentStore` é registrado como singleton.
- Repositories abrem `IAsyncDocumentSession` por operação ou unidade de trabalho.
- `SaveChangesAsync` é chamado dentro do repository ou unidade de trabalho adotada pelo projeto.
- Services não dependem de RavenDB diretamente.
- Application depende de interfaces; Infrastructure implementa essas interfaces.

## Testes

Backend:

- Testar somente Services.
- Mockar interfaces de repositories.
- Não usar RavenDB real nos testes unitários de Services.

Frontend:

- Usar o runner existente: Jest ou Karma.
- Não migrar runner sem pedido explícito.

## Docker

Subir RavenDB local:

```bash
docker compose up -d ravendb
```

Validar Compose:

```bash
docker compose config
```

Executar a aplicação completa quando `src/` existir:

```bash
docker compose --profile project up --build
```

A configuração Docker é para desenvolvimento local. Não use RavenDB sem certificado em produção.
