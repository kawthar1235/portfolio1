import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import ProjectsPage from './pages/ProjectsPage';
import NotFound from './pages/NotFound';
import AdminDashboard from './components/AdminDashboard';

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/*" element={
          <>
            <Navbar />
            <Routes>
              <Route path="/"         element={<Home />} />
              <Route path="/projects" element={<ProjectsPage />} />
              <Route path="*"         element={<NotFound />} />
            </Routes>
            <Footer />
          </>
        } />
      </Routes>
    </>
  );
}
