import React from "react";
import { CalendarDays, MapPin, Clock, MoreHorizontal } from "lucide-react";
import "../styles/ClubEventCard.css";

export default function ClubEventCard({ event }) {
  const date = new Date(event.date);
  const dateString = date.toLocaleDateString(undefined, {
    weekday: "short",
    month: "short",
    day: "numeric",
  });

  return (
    <article className="event-card" role="article">
      <div className="tags">
        {event.categories.slice(0, 3).map((t) => (
          <span className="tag" key={t}>
            {t}
          </span>
        ))}
      </div>

      <h3 className="event-name">{event.name}</h3>
      <p className="club-name">{event.club}</p>

      <div className="meta">
        <div className="meta-item">
          <CalendarDays size={16} />
          <span>{dateString}</span>
        </div>
        <div className="meta-item">
          <Clock size={16} />
          <span>{event.time}</span>
        </div>
        <div className="meta-item">
          <MapPin size={16} />
          <span>{event.location}</span>
        </div>
      </div>

      <div className="card-actions">
        <button className="more-btn">
          <MoreHorizontal size={18} />
          <span>More</span>
        </button>
      </div>
    </article>
  );
}
