const {createLogger, transports, format} = require('winston')
require('winston-mongodb')

class DevLogger{
    constructor(uri){
        this.db = uri
    }

    _getDateName(){
        let today = new Date()
        let folder = "log/DevLog/"
        return folder + today.getFullYear() + "." + (today.getMonth()+1) + "." + (today.getDate())
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

module.exports = DevLogger