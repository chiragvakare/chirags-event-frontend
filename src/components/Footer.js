import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

export const Footer = () => {
  return (
    <footer className="footer" style={{ backgroundColor: "#F4F1EA", padding: "40px" }}>
      <div className="container-fluid">
        <div className="row">
          {/* Logo Section */}
          <div className="col-md-3 col-lg-3 col-xl-3 mx-auto mt-3">
            <div className="footer-logo" style={{ textAlign: "center" }}>
              <Link to="/">
                <img src="/logo.png" alt="Logo" style={{ height: "120px" }} />
              </Link>
            </div>
          </div>

          {/* Products Section */}
          <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mt-3">
            <h6 className="text-uppercase mb-4 font-weight-bold">Service</h6>
            <p><a href="#!" className="text-dark">Event Planning</a></p>
            <p><a href="#!" className="text-dark">Venue Booking</a></p>
            <p><a href="#!" className="text-dark">Vendor Management</a></p>
            <p><a href="#!" className="text-dark">On-site Coordination</a></p>
          </div>

          {/* Useful Links Section */}
          <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mt-3">
            <h6 className="text-uppercase mb-4 font-weight-bold">Useful links</h6>
            <p><a href="#!" className="text-dark">My Events</a></p>
            <p><a href="#!" className="text-dark">Support</a></p>
            <p><a href="#!" className="text-dark">Terms & Conditions</a></p>
            <p><a href="#!" className="text-dark">Privacy Policy</a></p>
          </div>

          {/* Contact Section */}
          <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mt-3">
            <h6 className="text-uppercase mb-4 font-weight-bold">Contact</h6>
            <p><i className="fas fa-home mr-3"></i> India, Indore 452003, MP</p>
            <p><i className="fas fa-envelope mr-3"></i> chiragsevent@gmail.com</p>
            <p><i className="fas fa-phone mr-3"></i> + 91 786 452 5567</p>
            <p><i className="fas fa-print mr-3"></i> + 91 786 452 5567</p>
          </div>
        </div>

        <hr className="my-3" />

        <div className="row d-flex align-items-center">
          <div className="col-md-7 col-lg-8 text-center text-md-start">
            <div className="p-3">
              © 2024 Copyright:
              <a className="text-dark" href="https://example.com/"> www.chirags-event.com</a>
            </div>
          </div>
          <div className="col-md-5 col-lg-4 ml-lg-0 text-center text-md-end">
            <a className="btn btn-outline-dark btn-floating m-1" role="button"><i className="fab fa-facebook-f"></i></a>
            <a className="btn btn-outline-dark btn-floating m-1" role="button"><i className="fab fa-twitter"></i></a>
            <a className="btn btn-outline-dark btn-floating m-1" role="button"><i className="fab fa-google"></i></a>
            <a className="btn btn-outline-dark btn-floating m-1" role="button"><i className="fab fa-instagram"></i></a>
          </div>
        </div>
      </div>
    </footer>
  );
};
