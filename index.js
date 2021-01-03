const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const db = require("./config");
const compression = require("compression");
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan("dev"));
app.use(compression());
app.use(helmet());

const isProduction = process.env.NODE_ENV === "production";
const origin = {
  origin: isProduction ? "https://www.example.com" : "*",
};

app.use(cors(origin));

app.get('/users', db.getUsers)
app.get('/users/:id',db.getUserbyId)
app.post('/users', db.addUser)

// Start server
app.listen(process.env.PORT || 3002, () => {
  console.log(`Server listening`);
});
