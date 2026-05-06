---
applyTo: "**/*"
---

# Segurança

- Nunca criar ou sugerir secrets reais.
- Nunca commitar tokens, senhas, certificados ou connection strings reais.
- Usar placeholders seguros em exemplos.
- Validar entrada no backend.
- Proteger endpoints sensíveis com autenticação/autorização.
- Não expor exceções internas ao cliente.
- Não registrar dados pessoais ou sensíveis em logs.
- Revisar dependências novas quanto à necessidade e manutenção.

## RavenDB

- Não commitar certificados RavenDB reais.
- Não commitar URLs, usuários ou credenciais de produção.
- Usar configuração por ambiente.
- Usar placeholders no `appsettings.example.json`.
- Não logar documentos inteiros quando puderem conter dados sensíveis.
