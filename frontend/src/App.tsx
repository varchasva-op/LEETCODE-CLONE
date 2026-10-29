import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import ProblemList from './pages/ProblemList';
import ProblemDetail from './pages/ProblemDetail';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/problems" element={<ProblemList />} />
        <Route path="/problems/:slug" element={<ProblemDetail />} />
        <Route path="/" element={<Navigate to="/problems" />} />
        <Route path="*" element={<Navigate to="/problems" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;