import React, { useState } from "react";
import { Link, Outlet } from 'react-router-dom';

import "./styles/App.css";
import "./styles/Sidebar.css"
import "./styles/Topbar.css"

import { Menu, CircleUser, Calendar, Users } from "lucide-react";

function Layout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // ⭐ Get logged in user's full name
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
  const fullName = loggedInUser?.fullname || "User";

  return (
    <div className="app">

      {/* Side Bar */}
      <aside className={`sidebar ${isSidebarOpen ? "open" : "closed"}`}>
        <nav className="nav">

          {/*Events Navigation Button*/}
          <Link to="/app/events" className="nav-link">
            <button className="nav-item">
              <Calendar className="nav-icon calendar"/>
              <span>Events</span>
            </button>
          </Link>

          {/*Clubs Navigation Button*/}
          <Link to="/app/clubs" className="nav-link">
            <button className="nav-item">
              <Users className="nav-icon clubs"/>
              <span>Clubs</span>
            </button>
          </Link>

        </nav>
      </aside>

      {/* Top Bar */}
      <header className="topbar">
        
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

          {/* ⭐ Dynamic Name */}
          <span className="user-name">Welcome, {fullName}</span>
        </div>

      </header>

      {/* Main content */}
      <main className={`content ${isSidebarOpen ? "with-sidebar" : "full"}`}>
        <Outlet />
      </main>

    </div>
  );
}

export { Layout };
