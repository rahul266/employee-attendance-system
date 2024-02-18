const {attendanceRoutes} = require('./attendance')
const {userRoutes}=require('./users')

exports.applyRoutes = (router) => {
    attendanceRoutes(router)
    userRoutes(router)
    return router
}
