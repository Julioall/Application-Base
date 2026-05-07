using Application.Domain.Entities;
using Application.Domain.Interfaces;
using Application.Infrastructure.Configuration;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;
using Raven.Client.Documents;

namespace Application.Infrastructure;

public static class DependencyInjection
{
    public static IServiceCollection AddInfrastructure(
        this IServiceCollection services,
        IConfiguration configuration)
    {
        services
            .AddOptions<RavenDbOptions>()
            .Bind(configuration.GetSection(RavenDbOptions.SectionName))
            .ValidateDataAnnotations()
            .ValidateOnStart();

        services.AddSingleton<IDocumentStore>(serviceProvider =>
        {
            var options = serviceProvider
                .GetRequiredService<IOptions<RavenDbOptions>>()
                .Value;

            var store = new DocumentStore
            {
                Urls = options.Urls,
                Database = options.Database
            };

            store.Initialize();

            return store;
        });

        services.AddScoped<IItemRepository, Repositories.ItemRepository>();

        return services;
    }
}
