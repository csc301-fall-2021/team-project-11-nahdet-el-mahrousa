# **NM Admin Bot Dashboard Frontend**

A React.js implementation of the frontend side of NM Admin Bot Dashboard.

## **Features**

The Admin Bot Dashboard allows staff to access user data and manage the workflows. 

There are four pages in the Admin Bot Dashboard:
- Bot Workflow Page 
- Bot Workflow Management Page
- Account Management Page
- Admin Dashboard Page

## **Set-up Instructions**

```shell
# Load environment variables
## PowerShell
$env:NODE_ENV="dev"
# Requires .env files to be stored in /config.

# Install dependencies
npm install

# Run locally
npm start
```

## **Configuration**

The app requires configuration of some environment variables in `/client-admin` as `.env` files. The name of config file should match the `NODE_ENV` environment.

An example of the environment file should in the below form:

```sh
# Example
# The environment name
NODE_ENV=dev

REACT_APP_ORIGIN =
REACT_APP_NAME =
```

## **Deployment**

This is hosted by Heroku. Continuous Delivery is setup with GitHub Actions, which will be triggered on push to `main` and `staging` branches.

## **API**

Please check the wiki for this repository.

## **Contribution**

Serena Yu:
 - Bot Workflow Management Page
 - User Authentication

Yuxuan Liu:
 - Admin Dashboard Page
 - Admin Account Management Page

Mark Yin:
 - Admin Dashboard Page
 - Side Navbar
