import React, { Component } from "react";
import API from "../../utils/API";
import Wrapper from "../../components/Wrapper";

class Search extends Component {


    state = {
        title: "",
        author: "",
        description: "",
        image: "",
        link: "",
        books: []

    }

    componentDidMount() {
        console.log("did mount");
    }


    getInput = event => {
        // console.log(event.target)
        const { name, value } = event.target
        // console.log("input value: ", value)
        this.setState({
            title: value
        })

    }
    search = () => {
        // console.log("search", this.state.title)
        API.getgoogle(this.state.title).then(res => {
            // console.log(res.data.items)
            let googleBook = res.data.items;
            let booksArry = [];
            let booksfromgoogle = [];

            // console.log(googleBook);
            // for loop res.data.items
            //get the info you need
            // push object to the booksfromgoole array
            for (var i = 0; i < 5; i++) {
                booksArry[i] = [
                    {
                        title: googleBook[i].volumeInfo.title,
                        author: googleBook[i].volumeInfo.authors,
                        description: googleBook[i].volumeInfo.description,
                        image: googleBook[i].volumeInfo.imageLinks,
                        link: googleBook[i].volumeInfo.infoLink
                    }
                ];
                booksfromgoogle.push(booksArry[i]);
            };
            // console.log(booksfromgoogle);

            this.setState = {
                books: booksfromgoogle

            }
        })
        // call the api // get the reseponse // change the state to render the books

    }

    render() {
        return (
            <Wrapper>
                <div className="container">
                    <br></br>
                    <h2>Search for books</h2>
                    <div className="form-group">
                        <input className="form-control" type="text" placeholder="Enter Book" onChange={this.getInput} ></input>
                        <br></br>
                        <button type="submit" className="btn btn-primary mb-2" onClick={this.search}>Start Search</button>
                    </div>
                </div>

                <div className="container">
                    <ul>
                        {this.state.books.map(book => (
                            <li>
                                {book.title}
                            </li>
                        ))}
                    </ul>
                </div>

            </Wrapper>
            // <div>
            /* {/* //  // render list of books 
                // this.state.books.map(books => { */
            // ul /li 
            //title: books.title
            // add button to save it then call a function then you update the db

            //  })
            // </div> */}

        )
    }
}

export default Search;