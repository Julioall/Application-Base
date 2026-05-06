---
applyTo: "**/*.{cs,json,csproj}"
---

# RavenDB

## Uso esperado

RavenDB é o banco de dados do projeto.

A camada Infrastructure deve conter:

- Configuração de RavenDB.
- Registro do `IDocumentStore`.
- Implementações de repositories.
- Índices RavenDB, quando necessários.

## Configuração

Usar seção de configuração:

```json
{
  "RavenDb": {
    "Urls": ["http://localhost:8080"],
    "Database": "Project"
  }
}
```

## Options

Criar options tipadas:

```cs
public sealed class RavenDbOptions
{
    public const string SectionName = "RavenDb";

    public string[] Urls { get; init; } = [];
    public string Database { get; init; } = string.Empty;
}
```

## Registro de DI

Registrar `IDocumentStore` como singleton:

```cs
services.Configure<RavenDbOptions>(configuration.GetSection(RavenDbOptions.SectionName));

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
```

## Regras

- Não criar `DocumentStore` dentro de repository.
- Não registrar `IDocumentStore` como scoped ou transient.
- Não passar `IAsyncDocumentSession` para Application.
- Não usar RavenDB diretamente em controllers.
- Não chamar RavenDB diretamente em services.
- Não usar migrations relacionais.
- Criar índices RavenDB quando consultas relevantes exigirem índice explícito.

## Testes

Testes unitários de Services devem mockar repositories.

Não usar RavenDB real nem RavenDB TestDriver em testes unitários de Services, salvo pedido explícito para testes de integração.
