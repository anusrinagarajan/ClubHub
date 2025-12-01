import React, { useEffect, useRef, useState } from "react";
import "../styles/IndividualEvent.css";
import { Clock, MapPin } from "lucide-react";

import { Link, useParams } from 'react-router-dom';
import eventsData from "../data/sampleEventsData.json";

import { BackButton } from "../components/BackButton";

import formatEventDate from "../utilityFunctions/formatEventDate";
import formatEventTime from "../utilityFunctions/formatEventTime";

const IndividualEvent = () => {
  const descriptionRef = useRef(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [showReadMore, setShowReadMore] = useState(false);
  const [collapsedHeight, setCollapsedHeight] = useState(null);

  const { eid } = useParams(); //retrieves object, keys = url params
    
  /* replace with data for this single event from db */
  /* same format as json - single object, matching eid as param */
  // note: differences: also imports club image, club id -> for learn more button
  function getEventById(events, eid) {
    return events.find(event => event.eid === eid) || null;
  }
  const event = getEventById(eventsData, eid);

  const dateText = formatEventDate(event.start_time);
  const timeText = formatEventTime(event.start_time, event.end_time);

  // Compute initials for club avatar when there is no club image yet
  const clubInitials = React.useMemo(() => {
    if (!event?.club_name) return "";
    return event.club_name
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((word) => word[0]?.toUpperCase())
      .join("");
  }, [event]);

  // Calculate whether to display "read more" button for description
  useEffect(() => {
    if (!descriptionRef.current) return;

    const measure = () => {
      const el = descriptionRef.current;
      if (!el) return;

      const viewportHeight = window.innerHeight || 0;
      const rect = el.getBoundingClientRect();

      // Space from top of description to bottom of viewport
      const availableHeight = viewportHeight - rect.top - 96; // 96px for bottom padding / button

      if (availableHeight > 0 && el.scrollHeight > availableHeight) {
        setShowReadMore(true);
        setCollapsedHeight(availableHeight);
      } else {
        setShowReadMore(false);
        setCollapsedHeight(null);
      }
    };

    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [event?.description]);

  // scroll to top on nav
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  })

  if (!event) return null;

  return (
    <div className="individual-event">
      <div className="individual-event-inner">
        {/* LEFT SIDE - BACK BUTTON + FLYER */}
        <div className="individual-event-left">
          <BackButton linkTo="/events" />
          {/* <Link to="/events" className="invis-link">
            <button
            type="button"
            className="back-button"
            aria-label="Go back"
            >
            <ArrowLeft className="back-button-icon" size={16} />
            <span>Back</span>
            </button>
          </Link> */}
          <div className="event-flyer-card">
            {event.flyer_url ? (
              <img
                src={event.flyer_url}
                alt={`${event.event_name} flyer`}
                className="event-flyer-image"
              />
            ) : (
              <div className="event-flyer-placeholder" />
            )}
          </div>
        </div>

        {/* RIGHT SIDE - EVENT DETAILS */}
        <div className="individual-event-right">
          <br></br><br></br>
          {/* Tags */}
          {event.event_tags && event.event_tags.length > 0 && (
            <div className="event-tags">
              {event.event_tags.map((tag) => (
                <span key={tag} className="event-tag">
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Title */}
          <h1 className="event-title">{event.event_name}</h1>

          {/* Club row */}
          <div className="event-club-row">
            <div className="event-club-info">
              <div className="event-club-avatar">
                {/* In future, swap this for the club image if available */}
                {/* {event.club_image_url && (
                  <img src={event.club_image_url} alt={event.club_name} />
                )} */}
                {!event.club_image_url && (
                  <span className="event-club-initials">{clubInitials}</span>
                )}
              </div>
              <div className="event-club-text">
                <div className="event-club-name">{event.club_name}</div>
              </div>
            </div>
            
            <Link to={`/clubs/${event.cid}`} key={event.cid} className="invis-link">
              <button
                type="button"
                className="learn-more-button"
              >
                Learn More
              </button>
            </Link>

          </div>

          {/* Meta: date/time + location */}
          <div className="event-meta">
            <div className="event-meta-row">
              <Clock className="event-meta-icon" size={16} />
              <span className="event-meta-text">
                {dateText} • {timeText}
              </span>
            </div>
            <div className="event-meta-row">
              <MapPin className="event-meta-icon" size={16} />
              <span className="event-meta-text">{event.location}</span>
            </div>
          </div>

          {/* Description */}
          <div className="event-description-wrapper">
            <div
              ref={descriptionRef}
              className={`event-description ${
                showReadMore && !isExpanded
                  ? "event-description--collapsed"
                  : ""
              }`}
              style={
                showReadMore && !isExpanded && collapsedHeight
                  ? { "--collapsed-height": `${collapsedHeight}px` }
                  : undefined
              }
            >
              {event.description}
            </div>
          </div>

          {/* Read More toggle (only when needed) */}
          {showReadMore && (
            <div className="event-read-more-wrapper">
              <button
                type="button"
                className="read-more-button"
                onClick={() => setIsExpanded((prev) => !prev)}
              >
                {isExpanded ? "Read less" : "Read more"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export { IndividualEvent };
