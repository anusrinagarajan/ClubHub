import React, { useState } from "react";
import { Link, Outlet } from 'react-router-dom';

import "./styles/App.css";
import "./styles/Sidebar.css"
import "./styles/Topbar.css"

import { Menu, CircleUser, Calendar, Users } from "lucide-react";

function Layout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="app">

      {/* Side Bar */}
      <aside className={`sidebar ${isSidebarOpen ? "open" : "closed"}`}>
        <nav className="nav">

          {/*Events Navigation Button*/}
          <Link to="/events" className="nav-link">
            <button className="nav-item">
              <Calendar className="nav-icon calendar"/>
              <span>Events</span>
            </button>
          </Link>

          {/*Clubs Navigation Button*/}
          <Link to="/clubs" className="nav-link">
            <button className="nav-item">
              <Users className="nav-icon clubs"/>
              <span>Clubs</span>
            </button>
          </Link>

        </nav>
      </aside>


      {/* Top Bar (always visible) */}
      <header className="topbar">
        
        {/* Menu Button */}
        <div className="left">
          <button className="icon-btn" onClick={() => setIsSidebarOpen((v) => !v)}>
            <Menu />
          </button>
          <div className="brand">ClubNav</div>
        </div>

        {/* User Info */}
        <div className="right">
          <div className="avatar">
            <CircleUser />
          </div>
          <span className="user-name">Full Name</span>
        </div>

      </header>


      {/* Main content area */}
      <main className={`content ${isSidebarOpen ? "with-sidebar" : "full"}`}>
        {/* Put your routed pages or dashboard content here */}
        <Outlet />
      </main>

    </div>
  );
}

export { Layout };