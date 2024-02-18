const attandenceController = require('../controller/attendance-controller')

const attendanceRoutes = (app) => {
    app.post('/v1/checkin',attandenceController.attendanceCheckInController())
    app.post('/v1/checkout',attandenceController.attendanceCheckOutController())
    app.post('/v1/regularize', attandenceController.attendanceRegularizeController())
    app.get('/v1/monthly-report', attandenceController.monthlyReport())
}

module.exports={attendanceRoutes}