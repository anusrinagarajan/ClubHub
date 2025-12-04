// src/pages/ManageClubs.jsx
import React, { useEffect, useState } from "react";
import { Pen } from "lucide-react";
import { Link } from "react-router-dom";

import "../styles/Clubs.css";

function ManageClubCard({ club }) {
  const categories = Array.isArray(club.categories) ? club.categories : [];
  const visibleTags = categories.slice(0, 2);
  const remainingCount = categories.length - 2;

  return (
    <div className="club-card">
      <div className="club-card-image-placeholder">
        <Link to={`/clubs/${club.id}`} className="invis-link">
          <img src={club.image} />
        </Link>
      </div>

      <div className="club-card-content">
        {/* Reuse .star-icon positioning for the edit icon */}
        <div className="star-icon">
          {/* For now this is just a visual icon; you'll wire up the click later */}
          <Pen size={24} />
        </div>

        <Link to={`/clubs/${club.id}`} className="invis-link">
          <h3 className="club-card-title">{club.club_name}</h3>
        </Link>

        <Link to={`/clubs/${club.id}`} className="invis-link">
          <p className="club-card-description">{club.description}</p>
        </Link>

        <div className="club-card-tags">
          {visibleTags.map((tag, idx) => (
            <span key={idx} className="tag">
              {tag}
            </span>
          ))}
          {remainingCount > 0 && (
            <span className="tag">+{remainingCount}</span>
          )}
        </div>
      </div>
    </div>
  );
}

function ManageClubs() {
  const [clubs, setClubs] = useState([]);

  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
  const isAdmin = !!loggedInUser?.is_Admin;
  const isClubOfficer = !!loggedInUser?.is_Club_Officer;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  useEffect(() => {
    if (!loggedInUser) return;

    const loadClubs = async () => {
      try {
        let url = "http://localhost:5174/api/clubs";

        if (!isAdmin && isClubOfficer) {
          url = `http://localhost:5174/api/clubs/officer/${loggedInUser.uid}`;
        }

        const res = await fetch(url);
        const data = await res.json();
        setClubs(data);
      } catch (err) {
        console.error("Error fetching manageable clubs:", err);
      }
    };

    loadClubs();
  }, [loggedInUser, isAdmin, isClubOfficer]);

  return (
    <div className="clubs-page">
      <div className="clubs-main-area">
        <h1 className="clubs-title">Manage Clubs</h1>
        <p className="clubs-subtitle">
          {isAdmin ? "Edit all clubs on the platform" : "Edit the clubs you manage"}
        </p>

        <div className="clubs-grid">
          {clubs.map((club) => (
            <ManageClubCard key={club.id} club={club} />
          ))}

          {clubs.length === 0 && (
            <div className="clubs-empty">
              <p>No clubs available to manage.</p>
            </div>
          )}
        </div>
      </div>

      {/* Keep layout consistent with Clubs.jsx */}
      <div className="favorited-sidebar" />
    </div>
  );
}

export { ManageClubs };
