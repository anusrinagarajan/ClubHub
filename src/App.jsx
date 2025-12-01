import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { Layout } from "./Layout.jsx"
import { Clubs } from "./pages/Clubs.jsx"
import { Events } from "./pages/Events.jsx"
import { IndividualEvent } from "./pages/IndividualEvent.jsx"
import { IndividualClub } from "./pages/IndividualClub.jsx"

function App() {

  return (
    <BrowserRouter>
      {/* Routes */}
      <Routes> 
        <Route path="/" element={<Layout />}>
          <Route index element={<Events />}/>
          <Route path="events" element={<Events />}/>
          <Route path="events/:eid" element={<IndividualEvent />}/>
          <Route path="clubs" element={<Clubs />}/>
          <Route path="clubs/:cid" element={<IndividualClub />}/>        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;