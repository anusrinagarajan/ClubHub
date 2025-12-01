import React, { useMemo, useState, useRef, useEffect } from "react";
import { Search, ChevronDown, X, Check } from "lucide-react";

import ClubEventCard from "./components/ClubEventCard";
import "./styles/Events.css";

/* ------------------------------ */
/* HOOK: useClickOutside          */
/* ------------------------------ */
function useClickOutside(ref, onOutside) {
  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) onOutside();
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [ref, onOutside]);
}

/* ------------------------------ */
/* COMPONENT: MultiSelect         */
/* ------------------------------ */
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

/* ------------------------------ */
/* COMPONENT: SingleSelect        */
/* ------------------------------ */
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

/* ------------------------------ */
/* COMPONENT: Events (MAIN)       */
/* ------------------------------ */
function Events() {
  const [eventsData, setEventsData] = useState([]);

  // Fetch from backend
  useEffect(() => {
    fetch("http://localhost:5000/api/events")
      .then((res) => res.json())
      .then((data) => {
        console.log("Loaded events:", data);
        setEventsData(data);
      })
      .catch((err) => console.error("Error fetching events:", err));
  }, []);

  // Build filters
  const allCategories = useMemo(() => {
    const s = new Set();
    eventsData.forEach((e) => {
      if (Array.isArray(e.categories)) {
        e.categories.forEach((c) => s.add(c));
      }
    });
    return [...s].sort();
  }, [eventsData]);

  const allLocations = useMemo(() => {
    const s = new Set(eventsData.map((e) => e.location));
    return [...s].sort();
  }, [eventsData]);

  // Filter state
  const [query, setQuery] = useState("");
  const [catSel, setCatSel] = useState(new Set());
  const [locSel, setLocSel] = useState(new Set());
  const [orderBy, setOrderBy] = useState("date-asc");

  // Filtering + Sorting
  const filtered = useMemo(() => {
    const q = query.toLowerCase();

    const pass = (ev) => {
      const nameField = ev.name || "";
      const catArray = ev.categories || [];
      const locField = ev.location || "";

      const matchName = !q || nameField.toLowerCase().includes(q);
      const matchCat =
        catSel.size === 0 || catArray.some((c) => catSel.has(c));
      const matchLoc = locSel.size === 0 || locSel.has(locField);

      return matchName && matchCat && matchLoc;
    };

    const list = eventsData.filter(pass);

    const compare = {
      "date-asc": (a, b) => new Date(a.date) - new Date(b.date),
      "date-desc": (a, b) => new Date(b.date) - new Date(a.date),
      "name-asc": (a, b) => a.name.localeCompare(b.name),
      "name-desc": (a, b) => b.name.localeCompare(a.name),
    }[orderBy];

    return [...list].sort(compare);
  }, [eventsData, query, catSel, locSel, orderBy]);

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
        <div className="search">
          <Search className="search-icon" size={18} />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search…"
          />
        </div>

        <MultiSelect
          options={allCategories}
          selected={catSel}
          onChange={setCatSel}
          label="Categories"
        />

        <SingleSelect
          label="Order By"
          value={orderBy}
          options={orderOptions}
          onChange={setOrderBy}
        />

        <MultiSelect
          options={allLocations}
          selected={locSel}
          onChange={setLocSel}
          label="Location"
        />
      </div>

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
