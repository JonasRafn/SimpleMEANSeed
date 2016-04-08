var seedConfig = require('../config/seedConfig');
var secret = seedConfig.seedConfig.databaseSecret;
var database = 'mongodb://localhost/' + seedConfig.seedConfig.databaseDatabase;

if (process.env.OPENSHIFT_MONGODB_DB_PASSWORD) {
    database = 'mongodb://' + process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
        process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
        process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
        process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +
        process.env.OPENSHIFT_APP_NAME;
}

module.exports = {
    'secret': secret,
    'database': database
};