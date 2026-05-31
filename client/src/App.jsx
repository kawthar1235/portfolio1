import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import ProjectsPage from './pages/ProjectsPage';
import NotFound from './pages/NotFound';
import AdminDashboard from './components/AdminDashboard';

export default function App() {
  return (
    <Routes>

      {/* Admin — no navbar/footer */}
      <Route path="/admin" element={<AdminDashboard />} />

      {/* Portfolio pages — with navbar/footer */}
      <Route path="/" element={
        <>
          <Navbar />
          <Home />
          <Footer />
        </>
      } />

      <Route path="/projects" element={
        <>
          <Navbar />
          <ProjectsPage />
          <Footer />
        </>
      } />

      <Route path="*" element={
        <>
          <Navbar />
          <NotFound />
          <Footer />
        </>
      } />

    </Routes>
  );
}
