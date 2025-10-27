1. Objetivo: 

Criar uma API Rest que registra ocorrências de incidentes relacionados a segurança pública.
Cidadão cria cadastro e registra ocorrência. Tal registro gera um alerta em mapa. Servidor público é o unico capaz de alterar status da ocorrência para: em andamento e finalizado, e cadastro do servidor público (órgão oficial) não está disponível para o cidadão que não tem acesso a essa possibilidade, só visualiza cadastro básico.

2. Contexto: Cidadão faz cadastro e escolhe um tipo de ocorrência a relatar entre: 
    • Roubo / Furto
    • Agressão / Lesão corporal
    • Crime ambiental
    • Acidente de trânsito 
    • Suspeita / Comportamento estranho
    • Importunação / Crime sexual

      Descreve a ocorrência em texto e aciona o serviço de socorro ou urgência desejado por meio de botão – implementação futura com front-end. O status da ocorrência aberta pelo cidadão, é alterado somente pelo servidor público entre: em andamento, finalizado. 
      O alerta em mapa é gerado automaticamente pela localização do cidadão que abriu o chamado.

3. Regras:

    • Somente Arquitetura simples de API
    • Usar somente linguagem de programação JavaScript
    • Cadastro e visualização de servidores públicos não são visíveis ao cidadão (restrito).
    • Número de pessoas a reportar a mesma ocorrência é indeterminado.
    • A documentação da API deve ser feita com Swagger, em forma de arquivo, crie esse arquivo em uma pasta de recursos. O swagger precisa descrever o modelo JSON da resposta de cada endpoint com base na forma que API for implementada. O Swagger também deve contemplar os status code de erro que serão implementados na API.
    • Adicione um endpoint para renderizar o Swagger.
    • Construa um arquivo README para descrever o projeto
    • Divida a API em camadas: routes, controllers, service e model
    • Armazene os dados da API em um banco de dados em memória
    • Utilize a biblioteca express para construir a API Rest
    • Faça com que a autenticação seja parte do Middleware, utilizando token JWT como modelo de autenticação, e implemente as regras de autenticação seguindo as informações descritas no contexto.
