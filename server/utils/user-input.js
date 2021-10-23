/**
 * Get required user inputs from request.
 * @param {Array} mandatory Mandatory fields. 
 * @param {Array} optional Optional fields. 
 * @param {Object} optDefaults The default values for optional fields.
 * @param {Boolean} fromBody Get data from request body and form. 
 * @param {Boolean} fromParams Get data from request params. 
 * @param {Boolean} fromQueryGet data from request queries. 
 * @returns Object of user inputs. If mandatory fields are not satisfied, return undefined.
 */
function getInput(
    {
        mandatory = [],
        optional = [],
        optDefaults = {},
        fromBody = false,
        fromParams = false,
        fromQuery = false,
    }
) {
    const inputs = {}

    // Initialize sources.
    const body = req.body
    const params = req.params
    const query = req.query

    // Get mandatory fields. If not found in any source, return undefined.
    for (let field of mandatory) {
        let value = undefined
        if (fromBody && (field in body)) {
            value = body[field]
        } else if (fromParams && (field in params)) {
            value = params[field]
        } else if (fromQuery && (field in query)) {
            value = query[field]
        }

        if (value !== undefined) {
            inputs[field] = value
        } else {
            return undefined
        }
    }

    // Get optional fields. If not found in any source, get from optDefaults.
    for (let field of optional) {
        let value = undefined
        if (fromBody && (field in body)) {
            value = body[field]
        } else if (fromParams && (field in params)) {
            value = params[field]
        } else if (fromQuery && (field in query)) {
            value = query[field]
        }

        if (value !== undefined) {
            inputs[field] = value
        } else if (field in optDefaults) {
            inputs[field] = optDefaults[field]
        }
    }

    return inputs
}


module.exports = getInput;
