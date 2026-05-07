using Application.Domain.Entities;
using Application.Domain.Interfaces;
using Raven.Client.Documents;

namespace Application.Infrastructure.Repositories;

public sealed class ItemRepository : IItemRepository
{
    private readonly IDocumentStore _documentStore;

    public ItemRepository(IDocumentStore documentStore)
    {
        _documentStore = documentStore;
    }

    public async Task<IReadOnlyList<Item>> GetAllAsync(CancellationToken cancellationToken = default)
    {
        using var session = _documentStore.OpenAsyncSession();

        return await session.Query<Item>()
            .ToListAsync(cancellationToken);
    }

    public async Task AddAsync(Item item, CancellationToken cancellationToken = default)
    {
        using var session = _documentStore.OpenAsyncSession();
        await session.StoreAsync(item, cancellationToken);
        await session.SaveChangesAsync(cancellationToken);
    }
}
