import React from "react";
import './CuratedEvents.css'; 

export const CuratedEvents = () => {
    return (
        <div className="curated-events-container">
            <div className="curated-text">
                <h1>CURATED EVENT EXPERIENCES</h1>
                <p>
                    Celebrating over a decade of service, Chappelow Events is a boutique event planning 
                    and design company that specializes in nonprofit fundraising conferences, and annual celebrations.
                </p>
                <p>
                    We are inspired by our clients’ mission, values, and goals to create memorable experiences 
                    and cultivate lasting impressions and impact. From spreadsheets to illustrated activations, 
                    let us help share your vision and build your dream event.
                </p>
                <button className="about-us-button">About Us</button>
            </div>
            <div className="curated-image">
                <img src="curatedEvent.jpg" alt="Curated Event" />
            </div>
        </div>
    );
};
