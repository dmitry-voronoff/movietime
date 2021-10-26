import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import './App.css'
import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Links from './components/Links'
import Search from './components/Search'
import Movies from './components/Movies'
import MovieDetails from './components/MovieDetails'
import fetchApi from './components/helpers/fetchApi'

const App = () => {
    const [movies, setMovies] = useState([]);
    const [favMovies, setFavMovies] = useState([]);
    const [queuedMovies, setQueuedMovies] = useState([]);
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

    /**
     * Save list to local storage
     * 
     * @param {String} key      local storage key
     * @param {Array} items     items to store
     */
    const saveToLS = (key, items) => {
		localStorage.setItem(key, JSON.stringify(items));
	};

    /**
     * Fetch single movie details
     * 
     * @param {Object} movie     movie object
     */
    const fetchMovieDetails = async (movie) => {
        if (movieDetails && movieDetails.id !== movie.id) {
            const apiRequest = `/movie/${movie.id}?&api_key=`;
            const url = `${process.env.REACT_APP_API_BASE_URL}${apiRequest}${process.env.REACT_APP_API_KEY}&language=${process.env.REACT_APP_API_LOCALE}&append_to_response=videos,images,credits`;

            await fetch(url)
                .then(res => res.json())
                .then(data => setMovieDetails(data))
        }
    }

    /**
     * Add/remove movie to/from favorites/queued lists
     * 
     * @param {Object} movie    movie object
     * @param {String} list     list name
     */
    const addMovieToList = (movie, list) => {
        let movieList;

        if (process.env.REACT_APP_FAVORITES === list) {
            if (favMovies.some(favMovie => favMovie.id === movie.id)){
                movieList = favMovies.filter((f) => f.id !== movie.id)
            } else {
                movieList = [...favMovies, movie];
            }

            setFavMovies(movieList);
        }

        if (process.env.REACT_APP_WATCH_LATER === list) {
            if (queuedMovies.some(queueMovie => queueMovie.id === movie.id)){
                movieList = queuedMovies.filter((q) => q.id !== movie.id)
            } else {
                movieList = [...queuedMovies, movie];
            }

            setQueuedMovies(movieList);
        }

        saveToLS(`${process.env.REACT_APP_LOCAL_STORAGE_KEY}-${list}`, movieList);
    }

    return (
        <Router>
            <Navbar title="Filmer" links={Links} searchBar={Search} setSearchStr={setSearchStr}/>
            <MovieDetails movieDetails={movieDetails} />
            <div className="container-xl">
                <Switch>
                    <Route exact path="/">
                        <Movies 
                        title={searchStr ? `Sök resultat för: ${searchStr}` : 'Högst rankade'}
                        handleAddToList={addMovieToList}
                        movies={movies}
                        handleFetchDetails={fetchMovieDetails} />
                    </Route>
                    <Route path="/favorites">
                        <Movies 
                        title={'Mina favoriter'}
                        handleAddToList={addMovieToList}
                        movies={favMovies} 
                        handleFetchDetails={fetchMovieDetails} />
                    </Route>
                    <Route path="/queue">
                        <Movies 
                        title={'Titta senare'}
                        handleAddToList={addMovieToList}
                        movies={queuedMovies} 
                        handleFetchDetails={fetchMovieDetails} />
                    </Route>
                </Switch>
            </div>
        </Router>
    )
}

export default App;