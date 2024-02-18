const userValidators = require('../validators/user-validator')
const { responseBuilder } = require('../utils/response-builder')
const userService = require('../service/users-service')
const { STATUS_CODES }=require('../utils/constants')

exports.createUserController = () => {
    return async (req, res) => {
        try {
            const { error, value } = userValidators.createUserValidator().validate(req.body)
            if (error) {
                error.code = STATUS_CODES.BAD_REQUEST;
                res.status(STATUS_CODES.BAD_REQUEST).send(responseBuilder(error));
                return;
            }
            res.send(responseBuilder('', {
                data: await userService.createUser(value)
            }))
        } catch (error) {
            _handleException(error, res);
        }
    }
}

const _handleException = (error, res) => {
    let customError = {
        code: STATUS_CODES.INTERNAL_ERROR,
        message: error.message
    };
    if (error.code) {
        customError.code = error.code;
    }
    res.status(customError.code).send(responseBuilder(customError));
}