# Docker

Este template inclui Docker para desenvolvimento local com RavenDB e, quando a aplicação existir, para executar API e frontend web.

## Serviços

- `ravendb`: banco local persistido em volumes Docker.
- `project-api`: API ASP.NET Core .NET 10, ativada pelo profile `project`.
- `project-web`: Angular servido por Nginx, ativado pelo profile `project`.

## RavenDB local

Subir somente o RavenDB:

```bash
docker compose up -d ravendb
```

Studio:

```txt
http://localhost:8080
```

Parar os containers:

```bash
docker compose down
```

Remover também os dados locais:

```bash
docker compose down --volumes
```

## Aplicação completa

Antes de usar o profile `project`, ajuste os valores de `.env.example` para o nome real dos projetos:

```txt
BACKEND_PROJECT_PATH=src/ApplicationBase.Api/ApplicationBase.Api.csproj
BACKEND_ASSEMBLY_NAME=ApplicationBase.Api.dll
FRONTEND_APP_PATH=src/ClientApp
FRONTEND_DIST_PATH=dist/application-base-client/browser
```

Executar:

```bash
docker compose --profile project up --build
```

## Variáveis relevantes

- `COMPOSE_PROJECT_NAME`: prefixo dos containers, volumes e rede.
- `RAVENDB_DATABASE_NAME`: nome do database usado pela API.
- `RAVENDB_HTTP_PORT`: porta local do RavenDB Studio.
- `BACKEND_HTTP_PORT`: porta local da API.
- `FRONTEND_HTTP_PORT`: porta local do frontend web.
- `FRONTEND_DIST_PATH`: diretório gerado pelo build Angular dentro de `src/ClientApp`.

## Segurança

A configuração do RavenDB no Compose é somente para desenvolvimento local e usa acesso sem certificado dentro da rede Docker privada. Não use esta configuração como produção.

Não commite `.env`, certificados, senhas, tokens ou connection strings reais.
