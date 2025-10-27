# API de Incidentes de Segurança Pública

Esta API permite o registro e monitoramento de incidentes relacionados à segurança pública, com autenticação JWT e documentação Swagger.

## Papéis
- **Cidadão**: pode se cadastrar, logar e registrar ocorrências.
- **Servidor público**: pode se cadastrar (rota restrita), logar e alterar o status das ocorrências.

## Funcionalidades
- Cadastro e autenticação de usuários (cidadão e servidor público)
- Registro de incidentes geolocalizados
- Listagem e consulta de incidentes
- Alteração de status de incidentes (apenas servidor público)
- Listagem dos tipos de ocorrência
- Documentação Swagger disponível em `/api/docs`

## Endpoints Principais
- `POST /api/users/register`: Cadastro de cidadão
- `POST /api/users/login`: Login do cidadão
- `POST /api/officials/register`: Cadastro de servidor público (restrito)
- `POST /api/officials/login`: Login do servidor público
- `GET /api/officials/{id}`: Visualizar cadastro público de servidor
- `GET /api/incidents/types`: Listar tipos de ocorrência
- `POST /api/incidents`: Criar novo incidente (cidadão autenticado)
- `GET /api/incidents`: Listar incidentes (autenticado)
- `GET /api/incidents/{id}`: Buscar incidente por ID (autenticado)
- `PATCH /api/incidents/{id}/status`: Alterar status do incidente (apenas servidor público autenticado)
- `GET /api/docs`: Documentação Swagger

## Autenticação
- Utilize o token JWT retornado no login no header `Authorization: Bearer <token>` para acessar rotas protegidas.

## Como subir o servidor
1. Crie o arquivo `package.json` (se ainda não fez):
   ```bash
   npm init -y
   ```
2. Instale as dependências:
   ```bash
   npm install express jsonwebtoken bcryptjs uuid 
   npm install swagger-ui-express
   ```
3. Inicie o servidor:
   ```bash
   node src/server.js
   ```

## Acesse a documentação Swagger
- [http://localhost:3000/api/docs](http://localhost:3000/api/docs)

## Observações
- Banco de dados em memória (os dados são perdidos ao reiniciar o servidor)
- O alerta em mapa deve ser implementado no frontend (não incluso nesta API)
