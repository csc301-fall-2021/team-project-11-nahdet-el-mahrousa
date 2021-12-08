# NM Bot Server

A Node.js + Express.js + MongoDB implementation of the server side of NM Bot app.

## Features

The server contains function for both client and admin operations.

- Bot chat: requesting messages from reply.
- Managing Bot content.

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

