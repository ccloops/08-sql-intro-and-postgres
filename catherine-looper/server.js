'use strict';

// DONE: Install and require the NPM Postgres package 'pg' into your server.js, and ensure that it is then listed as a dependency in your package.json
const pg = require('pg');
const fs = require('fs');
const express = require('express');

// REVIEW: Require in body-parser for post requests in our server. If you want to know more about what this does, read the docs!
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3000;
const app = express();

// DONE: Complete the connection string (conString) for the URL that will connect to your local Postgres database.

// Windows and Linux users: You should have retained the user/password from the pre-work for this course.
// Your OS may require that your conString is composed of additional information including user and password.
// const conString = 'postgres://USER:PASSWORD@HOST:PORT/DBNAME';

// Mac:
const conString = 'postgres://localhost:5432';


// DONE: Our pg module has a Client constructor that accepts one argument: the conString we just defined.
// This is how it knows the URL and, for Windows and Linux users, our username and password for our database when client.connect() is called below. Thus, we need to pass our conString into our pg.Client() call.

const client = new pg.Client(conString);

// REVIEW: Use the client object to connect to our DB.
client.connect();


// REVIEW: Install the middleware plugins so that our app can use the body-parser module.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('./public'));


// REVIEW: Routes for requesting HTML resources
app.get('/new', (request, response) => {
  // COMMENT: What number(s) of the full-stack-diagram.png image correspond to the following line of code? Which method of article.js is interacting with this particular piece of `server.js`? What part of CRUD is being enacted/managed by this particular piece of code?
  // This app.get process is both step 2 and step 5 in the full-stack-diagram.png. The below line of code represents step 5, which is sending an HTTP response from the controller to the view, to display to the browser window. In this case, the function is handling a HTTP request to display '/new' and is responding with the new.html page. The read part of CRUD is being enacted/managed by this particular piece of code.
  response.sendFile('new.html', {root: './public'});
});


// REVIEW: Routes for making API calls to use CRUD Operations on our database
app.get('/articles', (request, response) => {
  // COMMENT: What number(s) of the full-stack-diagram.png image correspond to the following line of code? Which method of article.js is interacting with this particular piece of `server.js`? What part of CRUD is being enacted/managed by this particular piece of code?
  // The below line of code represents steps 3, and 4 in the full-stack-diagram.png. This line of code is sending a SQL query for everything from the articles table from the controller to the model and sending a result back from the model to the controller. This makes it available to the /articles url which can be used by the fetchAll function to render it into the view. In this case, Article.js will use the Article.fetchAll method to get JSON from the '/articles' url in the root directory and load the results by calling loadAll and then continuing on to execute the callbacks. The read part of CRUD is being enacted/managed by this particular piece of code.

  client.query('SELECT * FROM articles')
    .then(function(result) {
      response.send(result.rows);
    })
    .catch(function(err) {
      console.error(err)
    })
});

app.post('/articles', (request, response) => {
  // COMMENT: What number(s) of the full-stack-diagram.png image correspond to the following line of code? Which method of article.js is interacting with this particular piece of `server.js`? What part of CRUD is being enacted/managed by this particular piece of code?
  // The following line of code corresponds to steps 2 and 3 on the full-stack-diagram.png. The create part of CRUD is being enacted/managed by this particular piece of code. The method from Article.js being interacted with, is Article.prototype.insertRecord. The body referenced in the client.query method below refers to the contents of the request, not to be confused with the body property of the article object.

  client.query(
    `INSERT INTO
    articles(title, author, "authorUrl", category, "publishedOn", body)
    VALUES ($1, $2, $3, $4, $5, $6);
    `,
    [
      request.body.title,
      request.body.author,
      request.body.authorUrl,
      request.body.category,
      request.body.publishedOn,
      request.body.body
    ]
  )
    .then(function() {
      response.send('insert complete')
    })
    .catch(function(err) {
      console.error(err);
    });
});

app.put('/articles/:id', (request, response) => {
  // COMMENT: What number(s) of the full-stack-diagram.png image correspond to the following line of code? Which method of article.js is interacting with this particular piece of `server.js`? What part of CRUD is being enacted/managed by this particular piece of code?
  // The following line of code corresponds to step 3 in the full-stack-diagram.png. We are passing through a SQL query that updates a specific row in the database. This corresponds to the Article.prototype.updateRecord method from article.js. The methods uses a $.ajax request (jQuery ajax request) with the update method to retrieve and update a specific entry in the database/model. The update part of CRUD is being enacted/managed by this particular piece of code because it is updating the table.
  client.query(
    `UPDATE articles
    SET
      title=$1, author=$2, "authorUrl"=$3, category=$4, "publishedOn"=$5, body=$6
    WHERE article_id=$7;
    `,
    [
      request.body.title,
      request.body.author,
      request.body.authorUrl,
      request.body.category,
      request.body.publishedOn,
      request.body.body,
      request.params.id
    ]
  )
    .then(() => {
      response.send('update complete')
    })
    .catch(err => {
      console.error(err);
    });
});

