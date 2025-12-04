import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { BackButton } from "../components/BackButton";
import MultiSelect from "../components/MultipleSelect.jsx";
import useClickOutside from "../utilityfunctions/useClickOutside";
import { Plus } from "lucide-react";

import "../styles/IndividualClub.css";

function EditingIndividualClub() {
  const { cid } = useParams();

  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
  const isAdmin = !!loggedInUser?.is_Admin;

  const [clubForm, setClubForm] = useState({
    club_name: "",
    description: "",
    image: "",
  });

  const [eventsForm, setEventsForm] = useState([]);

  const [allCategories, setAllCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState(new Set());

  const [allEventTags, setAllEventTags] = useState([]);

  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(null);

  // scroll to top
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // load club + events
  useEffect(() => {
    const loadData = async () => {
      try {
        // club
        const clubRes = await fetch(
          `http://localhost:5174/api/clubs?cid=${cid}`
        );
        const clubData = await clubRes.json();
        const club = clubData[0];

        if (!club) {
          setLoadError("Club not found");
          setLoading(false);
          return;
        }

        setClubForm({
          club_name: club.club_name || "",
          description: club.description || "",
          image: club.image || "",
        });

        const initialCats = Array.isArray(club.categories)
          ? club.categories
          : [];
        setSelectedCategories(new Set(initialCats));

        // events
        const eventsRes = await fetch(
          `http://localhost:5174/api/events?cid=${cid}`
        );
        const eventsData = await eventsRes.json();

        const cleanedEvents = (eventsData || []).map((ev) => ({
          ...ev,
          event_tags: Array.isArray(ev.event_tags)
            ? ev.event_tags.filter(Boolean)
            : [],
          isNew: false,
        }));

        setEventsForm(cleanedEvents);
      } catch (err) {
        console.error("Error loading club edit data:", err);
        setLoadError("Error loading data");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [cid]);

  // load all categories + event tags (for MultiSelects)
  useEffect(() => {
    const loadMeta = async () => {
      try {
        const [catRes, tagRes] = await Promise.all([
          fetch("http://localhost:5174/api/clubs/categories/all"),
          fetch("http://localhost:5174/api/events/tags/all"),
        ]);

        const catData = await catRes.json();
        const tagData = await tagRes.json();

        const cats = catData.map((row) => row.cat_name);
        const tags = tagData.map((row) => row.tag_name);

        console.log("Loaded event tags from backend:", tags);

        setAllCategories(cats);
        setAllEventTags(tags);
      } catch (err) {
        console.error("Error loading categories/tags:", err);
      }
    };

    loadMeta();
  }, []);

  // ----- handlers -----

  const handleClubChange = (field, value) => {
    setClubForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleEventChange = (eid, field, value) => {
    setEventsForm((prev) =>
      prev.map((ev) =>
        ev.eid === eid
          ? {
              ...ev,
              [field]: value,
            }
          : ev
      )
    );
  };

  const handleSaveClub = async () => {
    try {
      const res = await fetch(`http://localhost:5174/api/clubs/${cid}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          club_name: clubForm.club_name,
          description: clubForm.description,
          image: clubForm.image,
          categories: Array.from(selectedCategories),
        }),
      });

      const text = await res.text();
      console.log("Save club response:", res.status, text);

      if (!res.ok) {
        throw new Error(text || "Failed to save club");
      }

      alert("Club saved successfully");
    } catch (err) {
      console.error("Error saving club:", err);
      alert("Error saving club. Check console for details.");
    }
  };

  const handleSaveEvent = async (eid) => {
    const ev = eventsForm.find((e) => e.eid === eid);
    if (!ev) return;

    const isNew = ev.isNew;

    try {
      if (isNew) {
        // CREATE new event (POST)
        const res = await fetch("http://localhost:5174/api/events", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            cid,
            event_name: ev.event_name,
            description: ev.description,
            start_time: ev.start_time,
            end_time: ev.end_time,
            flyer_url: ev.flyer_url,
            location: ev.location,
            event_tags: ev.event_tags || [],
          }),
        });

        if (!res.ok) {
          const text = await res.text();
          console.log("Create event error response:", res.status, text);
          throw new Error(text || "Failed to create event");
        }

        const created = await res.json();
        console.log("Create event response:", created);

        // replace temp event with real one from backend
        setEventsForm((prev) =>
          prev.map((e) =>
            e.eid === eid ? { ...created, event_tags: (created.event_tags || []).filter(Boolean), isNew: false } : e
          )
        );

        alert(`Event ${created.eid} created successfully`);
      } else {
        // UPDATE existing event (PUT)
        const res = await fetch(`http://localhost:5174/api/events/${eid}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            event_name: ev.event_name,
            description: ev.description,
            start_time: ev.start_time,
            end_time: ev.end_time,
            flyer_url: ev.flyer_url,
            location: ev.location,
            event_tags: ev.event_tags || [],
          }),
        });

        const text = await res.text();
        console.log("Save event response:", res.status, text);

        if (!res.ok) {
          throw new Error(text || "Failed to save event");
        }

        alert(`Event ${eid} saved successfully`);
      }
    } catch (err) {
      console.error("Error saving event:", err);
      alert("Error saving event. Check console for details.");
    }
  };

  const handleDeleteEvent = async (eid) => {
    // if it's a brand-new unsaved event, just remove it from state
    if (String(eid).startsWith("new-")) {
      setEventsForm((prev) => prev.filter((ev) => ev.eid !== eid));
      return;
    }

    const confirmDelete = window.confirm(
      `Are you sure you want to delete event ${eid}?`
    );
    if (!confirmDelete) return;

    try {
      const res = await fetch(`http://localhost:5174/api/events/${eid}`, {
        method: "DELETE",
      });

      const text = await res.text();
      console.log("Delete event response:", res.status, text);

      if (!res.ok) {
        throw new Error(text || "Failed to delete event");
      }

      setEventsForm((prev) => prev.filter((ev) => ev.eid !== eid));

      alert(`Event ${eid} deleted`);
    } catch (err) {
      console.error("Error deleting event:", err);
      alert("Error deleting event. Check console for details.");
    }
  };

  const handleEventTagsChange = (eid, newSet) => {
    setEventsForm((prev) =>
      prev.map((ev) =>
        ev.eid === eid
          ? {
              ...ev,
              event_tags: Array.from(newSet),
            }
          : ev
      )
    );
  };

  const handleAddEvent = () => {
    const tempId = `new-${Date.now()}`;

    setEventsForm((prev) => [
      ...prev,
      {
        eid: tempId,
        cid: parseInt(cid, 10),
        event_name: "",
        description: "",
        start_time: "",
        end_time: "",
        flyer_url: "",
        location: "",
        event_tags: [],
        isNew: true,
      },
    ]);
  };

  // ----- loading / error -----

  if (loading) {
    return (
      <div className="individual-club-page">
        <div className="individual-club-inner">
          <BackButton linkTo="/manage-clubs" />
          <p>Loading…</p>
        </div>
      </div>
    );
  }

  if (loadError) {
    return (
      <div className="individual-club-page">
        <div className="individual-club-inner">
          <BackButton linkTo="/manage-clubs" />
          <p>{loadError}</p>
        </div>
      </div>
    );
  }

  // ----- UI -----

  return (
    <div className="individual-club-page">
      <div className="individual-club-inner">
        <div className="club-header-row">
          <BackButton linkTo="/manage-clubs" />
        </div>

        <div className="club-main-layout">
          {/* LEFT COLUMN – EDIT CLUB DETAILS */}
          <section className="club-main-column">
            <div className="club-cover-wrapper">
              {clubForm.image ? (
                <img
                  src={clubForm.image}
                  alt={clubForm.club_name}
                  className="club-cover-image"
                />
              ) : (
                <div className="club-cover-placeholder">No image</div>
              )}
            </div>

            <div style={{ marginBottom: "12px" }}>
              <label>
                Club Name
                <input
                  type="text"
                  value={clubForm.club_name}
                  onChange={(e) =>
                    handleClubChange("club_name", e.target.value)
                  }
                  style={{ width: "100%", marginTop: 4 }}
                />
              </label>
            </div>

            <div style={{ marginBottom: "12px" }}>
              <label>
                Image URL
                <input
                  type="text"
                  value={clubForm.image}
                  onChange={(e) => handleClubChange("image", e.target.value)}
                  style={{ width: "100%", marginTop: 4 }}
                />
              </label>
            </div>

            <div style={{ marginBottom: "12px" }}>
              <label>
                Description
                <textarea
                  value={clubForm.description}
                  onChange={(e) =>
                    handleClubChange("description", e.target.value)
                  }
                  rows={6}
                  style={{ width: "100%", marginTop: 4 }}
                />
              </label>
            </div>

            {isAdmin && (
              <div style={{ marginBottom: "12px" }}>
                <MultiSelect
                  useClickOutside={useClickOutside}
                  options={allCategories}
                  selected={selectedCategories}
                  onChange={setSelectedCategories}
                  label="Categories"
                />
              </div>
            )}

            <button
              type="button"
              onClick={handleSaveClub}
              style={{ marginTop: "8px" }}
            >
              Save Club
            </button>
          </section>

          {/* RIGHT COLUMN – EDIT EVENTS */}
          <section className="club-events-column">
            <header
              className="club-events-header"
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>
                <h2 className="club-events-title">Upcoming Events</h2>
                <p className="club-events-subtitle">
                  Edit each event and save individually
                </p>
              </div>

              {/* + button for creating a new event */}
              <button
                type="button"
                onClick={handleAddEvent}
                style={{
                  borderRadius: "999px",
                  width: 32,
                  height: 32,
                  border: "1px solid #ddd",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  background: "#ffffff",
                }}
                aria-label="Create new event"
              >
                <Plus size={18} />
              </button>
            </header>

            <div className="club-events-list">
              {eventsForm.length === 0 ? (
                <p className="no-events">No events for this club.</p>
              ) : (
                eventsForm.map((event) => (
                  <div
                    key={event.eid}
                    style={{
                      borderRadius: 16,
                      padding: 12,
                      border: "1px solid #ddd",
                      width: "100%",
                    }}
                  >
                    {/* Tags editor */}
                    <div style={{ marginBottom: 8 }}>
                      <MultiSelect
                        useClickOutside={useClickOutside}
                        options={allEventTags}
                        selected={new Set(event.event_tags || [])}
                        onChange={(newSet) =>
                          handleEventTagsChange(event.eid, newSet)
                        }
                        label="Tags"
                      />
                    </div>

                    <p style={{ fontWeight: 600 }}>
                      Event ID:{" "}
                      {String(event.eid).startsWith("new-")
                        ? "(new)"
                        : event.eid}{" "}
                      (cid: {event.cid})
                    </p>

                    <div style={{ marginBottom: 8 }}>
                      <label>
                        Event Name
                        <input
                          type="text"
                          value={event.event_name || ""}
                          onChange={(e) =>
                            handleEventChange(
                              event.eid,
                              "event_name",
                              e.target.value
                            )
                          }
                          style={{ width: "100%", marginTop: 4 }}
                        />
                      </label>
                    </div>

                    <div style={{ marginBottom: 8 }}>
                      <label>
                        Flyer URL
                        <input
                          type="text"
                          value={event.flyer_url || ""}
                          onChange={(e) =>
                            handleEventChange(
                              event.eid,
                              "flyer_url",
                              e.target.value
                            )
                          }
                          style={{ width: "100%", marginTop: 4 }}
                        />
                      </label>
                    </div>

                    <div style={{ marginBottom: 8 }}>
                      <label>
                        Start Time (YYYY-MM-DD HH:MM:SS)
                        <input
                          type="text"
                          value={event.start_time || ""}
                          onChange={(e) =>
                            handleEventChange(
                              event.eid,
                              "start_time",
                              e.target.value
                            )
                          }
                          style={{ width: "100%", marginTop: 4 }}
                        />
                      </label>
                    </div>

                    <div style={{ marginBottom: 8 }}>
                      <label>
                        End Time (YYYY-MM-DD HH:MM:SS)
                        <input
                          type="text"
                          value={event.end_time || ""}
                          onChange={(e) =>
                            handleEventChange(
                              event.eid,
                              "end_time",
                              e.target.value
                            )
                          }
                          style={{ width: "100%", marginTop: 4 }}
                        />
                      </label>
                    </div>

                    <div style={{ marginBottom: 8 }}>
                      <label>
                        Location
                        <input
                          type="text"
                          value={event.location || ""}
                          onChange={(e) =>
                            handleEventChange(
                              event.eid,
                              "location",
                              e.target.value
                            )
                          }
                          style={{ width: "100%", marginTop: 4 }}
                        />
                      </label>
                    </div>

                    <div style={{ marginBottom: 8 }}>
                      <label>
                        Description
                        <textarea
                          value={event.description || ""}
                          onChange={(e) =>
                            handleEventChange(
                              event.eid,
                              "description",
                              e.target.value
                            )
                          }
                          rows={4}
                          style={{ width: "100%", marginTop: 4 }}
                        />
                      </label>
                    </div>

                    <div style={{ display: "flex", gap: 8 }}>
                      <button
                        type="button"
                        onClick={() => handleSaveEvent(event.eid)}
                      >
                        {event.isNew ? "Create Event" : "Save Event"}
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteEvent(event.eid)}
                        style={{ backgroundColor: "#fee2e2" }}
                      >
                        {event.isNew ? "Discard" : "Delete Event"}
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export { EditingIndividualClub };
