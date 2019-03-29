# MEANappDemo
## Basics
* This web application is built by MEAN stack (MogoDB, Express, Angular7, NodeJS)<br>
* All the components used in this project can be seen at the home page. <br>
## MongoDB
* In order to use MongoDB, [MLab](https://www.mongodb.com/cloud/atlas) is chosen to deploy the mongoDB database.<br>
* So, in `./config/database.js`, some changes should be made: <br>
  ```javascript
  module.exports = {
    // database: 'mongodb://localhost:27017/meanauthapi',
    database: 'mongodb+srv://guozhi:12345@meanappdemo-4p5ba.mongodb.net/test?retryWrites=true',
    secret: 'yoursecret'
  }
  ```
## Live App
* This application has been deployed on Heroku Server. Here is the link: [MEANappDemo Link](https://morning-plains-70777.herokuapp.com/)<br>
* The steps of creating live app on Heroku can be found in my repository "Guozhi_Programming_Notes": [Heroku Configuration]() <br>
* In this project, in order to deploy on Heroku, some changes should be made:
  * In `./routes/app.js`, port number should be changed:
    ```javascript
    // Port Number
    // const port = 3000;
    // For Heroku
    const port = process.env.PORT || 8080;
    ```
  * Meanwhile, in `./angular-src/src/app/services/auth.service.ts`, all the http request should be changed like below:
    ```javascript
    // return this.http.post('http://localhost:3000/users/authenticate', user, {headers: headers})
    return this.http.post('users/authenticate', user, {headers: headers})
    ```
