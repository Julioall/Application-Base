---
applyTo: "**/*.{cs,csproj,sln,json}"
---

# .NET 10

## Regras gerais

- Usar C# moderno.
- Manter nullable reference types habilitado.
- Usar `async/await` corretamente.
- Usar `CancellationToken`.
- Usar `ILogger<T>` para logs.
- Usar Options Pattern para configurações.
- Usar Dependency Injection nativa do ASP.NET Core.
- Não usar service locator.
- Não resolver dependências manualmente com `IServiceProvider` salvo em casos técnicos justificados.

## Program.cs

Registrar dependências por camada:

```cs
builder.Services.AddApplication();
builder.Services.AddInfrastructure(builder.Configuration);
```

## Application

A camada Application deve expor método de registro:

```cs
public static class DependencyInjection
{
    public static IServiceCollection AddApplication(this IServiceCollection services)
    {
        services.AddScoped<ICustomerService, CustomerService>();
        return services;
    }
}
```

## Infrastructure

A camada Infrastructure deve expor método de registro:

```cs
public static class DependencyInjection
{
    public static IServiceCollection AddInfrastructure(
        this IServiceCollection services,
        IConfiguration configuration)
    {
        services.AddRavenDb(configuration);
        services.AddScoped<ICustomerRepository, CustomerRepository>();

        return services;
    }
}
```

## Lifetimes

Use:

- `Singleton` para `IDocumentStore`.
- `Scoped` para services de aplicação.
- `Scoped` para repositories.
- `Singleton` somente para serviços stateless e seguros.
- `Transient` para serviços leves sem estado.

Não injetar serviço `Scoped` em `Singleton`.
