import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { Layout } from "./Layout.jsx"
import { Clubs } from "./Clubs.jsx"
import { Events } from "./Events.jsx"

function App() {

  return (
    <BrowserRouter>
      {/* Routes */}
      <Routes> 
        <Route path="/" element={<Layout />}>
          <Route path="events" element={<Events />}/>
          <Route path="clubs" element={<Clubs />}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;