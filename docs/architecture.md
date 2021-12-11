# Architecture Design

The frontend apps are communicating with the server through RESTful APIs, which are also documented. By sending a request, the frontend can expect a JSON response with appropriate status code that it can react on. The client app embedded a library to send data to Google Analytics.

The architecture of the server is multi-layer. API layer receive requests, let the controllers to process the user input and catch errors. The service layer manipulates DAOs and Google API to manage data. The DAO layer provides basic interfaces to communicate with Database.

The user authentication of admin dashboard is implemented by JSON-web-token.

## Bot Model

The design regards the Bot chatting workflow as a [directed Tree](https://en.wikipedia.org/wiki/Tree_(graph_theory)), where each *question* sent by the server is a *node* and each *reply* that a user can choose is an *edge* connecting two nodes, specified by the field `fromMessage` and `toMessage`. The `label` field of question and reply is designed for admin users to see clearer what the content is about, while `content` will be displayed to the end-users (for example, the content of a message might be "We can help you with your legal issues, and...", while the label can be "Legal").

This design facilitates the database management and visualization in diagram (in Admin-Dashboard bot workflow page), however, it faces the constraint on flexibility of workflow, extensibility of extra information of each Message, and tedious work of recreating messages with same content but different option replies.

## API

API designs are specified in GitHub Wiki.
