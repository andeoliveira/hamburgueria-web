# Hambúrgueria - Web (Frontend - Anderson)

## Tecnologias aplicadas ao projeto

Angular
Typescript
SCSS
HTML 5

## Executar aplicação em ambiente de desenvolvimento:

Execute `ng serve` no terminal. Abra o navegador `http://localhost:4200/`. A aplicação irá carregar e em qualquer alteração de arquivos do projeto ele irá recarregar.

## Build

Para gerar uma versão execute o comando `ng build`. O build irá gerar os artefatos na pasta `dist/`. Para versão de produção adicione o parâmetro `--prod`.

## Docker

Para executar o build e criar uma imagem docker execute os arquivo: `BuildDocker.bat` ou execute o comando no terminal: `docker build -t frontend .` e na sequência execute o arquivo: `RunAppDocker.Bat` ou execute no terminal o comando:`docker run --name angular -d -p 80:80 frontend`. 
O Projeto irá rodar na porta 80 e fazer as requisições na API (8080). 

