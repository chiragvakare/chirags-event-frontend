import React, { useState, useEffect } from "react";
import "./Card.css";
import { Modal } from "./Modal";
import { UpdateModal } from "./UpdateModal";
import DeleteModal from "./DeleteModal";

export const Card = ({ myEvent }) => {
  const flag = myEvent === "true";
  const [username, setUsername] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [currentEvent, setCurrentEvent] = useState(null);
  const [myCreatedEvents, setMyCreatedEvents] = useState([]);
  const [allEvents, setAllEvents] = useState([]);
  const [user, setUser] = useState({ username: "", email: "", userId: "" });
  const [isHomepage, setIsHomepage] = useState(false);

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
      fetchUserInfo(storedUsername);
    }
    fetchAllEvents();
    setIsHomepage(window.location.pathname === "/");
  }, []);

  useEffect(() => {
    if (user.id) {
      fetchUserEvents(user.id);
      localStorage.setItem("userId", user.id);
    }
  }, [user.id]);

  const fetchUserInfo = async (username) => {
    try {
      const response = await fetch(
        `https://chirags-event-backend-production.up.railway.app//api/auth/user/${username}`
      );
      if (response.ok) {
        const user = await response.json();
        setUser(user);
      } else {
        console.error("Failed to fetch user info");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const fetchAllEvents = async () => {
    try {
      const response = await fetch("https://chirags-event-backend-production.up.railway.app//api/events/all");
      if (response.ok) {
        const events = await response.json();
        setAllEvents(events);
      } else {
        console.error("Failed to fetch events");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const fetchUserEvents = async (userId) => {
    try {
      const response = await fetch(
        `https://chirags-event-backend-production.up.railway.app//api/events/user/${userId}`
      );
      if (response.ok) {
        const createdEvents = await response.json();
        setMyCreatedEvents(createdEvents);
      } else {
        console.error("Failed to fetch events");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleAddEventClick = () => {
    setShowModal(true);
  };

  const handleUpdateClick = (event) => {
    setCurrentEvent(event);
    setShowUpdateModal(true);
  };

  const handleUpdate = async (eventId, updatedEvent) => {
    try {
      const response = await fetch(`https://chirags-event-backend-production.up.railway.app//api/events/${eventId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedEvent),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Event updated:", result);
        fetchAllEvents();
      } else {
        console.error("Failed to update event");
      }
    } catch (error) {
      console.error("Error:", error);
    }

    setShowUpdateModal(false);

    window.location.reload();
  };

  const handleDeleteClick = (event) => {
    setCurrentEvent(event); // Set the current event to delete
    setShowDeleteModal(true); // Show the delete confirmation modal
  };

  const handleDelete = async () => {
    if (currentEvent) {
      try {
        const response = await fetch(`https://chirags-event-backend-production.up.railway.app//api/events/${currentEvent.id}`, {
          method: "DELETE",
        });

        if (response.ok) {
          const result = await response.json();
          console.log("Event deleted:", result);
          fetchAllEvents();
        } else {
          console.error("Failed to delete event");
        }
      } catch (error) {
        console.error("Error:", error);
      }
      setShowDeleteModal(false); // Close the delete modal
    }

    window.location.reload();
  };

  const renderHTML = (htmlString) => {
    return { __html: htmlString };
  };

  const handleRegister = async (eventId) => {
    const userId = localStorage.getItem("userId");

    try {
      const response = await fetch(
        "https://chirags-event-backend-production.up.railway.app//api/events/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId,
            eventId,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      alert("Successfully registered for the event!");
    } catch (error) {
      console.error("Error registering for event:", error);
      alert("Failed to register for the event.");
    }
  };

  return (
    <section className="card-container" style={{ backgroundColor: "#f8f8f8" }}>
      {myEvent && (
        <div className="col-12 mb-4">
          <button
            className="card-btn"
            onClick={handleAddEventClick}
          >
            Add New Event
          </button>
        </div>
      )}
      <div className="row">
        {myCreatedEvents.length === 0 ? (
          <></>
        ) : (
          <>
            <div className="marquee-container">
              <div className="marquee-text">MY EVENTS</div>
            </div>
            <div className="row">
              {myCreatedEvents.map((event, index) => (
                <div key={index} className="col-sm-12 col-md-4 mb-4">
                  <div className="card">
                    <img
                      className="card-img-top"
                      src={event.imageUrl || "http://www.sayeridiary.com/wp-content/uploads/2018/08/72241d24-e14d-4cca-98a6-9af1d06b95cfrs_768.h.jpg"}
                      alt={event.name}
                    />
                    <div className="card-body">
                      <h5 className="card-title">{event.name}</h5>
                      <p className="card-text" dangerouslySetInnerHTML={renderHTML(event.description)}></p>
                      <p className="card-text"><small className="text-muted">{event.date}</small></p>
                      <div className="button-container">
                        <button className="card-btn" onClick={() => handleUpdateClick(event)}>Update</button>
                        <button className="card-btn" onClick={() => handleDeleteClick(event)}>Delete</button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {!myEvent && (
          <>
            <div className="marquee-container">
            <div className="marquee-text">ALL EVENTS</div>
            </div>
            <div className="row">
              {allEvents.map((event, index) => (
                <div key={index} className="col-sm-12 col-md-4 mb-4">
                  <div className="card">
                    <img
                      className="card-img-top"
                      src={event.imageUrl || "http://www.sayeridiary.com/wp-content/uploads/2018/08/72241d24-e14d-4cca-98a6-9af1d06b95cfrs_768.h.jpg"}
                      alt={event.name}
                    />
                    <div className="card-body">
                      <h5 className="card-title">{event.name}</h5>
                      <p className="card-text" dangerouslySetInnerHTML={renderHTML(event.description)}></p>
                      <p className="card-text"><small className="text-muted">{event.date}</small></p>
                      <div className="button-container">
                        <button style={{width:"100%"}} className="card-btn">Join Us</button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
      <Modal showModal={showModal} setShowModal={setShowModal} userId={user.userId} />
      {showUpdateModal && (
        <UpdateModal
          showModal={showUpdateModal}
          setShowModal={setShowUpdateModal}
          eventData={currentEvent}
          onUpdate={(updatedEvent) => handleUpdate(currentEvent.id, updatedEvent)}
          eventId={currentEvent.id}
        />
      )}
      <DeleteModal
        show={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onDelete={handleDelete}
        eventName={currentEvent?.name}
      />
    </section>
  );
};
