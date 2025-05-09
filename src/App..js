import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
 // This is the one above
import { LoginForm } from './components/LoginForm';
import MovieDashboard from './components/MovieDashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginForm/>} />
        <Route path="/dashboard" element={<MovieDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
