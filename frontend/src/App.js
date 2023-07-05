import React from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./pages/Home/Home";
import Navigation from "./components/shared/Navigation/Navigation";
import Authenticate from "./pages/Authenticate/Authenticate";
import Activate from "./pages/Activate/Activate";
import Rooms from "./pages/Rooms/Rooms";
import { useSelector } from "react-redux";

function App() {
  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="/" exact element={<GuestRoute Component={Home} />} />
        <Route
          path="/authenticate"
          element={<GuestRoute Component={Authenticate} />}
        />
        <Route
          path="/activate"
          element={<SemiProtectedRoute Component={Activate} />}
        />
        <Route path="/rooms" element={<ProtectedRoute Component={Rooms} />} />
      </Routes>
    </Router>
  );
}

// Protected Routes

// Guest Route (Only for non-authenticated users)
const GuestRoute = ({ Component }) => {
  const { isAuth } = useSelector((state) => state.auth);

  return isAuth ? <Navigate to="/rooms" /> : <Component />;
};

// Semi-Protected Route (Only for non-activated users)
const SemiProtectedRoute = ({ Component }) => {
  const { user, isAuth } = useSelector((state) => state.auth);

  return !isAuth ? (
    <Navigate to="/" />
  ) : isAuth && !user.activated ? (
    <Component />
  ) : (
    <Navigate to="/rooms" />
  );
};

// Protected Route (Only for authenticated users)
const ProtectedRoute = ({ Component }) => {
  const { user, isAuth } = useSelector((state) => state.auth);

  return !isAuth ? (
    <Navigate to="/" />
  ) : isAuth && !user.activated ? (
    <Navigate to="/activate" />
  ) : (
    <Component />
  );
};

export default App;
