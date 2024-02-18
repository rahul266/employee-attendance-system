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
        id: Joi.number().integer().optional(),//id of checkInTable
        instructorId: Joi.number().integer().required(),
        date: Joi.date().iso().required(),
        checkInTime: Joi.string().pattern(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/).optional(),
        checkOutTime: Joi.string().pattern(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/).optional()
    })
}

exports.monthlyReportShema = () => {
    return Joi.object({
        month: Joi.number().integer().min(1).max(12).required(),
        year: Joi.number().integer().min(1970).max(9999).required()
    })
}