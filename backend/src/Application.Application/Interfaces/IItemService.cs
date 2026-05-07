using Application.Application.DTOs;

namespace Application.Application.Interfaces;

public interface IItemService
{
    Task<IReadOnlyList<ItemResponse>> GetAllAsync(CancellationToken cancellationToken = default);
    Task<ItemResponse> CreateAsync(CreateItemRequest request, CancellationToken cancellationToken = default);
}
