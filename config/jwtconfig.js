var seedConfig = require('../config/seedConfig');

module.exports.jwtConfig = {
    secret: seedConfig.seedConfig.jwtSecret,
    tokenExpirationTime: seedConfig.seedConfig.jwtTokenExpirationTime, //seconds
    audience: seedConfig.seedConfig.jwtAudience,
    issuer: seedConfig.seedConfig.jwtIssuer
};