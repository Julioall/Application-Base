---
applyTo: "**/*Tests*.cs"
---

# Testes backend com xUnit

## Escopo

Este projeto testa somente Services da camada Application.

Não criar testes unitários para:

- Controllers.
- Repositories RavenDB.
- `IDocumentStore`.
- `IAsyncDocumentSession`.
- Índices RavenDB.
- Program.cs.

## Framework

Usar xUnit.

## Bibliotecas permitidas

Preferir:

- xUnit.
- FluentAssertions.
- Moq ou NSubstitute, conforme o projeto estiver configurado.

Não adicionar nova biblioteca sem justificativa.

## Padrão dos testes

Usar Arrange, Act, Assert.

Exemplo:

```cs
public sealed class CustomerServiceTests
{
    private readonly Mock<ICustomerRepository> _customerRepositoryMock;
    private readonly CustomerService _service;

    public CustomerServiceTests()
    {
        _customerRepositoryMock = new Mock<ICustomerRepository>();

        _service = new CustomerService(
            _customerRepositoryMock.Object);
    }

    [Fact]
    public async Task CreateAsync_WhenEmailAlreadyExists_ShouldReturnFailure()
    {
        // Arrange
        var request = new CreateCustomerRequest("John", "john@email.com");

        _customerRepositoryMock
            .Setup(x => x.ExistsByEmailAsync(request.Email, It.IsAny<CancellationToken>()))
            .ReturnsAsync(true);

        // Act
        var result = await _service.CreateAsync(request, CancellationToken.None);

        // Assert
        result.IsSuccess.Should().BeFalse();
    }
}
```

## O que testar

Testar:

- Fluxo de sucesso.
- Fluxo de erro.
- Validação de entrada.
- Regra de negócio.
- Recurso não encontrado.
- Chamada esperada ao repository.
- Não chamada ao repository quando validação falha.

## O que evitar

Evitar:

- Testar implementação interna.
- Testar detalhes de mock sem valor funcional.
- Testar controller indiretamente.
- Testar repository com banco real.
- Testar RavenDB em teste unitário de service.
- Testes dependentes de data/hora real.
