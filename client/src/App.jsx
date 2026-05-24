import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import ProjectsPage from './pages/ProjectsPage';
import NotFound from './pages/NotFound';

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/"          element={<Home />} />
        <Route path="/projects"  element={<ProjectsPage />} />
        <Route path="*"          element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  );
}
