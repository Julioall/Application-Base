---
description: Implementar um caso de uso seguindo Onion Architecture com RavenDB.
---

# Implementar caso de uso

Implemente o seguinte caso de uso:

`{{input}}`

## Processo obrigatório

1. Identifique entidades envolvidas.
2. Identifique DTOs necessários.
3. Crie ou ajuste interface de repository.
4. Crie ou ajuste service na camada Application.
5. Crie ou ajuste implementação RavenDB do repository na Infrastructure.
6. Crie ou ajuste controller fino na Api.
7. Registre dependências via DI.
8. Crie testes xUnit somente para o service.
9. Execute build e testes.

## Restrições

- Não colocar regra de negócio em controller.
- Não colocar regra de negócio em repository.
- Não quebrar direção das dependências.
- Não expor RavenDB fora da Infrastructure.
- Não testar controller ou repository.
