// UpdateEventModal.js
import React, { useState } from "react";

const UpdateEventModal = ({ show, handleClose, handleUpdate, event }) => {
  const [name, setName] = useState(event?.name || "");
  const [description, setDescription] = useState(event?.description || "");
  const [date, setDate] = useState(event?.date || "");
  const [location, setLocation] = useState(event?.location || "");
  const [category, setCategory] = useState(event?.category || "");

  const handleSubmit = () => {
    handleUpdate({
      id: event.id,
      name,
      description,
      date,
      location,
      category,
    });
    handleClose();
  };

  return (
    show && (
      <div className="modal">
        <div className="modal-content">
          <span className="close" onClick={handleClose}>&times;</span>
          <h2>Update Event</h2>
          <form>
            <label>
              Name:
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </label>
            <label>
              Description:
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </label>
            <label>
              Date:
              <input
                type="text"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </label>
            <label>
              Location:
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </label>
            <label>
              Category:
              <input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
            </label>
            <button type="button" onClick={handleSubmit}>Update</button>
          </form>
        </div>
      </div>
    )
  );
};

export default UpdateEventModal;
