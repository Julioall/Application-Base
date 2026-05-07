---
applyTo: "**/*.{ts,tsx,css,scss,html}"
---

# Frontend React + Vite

## Padrao

Usar React com Vite e TypeScript. Componentes funcionais sao o padrao esperado neste projeto.

## Arquitetura

O projeto segue estrutura por feature:

```
frontend/Client/src/
├── app/                # bootstrap da aplicacao, providers globais e roteador
├── core/               # cliente HTTP, configuracao de React Query, utilitarios globais
│   ├── providers/
│   ├── services/
│   └── lib/
├── shared/             # componentes reutilizaveis, hooks e utilitarios
│   ├── components/
│   ├── hooks/
│   └── utils/
├── layout/             # estrutura visual (header, sidebar, shell)
└── features/           # paginas por dominio
    └── [feature]/
        ├── components/
        ├── hooks/
        ├── services/
        ├── schemas/
        ├── types/
        └── routes.tsx
```

### Regras de camada

- `app/` inicializa roteador, providers da aplicacao e composicao principal.
- `core/` contem servicos singleton, cliente HTTP e configuracao compartilhada. Sem dependencia de `features/`.
- `shared/` contem apenas componentes e utilitarios genericos, sem regra de dominio.
- `layout/` contem componentes estruturais da aplicacao.
- `features/` contem UI, hooks, servicos e schemas do proprio dominio.

## Biblioteca de UI

O frontend usa Tailwind CSS, shadcn/ui e Radix UI.

### Regras de UI

- Preferir componentes do shadcn/ui para elementos comuns.
- Usar primitives do Radix UI quando precisar de acessibilidade e composicao avancada.
- Manter consistencia visual com tokens/classes utilitarias do Tailwind.
- Evitar estilos inline extensos quando uma composicao com Tailwind for suficiente.

## Componentes

Componentes devem:

- Ser funcionais e tipados.
- Ter responsabilidade clara e unica.
- Delegar chamadas externas para services/hooks.
- Evitar regra de negocio pesada.
- Tratar loading, erro e estado vazio.

Nomenclatura:
- Arquivo: `kebab-case.tsx`
- Componente: `PascalCase`

## Services e dados remotos

Services devem:

- Concentrar chamadas HTTP.
- Retornar tipos explicitos.
- Nao usar `any`.
- Isolar URLs e contratos de API.
- Usar Axios ou wrapper de fetch.

Dados remotos devem:

- Usar TanStack React Query para cache, loading, retries e invalidacao.
- Evitar fetch/Axios direto em componente, exceto casos simples e justificados.

## Rotas

- Usar React Router.
- Organizar rotas por feature.
- Usar lazy-loading para paginas de features quando aplicavel.

## Formularios e validacao

- Usar React Hook Form.
- Validar entrada com Zod.
- Centralizar schemas em `schemas/` dentro da feature quando forem especificos do dominio.

## Testes frontend

Usar Vitest com Testing Library.

Testar:

- Comportamento relevante de componentes.
- Hooks e services com regras de frontend.
- Fluxos de sucesso, erro e estado vazio.

Evitar:

- Testes frageis acoplados a detalhes de implementacao.
- Validar internals de bibliotecas de terceiros.

## Acessibilidade

- Garantir semantica HTML basica.
- Suportar navegacao por teclado nos componentes interativos.
- Verificar nomes acessiveis em botoes, campos e dialogos.
