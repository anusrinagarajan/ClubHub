import React from "react";
import { Link } from "react-router-dom";

import { CalendarDays, MapPin, Clock, MoreHorizontal } from "lucide-react";
import "../styles/ClubEventCard.css";

import formatEventTime from "../utilityfunctions/formatEventTime";
import formatEventDate from "../utilityfunctions/formatEventDate";

function ClubEventCard({ event }) {
  // normalize tags to a safe array
  const tags = Array.isArray(event.event_tags)
    ? event.event_tags.filter(Boolean)
    : [];
  const visibleTags = tags.slice(0, 3);

  // formatting date string
  const dateString = formatEventDate(event.start_time);

  // formatting time string
  const event_time = formatEventTime(event.start_time, event.end_time);

  return (
    <article className="event-card" role="article">
      {event.flyer_url ? (
        <img src={event.flyer_url} className="event-img" />
      ) : (
        <div className="event-img-placeholder" />
      )}

      <div className="event-content">
        <div className="tags">
          {visibleTags.map((t) => (
            <span className="tag" key={t}>
              {t}
            </span>
          ))}
        </div>

        <h3 className="event-name">{event.event_name}</h3>
        <p className="event-club-name">{event.club_name}</p>

        <div className="meta">
          <div className="meta-item">
            <CalendarDays size={16} />
            <span>{dateString}</span>
          </div>
          <div className="meta-item">
            <Clock size={16} />
            <span>{event_time}</span>
          </div>
          <div className="meta-item">
            <MapPin size={16} />
            <span>{event.location}</span>
          </div>
        </div>

        <div className="card-actions">
          <Link to={`/events/${event.eid}`}>
            <button className="more-btn">
              <MoreHorizontal size={18} />
              <span>More</span>
            </button>
          </Link>
        </div>
      </div>
    </article>
  );
}

export { ClubEventCard };
