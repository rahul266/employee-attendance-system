const userController=require('../controller/users-controller')

const userRoutes = (app) => {
    app.post('/v1/create-user',userController.createUserController())
}

module.exports={userRoutes}