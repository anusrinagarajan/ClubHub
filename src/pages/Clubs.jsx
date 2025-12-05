import React, { useState, useMemo, useRef, useEffect } from "react";
import { Search, X, Check } from "lucide-react";
import { Link } from 'react-router-dom';

// replace with data fetched from back
// import clubsData from "../data/sampleClubsData.json";


import svgPaths from "../imports/svg-s8131oafzg";

import "../styles/Clubs.css";
import useClickOutside from "../utilityfunctions/useClickOutside"
import useDbToggleFavorite from "../utilityfunctions/useDbToggleFavorite"

function StarIcon({ filled, onClick }) {
  return (
    <div className="star-icon" onClick={onClick}>
      <svg width="27" height="27" fill="none" viewBox="0 0 27 27">
        <path
          d={svgPaths.p2823b580}
          stroke={filled ? "#FFD700" : "#757575"}
          fill={filled ? "#FFD700" : "none"}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="4"
        />
      </svg>
    </div>
  );
}

function ClubCard({ club, onToggleFavorite }) {
  const visibleTags = club.categories.slice(0, 2);
  const remainingCount = club.categories.length - 2;

  return (
    <div className="club-card">
      <div className="club-card-image-placeholder">
        <Link to={`${club.id}`} className="invis-link">
          <img src={club.image} />
        </Link>
      </div>
      <div className="club-card-content">
        <StarIcon
          filled={club.favorited}
          onClick={() => onToggleFavorite(club.id)}
        />
        <Link to={`${club.id}`} className="invis-link">
          <h3 className="club-card-title">{club.club_name}</h3>
        </Link>
        <Link to={`${club.id}`} className="invis-link">
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

function FavoriteClubItem({ club, onRemove }) {
  return (
    <div className="favorite-club-item">
      <Link to={`${club.id}`} key={club.id} className="invis-link">
        <div className="favorite-club-placeholder" >
          {club.image && <img src={club.image} className="favorite-club-img"/>}
        </div>
      </Link>
      <Link to={`${club.id + "1"}`} key={club.id + "1"} className="invis-link">
        <p className="favorite-club-name">{club.club_name}</p>
      </Link>
      <button className="favorite-remove-btn" onClick={() => onRemove(club.id)}>
        Remove
      </button>
    </div>
  );
}

function Clubs() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState(new Set());
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [showCategoryPopup, setShowCategoryPopup] = useState(false);
  const [clubsData, setClubsData] = useState([]);

  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

  // Fetch from backend
  useEffect(() => {
    const loadClubs = async () => {
      try {
        var fetchString = `http://localhost:5174/api/clubs`;
        
        if (loggedInUser) {
          fetchString += `?uid=${loggedInUser.uid}`;
        }

        const res = await fetch(fetchString);
        const data = await res.json();
        // console.log("Loaded clubs:", data);
        setClubsData(data);
      } catch (err) {
        console.error("Error fetching events:", err);
      }
    };

    loadClubs();
  }, []);

  // scroll to top on nav
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [])

  const popupRef = useRef(null);
  useClickOutside(popupRef, () => setShowCategoryPopup(false));

  // Get all unique categories
  const allCategories = useMemo(() => {
    const catSet = new Set();
    clubsData.forEach((club) => {
      club.categories.forEach((cat) => catSet.add(cat));
    });
    return [...catSet].sort();
  }, [clubsData]);

  // Toggle favorite status
  const toggleFavorite = async (clubId) => {
    if(loggedInUser) {
      const club = clubsData.find(club => club.id === clubId)
      const success = useDbToggleFavorite(clubId, loggedInUser.uid, club.favorited);
      if(success) {
        // console.log("Favorite db updated successfully: ")
        setClubsData((prev) =>
          prev.map((club) =>
            club.id === clubId ? { ...club, favorited: !club.favorited } : club
          )
        );
      }
      else {
        console.log("Favorite db update failed - UI not updated");
      }
    }
    // If not logged in - navigate to login page
    else {
      window.location.href = "/login";
      // console.log("Not logged in - redirecting to login")
    }
  };

  // Remove from favorites
  const removeFavorite = (clubId) => {
    toggleFavorite(clubId);
  };

  // Toggle category filter
  const toggleCategory = (category) => {
    const newSet = new Set(selectedCategories);
    if (newSet.has(category)) {
      newSet.delete(category);
    } else {
      newSet.add(category);
    }
    setSelectedCategories(newSet);
  };

  // Filtered clubs
  const filteredClubs = useMemo(() => {
    return clubsData.filter((club) => {
      // Search filter
      const matchesSearch =
        searchQuery.trim() === "" ||
        club.club_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        club.description.toLowerCase().includes(searchQuery.toLowerCase());

      // Category filter
      const matchesCategories =
        selectedCategories.size === 0 ||
        club.categories.some((cat) => selectedCategories.has(cat));

      // Favorites filter
      const matchesFavorites = !showFavoritesOnly || club.favorited;

      return matchesSearch && matchesCategories && matchesFavorites;
    });
  }, [clubsData, searchQuery, selectedCategories, showFavoritesOnly]);

  // Get favorited clubs
  const favoritedClubs = useMemo(() => {
    return clubsData.filter((club) => club.favorited);
  }, [clubsData]);

  // Visible selected filters (show first 3)
  const selectedCategoriesArray = [...selectedCategories];
  const visibleFilters = selectedCategoriesArray.slice(0, 3);
  const remainingFiltersCount = Math.max(0, selectedCategoriesArray.length - 3);

  return (
    <div className="clubs-page">
      {/* Main Content Area */}
      <div className="clubs-main-area">
        {/* Title */}
        <h1 className="clubs-title">Clubs</h1>
        <p className="clubs-subtitle">Explore diverse student organizations</p>

        {/* Filter & Search Section */}
        <div className="filter-search-section">
          {/* Search Bar */}
          <div className="clubs-search-bar">
            <div className="search-icon-wrapper">
              <svg width="45" height="45" fill="none" viewBox="0 0 45 45">
                <path
                  d={svgPaths.p19a24480}
                  stroke="#1E1E1E"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="4"
                />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search clubs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="clubs-search-input"
            />
          </div>

          {/* Filter by label */}
          <p className="filter-by-label">Filter by:</p>

          {/* Filters */}
          <div className="clubs-filters">
            {/* Add Filter Button */}
            <button 
              className="filter-add-btn"
              onClick={() => setShowCategoryPopup(!showCategoryPopup)}
            >
              +
            </button>

            {/* Show Favorites Toggle */}
            <button
              className={`filter-chip ${showFavoritesOnly ? "active" : ""}`}
              onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
            >
              Show Favorites
            </button>

            {/* Selected Category Filters */}
            {visibleFilters.map((cat) => (
              <button
                key={cat}
                className="filter-chip active"
                onClick={() => toggleCategory(cat)}
              >
                {cat}
                <span className="filter-remove">X</span>
              </button>
            ))}

            {/* Remaining count */}
            {remainingFiltersCount > 0 && (
              <span className="filter-chip active">+{remainingFiltersCount}</span>
            )}

            {/* Category Selection Popup */}
            {showCategoryPopup && (
              <div className="category-popup" ref={popupRef}>
                <div className="category-popup-header">
                  <h3>Select Categories</h3>
                  <button 
                    className="popup-close-btn"
                    onClick={() => setShowCategoryPopup(false)}
                  >
                    <X size={20} />
                  </button>
                </div>
                <div className="category-options">
                  {allCategories.map((cat) => {
                    const isSelected = selectedCategories.has(cat);
                    return (
                      <label key={cat} className="category-option">
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => toggleCategory(cat)}
                        />
                        <span className={`checkbox ${isSelected ? "checked" : ""}`}>
                          {isSelected && <Check size={16} />}
                        </span>
                        <span className="category-label">{cat}</span>
                      </label>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Clubs Grid */}
        <div className="clubs-grid">
          {filteredClubs.map((club) => (
            <ClubCard
              key={club.id}
              club={club}
              onToggleFavorite={toggleFavorite}
            />
          ))}

          {filteredClubs.length === 0 && (
            <div className="clubs-empty">
              <p>No clubs match your filters.</p>
            </div>
          )}
        </div>
      </div>

      {/* Favorited Clubs Sidebar */}
      <div className="favorited-sidebar">
        <div className="favorited-card">
          <h2 className="favorited-title">Favorited Clubs</h2>
          <div className="favorited-list">
            {favoritedClubs.map((club) => (
              <FavoriteClubItem
                key={club.id}
                club={club}
                onRemove={removeFavorite}
              />
            ))}

            {favoritedClubs.length === 0 && (
              <p className="favorited-empty">
                No favorited clubs yet. Click the star icon on any club to add it here!
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export { Clubs };