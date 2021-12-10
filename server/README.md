# **NM Bot Server**

A Node.js + Express.js + MongoDB + Google Analytics implementation of the server side of NM Bot app.

## **Features**

The server contains function for both client and admin operations.

- Bot chat: requesting messages from reply.
- Managing Bot content.
- Sending and Getting statistic data to google analytics

## **Set-up Instructions**

```shell
# Load environment variables
## PowerShell
# Requires .env files to be stored in /config.

# Install dependencies
npm install

# Run locally
npm start
# Run with debug mode
npm run dev
# Run tests
npm run test
# Run specific test
node_modules/.bin/jest --detectOpenHandles -i "<test-file-name>"
```

## **Configuration**

The app requires configuration of some environment variables in `/config` as `.env` files. The name of config file should match the `NODE_ENV` environment.

An example of the environment file should in the below form:

```sh
# Example
# App name
APP_NAME=NM_BOT_DEV

# MongoDB URL
DATABASE_URI=

# Key for Authentication
SECRET_KEY=

# Google Analytic info
GOOGLE_SERVICE_ACCOUNT_CREDENTIAL_KEY=
REACT_GOOGLE_ANALYTICS_TRACKING_ID=
GOOGLE_ANALYTICS_ALL_WEB_DATA_VIEW_ID=
```

## **Deployment**

The server is hosted by Heroku. Continuous Delivery is setup with GitHub Actions, which will be triggered on push to `main` and `staging` branches.

## **API**

Please check the wiki for this repository.

## **Contribution**

Tianyang Hu:
 - Client Bot
 - User
 - Admin search function

Yuxuan Liu:
 - Architecture
 - Admin Bot Management
 - Database

Siyang LiU:
 - Statistic
