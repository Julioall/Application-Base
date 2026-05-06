# Skill: .NET Service Testing

## Quando usar

Use esta skill ao criar ou alterar testes backend.

## Objetivo

Criar testes xUnit somente para Services da camada Application.

## Procedimento

1. Localize o service.
2. Liste suas dependências.
3. Mocke repositories e integrações externas.
4. Crie cenários de sucesso.
5. Crie cenários de erro.
6. Crie cenários de validação.
7. Verifique chamadas importantes aos repositories.
8. Execute `dotnet test`.

## Não fazer

- Não testar controllers.
- Não testar repositories.
- Não testar RavenDB.
- Não usar banco real para teste unitário de service.
