# Skill: Onion Architecture

## Quando usar

Use esta skill ao criar ou alterar entidades, services, repositories, controllers, DTOs ou configuração de DI.

## Objetivo

Garantir que o projeto mantenha Onion Architecture.

## Camadas

```txt
Domain
Application
Infrastructure
Api
```

## Regra de dependência

Dependências sempre apontam para dentro.

Permitido:

```txt
Api -> Application
Application -> Domain
Infrastructure -> Application
Infrastructure -> Domain
```

Proibido:

```txt
Domain -> Application
Domain -> Infrastructure
Application -> Infrastructure
Application -> Api
Infrastructure -> Api
```

## Procedimento

1. Identifique onde a regra de negócio deve ficar.
2. Coloque contratos em interfaces.
3. Faça Services dependerem de abstrações.
4. Faça Infrastructure implementar abstrações.
5. Registre dependências no composition root.
6. Crie testes somente para Services.
