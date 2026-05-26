import { Routes, Route, Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import ProjectsPage from "./pages/ProjectsPage";
import NotFound from "./pages/NotFound";
import AdminDashboard from "./components/AdminDashboard";

function MainLayout() {
  return (
    <div style={{ position: "relative", minHeight: "100vh" }}>
      <FloatingStickers />

      <div style={{ position: "relative", zIndex: 1 }}>
        <Navbar />
        <Outlet />
        <Footer />
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/admin" element={<AdminDashboard />} />

      <Route element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="projects" element={<ProjectsPage />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}