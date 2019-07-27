import axios from "axios";

export default {
    getBooks: function () {
        return axios.get("/api/books");
    },
    saveBook: function () {
        return axios.post("/api/books")
    },
    getgoogle: function(title) {
        console.log("API getgoogle")
        return axios.get(`api/googlebooks/${title}`)
    }


};