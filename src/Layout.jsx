import React, { useState, useRef, useEffect } from "react";
import { Link, Outlet } from 'react-router-dom';

import "./styles/App.css";
import "./styles/Sidebar.css";
import "./styles/Topbar.css";

import useClickOutside from "./utilityfunctions/useClickOutside"

import { Menu, CircleUser, Calendar, Users, Pen } from "lucide-react";

function Layout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showLogout, setShowLogout] = useState(false);
  const popupRef = useRef(null);

  // Logged-in user info
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
  const fullName = loggedInUser?.first_name + " " + loggedInUser?.last_name;
  console.log("Logged in user: " + fullName);
  console.log(loggedInUser);

  // Logout handler
  function handleLogout() {
    localStorage.removeItem("loggedInUser");
    window.location.reload();
  }

  function goToLogin() {
    window.location.href = "/login";
  }
  
  const accountTypeString = loggedInUser?.is_Admin ? "Admin: " : loggedInUser?.is_Club_Officer ? "Club Officer: " : "";

  // Close log out popout - note: cannot do setShowLogout(false), bc would call immediately and pass undefined
  useClickOutside(popupRef, () => setShowLogout(false))

  return (
    <div className="app">

      {/* Sidebar */}
      <aside className={`sidebar ${isSidebarOpen ? "open" : "closed"}`}>
        <nav className="nav">

          <Link to="/events" className="invis-link">
            <button className="nav-item">
              <Calendar className="nav-icon calendar" />
              <span>Events</span>
            </button>
          </Link>

          <Link to="/clubs" className="invis-link">
            <button className="nav-item">
              <Users className="nav-icon clubs" />
              <span>Clubs</span>
            </button>
          </Link>

          {(loggedInUser && (loggedInUser.is_Club_Officer || loggedInUser.is_Admin)) ? 
          (<Link to="/manage-clubs" className="invis-link">
            <button className="nav-item">
              <Pen className="nav-icon pen" />
              <span>{accountTypeString}Clubs</span>
            </button>
          </Link>)
          :
          (
          <>
          </>
          )
          }

        </nav>
      </aside>

      {/* Topbar */}
      <header className="topbar">
        <div className="left">
          <button className="icon-btn" onClick={() => setIsSidebarOpen(v => !v)}>
            <Menu />
          </button>
          <Link to="/events" className="brand invis-link"><div>SJSU ClubNav</div></Link>
        </div>

        {/* User info */}
        <div className="right" style={{ position: "relative" }}>

          {loggedInUser ? (
              <>
              <div className="avatar clickable" onClick={() => setShowLogout(v => !v)}>
                <CircleUser />
              </div>

              <span className="user-name clickable" onClick={() => setShowLogout(v => !v)}>
                Welcome, {accountTypeString + fullName}
              </span>
              </>
            )
            :
            // Login button - displayed if user is not logged in
            (
              <div className="log-in clickable" onClick={() => goToLogin()}>
                Log in
              </div>
            )
          }

          {/* Logout Popup */}
          {showLogout && (
            <div className="logout-popup" ref={popupRef}>
              <button className="logout-btn" onClick={handleLogout}>
                Log Out
              </button>
            </div>
          )}

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