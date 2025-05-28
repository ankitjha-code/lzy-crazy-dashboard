import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
  useNavigate,
} from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Layout from "./components/Layout";
import Header from "./components/Header/Header";
import Hero_Section from "./components/Hero_Section/Hero_Section";
import Slider from "./components/Slider/Slider";
import AboutUsForm from "./pages/AboutUsForm";
import Products from "./pages/Products";
import Blogs from "./pages/Blogs";
import Counting from "./pages/Counting";
import Client from "./pages/Client";
import Appointment from "./components/Appointment";
import Footer from "./pages/Footer";
import Profile from "./pages/Profile";
import Auth from "./pages/Auth";

// Protected route wrapper component
const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  useEffect(() => {
    if (!isLoggedIn && location.pathname !== "/auth") {
      navigate("/auth");
    }
  }, [isLoggedIn, navigate, location.pathname]);

  return isLoggedIn ? children : null;
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* Auth route - accessible without login */}
          <Route path="auth" element={<Auth />} />

          {/* Protected routes - require login */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Navigate to="/dashboard" replace />
              </ProtectedRoute>
            }
          />
          <Route
            path="dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="header"
            element={
              <ProtectedRoute>
                <Header />
              </ProtectedRoute>
            }
          />
          <Route
            path="hero-section"
            element={
              <ProtectedRoute>
                <Hero_Section />
              </ProtectedRoute>
            }
          />
          <Route
            path="banner"
            element={
              <ProtectedRoute>
                <Slider />
              </ProtectedRoute>
            }
          />
          <Route
            path="about-us"
            element={
              <ProtectedRoute>
                <AboutUsForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="product"
            element={
              <ProtectedRoute>
                <Products />
              </ProtectedRoute>
            }
          />
          <Route
            path="blogs"
            element={
              <ProtectedRoute>
                <Blogs />
              </ProtectedRoute>
            }
          />
          <Route
            path="counting"
            element={
              <ProtectedRoute>
                <Counting />
              </ProtectedRoute>
            }
          />
          <Route
            path="clients"
            element={
              <ProtectedRoute>
                <Client />
              </ProtectedRoute>
            }
          />
          <Route
            path="appointment"
            element={
              <ProtectedRoute>
                <Appointment />
              </ProtectedRoute>
            }
          />
          <Route
            path="footer"
            element={
              <ProtectedRoute>
                <Footer />
              </ProtectedRoute>
            }
          />
          <Route
            path="profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/auth" replace />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
