import React from "react";
import { CalendarDays, MapPin, Clock, MoreHorizontal } from "lucide-react";
import "../styles/ClubEventCard.css";

export default function ClubEventCard({ event }) {
  
  // formatting date string
  const date = new Date(event.start_time);
  const dateString = date.toLocaleDateString(undefined, {
    weekday: "short",
    month: "short",
    day: "numeric",
  });

  // formatting time string
  const event_time = formatEventTime(event.start_time, event.end_time);
  function formatEventTime(start_time, end_time) {
    function format(dateStr) {
      const d = new Date(dateStr);
      let hours = d.getHours();
      const minutes = d.getMinutes();
      const ampm = hours >= 12 ? "pm" : "am";

      hours = hours % 12;
      if (hours === 0) hours = 12;

      return `${hours}:${minutes.toString().padStart(2, "0")}${ampm}`;
    }

  const start = format(start_time);
  const end = format(end_time);

  return `${start}-${end}`;
}

  return (
    <article className="event-card" role="article">
      <img src={event.flyer_url} className="event-img" />

      <div className="event-content">
        <div className="tags">
          {event.event_tags.slice(0, 3).map((t) => (
            <span className="tag" key={t}>
              {t}
            </span>
          ))}
        </div>

        <h3 className="event-name">{event.event_name}</h3>
        <p className="club-name">{event.club_name}</p>

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
          <button className="more-btn">
            <MoreHorizontal size={18} />
            <span>More</span>
          </button>
        </div>
      </div>
    </article>
  );
}
