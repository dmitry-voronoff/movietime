import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import './App.css'
import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Links from './components/Links'
import Search from './components/Search'
import Movies from './components/Movies'
import fetchApi from './components/helpers/fetchApi'

const App = () => {
    const [movies, setMovies] = useState([]);
    const [searchStr, setSearchStr] = useState('');
    const [movieDetails, setMovieDetails] = useState({});

    useEffect( () => {
        const fetchMovies = async (searchStr) => {
            const movies = await fetchApi(searchStr);
            setMovies(movies.results);
        };
        fetchMovies(searchStr);

        const favMovies = JSON.parse(localStorage.getItem(process.env.REACT_APP_LOCAL_STORAGE_FAVORITES));
        const queueMovies = JSON.parse(localStorage.getItem(process.env.REACT_APP_LOCAL_STORAGE_QUEUE));

		if (Array.isArray(favMovies) && favMovies.length) {
			setFavMovies(favMovies);
		}

        if (Array.isArray(queueMovies) && queueMovies.length) {
            setQueuedMovies(queueMovies);
        }
    }, [searchStr])

        saveToLS(`${process.env.REACT_APP_LOCAL_STORAGE_KEY}-${list}`, movieList);
    }

    return (
        <Router>
            <Navbar title="Filmer" links={Links} searchBar={Search} setSearchStr={setSearchStr}/>
            <div className="container-xl">
                <Switch>
                    <Route exact path="/">
                        <Movies 
                        title={searchStr ? `Sök resultat för: ${searchStr}` : 'Högst rankade'}
                        movies={movies}
                    </Route>
                    <Route path="/favorites">
                        <Movies 
                        title={'Mina favoriter'}
                        movies={favMovies} 
                    </Route>
                    <Route path="/queue">
                        <Movies 
                        title={'Titta senare'}
                        movies={queuedMovies} 
                    </Route>
                </Switch>
            </div>
        </Router>
    )
}

export default App;