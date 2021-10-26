import React from 'react'
import FavIcon from './FavIcon'
import TimeIcon from './TimeIcon'

const Movies = (props) => {
    const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const imageSize = isMobileDevice ? 'w500' : 'w780';

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
                    </div>
                </div>
            ))}
            </div>
        </>
    )
}

export default Movies;