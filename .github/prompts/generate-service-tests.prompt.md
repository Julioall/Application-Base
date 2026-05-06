---
description: Criar testes xUnit para um service.
---

# Gerar testes de Service

Crie testes xUnit para o seguinte service ou cenário:

`{{input}}`

## Escopo

Testar somente o Service da camada Application.

## Incluir testes para

- Sucesso.
- Entrada inválida.
- Recurso não encontrado.
- Regra de negócio violada.
- Repository chamado quando deve.
- Repository não chamado quando validação falha.

## Não criar

- Testes de controller.
- Testes de repository.
- Testes de RavenDB.
- Testes de `IDocumentStore`.
- Testes de `IAsyncDocumentSession`.

## Formato

- Usar Arrange, Act, Assert.
- Usar nomes descritivos.
- Usar mocks para repositories.
