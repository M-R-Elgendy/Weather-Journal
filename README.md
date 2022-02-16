# Weather-Journal App Project

## Overview
This project requires you to create an asynchronous web app that uses Web API and user data to dynamically update the UI. 

## Installation

Use the package manager [npm](https://www.npmjs.com/) to install dependencies.

```bash
npm install
```

After install all dependencies run this code to start the server on port 3000.
```js
node server.js
```

Or use [nodemon](https://www.npmjs.com/package/nodemon).
```js
nodemon server
```
Now open [localhost:3000](http://localhost:3000) on your browser and test the app.

<br>

## Server End-Point.
<br>

Return all app data.
```js
GET => '/all'
```
<br>

Post data to the app.
```js
POST => '/add'
```