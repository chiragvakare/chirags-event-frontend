// DeleteModal.js
import React from 'react';
import './DeleteModal.css'; // Ensure this file is correctly imported

const DeleteModal = ({ show, onClose, onDelete, eventName }) => {
  if (!show) return null;

  return (
    <div className="modal-class fade show" style={{ display: 'block' }} tabIndex="-1" role="dialog">
      <div className="modal-class-dialog modal-class-confirm" role="document">
        <div className="modal-class-content">
          <div className="modal-class-header">
            <div className="icon-box">
              {/* <i className="material-icons">&#xE5CD;</i> */}
              <i className="material-symbols-outlined">delete</i>
            </div>
            <h6 className="modal-class-title">Are you sure you really want to delete the event ?</h6>
          </div>
          <div className="modal-class-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
            <button type="button" className="btn btn-danger" onClick={onDelete}>Delete</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
