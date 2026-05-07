using System.ComponentModel.DataAnnotations;

namespace Application.Infrastructure.Configuration;

public sealed class RavenDbOptions
{
    public const string SectionName = "RavenDb";

    [Required]
    [MinLength(1)]
    public string[] Urls { get; init; } = [];

    [Required]
    [MinLength(1)]
    public string Database { get; init; } = string.Empty;
}
