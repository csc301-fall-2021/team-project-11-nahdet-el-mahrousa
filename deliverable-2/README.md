# NAHDET EL MAHROUSA

> _Note:_ This document is intended to be relatively short. Be concise and precise. Assume the reader has no prior knowledge of your application and is non-technical. 

## Description

The Entrepreneur Helper Bot of Nahdet El Mahrousa (NM Bot) is a web app that provides support to Egyptian startup entrepreneurs, whether their ideas are still in the proposals or they are facing hard decisions while running their startups. Concerning the problem that startup runners usually have great ideas but less experience, funds, resources, and networks, the NM Bot aims to be an app that is easily accessible despite location and time.

The NM Bot will ask the user to answer a series of questions to identify their most urgent needs or challenges and provide advice on how to make decisions and find resources. For the end-users, they can conveniently get professional advice from one of the most experienced incubators from Egypt. Being an unsupervised web app, users can actively find support from the app even if they live in rural areas or do not have networks. For the NM staff, the bot formalizes the procedures, reduces the cost of human resources of answering frequently asked questions. Beyond that, NM staff can gain statistics of how people use the bot to identify the most popular questions at the time of different people, and therefore can timely adjust their work and marketing strategy.

## Key Features

* Described the key features in the application that the user can access
* Provide a breakdown or detail for each feature that is most appropriate for your application
* This section will be used to assess the value of the features built

### Bot

### Admin Dashboard

## Instructions

* Clear instructions for how to use the application from the end-user's perspective
* How do you access it? Are accounts pre-created or does a user register? Where do you start? etc. 
* Provide clear steps for using each feature described above
* This section is critical to testing your application and must be done carefully and thoughtfully

### Bot

The BotView page contains the function that gives response automatically depend on user's choice.

- Click on GET START button to start the bot chat
- Choose the option that best describes your answer
- Get the response message from the bot
- Repeat the above two steps until you get the final result

Additional Concern: 
- If you want to change any answer in the previews question, just scroll up the page to that question/message and choose the option you want again. The new response that corresponds to this option will appear at the bottom of the chat.

## Development requirements

The app is developed with Node.js + Express.js + React + MongoDB with node@v14.16.1 and npm@v7.24.1. The app has three components: server, client-app, admin-dashboard; each runs and builds independently. The app is hosted by Heroku, database is supported by MongoDB Atlas.

### Requirements

* [Node.js](https://nodejs.org/en/)
* [MongoDB](https://www.mongodb.com/)

### Set-up instructions

Each component is stand-alone in its own directory.

```sh
# Access app-server
cd server
```

```sh
# Access client-app (the user interface of NM Bot)
cd client-app
```

```sh
# Access admin-dashboard client interface
cd client-admin
```

In each of the component, `node_modules` needed to be setup.

```sh
# In server/ or client-app/ or client-admin/
npm install
```

The server requires to setup a [MongoDB database](https://cloud.mongodb.com/).

### Development instructions

Environment variables need to be setup for each component. The required fields include:

```shell
# For server, see /server/README.md for details
NODE_ENV="dev"
# in server/config/.env.dev
DATABASE_URI="<database_uri>"

# For client-app and client-admin,
# in client-app/.env and client-admin/.env
REACT_APP_ORIGIN="<server_url>"
```

or email yuxuanleon.liu@mail.utoronto.ca to get env files.

To run the app, use npm command.

```sh
# In server/ or client-app/ or client-admin/
npm start

# Alternatively, run server in development mode with nodemon.
npm run dev
```

Server has implemented unit tests and integration tests.

```sh
# In server/
npm run test
```

## Deployment and Github Workflow

Branch `main` is used for the production environment; branch `staging` is used for the staging/testing environment; branch `server`, `client-app`, `client-admin` (*the dev branches*) are used for integration and development environment by each of the three components. Since each component can stand-alone from the other two, and in this phase while the app is a an early stage, data can be mocked, architecture is designed to be able to easily transfer from mock data to real APIs. Separating the project into three components will has less conflicts, especially when all of them requires node modules.

The team is separated into 3 groups, corresponding to the three components (1 for client-app, 2 for admin-dashboard, 3 for server). After initializing the apps on the three dev branches, each feature is distributed to a member and will be developed in a specific branch. As the feature has significant progress, a pull-request will be made to the corresponding dev branch, inviting a group member to review, and the merged to the dev branch. In this way and with timely communication, frequent/daily code conflicts can be avoid: they only appear when merging, and can be resolved together.

Deployment is automated. Server testings are running locally and manually since some tests require local database, which in the future may be improved.

When each component arrives at a releasable stage, a pull-request will be made from dev branch to `staging` branch. A member needs to approve the merge, and continuous delivery will be triggered by GitHub Actions after merging to deploy a staging version to Heroku.

Similarly, when all three components are ready in the `staging` branch, a pull-request will be made to the `main` branch from `staging`. Continuous delivery will be triggered after merging (approved by another member) to deploy a production version to Heroku.

Setting up protection rules for the branches for delivery guarantees no accident merging, so that the production and testing environment are always stable.

## Licenses

This project is licensed under the terms of the MIT license. Any person can obtain a copy of this software and associated documentation files (the "Software"), to deal with it without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the the copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

Nahdet El Mahrousa hopes this app can attract attentions to the issue of startup entrepreneurs and evoke inspirations of similar apps.
