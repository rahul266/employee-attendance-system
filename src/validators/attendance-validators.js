const Joi = require('joi');

exports.validateCheckInSchema = () => {
    return Joi.object({
        instructorId: Joi.number().integer().required(),
        //date: Joi.date().iso().required(),
        checkInTime: Joi.string().pattern(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/).required(),
    })
}

exports.validateCheckOutSchema = () => {
    return Joi.object({
        instructorId: Joi.number().integer().required(),
        //date: Joi.date().iso().required(),
        checkOutTime: Joi.string().pattern(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/).required(),
    })
}

exports.validateRegularizeSchema = () => {
    return Joi.object({
        id: Joi.number().integer().optional(),
        instructorId: Joi.number().integer().required(),
        date: Joi.date().iso().required(),
        checkInTime: Joi.when('id', {
            is: Joi.exist(),
            then: Joi.string().pattern(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/).optional(),
            otherwise: Joi.string().pattern(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/).required()
        }),
        checkOutTime: Joi.when('id', {
            is: Joi.exist(),
            then: Joi.string().pattern(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/).optional(),
            otherwise: Joi.string().pattern(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/).required()
        })
    });
}

exports.monthlyReportShema = () => {
    return Joi.object({
        month: Joi.number().integer().min(1).max(12).required(),
        year: Joi.number().integer().min(1970).max(9999).required()
    })
}