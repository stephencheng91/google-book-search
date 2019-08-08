import React, { Component } from "react";
import API from "../../utils/API";
import Wrapper from "../../components/Wrapper";
import "./style.css";

class Search extends Component {


    state = {
        title: "",
        author: "",
        description: "",
        image: "",
        link: "",
        books: [],
        saveButton: false

    }

    componentDidMount() {
        console.log("did mount");
    }


    getInput = event => {
        // console.log(event.target)
        const { name, value } = event.target
        // console.log("input value: ", value)
        this.setState({
            [name]: value
        })

    }
    search = () => {
        // console.log("search", this.state.title)
        API.getgoogle(this.state.title).then(res => {
            console.log(res.data.items)
            let googleBook = res.data.items;
            let booksObj = {};
            let booksfromgoogle = [];

            for (var i = 0; i < 5; i++) {
                booksObj =
                    {
                        id: googleBook[i].id,
                        title: googleBook[i].volumeInfo.title,
                        author: googleBook[i].volumeInfo.authors,
                        description: googleBook[i].volumeInfo.description,
                        image: googleBook[i].volumeInfo.imageLinks.smallThumbnail,
                        link: googleBook[i].volumeInfo.infoLink,
                        saveButton: false
                    }

                booksfromgoogle.push(booksObj);
            };

            this.setState({
                books: booksfromgoogle

            })
        })
    }

    saved = (id) => {
        let book = this.state.books.filter(book => book.id === id)
        console.log(book[0])
        API.saveBook(book[0])

    }

    render() {
        return (
            <Wrapper>
                <div className="container">
                    <br></br>
                    <h2>Search for books</h2>
                    <div className="form-group">
                        <input className="form-control" type="text" placeholder="Enter Book" name="title" onChange={this.getInput} ></input>
                        <br></br>
                        <button type="submit" className="btn btn-primary mb-2" onClick={this.search}>Start Search</button>
                    </div>
                </div>

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
                                        <button className="btn btn-primary" onClick={()=>this.saved(book.id)}>Add to Favorite</button>
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

export default Search;