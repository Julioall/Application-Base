---
description: Criar uma feature Angular standalone.
---

# Criar feature Angular standalone

Implemente a seguinte feature no Angular:

`{{input}}`

## Processo

1. Identifique rota, componente, service e models necessários.
2. Crie standalone component.
3. Crie ou ajuste service HTTP tipado.
4. Crie interfaces para request/response.
5. Trate loading, erro e estado vazio.
6. Adicione testes com Jest ou Karma conforme configuração existente.
7. Execute lint, testes e build.

## Restrições

- Não criar NgModule sem necessidade.
- Não usar `any` sem justificativa.
- Não colocar chamada HTTP diretamente em componente quando existir service.
- Não migrar runner de testes.
