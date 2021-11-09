# Client App

A React implementation of the front end bot chating view of NM Bot app.

## Features

The page contains functions to send responses depend on user's replies.

- Click on GET START button to start the bot chat
- Choose the option that best describes your answer
- Get the response message from the bot
- Repeat the above two steps until you get the final result

## Set-up Instructions

```shell
# Load environment variables
## PowerShell
$env:NODE_ENV="dev"
# Requires .env files to be stored in /config.

# Install dependencies
npm install

# Run locally
npm start
# Run with debug mode
npm run dev
```

## Configuration

The app requires configuration of REACT APP to be stored in `/client-app` as `.env.development` file.

```shell
# Example
# In /client-app/.env.development you will need the following fields
- REACT_APP_ORIGIN
- REACT_APP_NAME
```

## Deployment

The web page is developed through the server that is hosted by Heroku. Continuous Delivery is setup with GitHub Actions, which will be triggered on push to `main` and `staging` branches.