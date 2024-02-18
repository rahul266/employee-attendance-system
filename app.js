const express = require('express')
const { sequelize, loadModels } = require('./src/database')
const{Router}=require('express')
const app = express()

loadModels(sequelize)

const { applyRoutes } =require('./src/routes')

app.use(express.json())
app.use('/',applyRoutes(Router()))


app.listen('3000', () => {
    console.log('3000 port is open')
})