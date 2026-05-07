using Application.Application.Interfaces;
using Application.Application.Services;
using Microsoft.Extensions.DependencyInjection;

namespace Application.Application;

public static class DependencyInjection
{
    public static IServiceCollection AddApplication(this IServiceCollection services)
    {
        services.AddScoped<IItemService, ItemService>();
        return services;
    }
}
