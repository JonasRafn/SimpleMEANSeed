module.exports.configs = {
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