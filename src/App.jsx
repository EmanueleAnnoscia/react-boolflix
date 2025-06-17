import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import axios from "axios"


function App() {

  const [movies, setMovies] = useState([])
  const [series, setSeries] = useState([])
  const [filterTitle, setFilterTitle] = useState("")

  useEffect(() => {
    // chiamata axios films
    axios.get("https://api.themoviedb.org/3/search/movie?api_key=5142f8b5902e824e62a1db4ec19840e6&query=ciao&language=it-IT")
      .then((response) => {
        console.log("Movies:", response.data.results);
        setMovies(response.data.results);
      });

    //chiamata axios series
    axios.get("https://api.themoviedb.org/3/search/tv?api_key=5142f8b5902e824e62a1db4ec19840e6&query=ciao&language=it-IT")
      .then((response) => {
        console.log("Series:", response.data.results);
        setSeries(response.data.results);
      });
  }, [qui bisogna mettere al cambio di stato del bottone ovvero cliccato si attiva lo use effect]);

//  chiavi dei film
  const { id, original_title, title, original_language, vote_average } = movies
// chiavi delle serie
const {id, original_language, original_name, vote_average,}=series

  const combinedResult[...movies, ...series]

  return (
    <>



      <div className="container">
        <nav className="navbar bg-body-tertiary">
          <div className="container-fluid">
            <form className="d-flex" role="search">
              <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" 
              value = {filterTitle}
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
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  className="card-img-top"
                  alt={movie.title}
                  style={{ objectFit: "cover", height: "300px" }}
                />
                <div className="card-body">
                  <h5 className="card-title">{movie.title}</h5>
                  <p className="card-text">
                    <strong>Titolo originale:</strong> {movie.original_title}<br />
                    <strong>Lingua:</strong> {movie.original_language}<br />
                    <strong>Voto:</strong> {movie.vote_average}
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
