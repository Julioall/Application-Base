# Segurança

## Reporte de vulnerabilidades

Não abra issues públicas com tokens, senhas, dados pessoais, connection strings ou detalhes exploráveis.

Use GitHub Security Advisories quando disponível no repositório. Se o repositório ainda não tiver advisory privado habilitado, reporte pelo canal interno definido pela equipe mantenedora.

## Boas práticas neste projeto

- Não commitar secrets reais.
- Não commitar certificados RavenDB reais.
- Usar placeholders seguros em exemplos.
- Não expor exceções internas ao cliente.
- Não registrar dados pessoais ou documentos completos em logs.
- Proteger endpoints sensíveis com autenticação e autorização.
- Validar entradas no backend.
- Revisar dependências novas quanto à necessidade e manutenção.
