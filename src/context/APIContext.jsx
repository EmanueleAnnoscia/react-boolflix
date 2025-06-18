import { createContext, useState } from "react";
import axios from "axios";

const GlobalContext = createContext();

const GlobalContextProvider = ({ children }) => {
  const [movies, setMovies] = useState([]);
  const [series, setSeries] = useState([]);
  const [filterTitle, setFilterTitle] = useState("breaking");

  const api_key = "5142f8b5902e824e62a1db4ec19840e6";

  const handleSearch = (event) => {
    event.preventDefault();

    axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${api_key}&query=${filterTitle}&language=it-IT`)
      .then((response) => {
        setMovies(response.data.results);
      });

    axios.get(`https://api.themoviedb.org/3/search/tv?api_key=${api_key}&query=${filterTitle}&language=it-IT`)
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
