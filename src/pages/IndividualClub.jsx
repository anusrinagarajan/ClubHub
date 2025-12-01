import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import clubsData from "../data/sampleClubsData.json";
import eventsData from "../data/sampleEventsData.json";

import { ClubEventCard } from "../components/ClubEventCard"
import { BackButton } from "../components/BackButton";

import {
  Tag,
  Heart,
  ExternalLink,
  Image as ImageIcon,
} from "lucide-react";

import "../styles/IndividualClub.css";

function getClubById(clubs, cid) {
  return clubs.find((club) => club.id == cid) || null;
}

function getEventsByClub(events, cid) {
  return events.filter((event) => event.cid == cid);
}

function addClubToFavorites(club) {
  // TODO: implement favorites logic
}

function IndividualClub() {
  const { cid } = useParams();
  const club = getClubById(clubsData, cid);
  const clubEvents = getEventsByClub(eventsData, cid);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
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
                onClick={() => addClubToFavorites(club)}
              >
                <span>Add to Favorites</span>
                <Heart size={16} className="favorites-icon" />
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
