import React from 'react'
import FavIcon from './FavIcon'
import TimeIcon from './TimeIcon'

const Movies = (props) => {
    const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const imageSize = isMobileDevice ? 'w500' : 'w780';

    /**
     * Check if movie is in any list (favorites/queued)
     * 
     * @param {Object} movie    movie object
     * @param {String} list     list name
     * @returns {Boolean}
     */
    const isInList = (movie, list) => {
        const listName = `${process.env.REACT_APP_LOCAL_STORAGE_KEY}-${list}`;
        const listData =  JSON.parse(localStorage.getItem(listName));

        if ( process.env.REACT_APP_FAVORITES === list ) {
            if ( Array.isArray(listData) && listData.length ) {
                return listData.some(f => f.id === movie.id);
            }
        }

        if ( process.env.REACT_APP_WATCH_LATER === list ) {
            if ( Array.isArray(listData) && listData.length ) {
                return listData.some(q => q.id === movie.id);
            }
        }

        return false;
    }

    return (
        <>
            <div className="row">
                <h4>{props.title}</h4>
            </div>
            <div className="row g-0 row-cols-1 row-cols-sm-2 row-cols-md-4">
            {props.movies.map( (movie, i) => (
                <div key={i} className="col-md-3 card border-0 rounded-0 movie--card">
                    <img src={`http://image.tmdb.org/t/p/${imageSize}${movie.poster_path}`} alt="Movie poster" className="card-img border-0 rounded-0"/>
                    <div className="card-img-overlay movie--poster border-0 rounded-0">
                        <h5>{movie.title}</h5>
                        <div className="card-img-overlay" onClick={ () => props.handleFetchDetails(movie) }/>
                        <div className="btn-group" role="group" aria-label="Add to list">
                            <button type="button" className="btn text-warning" onClick={() => props.handleAddToList(movie, process.env.REACT_APP_FAVORITES)}>
                                <FavIcon isActive={isInList(movie, process.env.REACT_APP_FAVORITES)} />
                            </button>
                            <button type="button" className="btn text-info" onClick={() => props.handleAddToList(movie, process.env.REACT_APP_WATCH_LATER)}>
                                <TimeIcon isActive={isInList(movie, process.env.REACT_APP_WATCH_LATER)} />
                            </button>
                        </div>
                    </div>
                </div>
            ))}
            </div>
        </>
    )
}

export default Movies;