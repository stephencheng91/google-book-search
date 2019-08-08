import React, { Component } from "react";
import API from "../../utils/API";
import Wrapper from "../../components/Wrapper";
import "./style.css";

class Saved extends Component {


    state = {

        books: [],

    }

    componentDidMount() {
        console.log('mounted saved page')
        this.getsavedbooks()
    }




    getsavedbooks = () => {
        // console.log("search", this.state.title)
        API.getBookSaved().then(res => {
            console.log(res)
            let googleBook = res.data;
            let booksObj = {};
            let booksfromgoogle = [];

            for (var i = 0; i < res.data.length; i++) {
                booksObj =
                    {
                        // id: googleBook[i]._id,
                        title: googleBook[i].title,
                        author: googleBook[i].authors,
                        description: googleBook[i].description,
                        image: googleBook[i].image,
                        link: googleBook[i].link,
                        saveButton: false
                    }

                booksfromgoogle.push(booksObj);
            };

            this.setState({
                books: booksfromgoogle

            })
        })
        // call the api // get the reseponse // change the state to render the books

    }

    delete = (id) => {
        console.log("*********** cllicked")
        // find the object in the array
        let book = this.state.books.filter(book => book.id === id)
        console.log(book[0])
        API.deleteBook(book[0])
        this.getsavedbooks();

    }

    render() {
        return (
            <Wrapper>

                <div className="container">
                    <ul className="list-group">
                        {this.state.books.map(book => (
                            <li className="list-group-item">
                                <div className="row">
                                    <div className="col-2">
                                        <img className="image" src={book.image}></img>
                                    </div>
                                    <div className="col-10">
                                        <strong>Title:</strong> {book.title} <br />
                                        <strong>Author: </strong> {book.author} <br />
                                        <strong>Description: </strong> {book.description} <br />
                                        <strong>Link:</strong> <a href={book.link} target="blank">{book.link}</a> <br />
                                        <button className="btn btn-primary" onClick={() => this.delete(book.id)}>Remove from Favorite</button>
                                    </div>
                                </div>

                            </li>
                        ))}
                    </ul>
                </div>

            </Wrapper>

        )
    }
}

export default Saved;