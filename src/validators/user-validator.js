const Joi = require('joi')

exports.createUserValidator = () => {
    return Joi.object({
        name: Joi.string().required(),
        email: Joi.string().email({ tlds: { allow: false } }).required()
    })
}