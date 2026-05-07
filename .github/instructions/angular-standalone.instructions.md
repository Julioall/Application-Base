---
applyTo: "**/*.{ts,html,scss,css}"
---

# Angular Standalone

## Padrão

Usar Angular standalone. Standalone components são o padrão esperado neste projeto. Nunca criar NgModule.

## Arquitetura

O projeto segue estrutura por feature:

```
src/app/
├── core/               # Serviços singleton, guards, interceptors, tokens de injeção
│   ├── guards/
│   ├── interceptors/
│   └── services/
├── shared/             # Componentes, diretivas e pipes reutilizáveis
│   ├── components/
│   ├── directives/
│   └── pipes/
├── layout/             # Componentes de estrutura visual (header, sidebar)
│   ├── header/
│   └── sidebar/
└── features/           # Páginas lazy-loaded por domínio
    └── [feature]/
        ├── [feature].component.ts
        ├── [feature].routes.ts
        └── services/
```

### Regras de camada

- `core/` — serviços providos na raiz com `providedIn: 'root'`. Não importar em `shared/` ou `features/`.
- `shared/` — apenas componentes genéricos e reutilizáveis. Sem dependências de `features/` ou `core/services/`.
- `layout/` — componentes estruturais da aplicação. Importados diretamente no `AppComponent` ou no shell.
- `features/` — cada feature tem seus próprios componentes, serviços locais e rotas. Lazy-loaded por padrão.

## Biblioteca de UI

O projeto usa **Angular Material** (versão alinhada ao Angular do projeto).

### Regras Angular Material

- Importar somente os módulos Material necessários por componente (standalone import).
- Usar `provideAnimationsAsync()` no `app.config.ts`.
- Usar a diretiva de tema M3 via `mat.theme()` no `styles.scss`.
- Não duplicar estilos que o Material já fornece.
- Preferir componentes Material para formulários, botões, tabelas, diálogos e inputs.
- Usar `MatSnackBar` para notificações de feedback ao usuário.
- Usar `MatDialog` para confirmações e formulários modais.

## Componentes

Componentes devem:

- Ser standalone.
- Ter responsabilidade clara e única.
- Delegar comunicação HTTP para services.
- Evitar regra de negócio pesada.
- Usar tipagem explícita.
- Tratar loading, erro e estado vazio.

Exemplo mínimo:

```ts
@Component({
  selector: 'app-customer-list',
  standalone: true,
  imports: [MatTableModule, MatProgressSpinnerModule],
  templateUrl: './customer-list.component.html',
})
export class CustomerListComponent {
}
```

Nomenclatura:
- Arquivo: `kebab-case.component.ts`
- Classe: `PascalCaseComponent`
- Seletor: `app-kebab-case`

## Services

Services devem:

- Concentrar chamadas HTTP.
- Retornar tipos explícitos.
- Não usar `any`.
- Isolar URLs e contratos de API.
- Ser testáveis e injetáveis.
- Serviços de `core/` usam `providedIn: 'root'`.
- Serviços de `features/` usam `providedIn: 'root'` ou são providos no componente pai, conforme escopo.

## Rotas

- Lazy-loading obrigatório para features: usar `loadComponent` ou `loadChildren`.
- Cada feature define seu próprio arquivo `[feature].routes.ts`.
- `app.routes.ts` importa as rotas de cada feature.

```ts
export const routes: Routes = [
  {
    path: 'customers',
    loadChildren: () => import('./features/customers/customers.routes').then(m => m.CUSTOMERS_ROUTES),
  }
];
```

## Testes frontend

Usar **Vitest** (runner configurado no projeto). Não migrar para Jest/Karma.

Testar:

- Services Angular.
- Comportamento relevante de componentes quando necessário.
- Integração com HttpClient usando mocks.

Evitar:

- Testes frágeis de template.
- Testar detalhes internos.
- Subscriptions sem cleanup.

## RxJS

Preferir:

- `async pipe`.
- `takeUntilDestroyed`.
- `DestroyRef`.
- Operadores claros e pequenos.

Evitar subscriptions manuais sem controle de ciclo de vida.

## Formulários

- Preferir **Reactive Forms** com `FormBuilder`.
- Usar validadores do Angular (`Validators.required`, etc.).
- Integrar com componentes `MatFormField`, `MatInput`, `MatSelect`.

## HTTP

- Usar `HttpClient` via injeção de dependência.
- Usar `inject(HttpClient)` ou injeção no construtor.
- Mapear erros com `catchError`.
- Não expor `Observable<any>` — tipar sempre.
