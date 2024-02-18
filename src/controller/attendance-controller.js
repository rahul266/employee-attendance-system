const attendanceValidatorSchemas = require('../validators/attendance-validators')
const attendanceService = require('../service/attendance-service.js')
const { responseBuilder } = require('../utils/response-builder')
const {STATUS_CODES}=require('../utils/constants')

exports.attendanceCheckInController = () => {
    return async (req, res) => {
        try {
            const { error, value } = attendanceValidatorSchemas.validateCheckInSchema().validate(req.body);
            if (error) {
                error.code = STATUS_CODES.BAD_REQUEST;
                res.status(STATUS_CODES.BAD_REQUEST).send(responseBuilder(error));
                return;
            }
            value.date=new Date()
            res.send(responseBuilder('', {
                data: await attendanceService.checkinInstructor(value)
            }))
        } catch (error) {
            _handleException(error, res);
        }
    }
}

exports.attendanceCheckOutController = () => {
    return async (req, res) => {
        try{
            const { error, value } = attendanceValidatorSchemas.validateCheckOutSchema().validate(req.body);
            if (error) {
                error.code = STATUS_CODES.BAD_REQUEST;
                res.status(STATUS_CODES.BAD_REQUEST).send(responseBuilder(error));
                return;
            }
            value.date = new Date()
            res.send(responseBuilder('', {
                data: await attendanceService.checkOutInstructor(value)
            }))
        } catch (error) {
            _handleException(error, res);
        }
    }
}

exports.attendanceRegularizeController = () => {
    return async (req, res) => {
        try {
            const { error, value } = attendanceValidatorSchemas.validateRegularizeSchema().validate(req.body);
            if (error) {
                error.code = STATUS_CODES.BAD_REQUEST;
                res.status(STATUS_CODES.BAD_REQUEST).send(responseBuilder(error));
                return;
            }
            res.send(responseBuilder('', {
                data: await attendanceService.regularize(value)
            }))
        } catch (error) {
            console.log(error)
            _handleException(error, res);
        }
    }
}

exports.monthlyReport = () => {
    return async (req, res) => {
        try {
            const { error, value } = attendanceValidatorSchemas.monthlyReportShema().validate(req.body);
            if (error) {
                error.code = STATUS_CODES.BAD_REQUEST;
                res.status(STATUS_CODES.BAD_REQUEST).send(responseBuilder(error));
                return;
            }
            res.send(responseBuilder('', {
                data:await attendanceService.getMonthlyReport(value)
            }))
        } catch (error) {
            _handleException(error, res);
        }
    }
}

const _handleException=(error, res) => {
    let customError = {
        code: STATUS_CODES.INTERNAL_ERROR,
        message:error.message
    };
    if (error.code) {
        customError.code = error.code;
    }
    res.status(customError.code).send(responseBuilder(customError));
}