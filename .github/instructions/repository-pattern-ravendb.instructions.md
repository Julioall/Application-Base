---
applyTo: "**/*.cs"
---

# Repository Pattern com RavenDB

## Objetivo

Repositories devem isolar o acesso ao RavenDB e proteger a camada Application dos detalhes de persistência.

## Regras

- Services dependem de interfaces de repositories.
- Implementações concretas ficam na camada Infrastructure.
- Repositories não devem conter regra de negócio.
- Repositories não devem retornar `IQueryable`.
- Repositories não devem expor tipos RavenDB fora da Infrastructure.
- Repositories devem expor métodos orientados ao caso de uso.
- Usar `CancellationToken` em métodos assíncronos.
- Métodos assíncronos devem terminar com `Async`.
- Usar `IAsyncDocumentSession` para operações assíncronas.
- Chamar `SaveChangesAsync` para persistir alterações.

## Exemplo de interface

```cs
public interface ICustomerRepository
{
    Task<Customer?> GetByIdAsync(string id, CancellationToken cancellationToken);
    Task<bool> ExistsByEmailAsync(string email, CancellationToken cancellationToken);
    Task AddAsync(Customer customer, CancellationToken cancellationToken);
}
```

## Exemplo de implementação RavenDB

```cs
using Raven.Client.Documents;
using Project.Application.Customers;
using Project.Domain.Customers;

namespace Project.Infrastructure.Persistence.Repositories;

public sealed class CustomerRepository : ICustomerRepository
{
    private readonly IDocumentStore _documentStore;

    public CustomerRepository(IDocumentStore documentStore)
    {
        _documentStore = documentStore;
    }

    public async Task<Customer?> GetByIdAsync(string id, CancellationToken cancellationToken)
    {
        await using var session = _documentStore.OpenAsyncSession();
        return await session.LoadAsync<Customer>(id, cancellationToken);
    }

    public async Task<bool> ExistsByEmailAsync(string email, CancellationToken cancellationToken)
    {
        await using var session = _documentStore.OpenAsyncSession();

        return await session.Query<Customer>()
            .AnyAsync(x => x.Email == email, cancellationToken);
    }

    public async Task AddAsync(Customer customer, CancellationToken cancellationToken)
    {
        await using var session = _documentStore.OpenAsyncSession();
        await session.StoreAsync(customer, cancellationToken);
        await session.SaveChangesAsync(cancellationToken);
    }
}
```

## Proibido

Não retornar `IQueryable`:

```cs
IQueryable<Customer> GetAll();
```

Não expor sessão RavenDB:

```cs
IAsyncDocumentSession OpenSession();
```

Não colocar regra de negócio:

```cs
Task ApproveCustomerAsync(Customer customer);
```

Esse tipo de regra deve ficar em service/use case.
