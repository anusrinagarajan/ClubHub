console.log("APP LOADED FROM:", import.meta.url);

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import { Layout } from "./Layout.jsx";
import { Clubs } from "./pages/Clubs.jsx";
import { Events } from "./pages/Events.jsx";
import { IndividualEvent } from "./pages/IndividualEvent.jsx"
import { IndividualClub } from "./pages/IndividualClub.jsx"
import { ManageClubs } from "./pages/ManageClubs.jsx"
import { EditingIndividualClub } from "./pages/EditingIndividualClub.jsx";

import Login from "./pages/Login.jsx";
import Signup from "./pages/SignUp.jsx";

function App() {
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

  return (
    <BrowserRouter>
      <Routes>
        {/* public routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* only if logged in */}
        <Route
          path="/"
          element={
            loggedInUser ? <Layout /> : <Navigate to="/login" replace />
          }
        >
          {/* default after login */}
          <Route index element={<Navigate to="events" replace />} />

          <Route path="events" element={<Events />} />
          <Route path="events/:eid" element={<IndividualEvent />}/>
          <Route path="clubs" element={<Clubs />} />
          <Route path="clubs/:cid" element={<IndividualClub />}/> 
          <Route path="manage-clubs" element={<ManageClubs />} />
          <Route path="manage-clubs/:cid/edit" element={<EditingIndividualClub />} />
        </Route>

        {/* send people to login if they are not logged in */}
        <Route
          path="*"
          element={
            <Navigate
              to={loggedInUser ? "/events" : "/login"}
              replace
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
