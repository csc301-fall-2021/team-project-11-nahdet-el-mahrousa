const { ReasonPhrases, StatusCodes, UNAUTHORIZED } = require('http-status-codes')

const response = {
    OK: { msg: ReasonPhrases.OK, statusCode: StatusCodes.OK, entity: null },
    NOT_SATISFIED: { msg: "Service Requirements Not Satisfied", statusCode: StatusCodes.OK, entity: null },
    
    UNAUTHORIZED: { msg: ReasonPhrases.UNAUTHORIZED, statusCode: StatusCodes.UNAUTHORIZED, entity: null },
    FORBIDDEN: { msg: ReasonPhrases.FORBIDDEN, statusCode: StatusCodes.FORBIDDEN, entity: null },
    NOT_FOUND: { msg: ReasonPhrases.NOT_FOUND, statusCode: StatusCodes.NOT_FOUND, entity: null },
    
    TIMEOUT: { msg: ReasonPhrases.REQUEST_TIMEOUT, statusCode: StatusCodes.REQUEST_TIMEOUT, entity: null },
    SERVICE_UNAVAILABLE: { msg: ReasonPhrases.SERVICE_UNAVAILABLE, statusCode: StatusCodes.SERVICE_UNAVAILABLE, entity: null },
}



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
    respond,
    response
}