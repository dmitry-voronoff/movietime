import React from "react";

const MovieDetails = (props) => {
    const movieDetails = props.movieDetails;
    const backdropImg = `http://image.tmdb.org/t/p/original/${movieDetails.backdrop_path}`

    return(    
        <>
        {movieDetails.id &&
            <div className="container-fluid movie--details mb-4 pt-5 pb-5" style={{backgroundImage: `url(${backdropImg})`}}>
                <div className="container-xl">
                    <div className="row">
                        <div className="col-lg-6">
                            <h1>{movieDetails.original_title}</h1>
                            {movieDetails.genres.map( (genre, i) => <span className="badge bg-info text-dark me-2" key={i}>{genre.name}</span> )}
                            <div className="my-4">
                                <p className="fs-5">{movieDetails.overview ? movieDetails.overview : 'No description' }</p>
                            </div>
                        </div>
                        {movieDetails.videos.results.length > 0 &&
                        <div className="col-lg-6 d-flex align-items-center">
                            <div className="ratio ratio-16x9 align-middle">
                                <iframe id="ytplayer" type="text/html" src={`https://www.youtube.com/embed/${movieDetails.videos.results[0].key}?rel=0&controls=2&showinfo=0&modestbranding=1`} title="YouTube video" allowFullScreen />
                            </div>
                        </div>
                        }
                    </div>
                </div>
            </div>
        }
        </>     
    )
}

export default MovieDetails