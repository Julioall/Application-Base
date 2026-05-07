using Application.Application;
using Application.Application.DTOs;
using Application.Application.Interfaces;
using Application.Infrastructure;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddOpenApi();
builder.Services.AddApplication();
builder.Services.AddInfrastructure(builder.Configuration);

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseExceptionHandler("/error");
app.Map("/error", () => Results.Problem(statusCode: 500));

app.UseHttpsRedirection();

app.MapGet("/api/items", async (IItemService itemService, CancellationToken cancellationToken) =>
{
    var items = await itemService.GetAllAsync(cancellationToken);
    return Results.Ok(items);
})
.WithName("GetItems");

app.MapPost("/api/items", async (CreateItemRequest request, IItemService itemService, CancellationToken cancellationToken) =>
{
    if (string.IsNullOrWhiteSpace(request.Name))
        return Results.ValidationProblem(new Dictionary<string, string[]>
        {
            { nameof(request.Name), ["Name is required."] }
        });

    var item = await itemService.CreateAsync(request, cancellationToken);
    return Results.Created($"/api/items/{item.Id}", item);
})
.WithName("CreateItem");

app.Run();
