# Delivery App

[Trybe](https://www.betrybe.com/) is a technology school focused on training Web Developers and the Delivery App project was proposed as an activity to improve studies on back-end development.

The project was developed with the following team: [Raissa Vasconcelos](https://github.com/RaissaVasconcelos), [Rafael Alencar](https://github.com/rafaeldev13), [Luiz Junior](https://github.com/jcaluiz), [Yan Chapetta](https://github.com/chapetta).


## Description

Delivery App is a Full Stack application to support a beer distributor. This app supports customers, sellers and the administrator person.

#### Costumer

As a consumer you must login or register, if you do not have an account, then you will have access to a list of products that can be added to the cart. When choosing the products, you will be redirected to the checkout screen to check your order and then you will be able to finalize it. You will also have access to your entire order history.


#### Seller

If you are a registered seller you can login and access to your entire order history. When you click in a order, you can see the order details.


#### Administrator

If you are a administrator user, you can login and access the management sellers page. You can see all the sellers and customers and add new ones.

## Technologies and Tools

<div>
 <img src='https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white' alt='HTML' />
  <img src='https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white' alt='CSS3' />
  <img src='https://img.shields.io/badge/Material%20UI-007FFF?style=for-the-badge&logo=mui&logoColor=white' alt='Material ui' />
  <img src='https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black' alt='JavaScript' />
  <img src='https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB' alt='ReactJS' />
  <img src='https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white' alt='React-router' />
  <img src='https://img.shields.io/badge/eslint-3A33D1?style=for-the-badge&logo=eslint&logoColor=white' alt='ESlint' />
  <img src='https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=jest&logoColor=white' alt='Jest' />
  <img src="https://img.shields.io/badge/MySQL-005C84?style=for-the-badge&logo=mysql&logoColor=white" alt="Mysql"/>
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="NodeJS"/>
  <img src="https://img.shields.io/badge/Docker-2CA5E0?style=for-the-badge&logo=docker&logoColor=white" alt="Docker"/>
  <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express"/>
  <img src="https://img.shields.io/badge/Sequelize-52B0E7?style=for-the-badge&logo=Sequelize&logoColor=white" alt="Sequelize"/>
  <img src="https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=JSON%20web%20tokens&logoColor=white" alt="jwt"/>
  <img src="https://img.shields.io/badge/Mocha-8D6748?style=for-the-badge&logo=Mocha&logoColor=white" alt="mocha"/>
</div>
<br>

### Front-end
- HTML
- CSS
- JavaScript
- [ReactJS](https://pt-br.reactjs.org/)
- [React router](https://reactrouter.com/en/main)
- [Material ui](https://mui.com/)

### Back-end
- [Express](https://expressjs.com/pt-br/)
- [NodeJs](https://nodejs.org/en/)
- [Docker](https://www.docker.com/)
- [Sequelize](https://sequelize.org/)
- [MySQL](https://www.mysql.com/)
- [JWT](https://jwt.io/)
- [Joi](https://joi.dev/)
- Model-Service-Controller Architecture

### Back-end tests
- [Mocha](https://mochajs.org/)
- [Chai](https://www.chaijs.com/)
- [Sinon](https://sinonjs.org/)

### Code alignment
- [ESlint](https://eslint.org/)


## ⚙️ How to use

To run the application, start by making a clone of the repository

     git clone git@github.com:larissaperinoto/delivery-app.git

Navigate to the root folder of the project

    cd delivery-app

<details>
   <summary><strong>Running with Docker</strong></summary>
  </br>

  <strong>Obs:</strong> To run the application this way you must have [Docker](https://www.docker.com/) installed on your machine.

  </br>

  In the root of the project, upload the <strong>delivery_app_frontend</strong>, <strong>delivery_app_backend</strong> and <strong>delivery_app_db</strong> containers using docker-compose.

      docker-compose up -d

  Acess the containers logs:

      frontend: docker logs --details delivery_app_frontend
      backend: docker logs --details delivery_app_backend
      bd: docker logs --details delivery_app_db


</details>

## How to login

##### Login as a customer

 To log in as a user you must register again by clicking on "I don't have an account yet"

##### Login as a seller

  To log in as a seller, use the following credentials

      email: seller@email.com
      passsword: secret_seller_password

#### Login as an administrator

  To log in as a seller, use the following credentials

      email: admin@email.com
      passsword: secret_admin_password

---

Develop by [Larissa Perinoto](www.linkedin.com/in/larissaperinoto), © 2022.
