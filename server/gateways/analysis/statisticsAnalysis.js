const logger = { log: console.log }

const {google} = require("googleapis")

const scopes = ['https://www.googleapis.com/auth/analytics.readonly'];

class GoogleAnalyticsHandler {

    constructor() {
      this.googleApi = google
      this.googleAnalytics = google.analyticsreporting('v4')
      this.service_account = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_CREDENTIAL_KEY)
      this.googleJwt = new google.auth.JWT(
        this.service_account.client_email, 
        null, 
        this.service_account.private_key.replace(new RegExp("\\\\n", "\g"), "\n"), 
        // Found this part from https://stackoverflow.com/questions/51020113/nodejs-google-pem-routinespem-read-biono-start-line 
        scopes
      );
      this.viewId = process.env.GOOGLE_ANALYTICS_ALL_WEB_DATA_VIEW_ID
    }

    async authorize(){
      await this.googleJwt.authorize()
    }

    async getView(){
      return this.viewId
    }

    async getAnalytics(){
      return this.googleAnalytics
    }
    async getGoogleJWT(){
      return this.googleJwt
    }

}
module.exports = GoogleAnalyticsHandler