import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import axios from "axios"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar as fullStar } from '@fortawesome/free-solid-svg-icons'
import { faStar as emptyStar } from '@fortawesome/free-regular-svg-icons'


function App() {

  const [movies, setMovies] = useState([])
  const [series, setSeries] = useState([])
  const [allMovies, setAllMovies] = useState([]); // saranno i due array su cui eseguire il filtro 
  const [allSeries, setAllSeries] = useState([]);
  const [filterTitle, setFilterTitle] = useState("breaking")

  const api_key = "5142f8b5902e824e62a1db4ec19840e6"

  const combinedResult = [...movies, ...series]

  const handleSearch = (event) => {
    event.preventDefault();  // blocca il refresh pagina

    // chiamata axios films
    axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${api_key}&query=${filterTitle}&language=it-IT`)
      .then((response) => {
        console.log("Movies:", response.data.results);
        setAllMovies(response.data.results);
        setMovies(response.data.results);
      });

    //chiamata axios series
    axios.get(`https://api.themoviedb.org/3/search/tv?api_key=${api_key}&query=${filterTitle}&language=it-IT`)
      .then((response) => {
        console.log("Series:", response.data.results);
        setAllSeries(response.data.results);
        setSeries(response.data.results);
      });
  };



  // Funzione per creare le stelle
  function Stars({ vote }) {
    const voteStars = Math.ceil(vote / 2); // voto da 1 a 5

    const starsArray = [];

    for (let i = 1; i <= 5; i++) {
      if (i <= voteStars) {
        starsArray.push(<FontAwesomeIcon icon={fullStar} key={i} style={{ color: 'gold' }} />);
      } else {
        starsArray.push(<FontAwesomeIcon icon={emptyStar} key={i} style={{ color: 'gold' }} />);
      }
    }

    return <div>{starsArray}</div>;
  }




  return (
    <>
      <div className="container">
        <nav className="navbar bg-body-dark">
          <div className="container-fluid">
            <a className="navbar-brand">BOOLFLIX</a>
            <form className="d-flex" role="search" onSubmit={handleSearch}>
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
                value={filterTitle}
                onChange={(e) => setFilterTitle(e.target.value)}
              />
              <button className="btn btn-outline-success" type="submit">Search</button>
            </form>
          </div>
        </nav>

        <div className="row">
          {movies.map((movie) => (
            <div key={movie.id} className="col-md-4 mb-4">
              <div className="card h-100 shadow">
                <img
                  src={movie.poster_path
                    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                    : 'https://via.placeholder.com/300x450?text=No+Image'}
                  alt={movie.name}
                  style={{ objectFit: "cover", height: "300px" }}
                />
                <div className="card-body">
                  <h5 className="card-title">{movie.title}</h5>
                  <p className="card-text">
                    <strong>Titolo originale:</strong> {movie.original_title}<br />
                    <strong>Lingua:</strong> {movie.original_language}<br />
                    <strong>Voto:</strong> {movie.vote_average}
                    <Stars vote={movie.vote_average} />

                  </p>
                </div>
              </div>
            </div>
          ))}

          {series.map((serie) => (
            <div key={serie.id} className="col-md-4 mb-4">
              <div className="card h-100 shadow">
                <img
                  src={serie.poster_path
                    ? `https://image.tmdb.org/t/p/w500${serie.poster_path}`
                    : 'https://via.placeholder.com/300x450?text=No+Image'}
                  alt={serie.name}
                  style={{ objectFit: "cover", height: "300px" }}
                />
                <div className="card-body">
                  <h5 className="card-title">{serie.name}</h5>
                  <p className="card-text">
                    <strong>Titolo originale:</strong> {serie.original_name}<br />
                    <strong>Lingua:</strong> {serie.original_language}<br />
                    <strong>Voto:</strong> {serie.vote_average}
                    <Stars vote={serie.vote_average} />
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default App
