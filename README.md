<div align="center">
  <a name="readme-top"></a>

  <h1>Cine List</h1>

🚧 **ATENÇÃO: ESTE PROJETO ESTÁ EM DESENVOLVIMENTO!** 🚧

  <p>
     Plataforma para acompanhamento do consumo de mídias
  </p>

</div>

---

<p align="center">
  <!-- Status da CI/CD (link) - Em validação... -->

  <!-- Tecnologias -->

![Node.js](https://img.shields.io/badge/Node.js-18.x-green?logo=node.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?logo=typescript)
![Vue.js](https://img.shields.io/badge/Vue.js-2.x-brightgreen?logo=vue.js)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.x-blue?logo=tailwindcss)
![Docker](https://img.shields.io/badge/Docker-blue?logo=docker)

</p>

## 🚀 Como Rodar o Projeto Localmente

O front-end do **CineList** pode ser executado de duas formas: com **Docker** ou **Node.js**. Abaixo, explicamos ambas as opções.

### Rodando com Docker

Se você preferir usar o **Docker** para rodar o projeto, siga os passos abaixo.

## ✅ **Pré-requisitos**

- **VueJs** (v2)
- **NPM**

#### Passos:

1. Certifique-se de ter o [Docker](https://www.docker.com/get-started) instalado na sua máquina.

2. Clone o repositório do **CineList**:

   ```bash
   git clone https://github.com/usuário/cinelist.git
   cd cinelist
   ```

3. No diretório do projeto, construa a imagem Docker e inicie o container:

   ```bash
   docker build -t cinelist-image .
   ```

4. Após a construção da imagem, inicie o container:

   ```bash
   docker run -p 8080:8080 cinelist-image
   ```

5. Acesse o projeto no seu navegador:

   ```bash
   http://localhost:8080
   ```

Com isso, o front-end estará rodando localmente dentro de um container Docker.
Se rodar a api user e task, deve alterar as urls no arquivo environments.js.
Deixei publica as urls, após o teste estarei encerrando as funções lambdas.

### Rodando com Node.js

Se você preferir rodar o projeto usando **Node.js**, siga os passos abaixo.

#### Passos:

1. Certifique-se de ter o [Node.js](https://nodejs.org/) (versão 18 ou superior) instalado na sua máquina.

2. Clone o repositório do **CineList**:

   ```bash
   git clone https://github.com/usuário/cinelist.git
   cd cinelist
   ```

3. Instale as dependências do projeto:

   ```bash
   npm install
   ```

4. Execute o servidor de desenvolvimento:

   ```bash
   npm run dev
   ```

5. Acesse o projeto no seu navegador:

   ```bash
   http://localhost:8080
   ```

---

## ⚠️ **Aviso Importante - Cold Start nas Funções Lambda**

**Devido às funções Lambda operarem por eventos, elas ficam no estado _cold start_ ao serem invocadas pela primeira vez após um período de inatividade.**

⚡ **Impacto**: Para evitar custos adicionais, optei por não utilizar o serviço "Keep Alive" da AWS, que manteria as funções "aquecidas", nem o provisionamento de simultaneidade. Isso pode resultar em latência e até falhas nas primeiras requisições feitas às funções Lambda, seja por meio do Swagger ou pela plataforma CineList.

Após o primeiro cold start, as funções começam a operar normalmente, e a latência tende a diminuir. Recomenda-se aguardar até o primeiro uso para evitar o impacto das latências iniciais nas primeiras requisições.

---

## 📜 Licença

- Este projeto está licenciado sob a MIT License. Confira em `LICENSE.txt`.

## 📞 Contato

- **Email**: izaacledererjunior@gmail.com

---

<p align="right">(<a href="#readme-top">voltar ao topo</a>)</p>
