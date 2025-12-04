import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// import clubsData from "../data/sampleClubsData.json";
// import eventsData from "../data/sampleEventsData.json";

import { ClubEventCard } from "../components/ClubEventCard"
import { BackButton } from "../components/BackButton";

import {
  Tag,
  Heart,
  ExternalLink,
  Image as ImageIcon,
} from "lucide-react";

import "../styles/IndividualClub.css";

import useDbToggleFavorite from "../utilityfunctions/useDbToggleFavorite"

function IndividualClub() {
  const { cid } = useParams();
  const [club, setClub] = useState({});
  const [clubEvents, setClubEvents] = useState([]);
  // const clubEvents = getEventsByClub(eventsData, cid);

  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

  // Toggle favorite status
  function toggleFavorite(club) {
    if(loggedInUser) {
      const success = useDbToggleFavorite(club.id, loggedInUser.uid, club.favorited);
      if(success) {
        // console.log("Favorite db updated successfully: ")
        setClub((prev) =>
          ({ ...prev, favorited: !club.favorited })
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
  }
  
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);


  // Fetch from backend
  useEffect(() => {
    const loadData = async () => {
      // Fetch individual club data
      try {
        var fetchString = `http://localhost:5174/api/clubs?cid=${cid}`;

        if (loggedInUser) {
          fetchString += `&uid=${loggedInUser.uid}`;
          console.log("user is logged in, added uid to fetch")
        }

        const res = await fetch(fetchString);
        const data = await res.json();
        console.log("Loaded club:", data);
        setClub(data[0]);
      } catch (err) {
        console.error("Error fetching club data:", err);
      }

      // Fetch all event data - for this club
      try {
        const res = await fetch(`http://localhost:5174/api/events?cid=${cid}`);
        const data = await res.json();
        console.log("Loaded events:", data);
        setClubEvents(data);
      } catch (err) {
        console.error("Error fetching event data:", err);
      }
    };

    loadData();
  }, []);

  if (!club) {
    return (
      <div className="individual-club-page">
        <div className="individual-club-inner">
          <BackButton linkTo="/clubs" />
          <p>Club not found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="individual-club-page">
      <div className="individual-club-inner">
        <div className="club-header-row">
          <BackButton linkTo="/clubs" />
        </div>

        <div className="club-main-layout">
          {/* LEFT COLUMN – CLUB DETAILS */}
          <section className="club-main-column">
            <div className="club-cover-wrapper">
              {club.image ? (
                <img
                  src={club.image}
                  alt={club.club_name}
                  className="club-cover-image"
                />
              ) : (
                <div className="club-cover-placeholder">
                  <ImageIcon size={32} />
                </div>
              )}
            </div>

            <div className="club-header">
              <div className="club-title-block">
                <h1 className="club-name">{club.club_name}</h1>
                <div className="club-tags">
                  {club.categories?.map((cat) => (
                    <span key={cat} className="club-tag">
                      {cat}
                    </span>
                  ))}
                </div>
              </div>

              <button
                type="button"
                className="favorites-button"
                onClick={() => toggleFavorite(club)}
              >
                <span>{club.favorited ? "Remove Favorite" : "Add to Favorites"}</span>
                <Heart size={16} className={"favorites-icon" + (club.favorited ? "-favorited" : "")} />
              </button>
            </div>

            <div className="club-socials">
              {club.socials?.map((socialObj, idx) =>
                Object.entries(socialObj).map(([platform, url]) => (
                  <a
                    key={`${platform}-${idx}`}
                    href={url}
                    target="_blank"
                    rel="noreferrer"
                    className="club-social-link"
                  >
                    <span className="club-social-label">
                      {platform.charAt(0).toUpperCase() + platform.slice(1)}
                    </span>
                    <ExternalLink size={14} className="club-social-external" />
                  </a>
                ))
              )}
            </div>

            <div className="club-description-wrapper">
              <div className={"club-description expanded"}>
                {club.description}
              </div>
            </div>
          </section>

          {/* RIGHT COLUMN – EVENTS */}
          <section className="club-events-column">
            <header className="club-events-header">
              <h2 className="club-events-title">Upcoming Events</h2>
              <p className="club-events-subtitle">
                Stay in the know of what&apos;s going on
              </p>
            </header>

            <div className="club-events-list">
              {clubEvents.length === 0 ? (
                <p className="no-events">
                  No upcoming events for this club yet.
                </p>
              ) : (
                clubEvents.map((event) => (
                  <ClubEventCard key={event.eid} event={event} />
                ))
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export { IndividualClub };
