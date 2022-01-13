// This is the Data Abstaction Layer
const MongoClient = require("mongodb").MongoClient;
const URL = "mongodb://localhost:27017";
let db = null;
const DB_NAME = "badbankDB";

//Connect to Mongo DB
MongoClient.connect(URL, { useUnifiedTopology: true }, function (err, client) {
  console.log("Connected successfully to the db server");

  //connect to the database
  db = client.db(DB_NAME);
});

// Create User Account
function createUser(name, email, password) {
  return new Promise((resolve, reject) => {
    const userCollection = db.collection("users");
    const doc = { name, email, password, balance: 0 };
    userCollection.insertOne(doc, { w: 1 }, function (err, result) {
      err ? reject(err) : resolve(doc);
    });
  });
}

// Gell All User Accounts
function getAll() {
  return new Promise((resolve, reject) => {
    const users = db
      .collection("users")
      .find({})
      .toArray(function (err, docs) {
        err ? reject(err) : resolve(docs);
      });
  });
}

module.exports = { createUser, getAll };
