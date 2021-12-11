# NM Bot Client App

A React implementation of the front end bot chating view of NM Bot app.

## Features

The page contains functions to send responses depend on user's replies.

- Click on GET START button to start the bot chat
- Choose the option that best describes your answer
- Get the response message from the bot
- Repeat the above two steps until you get the final result

Other features include:
- Export the conversation to a text file
- Restore recent chat history when the page is reloaded
- Click on the refresh button at the bottom right to clean the chat history
- Responsive

## Set-up Instructions

```shell
# Load environment variables
# Requires .env files to be stored in /config.

# Install dependencies
npm install

# Run locally
npm start
```

## Configuration

The app requires configurations of REACT APP to be stored in `/client-app` as `.env.development` and `.env.production` files.

```shell
# Example
# For both /client-app/.env.development and /client-app/.env.production you will need the following fields
- REACT_APP_NAME
- REACT_APP_ORIGIN
- REACT_GOOGLE_ANALYTICS_TRACKING_ID
```

## Deployment

The web page is developed through the server that is hosted by Heroku. Continuous Delivery is setup with GitHub Actions, which will be triggered on push to `main` and `staging` branches.

## API

Please check the wiki for this repository.

## Contribution

Yawen Xiao:
- Client App UI
- Client App API
- Components and Action Functions

Yuxuan Liu:
- Client App UI
- Components and Action Functions

Tianyang Hu:
- Google Analytics Creation and Integration