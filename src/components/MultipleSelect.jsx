import React, { useState, useRef } from "react";
import { ChevronDown, X, Check } from "lucide-react";

/**
 * MultiSelect dropdown (checkbox list)
 * - `options`: array of strings
 * - `selected`: Set<string>
 * - `onChange`: (newSet: Set<string>) => void
 * - `label`: string for the trigger button
 */
function MultiSelect({ useClickOutside, options, selected, onChange, label }) {
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

export default MultiSelect;