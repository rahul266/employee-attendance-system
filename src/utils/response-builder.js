const { STATUS } = require('./constants');

/**
 * This method constructs error response object
 * @param {*} error 
 * @returns {Object}
 */
const getFailureResponse = (error) => {
    let json = {
        code: Number(error.code),
        type: error?.name || STATUS[error.code],
        message: error.message,
        data: error?.data
    };
    return json;
};
/**
 * Method to creates response object 
 * @param {*} err 
 * @param {*} responseData 
 * @return {Object}
 */
exports.responseBuilder = (err, responseData) => {
    if (err) {
        return {
            error: getFailureResponse(err)
        };
    }
    let { data, message } = responseData;
    return { data, message };
};