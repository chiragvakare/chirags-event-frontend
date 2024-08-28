import React, { useState } from "react";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import "./Modal.css"; // Ensure this file exists with the styles

export const Modal = ({ showModal, setShowModal, userId }) => {
  const [eventData, setEventData] = useState({
    name: '',
    description: '',
    date: '',
    location: '',
    category: '',
    imageUrl: null,
    userId: localStorage.getItem('userId')
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventData({
      ...eventData,
      [name]: value
    });
  };

  const handleImage = (e) => {
    const { name } = e.target;
    const value = e.target.files[0];
    setEventData({
      ...eventData,
      [name]: value
    });
  };

  const handleCKEditorChange = (event, editor) => {
    const data = editor.getData();
    setEventData({
      ...eventData,
      description: data
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append("event", new Blob([JSON.stringify({
        name: eventData.name,
        description: eventData.description,
        date: eventData.date,
        location: eventData.location,
        category: eventData.category,
        userId: eventData.userId
    })], {
        type: "application/json"
    }));
    
    formData.append("file", eventData.imageUrl);

    try {
        const response = await fetch(`chirags-event-backend-production.up.railway.app/api/events/${localStorage.getItem('userId')}`, {
            method: 'POST',
            body: formData
        });
        if (response.ok) {
            const result = await response.json();
            setShowModal(false);
        } else {
            console.error('Failed to create event');
        }
    } catch (error) {
        console.error('Error:', error);
    }

    window.location.reload();
  };

  return (
    <div className={`modal fade ${showModal ? 'show d-block' : ''}`} id="staticBackdrop" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="staticBackdropLabel">Add New Event</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => setShowModal(false)}></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">Event Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  name="name"
                  placeholder="Event Name"
                  value={eventData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="description" className="form-label">Description</label>
                <CKEditor
                  editor={ClassicEditor}
                  data={eventData.description}
                  onChange={handleCKEditorChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="date" className="form-label">Date</label>
                <input
                  type="date"
                  className="form-control"
                  id="date"
                  name="date"
                  placeholder="YYYY-MM-DD"
                  value={eventData.date}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="location" className="form-label">Location</label>
                <input
                  type="text"
                  className="form-control"
                  id="location"
                  name="location"
                  placeholder="Event Location"
                  value={eventData.location}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="category" className="form-label">Category</label>
                <input
                  type="text"
                  className="form-control"
                  id="category"
                  name="category"
                  placeholder="Event Category"
                  value={eventData.category}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="imageUrl" className="form-label">Event Image</label>
                <input
                  type="file"
                  className="form-control"
                  id="imageUrl"
                  name="imageUrl"
                  placeholder="Upload Event Image"
                  onChange={handleImage}
                  required
                />
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={() => setShowModal(false)}>Close</button>
                <button type="submit" className="btn bg-indigo text-light">Add event</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
