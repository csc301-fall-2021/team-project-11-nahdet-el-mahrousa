# Client App

A Node.js implementation of the front end bot chating view of NM Bot app.

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
$env:NODE_ENV="dev"  # dev | staging | prod
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

## Configuration

The app requires configuration of a MongoDB database URI to be stored in `/config` as `.env` files. The name of config file should match the `NODE_ENV` environment.

```shell
# Example
# Setting NODE_ENV='dev' needs to have a .env.dev file.
# in /config/.env.dev
DATABASE_URI='mongodb+srv://<**username**>:<**password**>@nm-bot-csc301-dev.4t78f.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
```

## Deployment

The server is hosted by Heroku. Continuous Delivery is setup with GitHub Actions, which will be triggered on push to `main` and `staging` branches.