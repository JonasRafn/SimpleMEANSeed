# SimpleMEANSeed

Simple seed for use in a MEAN application   
- [Node.JS] - evented I/O for the backend
- [Express] - fast node.js network app framework
- [MongoDB] - Fast document oriented NoSQL Database
- [JWT] - Simple token authentication
- [OAuth 2.0] - Third party authentication
- [AngularJS] - HTML enhanced for web apps
- [HandleBars] - Simple schematic for web pages
- [MochaJS] - Unit testing JS


### Version
**0.0.1**  

Not all of the technologies listed above have been implemented yet  
Todo:
- AngularJS front-end 
- OAuth 2.0 (OpenIdConnect)
- MochaJS unit test

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
- MongoDB name (for development only)
```javascript
module.exports.seedConfig = {
    jwtSecret: "YOUR_JWT_SECRET_HERE",
    jwtTokenExpirationTime: 60 * 20, //Token expiration in seconds. Default 20 minutes
    jwtAudience: "YOUR_AUDIENCE_HERE",
    jwtIssuer: "YOUR_ISSUER_HERE",
    databaseSecret: "YOUR_DB_SECRET_HERE",
    databaseDatabase: "YOUR_DB_NAME_HERE",
	cookieName: "YOUR_COOKIE_NAME_HERE",
    cookieSecret: "YOUR_COOKIE_SECRET_HERE",
    sessionExpiration: 60 * 60 * 1000, //Session expiration in milliseconds. Default 1 hour
    sessionName: "YOUR_SESSION_NAME_HERE",
    sessionKey1: "YOUR_SESSION_KEY1_HERE",
    sessionKey2: "YOUR_SESSION_KEY2_HERE",
    sessionDomain: "YOUR_SESSION_DOMAIN_HERE",
    sessionPath: "YOUR_SESSION_PATH_HERE" //Example 'foo/bar'
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

### Deployment
From the get go the seed is setup to be deployed to [OpenShift] but can be changed to run on any cloud provider.  
Before deploying you must add the line from `deploy.txt` to *"scripts"* in `package.json`, otherwise bower will not install the required components on openshift.
```json
"scripts": {
    "start": "node ./bin/www",
	"postinstall": "HOME=$OPENSHIFT_REPO_DIR bower install || bower install"
  }
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
[OAuth 2.0]: <http://oauth.net/2/>
[MochaJS]: <https://mochajs.org/>
[OpenShift]: <https://www.openshift.com/>