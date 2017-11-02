07-nodejs-npm-express - Code 301, Day 8

Author: Seth Donohue and Catherine Looper

Version: 1.8.0

Overview

This app is hosted on a local server.

Using AJAX, we now retrieve our data from a remote source, rather than loading it in through a JS script. Further, in order to make the page load faster, we store this data after the initial retrieval into localStorage, thus avoiding additional server queries.

The page still utilizes jQuery to dynamically render the content based on user input by making modifications to the provided starter code.

Our goal is to us jQuery to create a dynamic site that renders all article elements using an article template that sources data from a separate blogArticles.js file. Our goal is to refactor for loops into forEach loops.

Fundamentally, this is still a responsive web site that changes when the viewport is at a certain width, in order to maximum user experience on mobile and desktop devices. Our design matches comp images provided to us.

We utilize the Handlebars.js library to create cleaner templates and populate our blog.

Getting Started
====

Load the index.html from the root directory.

A user must create an Article Constructor function to be populated with the rawData properties using contextual this. A user must use jQuery traversal and setter methods to fill in the current template clone with values of the properties of this particular Article instance. A user must link to blogArticles.js to populate the article template.

Ideally, a user would not have to build this app on their own machine. They can just access it once it is deployed on the web via a URL in their browser, and the product will display and respond to the user's viewport.

Architecture
====

This page utilizes AJAX to make remote server calls for content, handlebars.JS to template the content, and we used the jQuery library to create an article template to populate our app with data sourced from our data file.

We approached this design with a mobile first mindset. Then we used media queries to adjust the design for viewports wider than 640px. We are using HTML and CSS, as well as normalize.css and the icomoon hamburger menu icon.

Change Log
====

11/1/17 9:00AM Started lab with Catherine as driver and Seth as navigator. Completed file tree set up and first 5 TODOS. Initialized npm and build out of server.

11/1/17 9:40AM Switched to Seth as driver and Catherine as navigator. Completed remaining TODOs and all COMMENTs.

11/1/17 10:40AM Switched to Catherine as driver and Seth as navigator and completed README.

Credits and Collaborations
====

Code Fellows - https://www.codefellows.org/
normalize.css - https://necolas.github.io/normalize.css/
icomoon - https://icomoon.io/
jQuery - https://jquery.com/
Handlebars.js - http://handlebarsjs.com/
node.js - https://nodejs.org/en/
