using Application.Application.DTOs;
using Application.Application.Services;
using Application.Domain.Entities;
using Application.Domain.Interfaces;
using FluentAssertions;
using NSubstitute;

namespace Application.Application.Tests.Services;

public class ItemServiceTests
{
    private readonly IItemRepository _repository;
    private readonly ItemService _sut;

    public ItemServiceTests()
    {
        _repository = Substitute.For<IItemRepository>();
        _sut = new ItemService(_repository);
    }

    // GetAllAsync

    [Fact]
    public async Task GetAllAsync_WhenRepositoryReturnsEmpty_ShouldReturnEmptyList()
    {
        // Arrange
        _repository.GetAllAsync(Arg.Any<CancellationToken>())
            .Returns(new List<Item>());

        // Act
        var result = await _sut.GetAllAsync();

        // Assert
        result.Should().BeEmpty();
    }

    [Fact]
    public async Task GetAllAsync_WhenRepositoryReturnsItems_ShouldMapToResponseCorrectly()
    {
        // Arrange
        var createdAt = new DateTime(2026, 1, 15, 10, 0, 0, DateTimeKind.Utc);
        var items = new List<Item>
        {
            new() { Id = "items/1", Name = "Caneta", CreatedAt = createdAt },
            new() { Id = "items/2", Name = "Caderno", CreatedAt = createdAt }
        };

        _repository.GetAllAsync(Arg.Any<CancellationToken>())
            .Returns(items);

        // Act
        var result = await _sut.GetAllAsync();

        // Assert
        result.Should().HaveCount(2);
        result[0].Should().BeEquivalentTo(new ItemResponse("items/1", "Caneta", createdAt));
        result[1].Should().BeEquivalentTo(new ItemResponse("items/2", "Caderno", createdAt));
    }

    // CreateAsync

    [Fact]
    public async Task CreateAsync_WithValidName_ShouldAddItemAndReturnResponse()
    {
        // Arrange
        var request = new CreateItemRequest("Caneta");

        // Act
        var result = await _sut.CreateAsync(request);

        // Assert
        await _repository.Received(1).AddAsync(
            Arg.Is<Item>(i => i.Name == "Caneta"),
            Arg.Any<CancellationToken>());

        result.Name.Should().Be("Caneta");
        result.CreatedAt.Should().BeCloseTo(DateTime.UtcNow, TimeSpan.FromSeconds(5));
    }

    [Fact]
    public async Task CreateAsync_WithWhitespaceName_ShouldTrimBeforePersisting()
    {
        // Arrange
        var request = new CreateItemRequest("  Caneta  ");

        // Act
        var result = await _sut.CreateAsync(request);

        // Assert
        await _repository.Received(1).AddAsync(
            Arg.Is<Item>(i => i.Name == "Caneta"),
            Arg.Any<CancellationToken>());

        result.Name.Should().Be("Caneta");
    }

    [Theory]
    [InlineData("")]
    [InlineData("   ")]
    [InlineData(null)]
    public async Task CreateAsync_WithInvalidName_ShouldThrowArgumentExceptionWithoutCallingRepository(string? name)
    {
        // Arrange
        var request = new CreateItemRequest(name!);

        // Act
        var act = async () => await _sut.CreateAsync(request);

        // Assert
        await act.Should().ThrowAsync<ArgumentException>()
            .WithParameterName("request");

        await _repository.DidNotReceive().AddAsync(Arg.Any<Item>(), Arg.Any<CancellationToken>());
    }
}
