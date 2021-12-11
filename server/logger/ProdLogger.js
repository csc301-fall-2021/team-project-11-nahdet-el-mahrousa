const {createLogger, transports, format} = require('winston')
require('winston-mongodb')

const folder = "log/ProdLog/"
class ProdLogger{
    _getDateName(){
        return folder + new Date().toISOString().substring(0, 10)
    }

    buildLogger(){
        return createLogger({
            transports: [
                new transports.File({
                    filename: this._getDateName(),
                    level: "info",
                    format: format.combine(
                        format.timestamp(), 
                        format.json(),
                        format.errors({ stack: true })),        
                    defaultMeta: { servce: 'user-service'}

                })
            ]
        })
    }
}

const logger = (new ProdLogger()).buildLogger()
module.exports = logger