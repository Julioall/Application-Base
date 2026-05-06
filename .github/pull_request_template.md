## Resumo

Descreva objetivamente o que foi alterado.

## Tipo de mudança

- [ ] Bugfix
- [ ] Feature
- [ ] Refatoração
- [ ] Documentação
- [ ] Testes
- [ ] Infra/CI
- [ ] Docker
- [ ] Segurança

## Camadas afetadas

- [ ] Domain
- [ ] Application
- [ ] Infrastructure
- [ ] Api
- [ ] Frontend Angular
- [ ] GitHub/CI
- [ ] Docker
- [ ] Não se aplica

## Arquitetura backend

- [ ] Preserva Onion Architecture.
- [ ] Domain não depende de outras camadas.
- [ ] Application não depende de Infrastructure.
- [ ] RavenDB está isolado na Infrastructure.
- [ ] Controllers continuam finos.
- [ ] Repositories não contêm regra de negócio.
- [ ] Services dependem de interfaces.
- [ ] DTOs são usados em entradas e saídas de API.

## RavenDB

- [ ] `IDocumentStore` continua registrado como singleton.
- [ ] Sessões RavenDB são abertas dentro de repositories ou unidade de trabalho.
- [ ] Tipos RavenDB não vazam para Application, Domain ou DTOs de API.
- [ ] Operações de escrita chamam `SaveChangesAsync`.

## Testes

- [ ] Testes backend cobrem somente Services.
- [ ] Repositories e RavenDB foram mockados nos testes de Service.
- [ ] Runner frontend existente foi preservado.
- [ ] Cenários de sucesso, erro e validação foram considerados quando aplicável.

## Como testar

Comandos executados:

```bash
dotnet restore
dotnet build --configuration Release
dotnet test --configuration Release
npm ci
npm run lint
npm run test
npm run build
docker compose config
```

## Checklist

- [ ] Código compila.
- [ ] Não há secrets ou dados sensíveis.
- [ ] Contratos de API foram preservados ou documentados.
- [ ] Acessibilidade básica foi considerada no frontend.
- [ ] Documentação foi atualizada quando necessário.
- [ ] Riscos e limitações foram descritos abaixo.

## Riscos

Informe riscos, limitações ou pontos que precisam de revisão.
