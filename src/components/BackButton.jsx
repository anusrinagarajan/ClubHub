import { ArrowLeft } from "lucide-react";
import { Link } from 'react-router-dom';

import "../styles/BackButton.css"

function BackButton({ linkTo }) {
  return (
    <>
      <Link to={linkTo} className="invis-link">
        <button
        type="button"
        className="back-button"
        aria-label="Go back"
        >
        <ArrowLeft className="back-button-icon" size={16} />
        <span>Back</span>
        </button>
      </Link>
    </>
  );
};

export { BackButton };