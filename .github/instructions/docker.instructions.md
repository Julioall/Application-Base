---
applyTo: "{compose*.yml,docker/**/*,.dockerignore,.env.example,docs/docker.md}"
---

# Docker

## Objetivo

Docker deve facilitar desenvolvimento local sem misturar responsabilidades das camadas da aplicação.

## Regras

- RavenDB deve permanecer como dependência externa acessada pela Infrastructure.
- Services da Application não devem depender de variáveis, tipos ou clientes Docker/RavenDB.
- Não colocar secrets reais em Compose, Dockerfiles, `.env.example` ou documentação.
- Usar `.env.example` somente com placeholders seguros.
- Não commitar `.env`.
- Não usar configuração local sem certificado como produção.
- Não adicionar lógica de negócio em entrypoints, scripts Docker ou Nginx.

## API

- A imagem da API deve publicar somente o projeto `Api`.
- Configurações RavenDB devem entrar via variáveis `RavenDb__...`.
- `ASPNETCORE_ENVIRONMENT=Development` deve aparecer somente em configuração local.
- O container não deve acessar RavenDB diretamente fora da aplicação; quem usa RavenDB é a Infrastructure por DI.

## Web

- A imagem web deve compilar Angular e servir arquivos estáticos.
- Chamadas para API devem usar configuração explícita ou proxy reverso documentado.
- Não migrar runner de testes frontend por causa de Docker.

## RavenDB

- Usar volumes para `/var/lib/ravendb/data` e `/etc/ravendb`.
- Usar acesso sem certificado somente para desenvolvimento local.
- Não montar certificados reais versionados no repositório.
