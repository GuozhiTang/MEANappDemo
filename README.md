# MEANappDemo
![](https://img.shields.io/badge/node-^6.7.0-blue.svg) ![](https://img.shields.io/badge/angular-^7.2.0-blue.svg) ![](https://img.shields.io/badge/express-^4.16.3-green.svg) ![](https://img.shields.io/badge/mongoose-^5.1.5-green.svg) <br>

A MEAN stack demo appliction whose frontend is built by angular-cli while backend is built by express. Here is a simple demo of login/logout and register which can be used whenever we want.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

* Your own MongoDB should be installed no matter 
a local one such as [MongoDB Compass](https://www.mongodb.com/products/compass)
 or a remote one like [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)

* Nodejs should be installed

```Bash
brew install node
```

### Installing

* Install the dependencies for the backend at root directory:

```Bash
npm install
```

* Then, install the dependencies for the angular frontend at `./angular-src` folder:

```Bash
cd angular-src

npm install
```

### Configuration

#### a. Database
* If planning to run the project locally, then we should configure the database like this in `./config/database.js`:

```javascript
module.exports = {
  database: 'mongodb://localhost:27017/<database>',
  secret: 'yoursecret'
}
```
* If planning to run on the remote server, such as Heroku server, then the database should be configured like this in `./config/database.js`:

```javascript
module.exports = {
  database: 'mongodb+srv://<username>:<password>@guozhimongo-4p5ba.mongodb.net/<database>?retryWrites=true&w=majority',
  secret: 'yoursecret'
}
```

#### b. Live App Configuration
* This application has been deployed on Heroku Server. Here is the link: [Bio-WebApp](https://meanauthappdemo.herokuapp.com/)<br>
* The steps of creating live app on Heroku can be found in my repository "Guozhi_Programming_Notes": [Heroku Configuration](https://app.gitbook.com/@tangguozhi53/s/guozhi-programming-notes/configuration-tutorials/1.12-heroku-configuration) <br>
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

## Running the project

* First, run the MongoDB server:
```Bash
mongod
```

* Then open a new terminal and change to the root directory to run the backend server:

```Bash
nodemon
```

* After that, open a new terminal and change to the `./angular-src` and run the frontend server:

```Bash
ng serve
```

Then, we can see our project locally on http://localhost:4200.

Once we have some changes on the frontend side, run following command to export frontend components to the public folder, and then deploy the project to Heroku:

```Bash
ng build
```

## Built With

* [MongoDB/Mongoose](https://www.npmjs.com/package/mongoose) - The database for the project and the related small API.
* [Express](https://expressjs.com/) - Web backend framework.
* [Angular7](https://angular.io/) - Web frontend framework.
* [Nodejs](https://nodejs.org/en/) - Javascript running environment.