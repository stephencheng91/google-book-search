const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 3001;
const app = express();
const mongoose = require("mongoose");
const db = require("./models");
const axios = require("axios");

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

app.get("/api/googlebooks/:title",function(req,res){
  console.log("server googlebooks", req.params)
 // const { query: params } = req;
   let title = req.params.title;
   let query = `https://www.googleapis.com/books/v1/volumes?q=${title}`
   console.log(query)
    axios
      .get(query)
      // .then(results =>{
      //   // 
      //   results.data.items.filter(
      //     result =>
      //       // result.volumeInfo.title &&
      //       // result.volumeInfo.infoLink &&
      //       // result.volumeInfo.authors &&
      //       // result.volumeInfo.description &&
      //       // result.volumeInfo.imageLinks &&
      //       // result.volumeInfo.imageLinks.thumbnail
      //       console.log("titles:", result.volumeInfo.title)
      //     )
      //     //console.log(results.data.items);
      //   } )
      // .then(apiBooks =>
      //   db.Book.find().then(dbBooks =>
      //     apiBooks.filter(apiBook =>
      //       dbBooks.every(dbBook => dbBook.googleId.toString() !== apiBook.id)
      //     )
      //   )
      // )
      .then(books => {
        console.log(books.data); 
        res.json(books.data)
      })
    //  .catch(err => res.status(422).json(err));

})


// Send every other request to the React app
// Define any API routes before this runs
app.listen(PORT, () => {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});
