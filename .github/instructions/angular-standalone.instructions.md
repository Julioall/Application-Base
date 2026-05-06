---
applyTo: "**/*.{ts,html,scss,css}"
---

# Angular Standalone

## Padrão

Usar Angular standalone.

Standalone components são o padrão esperado neste projeto.

## Componentes

Componentes devem:

- Ser standalone.
- Ter responsabilidade clara.
- Delegar comunicação HTTP para services.
- Evitar regra de negócio pesada.
- Usar tipagem explícita.
- Tratar loading, erro e estado vazio.

Exemplo:

```ts
@Component({
  selector: 'app-customer-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './customer-list.component.html',
})
export class CustomerListComponent {
}
```

## Services

Services devem:

- Concentrar chamadas HTTP.
- Retornar tipos explícitos.
- Não usar `any`.
- Isolar URLs e contratos.
- Ser testáveis.

## Testes frontend

Usar Jest ou Karma, conforme configuração do projeto.

Não migrar o runner de testes sem pedido explícito.

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
