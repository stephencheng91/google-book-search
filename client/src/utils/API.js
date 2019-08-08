import axios from "axios";

export default {
    getBooks: function () {
        return axios.get("/api/books");
    },
    saveBook: function (book) {
        // console.log("savebook", book)
        return axios.post("/api/books/", book)
    },
    getgoogle: function(title) {
        // console.log("API getgoogle")
        return axios.get(`api/googlebooks/${title}`)
    },
    getBookSaved: function () {
        // console.log("api book saved")
        return axios.get("/api/booksaved");
    },
    deleteBook: function (book) {
        console.log("api delete")
        return axios.delete("/api/books/", book)
    }


};