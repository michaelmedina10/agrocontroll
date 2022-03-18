# agrocontroll
## Projeto AgroControll
Este é um sistema no qual será possível supervisionar os agricultores que fazem uso de algum tipo de agrotóxico.

## FrontEnd
![image](https://user-images.githubusercontent.com/68739172/158995215-1e2f57da-1fef-485b-8207-61d919070d97.png)

Dados Ficticios:
![image](https://user-images.githubusercontent.com/68739172/158995255-4bbc8361-d47b-4852-a124-922a5b42e76a.png)

Cadastrar Registros:
![image](https://user-images.githubusercontent.com/68739172/158995305-5130784e-d125-4bfd-81c8-c41f5aa3c3f5.png)


1º Acesse a pasta agrocontroll com o comando: **cd agrocontroll** <br />
2º Execute o comando: **npm install** ; // Este comando serve para instalar as dependências usadas no front end <br />
3º Execute o comando: **npm run serve** ; // Este comando irá iniciar a apliação na porta 8080 <br />

## Backend
1º Entre na pasta backend com o comando: **cd backend** <br />
2º Execute o comando: **npm install** <br />
3º Faça uma cópia do arquivo envFile <br />
4º Renomear o arquivo para .env <br />
5º preencha com suas informações, senha, porta, usuário, seguindo o modelo já pronto <br />
6º Baixe e instale o mysql <br />
7º Crie um banco de dados chamado agrocontroll, comando: **create database agrocontroll;** <br />
8º Instale o query builder Knex globalmente com o comando: **npm install knex -g** <br />
9º execute o comando: **knex migrate:latest** ; // para criar as tabelas no banco de dados usando as migrations já prontas enviadas aqui no repositório <br />
10º Tudo pronto para executar o servidor, use o comando: **npm start** <br />
