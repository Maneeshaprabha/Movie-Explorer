import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const MovieContext = createContext();

export function MovieProvider({ children }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    genre: '',
    year: '',
    rating: '',
  });
  const [favorites, setFavorites] = useState([]);
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    const lastSearch = localStorage.getItem('lastSearch');
    if (lastSearch) {
      setSearchQuery(lastSearch);
    }

    const fetchGenres = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.REACT_APP_TMDB_API_KEY}`
        );
        setGenres(response.data.genres);
      } catch (err) {
        console.error('Error fetching genres:', err);
      }
    };
    fetchGenres();

    const storedFavorites = localStorage.getItem('favorites');
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('lastSearch', searchQuery);
  }, [searchQuery]);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const addFavorite = (movie) => {
    const newFavorite = {
      movieId: movie.id,
      title: movie.title,
      poster_path: movie.poster_path,
      release_date: movie.release_date,
      vote_average: movie.vote_average,
    };
    setFavorites((prev) => {
      if (prev.some((fav) => fav.movieId === movie.id)) return prev;
      return [...prev, newFavorite];
    });
  };

  const removeFavorite = (movieId) => {
    setFavorites((prev) => prev.filter((fav) => fav.movieId !== movieId));
  };

  return (
    <MovieContext.Provider
      value={{
        searchQuery,
        setSearchQuery,
        filters,
        setFilters,
        favorites,
        addFavorite,
        removeFavorite,
        genres,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
}