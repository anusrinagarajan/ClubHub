import React, { useMemo, useState, useRef, useEffect } from "react";
import { Search, ChevronDown, X, Check } from "lucide-react";

/**
 * SingleSelect dropdown (radio list) for Order By
 */
function SingleSelect({ useClickOutside, label, value, options, onChange }) {
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

export default SingleSelect;