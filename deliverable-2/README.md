# NAHDET EL MAHROUSA

The client app can be accessed through <https://nm-bot-prod.herokuapp.com/>. The admin dashboard can be accessed through <https://nm-admin-prod.herokuapp.com/>.

## Description

The Entrepreneur Helper Bot of Nahdet El Mahrousa (NM Bot) is a web app that provides support to Egyptian startup entrepreneurs, whether their ideas are still in the proposals or they are facing hard decisions while running their startups. Concerning the problem that startup runners usually have great ideas but less experience, funds, resources, and networks, the NM Bot aims to be an app that is easily accessible despite location and time.

The NM Bot will ask the user to answer a series of questions to identify their most urgent needs or challenges and provide advice on how to make decisions and find resources. For the end-users, they can conveniently get professional advice from one of the most experienced incubators from Egypt. Being an unsupervised web app, users can actively find support from the app even if they live in rural areas or do not have networks. For the NM staff, the bot formalizes the procedures, reduces the cost of human resources of answering frequently asked questions. Beyond that, NM staff can gain statistics of how people use the bot to identify the most popular questions at the time of different people, and therefore can timely adjust their work and marketing strategy.

## Key Features

### Bot

The bot is located at right side of the home page. The two purposes of this bot are helping young entrepreneurs and gathering information on current interests of market place

Based on the purposes for this bot, we design the bot which user can "talk" to it using the options given by it. According to the option user choose for a question, the bot will give a the next question based on a pre-fixed flow chart. The flow chart will contain questions that help us figure out information about user's startup such as domain, size or problem it is facing. In the end of the flow chart, there will be some advice for the user on their startup. In this way, we can gather those information for analytics and given advice to our users.

### Admin Dashboard

The admin dashboard requires a specific route to access. The main usages of the dashboard is to access the user data we collected by the bot and manage the flow chart of the bot ("the flowchart"); thus, there are two parts of the dashboard.

The admin dashboard should be protected by authentication. However, it is yet implemented in this phase.

There is Bot Management Page for managing the flow chart. The main purpose for this is to allow the admin to view, modify, create and delete messages of the bot.

There will be an Admin Management Page for register, change privilege, and de-active an admin. However, it is yet implemented in this phase.

There will be a data analysis page that show the data collected from the user using our bot. The admin, our partner, will have the ability to get information summary, for example, the most popular domain for startups or the most concerned problems for entrepreneurs in a given location. By doing so, the admin can improve the flow chart for future users. **However, this feature is not implemented in this phase.**

## Instructions


**Since the app is deployed on Heroku, you may need to wait for a few seconds to awake the server, especially after clicking GET START button in bot.**


### Bot

The BotView page contains the function that gives response automatically depend on user's choice.

- Click on GET START button to start the bot chat.
- Choose the option that best describes your situation.
- Get the response message from the bot.
- Repeat the above two steps until you get the final advice.

Additional Concerns:

- If you want to change any answer in the previous questions, just scroll up the page to that message and choose the option you want again. The new response that corresponds to this option will appear at the very bottom of the chat.
- Same instruction as starting the chat again. Click the GET START button at the top will re-initialize the first message at the very bottom of the chat.

### Admin-Dashboard

The Admin Bot Management Page is used to add, edit, delete messages and replies.

***NOTICE: The message that has label `__init__` is used to start the Bot chat. It must not be deleted and the label must not be changed. It is allowed to change the content of the initial message."***

- Click the Menu -> Bot Management to view all messages and replies.
- Replies are compacted, by clicking the "+" sign at the left to expand the replies.
- Use the buttons to Add, Edit, and Delete messages or replies.

To add a message, users need to click on the "NEW Message" button on the top left corner of the Bot page beside the menu. A modal will pop up once the button is clicked. User needs to enter the content of the message, label is optional. Users can cancel or submit the question they want to add by clicking on the "Cancel" and "OK" button on the bottom right corner of the modal. If the user did not enter a content, it will show a warning and the add new message request will not be made.

To edit a question, users can click on the "EDIT" button beside the question they want to edit under "Actions". Again, a modal will pop up once the button is clicked. User needs to enter the content of the message, label is optional. Users can cancel or submit the question they want to edit by clicking on the "Cancel" and "OK" button on the bottom right corner of the modal. If the user did not enter a content, it will show a warning and the edit message request will not be made.

To delete a message, users simply need to click on the "DELETE" button beside the question they want to delete under "Actions" and the request will be made immediately.

To add a new reply under a message, users need to click on the "NEW OPTION" button beside the question they want to add the reply to under "Actions". Again, a modal will pop up once the button is clicked. User needs to enter the content of the reply, toMessage and label are optional. Users can select a message from the dropdown under label to add "toMessage" **(doesn’t work yet when adding a new reply, but works when editing a reply, and this will be fixed in future deliverable)**. Users can cancel or submit the reply they want to add by clicking on the "Cancel" and "OK" button on the bottom right corner of the modal. If the user did not enter a content, it will show a warning and the edit message request will not be made.

To see all the replies added to a question, users can click on the "+" button beside the id of the question. Once the "+" button is clicked, users are able to see all replies that belong to the question and users are able to make actions to the replies.

To edit a reply, users need to click on the "EDIT" button beside the reply they want to edit under "Actions". The rest works just like creating a new reply, however, users are able to add "toMessage".

To delete a reply, users simply need to click on the "DELETE" button beside the reply they want to delete under "Actions" and the request will be made immediately.

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

This project is licensed under the terms of the MIT license. Any person can obtain a copy of this software and associated documentation files (the "Software"), to deal with it without restrictions.

Nahdet El Mahrousa hopes this app can attract attentions to the issue of startup entrepreneurs and evoke inspirations of similar apps.
