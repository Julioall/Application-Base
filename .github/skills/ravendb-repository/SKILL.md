# Skill: RavenDB Repository

## Quando usar

Use esta skill ao criar ou alterar repositories, configuração RavenDB, `IDocumentStore` ou persistência.

## Objetivo

Isolar RavenDB na Infrastructure e manter Application/Domain independentes de persistência.

## Procedimento

1. Verifique se o contrato do repository já existe.
2. Garanta que o contrato não expõe tipos RavenDB.
3. Injete `IDocumentStore` na implementação concreta.
4. Abra `IAsyncDocumentSession` dentro da operação.
5. Use operações assíncronas.
6. Chame `SaveChangesAsync` em escrita.
7. Registre a implementação no DI.
8. Não crie teste unitário de repository salvo pedido explícito.

## Checklist

- `RavenDB.Client` está referenciado somente na Infrastructure?
- O repository não contém regra de negócio?
- O service depende de interface?
- O controller não acessa RavenDB?
- `IDocumentStore` é singleton?
- As sessões são descartadas corretamente?
