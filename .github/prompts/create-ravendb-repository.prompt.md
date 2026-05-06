---
description: Criar um repository RavenDB na camada Infrastructure.
---

# Criar repository RavenDB

Crie ou ajuste o repository para:

`{{input}}`

## Processo

1. Verifique se já existe interface de repository.
2. Garanta que a interface não exponha tipos RavenDB.
3. Crie implementação em Infrastructure.
4. Injete `IDocumentStore` no construtor.
5. Abra `IAsyncDocumentSession` dentro dos métodos.
6. Use `StoreAsync`, `LoadAsync`, `Query` ou `Delete` conforme o caso.
7. Use `SaveChangesAsync` em operações de escrita.
8. Registre o repository via DI.

## Restrições

- Não colocar regra de negócio no repository.
- Não retornar `IQueryable`.
- Não expor `IAsyncDocumentSession`.
- Não criar `DocumentStore` dentro do repository.
