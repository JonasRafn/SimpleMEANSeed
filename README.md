# SimpleMEANSeed

Simple seed for use in a MEAN application   
- [Node.JS] - evented I/O for the backend
- [Express] - fast node.js network app framework
- [MongoDB] - Fast document oriented NoSQL Database
- [JWT] - Simple token authentication
- [AngularJS] - HTML enhanced for web apps
- [HandleBars] - Simple schematic for web pages

### Version
**0.0.1**  

Not all of the technologies listed above have been implemented yet  
Yet to be implemented:
- AngularJS frontend 
- OAuth 2.0 (OpenIdConnect)

### Installation

You need Node.JS installed to use this seed.  
For local development you will need a MongoDB installed, alternative you can use a hosted one.  

```sh
$ git clone https://github.com/JonasRafn/SimpleMEANSeed
$ cd SimpleMEANSeed
$ npm install
$ bower install
```
To make development easier for yourself you can use NodeMon.
```sh
$ npm install nodemon
```

### Configuring Seed
Use the seedConfig.js file so setup the seed in an easy way  
Setup options
- JSON Web Token Secret
- JSON Web Token expiration time
- JSON Web Token Audience
- JSON Web Token Issuer
- MongoDB secret
- MongoDB name (for local database only)
```javascript
module.exports.seedConfig = {
    jwtSecret: "YOUR_JWT_SECRET_HERE",
    jwtTokenExpirationTime: 60 * 20, //Token expiration in seconds. Default 20 minutes
    jwtAudience: "YOUR_AUDIENCE_HERE",
    jwtIssuer: "YOUR_ISSUER_HERE",
    databaseSecret: "YOUR_DB_SECRET_HERE",
    databaseDatabase: "YOUR_DB_NAME_HERE"
};
```

### Running the application
After you have configured the seed to fit your requirements you can run the application.   
To run the application manually with the need of manual restart after each change in the code use:
```sh
$ node start 
```
Or to restart the application automatically use:
```sh
$ nodemon 
```

License
----
MIT


[express]: <http://expressjs.com>
[AngularJS]: <http://angularjs.org>
[Node.JS]: <http://nodejs.org>
[MongoDB]: <https://www.mongodb.org/>
[JWT]: <https://jwt.io/>
[HandleBars]: <http://handlebarsjs.com/>