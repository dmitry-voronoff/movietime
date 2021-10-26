import React from 'react';
import { useLocation } from 'react-router-dom'

const Navbar = (props) => {
	const LinksComponent = props.links;
    const SerchComponent = props.searchBar;
    const location = useLocation();

	return (
			<nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
				<div className="container-xl">
                    <a className="navbar-brand" href="/">{props.title}</a>
			    	<button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbar" aria-controls="navbar" aria-expanded="false" aria-label="Toggle navigation">
						<span className="navbar-toggler-icon"></span>
					</button>
                    <div className="collapse navbar-collapse" id="navbar">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <LinksComponent />
                        </ul>
                        {location.pathname === '/' && 
                            <form className="d-flex">
                                <SerchComponent setSearchStr={props.setSearchStr}/>
                            </form>
                        }
                    </div>
				</div>
			</nav>
	);
};

export default Navbar;