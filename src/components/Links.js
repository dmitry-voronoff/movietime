import React from "react";
import { Link } from "react-router-dom";

const Links = (props) => {

    return(
        <>
            <li className="nav-item">
                <Link to="/favorites" className="nav-link">Favoriter</Link>
            </li>
            <li className="nav-item">
                <Link to="/queue" className="nav-link">Titta senare</Link>
            </li>
        </>
    )
}

export default Links