console.log("APP LOADED FROM:", import.meta.url);

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import { Layout } from "./Layout.jsx";
import { Clubs } from "./pages/Clubs.jsx";
import { Events } from "./pages/Events.jsx";
import { IndividualEvent } from "./pages/IndividualEvent.jsx"
import { IndividualClub } from "./pages/IndividualClub.jsx"
import { ManageClubs } from "./pages/ManageClubs.jsx"

import Login from "./pages/Login.jsx";
import Signup from "./pages/SignUp.jsx";

function App() {
  
  return (
    <BrowserRouter>
      {/* Routes */}
      <Routes>

        {/* Redirect to login by default */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Login + sign up pages */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* App - only accessible once logged in */}
        <Route path="/" element={<Layout />}>
          {/* Redirect to events by default */}
          <Route index element={<Navigate to="events" replace />} />

          <Route path="events" element={<Events />} />
          <Route path="events/:eid" element={<IndividualEvent />}/>
          <Route path="clubs" element={<Clubs />} />
          <Route path="clubs/:cid" element={<IndividualClub />}/> 
          <Route path="manage-clubs" element={<ManageClubs />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
