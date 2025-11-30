import React, { useMemo, useState, useRef, useEffect } from "react";
import { Search, ChevronDown, X, Check } from "lucide-react";

// replace w/ all event data as objects, same form as .json
import eventsData from "../data/sampleEventsData.json";

import ClubEventCard from "../components/ClubEventCard";
import MultiSelect from "../components/MultipleSelect";
import SingleSelect from "../components/SingleSelect";

import "../styles/Events.css";
import useClickOutside from "../utilityfunctions/useClickOutside"

function Events() {

  // Unique set of categories derived from data, ordered in ascending alphabetical order
  const allEventTags = useMemo(() => {
    const s = new Set();
    eventsData.forEach((e) => e.event_tags.forEach((c) => s.add(c)));
    return [...s].sort((a, b) => a.localeCompare(b));
  }, []);

  // Unique set of locations derived from data, ordered in ascending alphabetical order
  const allLocations = useMemo(() => {
    const s = new Set(eventsData.map((e) => e.location));
    return [...s].sort((a, b) => a.localeCompare(b));
  }, []);

  // ---------- State ----------
  const [query, setQuery] = useState("");                  // searched text
  const [catSel, setCatSel] = useState(new Set());         // multi
  const [locSel, setLocSel] = useState(new Set());         // multi
  const [orderBy, setOrderBy] = useState("date-asc");      // single

  // ---------- Derived: filtered + sorted ----------
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();

    // filter function
    const pass = (ev) => {
      const byName = !q || ev.event_name.toLowerCase().includes(q);

      const byCats =
        catSel.size === 0 || ev.event_tags.some((c) => catSel.has(c));

      const byLocs = locSel.size === 0 || locSel.has(ev.location);

      return byName && byCats && byLocs;
    };

    const list = eventsData.filter(pass);

    // sorting comparison
    const compare = {
      "date-asc": (a, b) => new Date(a.start_time) - new Date(b.start_time),
      "date-desc": (a, b) => new Date(b.start_time) - new Date(a.start_time),
      "name-asc": (a, b) => a.event_name.localeCompare(b.event_name),
      "name-desc": (a, b) => b.event_name.localeCompare(a.event_name),
    }[orderBy];

    return [...list].sort(compare);
  }, [query, catSel, locSel, orderBy]);

  const orderOptions = [
    { value: "date-asc", label: "Date (Earliest)" },
    { value: "date-desc", label: "Date (Latest)" },
    { value: "name-asc", label: "Event Name (A-Z)" },
    { value: "name-desc", label: "Event Name (Z-A)" },
  ];

  return (
    <div className="events-page">
      <div className="intro">
        <h1 className="title">Upcoming Events</h1>
        <p className="subtitle">
          Discover hundreds of upcoming events on campus
        </p>

        {/* filtering by favorites - commented out for now */}
        {/* <div className="cta-row">
          <button className="seg-btn on">Browse All Events</button>
          <button className="seg-btn">Favorited Clubs</button>
        </div> */}
      </div>

      <div className="filters-row">
        {/* Search */}
        <div className="search">
          <Search className="search-icon" size={18} />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search…"
            aria-label="Search events by name"
          />
        </div>

        {/* Event Tags (multi) */}
        <MultiSelect
          useClickOutside={useClickOutside}
          options={allEventTags}
          selected={catSel}
          onChange={setCatSel}
          label="Categories"
        />

        {/* Order By (single) */}
        <SingleSelect
          useClickOutside={useClickOutside}
          label="Order By"
          value={orderBy}
          options={orderOptions}
          onChange={setOrderBy}
        />

        {/* Location (multi) */}
        <MultiSelect
          useClickOutside={useClickOutside}
          options={allLocations}
          selected={locSel}
          onChange={setLocSel}
          label="Location"
        />
      </div>

      {/* Cards grid */}
      <div className="grid">
        {filtered.map((ev) => (
          <ClubEventCard key={ev.eid} event={ev} />
        ))}

        {filtered.length === 0 && (
          <div className="empty">
            <p>No events match your filters.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export { Events };