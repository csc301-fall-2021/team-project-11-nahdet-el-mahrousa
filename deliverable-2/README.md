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

## Development requirements

The app is developed with Node.js + Express.js + React + MongoDB with node@v14.16.1 and npm@v7.24.1. The app has three components: server, client-app, admin-dashboard; each runs and builds individually.

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

Describe your Git / GitHub workflow. Essentially, we want to understand how your team members shares a codebase, avoid conflicts and deploys the application.

* Be concise, yet precise. For example, "we use pull-requests" is not a precise statement since it leaves too many open questions - Pull-requests from where to where? Who reviews the pull-requests? Who is responsible for merging them? etc.
* If applicable, specify any naming conventions or standards you decide to adopt.
* Describe your overall deployment process from writing code to viewing a live application
* What deployment tool(s) are you using and how
* Don't forget to **briefly explain why** you chose this workflow or particular aspects of it!

## Licenses

 Keep this section as brief as possible. You may read this [Github article](https://help.github.com/en/github/creating-cloning-and-archiving-repositories/licensing-a-repository) for a start.

* What type of license will you apply to your codebase?
* What affect does it have on the development and use of your codebase?
* Why did you or your partner make this choice?
