const {createLogger, transports, format} = require('winston')
require('winston-mongodb')

const folder = "log/DevLog/"

class DevLogger{
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

const logger = (new DevLogger()).buildLogger()

module.exports = logger