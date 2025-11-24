import React, { useMemo, useState, useRef, useEffect } from "react";
import { Search, ChevronDown, X, Check } from "lucide-react";

import eventsData from "./data/eventsData.json";
import ClubEventCard from "./components/ClubEventCard";

import "./styles/Events.css";

/**
 * Utility - Click-outside hook for closing popovers
 * 
 * - `ref`: references popup element
 * - `onOutside`: function to run that closes popup IF click was outside of popup
 */
function useClickOutside(ref, onOutside) {
  useEffect(() => { //use to prevent multiple/unused EventListeners when component (popup) unmounts

    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) onOutside(); //onOutside - function to close popup
    }
    
    document.addEventListener("mousedown", handleClick); //calls handleClick upon click ANYWHERE

    return () => document.removeEventListener("mousedown", handleClick); //cleanup function - prevent duplicate EventListeners,
  }, [ref, onOutside]);                                                  //resource leaks
}

/**
 * MultiSelect dropdown (checkbox list)
 * - `options`: array of strings
 * - `selected`: Set<string>
 * - `onChange`: (newSet: Set<string>) => void
 * - `label`: string for the trigger button
 */
function MultiSelect({ options, selected, onChange, label }) {
  const [open, setOpen] = useState(false);
  const popRef = useRef(null);
  useClickOutside(popRef, () => setOpen(false));

  const toggle = (opt) => {
    const next = new Set(selected);
    if (next.has(opt)) next.delete(opt);
    else next.add(opt);
    onChange(next);
  };

  const clearAll = (e) => {
    e.stopPropagation();
    onChange(new Set());
  };

  const selectedCount = selected.size;

  return (
    <div className="filter">
      <button className="filter-trigger" onClick={() => setOpen((v) => !v)}>
        <span>{label}</span>
        {selectedCount > 0 && <span className="badge">{selectedCount}</span>}
        <ChevronDown className="chev" size={16} />
      </button>

      {open && (
        <div className="popover" ref={popRef}>
          <div className="popover-header">
            <input
              className="popover-search"
              placeholder="Search…"
              onChange={(e) => {
                const q = e.target.value.toLowerCase();
                const items = [...popRef.current.querySelectorAll("[data-opt]")];
                items.forEach((el) => {
                  const show = el.dataset.opt.toLowerCase().includes(q);
                  el.style.display = show ? "flex" : "none";
                });
              }}
            />
            <button className="clear-btn" onClick={clearAll} title="Clear">
              <X size={16} />
            </button>
          </div>

          <div className="options">
            {options.map((opt) => {
              const isChecked = selected.has(opt);
              return (
                <label className="option" key={opt} data-opt={opt}>
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => toggle(opt)}
                  />
                  <span className={`checkbox ${isChecked ? "on" : ""}`}>
                    {isChecked && <Check size={14} />}
                  </span>
                  <span className="option-label">{opt}</span>
                </label>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

/**
 * SingleSelect dropdown (radio list) for Order By
 */
function SingleSelect({ label, value, options, onChange }) {
  const [open, setOpen] = useState(false);
  const popRef = useRef(null);
  useClickOutside(popRef, () => setOpen(false));

  const current = options.find((o) => o.value === value);

  return (
    <div className="filter">
      <button className="filter-trigger" onClick={() => setOpen((v) => !v)}>
        <span>{label}</span>
        <span className="muted">{current?.label}</span>
        <ChevronDown className="chev" size={16} />
      </button>

      {open && (
        <div className="popover" ref={popRef}>
          <div className="options">
            {options.map((opt) => (
              <label className="option" key={opt.value}>
                <input
                  type="radio"
                  name="orderby"
                  checked={value === opt.value}
                  onChange={() => {
                    onChange(opt.value);
                    setOpen(false);
                  }}
                />
                <span className={`radio ${value === opt.value ? "on" : ""}`}>
                  {value === opt.value && <Check size={14} />}
                </span>
                <span className="option-label">{opt.label}</span>
              </label>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function Events() {
  // ---------- Sample data (JSON) -> unique facets ----------
  const allCategories = useMemo(() => {
    const s = new Set();
    eventsData.forEach((e) => e.categories.forEach((c) => s.add(c)));
    return [...s].sort((a, b) => a.localeCompare(b));
  }, []);

  const allLocations = useMemo(() => {
    const s = new Set(eventsData.map((e) => e.location));
    return [...s].sort((a, b) => a.localeCompare(b));
  }, []);

  // ---------- State ----------
  const [query, setQuery] = useState("");
  const [catSel, setCatSel] = useState(new Set());         // multi
  const [locSel, setLocSel] = useState(new Set());         // multi
  const [orderBy, setOrderBy] = useState("date-asc");      // single

  // ---------- Derived: filtered + sorted ----------
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();

    const pass = (ev) => {
      const byName = !q || ev.name.toLowerCase().includes(q);

      const byCats =
        catSel.size === 0 || ev.categories.some((c) => catSel.has(c));

      const byLocs = locSel.size === 0 || locSel.has(ev.location);

      return byName && byCats && byLocs;
    };

    const list = eventsData.filter(pass);

    // Sorting
    const compare = {
      "date-asc": (a, b) => new Date(a.date) - new Date(b.date),
      "date-desc": (a, b) => new Date(b.date) - new Date(a.date),
      "name-asc": (a, b) => a.name.localeCompare(b.name),
      "name-desc": (a, b) => b.name.localeCompare(a.name),
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
        <div className="cta-row">
          <button className="seg-btn on">Browse All Events</button>
          <button className="seg-btn">Favorited Clubs</button>
        </div>
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

        {/* Categories (multi) */}
        <MultiSelect
          options={allCategories}
          selected={catSel}
          onChange={setCatSel}
          label="Categories"
        />

        {/* Order By (single) */}
        <SingleSelect
          label="Order By"
          value={orderBy}
          options={orderOptions}
          onChange={setOrderBy}
        />

        {/* Location (multi) */}
        <MultiSelect
          options={allLocations}
          selected={locSel}
          onChange={setLocSel}
          label="Location"
        />
      </div>

      {/* Cards grid */}
      <div className="grid">
        {filtered.map((ev) => (
          <ClubEventCard key={ev.id} event={ev} />
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