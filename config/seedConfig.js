module.exports.seedConfig = {
    jwtSecret: "YOUR_JWT_SECRET_HERE",
    jwtTokenExpirationTime: 60 * 20, //Token expiration in seconds. Default 20 minutes
    jwtAudience: "YOUR_AUDIENCE_HERE",
    jwtIssuer: "YOUR_ISSUER_HERE",
    databaseSecret: "YOUR_DB_SECRET_HERE",
    databaseDatabase: "YOUR_DB_NAME_HERE"
};