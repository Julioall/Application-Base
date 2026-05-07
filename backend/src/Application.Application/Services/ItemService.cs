using Application.Application.DTOs;
using Application.Application.Interfaces;
using Application.Domain.Entities;
using Application.Domain.Interfaces;

namespace Application.Application.Services;

public class ItemService : IItemService
{
    private readonly IItemRepository _repository;

    public ItemService(IItemRepository repository)
    {
        _repository = repository;
    }

    public async Task<IReadOnlyList<ItemResponse>> GetAllAsync(CancellationToken cancellationToken = default)
    {
        var items = await _repository.GetAllAsync(cancellationToken);

        return items
            .Select(i => new ItemResponse(i.Id, i.Name, i.CreatedAt))
            .ToList();
    }

    public async Task<ItemResponse> CreateAsync(CreateItemRequest request, CancellationToken cancellationToken = default)
    {
        if (string.IsNullOrWhiteSpace(request.Name))
            throw new ArgumentException("Name is required.", nameof(request));

        var item = new Item
        {
            Name = request.Name.Trim(),
            CreatedAt = DateTime.UtcNow
        };

        await _repository.AddAsync(item, cancellationToken);

        return new ItemResponse(item.Id, item.Name, item.CreatedAt);
    }
}
