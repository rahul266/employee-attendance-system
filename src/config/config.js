const dotenv = require('dotenv');
dotenv.config();
module.exports = {
    databaseName: process.env.DATABASE_NAME,
    databaseUserName: process.env.DATABASE_USERNAME,
    databaseHost: process.env.DATABASE_HOST,
    databasePassword:process.env.DATABASE_PASSWORD
};