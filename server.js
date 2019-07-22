const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 3001;
const app = express();
const mongoose = require("mongoose");
const db = require("./models");

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// Connection to mongo
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/books";
mongoose.connect(MONGODB_URI, { useNewUrlParser: true });

// Define API routes here
// getting all the searched books
app.get("/api/books", function(req, res){
  db.Book.find({})
  .then(function(dbBooks){
    res.json(dbBooks);
  })
  .catch(function(err){
    console.log("err: ", err);
    res.json(err);
  })
})

// Posting 
app.post("/api/books", function(req, res){
  console.log("req.body: ", req.body);
  db.Book.create(req.body)
  .then(function(dbBook){
    console.log(dbBook);
  })
  .catch(function(err){
    console.log(err);
  });

});


// Send every other request to the React app
// Define any API routes before this runs
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

app.listen(PORT, () => {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});
