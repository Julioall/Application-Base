# Contribuindo

## Fluxo recomendado

1. Abra uma issue usando o template adequado.
2. Confirme a camada afetada antes de implementar.
3. Mantenha controllers finos e regras de negócio em Application ou Domain.
4. Mantenha RavenDB isolado em Infrastructure.
5. Adicione ou atualize testes somente para Services no backend.
6. Execute os comandos relevantes antes de abrir o PR.

## Backend

Use os comandos:

```bash
dotnet restore
dotnet build --configuration Release
dotnet test --configuration Release
```

Regras principais:

- Services dependem de interfaces.
- Interfaces ficam em Domain ou Application conforme a responsabilidade.
- Implementações concretas ficam em Infrastructure.
- `IDocumentStore` deve ser singleton.
- `IAsyncDocumentSession`, `IDocumentStore` e tipos RavenDB não devem aparecer em Application.

## Frontend

Use os comandos:

```bash
cd src/ClientApp
npm ci
npm run lint
npm run test
npm run build
```

Regras principais:

- Usar Angular standalone.
- Não migrar Jest/Karma sem pedido explícito.
- Services Angular concentram comunicação HTTP.
- Componentes tratam estados de loading, erro e vazio.

## Docker

Para subir o RavenDB local:

```bash
docker compose up -d ravendb
```

Para validar o Compose:

```bash
docker compose config
```

Para executar API e frontend web via Docker quando `src/` existir:

```bash
docker compose --profile project up --build
```

## Pull requests

O PR deve informar:

- Resumo da alteração.
- Camadas afetadas.
- Testes adicionados ou alterados.
- Comandos executados.
- Riscos ou limitações.
