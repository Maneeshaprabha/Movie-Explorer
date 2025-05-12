import { Routes, Route } from 'react-router-dom';
import { MovieExplorer } from './components/MovieExplorer';
import { MovieDetails } from './components/MovieDetails';
// import TrendingMovies from './components/ui/TrendingMovies'; 

import { MovieProvider } from './context/MovieProvider';
import { FavoriteMovies } from './components/FavoriteMovies';


function App({ setThemeMode }) {
  return (
    <MovieProvider>
      <Routes>
       
        <Route path="/" element={<MovieExplorer setThemeMode={setThemeMode} />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
        <Route path="/favorites" element={<FavoriteMovies/>} />
      </Routes>
    </MovieProvider>
  );
}

export default App;