const logger = { log: console.log }

const { Message } = require('../../models/models.mongoose')
const {request} = require('request')


class StoreDataDao {
    constructor(trackId) {
        this.trackingId = trackId
    }

    /**
     * Decrypt the encrypted UUId to obtain the clientId for the current user
     * @param {*} encryptedUUId The encrypted UUId
     */
    decryptUUID (encryptedUUId) {
        //TODO: Confirm the decryption method
    }

    /**
     *  Upload a message data to google analytics for admin analyzation purpose
     *  
     * @param {String} encryptedUUId The encrypted UUId obtained from Google Analytics cookie
     * @param {String} label The label of the current message that needs to be stored
     */
    async uploadMessageData (encryptedUUId, label){

        await request.post(
            { 
                headers: {'content-type' : 'application/json'},
                url: "http://www.google-analytics.com/collect",
                body: {
                    v: '1',
                    tid: this.trackId,
                    cid: this.decryptUUID(encryptedUUId),
                    t: 'event',
                    ec: "Message View",
                    ea: "Query",
                    el: label,
                    ev: 1
                }
            })
    }


}

module.exports = StoreDataDao;