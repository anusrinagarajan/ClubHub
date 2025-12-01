console.log("APP LOADED FROM:", import.meta.url);

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import { Layout } from "./Layout.jsx";
import { Clubs } from "./Clubs.jsx";
import { Events } from "./Events.jsx";

import Login from "./pages/Login.jsx";
import Signup from "./pages/SignUp.jsx";

function ProtectedRoute({ children }) {
  const username = localStorage.getItem("username");
  if (!username) return <Navigate to="/login" replace />;
  return children;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Redirect homepage → login */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Auth pages */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected area */}
        <Route 
          path="/app" 
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Clubs />} />
          <Route path="events" element={<Events />} />
          <Route path="clubs" element={<Clubs />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
