---
applyTo: "**/*.cs"
---

# SOLID

## SRP — Single Responsibility Principle

Cada classe deve ter uma responsabilidade clara.

Evite:

- Services grandes demais.
- Controllers com lógica de negócio.
- Repositories com regra de negócio.
- Classes utilitárias genéricas sem coesão.

## OCP — Open/Closed Principle

Prefira extensão por interfaces, estratégias ou novos handlers quando isso evitar alteração arriscada em código estável.

Não criar abstrações prematuras.

## LSP — Liskov Substitution Principle

Implementações de interfaces devem respeitar o contrato esperado.

Não lançar `NotImplementedException` em membros de interfaces usadas em produção.

## ISP — Interface Segregation Principle

Interfaces devem ser pequenas e específicas.

Evite interfaces genéricas demais.

## DIP — Dependency Inversion Principle

Camadas de alto nível devem depender de abstrações.

Services devem depender de interfaces, por exemplo:

```cs
public sealed class CustomerService
{
    private readonly ICustomerRepository _customerRepository;

    public CustomerService(ICustomerRepository customerRepository)
    {
        _customerRepository = customerRepository;
    }
}
```

Não fazer:

```cs
public sealed class CustomerService
{
    private readonly CustomerRepository _customerRepository = new();
}
```
