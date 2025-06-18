import { createContext, useState } from "react";
import axios from "axios";




const GlobalContext = createContext();

const GlobalContextProvider = ({ children }) => {
  const [movies, setMovies] = useState([]);
  const [series, setSeries] = useState([]);
  const [filterTitle, setFilterTitle] = useState("breaking");

  const api_key = import.meta.env.VITE_API_KEY ;
  const api_url = import.meta.env.VITE_API_URL;

  const handleSearch = (event) => {
    event.preventDefault();

    axios.get(`${api_url}/search/movie?api_key=${api_key}&query=${filterTitle}&language=it-IT`)
      .then((response) => {
        setMovies(response.data.results);
      });

    axios.get(`${api_url}/search/tv?api_key=${api_key}&query=${filterTitle}&language=it-IT`)
      .then((response) => {
        setSeries(response.data.results);
      });
  };

  return (
    <GlobalContext.Provider
      value={{
        handleSearch,
        movies,
        series,
        filterTitle,
        setFilterTitle
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export { GlobalContext, GlobalContextProvider };
