import React, { useState, useEffect } from "react";
import "./Modal.css";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

export const UpdateModal = ({ showModal, setShowModal, eventData, setEventData, eventId }) => {
  const [updatedEventData, setUpdatedEventData] = useState({
    name: '',
    description: '',
    date: '',
    location: '',
    category: '',
    imageUrl: null,
    userId: localStorage.getItem('userId')
  });

  useEffect(() => {
    if (eventData) {
      setUpdatedEventData({
        ...eventData,
        imageUrl: null // Reset imageUrl to avoid conflicts
      });
    }
  }, [eventData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedEventData({
      ...updatedEventData,
      [name]: value
    });
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    console.log('Selected file:', file); // Debugging statement
    setUpdatedEventData({
      ...updatedEventData,
      imageUrl: file
    });
  };

  const handleEditorChange = (event, editor) => {
    const data = editor.getData();
    setUpdatedEventData({
      ...updatedEventData,
      description: data
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formData = new FormData();
    formData.append("eventDto", new Blob([JSON.stringify({
        name: updatedEventData.name,
        description: updatedEventData.description,
        date: updatedEventData.date,
        location: updatedEventData.location,
        category: updatedEventData.category,
        userId: updatedEventData.userId
    })], {
        type: "application/json"
    }));
  
    if (updatedEventData.imageUrl instanceof File) {
      console.log('Appending file:', updatedEventData.imageUrl); // Debugging statement
      formData.append("file", updatedEventData.imageUrl);
    }
  
    try {
      const response = await fetch(`https://chirags-event-backend-production.up.railway.app//api/events/${eventId}`, {
          method: 'PUT',
          body: formData
      });
  
      if (response.ok) {
        const result = await response.json();
        console.log('Event updated:', result);
        setShowModal(false);
      } else {
        console.error('Failed to update event:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    }
    window.location.reload()
  };

  return (
    updatedEventData.name && <div className={`modal fade ${showModal ? 'show d-block' : ''}`} id="staticBackdrop" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="staticBackdropLabel">Update Event</h5>
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
                  value={updatedEventData.name || ''}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="description" className="form-label">Description</label>
                <CKEditor
                  editor={ClassicEditor}
                  data={updatedEventData.description || ''}
                  onChange={handleEditorChange}
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
                  value={updatedEventData.date || ''}
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
                  value={updatedEventData.location || ''}
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
                  value={updatedEventData.category || ''}
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
                />
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={() => setShowModal(false)}>Close</button>
                <button type="submit" className="btn bg-indigo text-light">Update Event</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
