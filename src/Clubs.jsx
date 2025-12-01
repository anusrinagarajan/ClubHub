import React, { useState, useMemo, useRef, useEffect } from "react";
import { Search, X, Check } from "lucide-react";
import svgPaths from "./imports/svg-s8131oafzg";

import "./styles/Clubs.css";

/* --------------------------------------------
   Utility - Click Outside Hook
-------------------------------------------- */
function useClickOutside(ref, onOutside) {
  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) onOutside();
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [ref, onOutside]);
}

/* --------------------------------------------
   Star Icon Component
-------------------------------------------- */
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

/* --------------------------------------------
   Club Card Component
-------------------------------------------- */
function ClubCard({ club, onToggleFavorite }) {
  const visibleTags = club.categories.slice(0, 2);
  const remainingCount = club.categories.length - 2;

  return (
    <div className="club-card">
      <div className="club-card-image-placeholder" />

      <div className="club-card-content">
        <StarIcon
          filled={club.favorited}
          onClick={() => onToggleFavorite(club.id)}
        />

        <h3 className="club-card-title">{club.name}</h3>
        <p className="club-card-description">{club.description}</p>

        <div className="club-card-tags">
          {visibleTags.map((tag, idx) => (
            <span key={idx} className="tag">{tag}</span>
          ))}

          {remainingCount > 0 && (
            <span className="tag">+{remainingCount}</span>
          )}
        </div>
      </div>
    </div>
  );
}

/* --------------------------------------------
   Favorite Club Item Component
-------------------------------------------- */
function FavoriteClubItem({ club, onRemove }) {
  return (
    <div className="favorite-club-item">
      <div className="favorite-club-placeholder" />
      <p className="favorite-club-name">{club.name}</p>
      <button className="favorite-remove-btn" onClick={() => onRemove(club.id)}>
        Remove
      </button>
    </div>
  );
}

/* --------------------------------------------
   MAIN CLUBS COMPONENT
-------------------------------------------- */
function Clubs() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState(new Set());
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [showCategoryPopup, setShowCategoryPopup] = useState(false);

  // REAL clubs from backend
  const [clubs, setClubs] = useState([]);

  const popupRef = useRef(null);
  useClickOutside(popupRef, () => setShowCategoryPopup(false));

  /* --------------------------------------------
     FETCH CLUBS FROM BACKEND
  -------------------------------------------- */
  useEffect(() => {
    fetch("http://localhost:5000/api/clubs")
      .then((res) => res.json())
      .then((data) => {
        const withFavorites = data.map((club) => ({
          ...club,
          favorited: false,
        }));
        setClubs(withFavorites);
      })
      .catch((err) => console.error("Error loading clubs:", err));
  }, []);

  /* --------------------------------------------
     ALL UNIQUE CATEGORIES (from DB)
  -------------------------------------------- */
  const allCategories = useMemo(() => {
    const set = new Set();
    clubs.forEach((club) => {
      club.categories.forEach((c) => set.add(c));
    });
    return [...set].sort();
  }, [clubs]);

  /* --------------------------------------------
     Toggle Favorite
  -------------------------------------------- */
  const toggleFavorite = (clubId) => {
    setClubs((prev) =>
      prev.map((club) =>
        club.id === clubId ? { ...club, favorited: !club.favorited } : club
      )
    );
  };

  const removeFavorite = (clubId) => {
    setClubs((prev) =>
      prev.map((club) =>
        club.id === clubId ? { ...club, favorited: false } : club
      )
    );
  };

  /* --------------------------------------------
     Toggle Category Filter
  -------------------------------------------- */
  const toggleCategory = (category) => {
    const newSet = new Set(selectedCategories);
    if (newSet.has(category)) newSet.delete(category);
    else newSet.add(category);
    setSelectedCategories(newSet);
  };

  /* --------------------------------------------
     FILTER CLUBS
  -------------------------------------------- */
  const filteredClubs = useMemo(() => {
    return clubs.filter((club) => {
      const matchesSearch =
        searchQuery.trim() === "" ||
        club.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        club.description.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategories =
        selectedCategories.size === 0 ||
        club.categories.some((cat) => selectedCategories.has(cat));

      const matchesFavorites = !showFavoritesOnly || club.favorited;

      return matchesSearch && matchesCategories && matchesFavorites;
    });
  }, [clubs, searchQuery, selectedCategories, showFavoritesOnly]);

  const favoritedClubs = useMemo(() => {
    return clubs.filter((club) => club.favorited);
  }, [clubs]);

  const selectedArray = [...selectedCategories];
  const visibleFilters = selectedArray.slice(0, 3);
  const remainingFiltersCount = Math.max(0, selectedArray.length - 3);

  return (
    <div className="clubs-page">
      <div className="clubs-main-area">
        <h1 className="clubs-title">Clubs</h1>
        <p className="clubs-subtitle">Explore diverse student organizations</p>

        {/* FILTERS & SEARCH */}
        <div className="filter-search-section">

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

          <p className="filter-by-label">Filter by:</p>

          <div className="clubs-filters">
            <button
              className="filter-add-btn"
              onClick={() => setShowCategoryPopup(!showCategoryPopup)}
            >
              +
            </button>

            <button
              className={`filter-chip ${showFavoritesOnly ? "active" : ""}`}
              onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
            >
              Show Favorites
            </button>

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

            {remainingFiltersCount > 0 && (
              <span className="filter-chip active">
                +{remainingFiltersCount}
              </span>
            )}

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

        {/* CLUBS GRID */}
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

      {/* FAVORITES SIDEBAR */}
      <div className="favorited-sidebar">
        <div className="favorited-card">
          <h2 className="favorited-title">Favorited Clubs</h2>

          <div className="favorited-list">
            {favoritedClubs.slice(0, 5).map((club) => (
              <FavoriteClubItem
                key={club.id}
                club={club}
                onRemove={removeFavorite}
              />
            ))}

            {favoritedClubs.length === 0 && (
              <p className="favorited-empty">
                No favorited clubs yet. Click the star icon to add one!
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export { Clubs };
