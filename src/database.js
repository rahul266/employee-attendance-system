const { Sequelize, Model } = require('sequelize');
const { initModels } = require('../models/init-models')
const { databaseName, databaseUserName, databaseHost, databasePassword }=require('./config/config')
let Models
const sequelize = new Sequelize(databaseName, databaseUserName, databasePassword, {
    host: databaseHost,
    dialect: 'postgres',
});

const loadModels = (sequelize) => {
    Models = initModels(sequelize)
    console.log(Models)
}

const getModels = () => {
    if (!Models) {
        throw new Error('Models not loaded. Call loadModels first.');
    }
    return Models;
};

module.exports = { sequelize, loadModels, getModels }