const express = require("express");
const cors = require("cors");
const dbConfig = require("./config/db.config");
const path = require("path");
require("dotenv").config();

const app = express();
// serving out react static files
app.use(express.static(path.resolve(__dirname, "./ui-client/build")));

/*var corsOptions = {
  origin: "http://localhost:3000",
};

app.use(cors(corsOptions));*/

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const db = require("./model");
const Role = db.role;

db.mongoose
  .connect(dbConfig.URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
    initial();
  })
  .catch((err) => {
    console.error("Connection error", err);
    process.exit();
  });

// simple route
app.get("/api", (req, res) => {
  res.json({ message: "Welcome to Bad Bank application." });
});

// routes
require("./routes/auth.routes")(app);
require("./routes/user.routes")(app);

// All other GET requests not handled before will return our React app
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./ui-client/build", "index.html"));
});

// set port, listen for requests
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

function initial() {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({
        name: "USER",
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'user' to roles collection");
      });

      new Role({
        name: "ADMIN",
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'admin' to roles collection");
      });
    }
  });
}
