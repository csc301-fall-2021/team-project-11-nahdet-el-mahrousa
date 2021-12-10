const {createLogger, transports, format} = require('winston')
require('winston-mongodb')


class ProdLogger{
    constructor(uri){
        this.db = uri
    }

    buildLogger(){
        return createLogger({
            transports: [
                new transports.MongoDB({
                    db:process.env.DATABASE_URI,
                    collection: "log",
                    level: "info",
                    format: format.combine(
                        format.timestamp(), 
                        format.json(),
                        format.errors({ stack: true })),        
        
                    options: {useUnifiedTopology: true},
                    defaultMeta: { servce: 'user-service'}
                })
            ]
        })
    }
}
module.exports = ProdLogger