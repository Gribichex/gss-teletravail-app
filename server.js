//jshint esversion:6
const path = require('path');
require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
var cors = require("cors");
const { createProxyMiddleware } = require("http-proxy-middleware");
const app = express();
const helmet = require("helmet");
const hpp = require("hpp");
//const csurf = require("csurf");

app.set("port", process.env.PORT || 3001);
app.use(cors());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());
app.use(express.static("public"));

// Routes
app.use("/", [require("./routes/auth"), require("./routes/user")]);

/* Set Security Configs */
//app.use(helmet());
//app.use(hpp());

/* Avoid Cross-site request forgery */
//app.use(csurf());



if (process.env.NODE_ENV !== "production") {
  // We start a proxy to the create-react-app dev server
  app.use(express.static("public"));
  app.use(
    "/",
    createProxyMiddleware({
      target: "http://localhost:3000",
      changeOrigin: true,
    })
  );
} else {
  // When in production
  // All url paths go to the bundled index.html
  app.use(express.static(path.join(__dirname, 'build')));
  app.get("/*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
  });
}

// Start server
app.listen(app.get("port"), () => {
  console.log("Server started on port ", app.get("port"));
});
