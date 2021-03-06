// Requiring necessary npm packages
const express = require("express");
const session = require("express-session");
// Requiring passport as we've configured it
const passport = require("./config/passport");
// requiring express-handlebars templating engine package
const exphbs = require("express-handlebars");

// Setting up port and requiring models for syncing
const PORT = process.env.PORT || 8080;
const db = require("./models");
const app = express();

function createMiddleware() {
  // Creating express app and configuring middleware needed for authentication
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(express.static("public"));
}

function setupPassport() {
  // We need to use sessions to keep track of our user's login status
  app.use(session({ secret: "keyboard cat", resave: true, saveUninitialized: true }));
  app.use(passport.initialize());
  app.use(passport.session());
}

function setupHandlebars() {
  app.engine("handlebars", exphbs({ defaultLayout: "main" }));
  app.set("view engine", "handlebars");
}

function requireRoutes() {
  // Requiring our routes
  require("./routes/html-routes.js")(app);
  require("./routes/api-routes.js")(app);
}

function createServer() {
  createMiddleware();
  setupPassport();
  setupHandlebars();
  requireRoutes();

  // Syncing our database and logging a message to the user upon success
  db.sequelize.sync().then(function() {
    app.listen(PORT, function() {
      console.log("==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.", PORT, PORT);
    });
  });

}

createServer();
