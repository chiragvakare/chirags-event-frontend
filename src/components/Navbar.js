import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

export const Navbar = () => {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  const handleLogout = async () => {
    try {
      const response = await fetch("https://chirags-event-backend-production.up.railway.app//api/auth/logout", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response.ok) {
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        localStorage.removeItem("userId");
        setUsername("");
        navigate("/login");
        // window.location.reload();
      } else {
        console.error("Failed to logout");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    // <nav className="navbar" style={{backgroundColor : "#F4F1EA",padding:"40px"}}>

    //     <Link to="/" style={{fontSize : "25px"}} className="navbar-brand text-dark custom-btn"><img src="/logo.png" alt="Logo" style={{height : "80px",width:"190px"}}/>
    //     </Link>
    //     <form className="d-flex" role="search">
    //       {username ? (
    //         <>
    //           {/* <span className="navbar-text text-light me-2">Hello, {username}</span> */}
    //           <Link style={{fontSize : "25px"}} className="text-light me-4 custom-btn" onClick={handleLogout}>Logout</Link>
    //         </>
    //       ) : (
    //         <>
    //           <Link to="/login" style={{fontSize : "25px"}} className="text-light me-4 custom-btn">Login</Link>
    //           <Link to="/register" style={{fontSize : "25px"}} className="text-light custom-btn">Register</Link>
    //         </>
    //       )}
    //     </form>

    // </nav>

    // <nav
    //   className="navbar"
    //   style={{ backgroundColor: "#F4F1EA", padding: "40px",height: "150px" }}
    // >
    //   <div className="bg-success">links</div>
    //   <div className="bg-info">logo</div>
    //   <div className="bg-danger">register</div>
    // </nav>

    <nav
      className="navbar"
      style={{
        backgroundColor: "#F4F1EA",
        padding: "40px",
        height: "190px",
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
      }}
    >
      {/* Links Section */}
      <a
        className="custom-btn"
        href="#about"
        style={{
          textDecoration: "none",
          letterSpacing: "3px",
          color: "#9D9B96",
          fontSize: "17px",
        }}
      >
        ABOUT
      </a>
      <a
        className="custom-btn"
        href="#services"
        style={{
          textDecoration: "none",
          letterSpacing: "3px",
          color: "#9D9B96",
          fontSize: "17px",
        }}
      >
        SERVICES
      </a>
      <a
        className="custom-btn"
        href="#portfolio"
        style={{
          textDecoration: "none",
          letterSpacing: "3px",
          color: "#9D9B96",
          fontSize: "17px",
        }}
      >
        PORTFOLIO
      </a>

      {/* Logo Section */}
      <div className="logo" style={{ textAlign: "center" }}>
        <Link to="/">
          {" "}
          <img src="/logo.png" alt="Logo" style={{ height: "120px" }} />
        </Link>
      </div>

      <a
        className="custom-btn"
        href="#contact"
        style={{
          textDecoration: "none",
          letterSpacing: "3px",
          color: "#9D9B96",
          fontSize: "17px",
        }}
      >
        CONTACT
      </a>
      {username ? (
        <>
          <Link
            className="custom-btn"
            to="/events"
            style={{
              textDecoration: "none",
              letterSpacing: "3px",
              color: "#9D9B96",
              fontSize: "17px",
            }}
          >
            MY EVENTS
          </Link>
          <Link
            className="custom-btn"
            onClick={handleLogout}
            style={{
              textDecoration: "none",
              letterSpacing: "3px",
              color: "#9D9B96",
              fontSize: "17px",
            }}
          >
            LOGOUT
          </Link>
        </>
      ) : (
        <>
          <Link
            className="custom-btn"
            to="/login"
            style={{
              textDecoration: "none",
              letterSpacing: "3px",
              color: "#9D9B96",
              fontSize: "17px",
            }}
          >
            LOGIN
          </Link>
          <Link
            className="custom-btn"
            to="/register"
            style={{
              textDecoration: "none",
              letterSpacing: "3px",
              color: "#9D9B96",
              fontSize: "17px",
            }}
          >
            REGISTER
          </Link>
        </>
      )}
    </nav>
  );
};
