# agrocontroll
## Projeto AgroControll
Este é um sistema no qual será possível supervisionar os agricultores que fazem uso de algum tipo de agrotóxico.

## FrontEnd
![image](https://user-images.githubusercontent.com/68739172/157062173-558c2723-8cc0-4125-acc0-4bb2714c80a4.png)

1º Acesse a pasta agrocontroll com o comando: **cd agrocontroll** <br />
2º Execute o comando: **npm install** ; // Este comando serve para instalar as dependências usadas no front end <br />
3º Execute o comando: **npm run serve** ; // Este comando irá iniciar a apliação na porta 8080 <br />

## Backend
1º Entre na pasta backend com o comando: **cd backend** <br />
2º Execute o comando: **npm install** <br />
3º Faça uma cópia do arquivo envFile <br />
4º Renomear o arquivo para .env <br />
5º preencha com suas informações, senha, porta, usuário, seguindo o modelo já pronto <br />
6º Instale o query builder Knex globalmente com o comando: **npm install knex -g** <br />
7º execute o comando: **knex migrate:latest** ; // para criar as tabelas no banco de dados usando as migrations já prontas enviadas aqui no repositório <br />
8º Tudo pronto para executar o servidor, use o comando: **npm start** <br />
