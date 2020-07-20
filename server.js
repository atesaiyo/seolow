const express = require("express");
const fileUpload = require("express-fileupload");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const path = require("path");

const { MONGO_URI, NODE_ENV, PORT, JWT_SECRET } = require("./server/config");

const app = express();

app.use(cors());
app.use(fileUpload());
app.use(bodyParser.json());

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});
const connection = mongoose.connection;
connection.on("error", (err) => console.log(err));
connection.once("open", () => console.log("Connection MongoDB successfully"));

app.use((req, res, next) => {
  if (
    req.headers &&
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "JWT"
  ) {
    jwt.verify(
      req.headers.authorization.split(" ")[1],
      JWT_SECRET,
      (err, decode) => {
        err
          ? (req.user = undefined)
          : decode
          ? (req.user = decode)
          : res.status(401).json({ message: "Verification failed!!!" });
        next();
      }
    );
  } else {
    req.user = undefined;
    next();
  }
});

const routers = require("./server/routes/routers");
app.use("/api", routers);

if (NODE_ENV === "production") {
  app.use(express.static("./client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "./client/build/index.html"));
  });
}

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
