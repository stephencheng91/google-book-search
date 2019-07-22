import React from "react";

function Search() {
    return (

        <div className="container">
            <br></br>
            <h2>Search</h2>
            <div className="form-group">
                <input class="form-control" type="text" placeholder="Enter Book"></input>
                <br></br>
                <button type="submit" class="btn btn-primary mb-2">Start Search</button>
            </div>
        </div>

    )
}

export default Search;