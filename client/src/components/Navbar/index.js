import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
    return (
        <div className="navbar-fixed">
            <nav>
                <div className="navbar navbar-expand-lg navbar-light bg-light">
                    <div className="navbar-brand">
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <div className="container">
                                <Link to="/">Google Search</Link>
                            </div>
                            <ul className="navbar-nav mr-auto" >
                                <li className="nav-item active">
                                    <div className="container">
                                        <Link to="/search">Search</Link>
                                    </div>
                                </li>
                                <li className="nav-item active">
                                    <div className="container">
                                        <Link to="/saved">Saved</Link>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar;