//jshint esversion:6
require("dotenv").config();

const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
var cors = require("cors");
const app = express();
const compression = require("compression");
const cookieParser = require("cookie-parser");

const helmet = require("helmet");

app.set("port", process.env.PORT || 3001);
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        ...helmet.contentSecurityPolicy.getDefaultDirectives(),
        "script-src": ["'self'", "'unsafe-inline'", "https://" + `${process.env.IP_PERSO}` + ":" + app.get("port")],
      },
    },
  })
);
app.use(
  cors({
    origin: [
      `${process.env.FRONT_URL}`,
      "https://" + `${process.env.IP_PERSO}` + ":" + app.get("port"),
      "https://teletravapp.onrender.com/",
    ],
    credentials: true,
    origin: true,
  })
);

/*const corsConfig = {
  credentials: true,
  origin: true,
};

app.use(cors(corsConfig));*/

//app.use(cors());

app.use(cookieParser());

// Routes
app.use("/", [require("./routes/auth"), require("./routes/user")]);

// Compress all HTTP responses
app.use(compression());

/* Set Security Configs */
//app.use(helmet());
//app.use(hpp());

/* Avoid Cross-site request forgery */
//app.use(csurf());

app.use(express.static("public"));
if (process.env.NODE_ENV === "production") {
  // When in production
  // All url paths go to the bundled index.html
  app.use(express.static(path.join(__dirname, "client", "build")));
  app.get("/*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
  });
}

// Start server
app.listen(app.get("port"), () => {
  console.log("Server started on port ", app.get("port"));
});
