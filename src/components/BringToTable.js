import React, { useState } from "react";
import "./BringToTable.css";

export const BringToTable = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleDropdown = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="bringToTable-container">
      <div className={`bringToTable-image-content ${activeIndex !== null ? "active" : ""}`}>
        <img src="bringToTable.jpg" alt="Bring to Table" />
      </div>
      <div className="bringToTable-written-content">
        <h2>WHAT WE BRING TO THE TABLE</h2>

        <div className={`bringToTable-dropdown-item ${activeIndex === 0 ? "active" : ""}`}>
          <div className="bringToTable-dropdown-title" onClick={() => toggleDropdown(0)}>
            PLANNING
            <span className={`bringToTable-arrow ${activeIndex === 0 ? "open" : ""}`}>&#9662;</span>
          </div>
          <div className="bringToTable-dropdown-content">
            With over a decade of experience, leave the spreadsheets, budget management, vendor outreach, mobile bidding software, and onsite event management to us.
          </div>
        </div>

        <div className={`bringToTable-dropdown-item ${activeIndex === 1 ? "active" : ""}`}>
          <div className="bringToTable-dropdown-title" onClick={() => toggleDropdown(1)}>
            DESIGNING
            <span className={`bringToTable-arrow ${activeIndex === 1 ? "open" : ""}`}>&#9662;</span>
          </div>
          <div className="bringToTable-dropdown-content">
            From event storyboarding to marketing, our team will design your dream event from the ground up.
          </div>
        </div>

        <div className={`bringToTable-dropdown-item ${activeIndex === 2 ? "active" : ""}`}>
          <div className="bringToTable-dropdown-title" onClick={() => toggleDropdown(2)}>
            PRODUCTION
            <span className={`bringToTable-arrow ${activeIndex === 2 ? "open" : ""}`}>&#9662;</span>
          </div>
          <div className="bringToTable-dropdown-content">
            Stage management is our forte. Working with our preferred production partners, we will ensure that every light, sound, and moment is perfectly on cue!
          </div>
        </div>

        <div className={`bringToTable-dropdown-item ${activeIndex === 3 ? "active" : ""}`}>
          <div className="bringToTable-dropdown-title" onClick={() => toggleDropdown(3)}>
            FULFILLMENT
            <span className={`bringToTable-arrow ${activeIndex === 3 ? "open" : ""}`}>&#9662;</span>
          </div>
          <div className="bringToTable-dropdown-content">
            You bring the sponsors and we'll handle the rest! If you want to ensure full engagement of sponsors at your event and you want them to keep coming back year after year, lean on our fulfillment services to keep those VIPs happy!
          </div>
        </div>

        <button className="bringToTable-learnMore-button">Learn More</button>
      </div>
    </div>
  );
};
