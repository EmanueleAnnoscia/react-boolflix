import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import axios from "axios"
import APIContext from "./src/context/APIContext"
import MediaCard from './components/MediaCard'

function App() {

  const [movies, setMovies] = useState([])
  const [series, setSeries] = useState([])
  const [allMovies, setAllMovies] = useState([]); // saranno i due array su cui eseguire il filtro 
  const [allSeries, setAllSeries] = useState([]);
  const [filterTitle, setFilterTitle] = useState("breaking")

  const api_key = "5142f8b5902e824e62a1db4ec19840e6"

  // usecontext
  // const { brand } = useContext(APIContext);   per capire cosa prendere chiedere se andiamo a posizionare direttamente la function handlesearch e poi la prendiamo dal consumer 

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
          {combinedResult.map(item => (
            <MediaCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </>
  )
}

export default App
