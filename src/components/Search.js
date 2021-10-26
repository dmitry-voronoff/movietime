import React from "react";

const Search = (props) => {
    return (
            <input className="form-control me-2" type="search" placeholder="Sök" aria-label="Sök"
                value={props.value}
                onChange={(e) => props.setSearchStr(e.target.value)}/>
    )
}

export default Search