import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
 // This is the one above
import { LoginForm } from './components/LoginForm';
import {MovieDashboard} from './components/MovieDashboard';

// import {LoginForm} from './components/LoginForm';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginForm/>} />
        <Route path="/dashboard" element={<MovieDashboard />} />
      </Routes>
    </Router>



    //     <div>
    //   <LoginForm />
    // </div>
  );
}

export default App;
