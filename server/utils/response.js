const { ReasonPhrases, StatusCodes } = require('http-status-codes')

/**
 * 
 * @param {String} msg Message of response. Default "OK".
 * @param {Integer} statusCode HTTP status code of response. Default 200.
 * @param {*} entity Body of response. Default undefined.
 * @returns {msg, statusCode, entity}
 */
function respond({ msg = ReasonPhrases.OK, statusCode = StatusCodes.OK, entity }) {
    return { msg, statusCode, entity }
}

module.exports = {
    respond
}