app.delete('/articles/:id', (request, response) => {
  // COMMENT: What number(s) of the full-stack-diagram.png image correspond to the following line of code? Which method of article.js is interacting with this particular piece of `server.js`? What part of CRUD is being enacted/managed by this particular piece of code?
  // The following line of code corresponds to step 3 in the full-stack-diagram since we are sending a request to delete the record from the database. This code interacts with the Article.prototype.deleteRecord method in article.js which uses $.ajax, a delete method and a specified id variable that is sent from the client side. The delete part of CRUD is being enacted/managed by this particular piece of code because it is deleting a record.
  client.query(
    `DELETE FROM articles WHERE article_id=$1;`,
    [request.params.id]
  )
    .then(() => {
      response.send('Delete complete')
    })
    .catch(err => {
      console.error(err);
    });
});

app.delete('/articles', (request, response) => {
  // COMMENT: What number(s) of the full-stack-diagram.png image correspond to the following line of code? Which method of article.js is interacting with this particular piece of `server.js`? What part of CRUD is being enacted/managed by this particular piece of code?
  // The following line of code corresponds to step 3 in the full-stack-diagram since we are sending a request to delete all of the articles from the database. This code interacts with the Article.prototype.deleteRecord method in article.js which uses $.ajax, a delete method and a specified id variable that is sent from the client side. The delete part of CRUD is being enacted/managed by this particular piece of code because it is deleting all of the articles.
  client.query(
    'DELETE FROM articles;'
  )
    .then(() => {
      response.send('Delete complete')
    })
    .catch(err => {
      console.error(err);
    });
});

// COMMENT: What is this function invocation doing?
// This function is declared at the end of this file, and is invoked to create a databse table if it doesn't exist. Then it loads the articles from the database by invoking loadArticles().
loadDB();

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}!`);
});


//////// ** DATABASE LOADER ** ////////
////////////////////////////////////////
function loadArticles() {
  // COMMENT: What number(s) of the full-stack-diagram.png image correspond to the following line of code? Which method of article.js is interacting with this particular piece of `server.js`? What part of CRUD is being enacted/managed by this particular piece of code?
  // The following code corresponds to steps 3 and 4 of the full-stack-diagram.png image. If the table is empty, it will read the json file with the article data in it and fill the SQL database with correctly parsed rows. This doesn't directly map to article.js, it just happens once the server is initialized. The create and read part of CRUD is being enacted/managed by this particular piece of code because it is reading to see if the database is empty, and if so it creates rows.
  client.query('SELECT COUNT(*) FROM articles')
    .then(result => {
    // REVIEW: result.rows is an array of objects that Postgres returns as a response to a query.
    // If there is nothing on the table, then result.rows[0] will be undefined, which will make count undefined. parseInt(undefined) returns NaN. !NaN evaluates to true.
    // Therefore, if there is nothing on the table, line 158 will evaluate to true and enter into the code block.
      if(!parseInt(result.rows[0].count)) {
        fs.readFile('./public/data/hackerIpsum.json', (err, fd) => {
          JSON.parse(fd.toString()).forEach(ele => {
            client.query(`
              INSERT INTO
              articles(title, author, "authorUrl", category, "publishedOn", body)
              VALUES ($1, $2, $3, $4, $5, $6);
            `,
              [ele.title, ele.author, ele.authorUrl, ele.category, ele.publishedOn, ele.body]
            )
          })
        })
      }
    })
}

function loadDB() {
  // COMMENT: What number(s) of the full-stack-diagram.png image correspond to the following line of code? Which method of article.js is interacting with this particular piece of `server.js`? What part of CRUD is being enacted/managed by this particular piece of code?
  // The following code corresponds to step 3 in the full-stack-diagram.png image. Once the code runs then it invokes the loadArticles function.  The create part of CRUD is being enacted/managed by this particular piece of code because it creates a table if it does not exist.
  client.query(`
    CREATE TABLE IF NOT EXISTS articles (
      article_id SERIAL PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      author VARCHAR(255) NOT NULL,
      "authorUrl" VARCHAR (255),
      category VARCHAR(20),
      "publishedOn" DATE,
      body TEXT NOT NULL);`
  )
    .then(() => {
      loadArticles();
    })
    .catch(err => {
      console.error(err);
    });
}
