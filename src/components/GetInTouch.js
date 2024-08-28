import React from 'react';
import './GetInTouch.css';

export const GetInTouch = () => {
    return (
        <div className="getintouch-container">
            <div className="getintouch-left-image">
                <img src="getInTouch.jpg" alt="Let's Toast" />
            </div>
            <div className="getintouch-right-content">
                <h2 className="getintouch-right-head">LET'S TOAST</h2>
                <span className="getintouch-subtitle">GET IN TOUCH</span>
                <div className="getintouch-form-group">
                    <label>Email</label>
                    <input className="getintouch-right-inp" type="text" />
                </div>
                <button className="getintouch-right-button">Submit</button><br/>
                <button className="getintouch-right-button secondary">Schedule a Consultation</button>
            </div>
        </div>
    );
};
