import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("token"); // Clear the login token
    setIsLoggedIn(false); // Update the login state 
    // history.push("/"); // Redirect to homepage after logout
    window.location.href = "/"
  };
  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active" href="/">
                  Home
                </a>
              </li>
              {isLoggedIn ? ( // Render logout button if user is logged in
                <li className="nav-item" style={{ margin: "0 0 0 10px" }}>
                  <button className="nav-link" onClick={handleLogout}>
                    Logout
                  </button>
                </li>
              ) : (
                <li className="nav-item" style={{ margin: "0 0 0 10px" }}>
                  <a href="/login" className="nav-link">
                    Login
                  </a>
                </li>
              )}
              <li className="nav-item">
                <a className="nav-link active" href="/signup">
                  SignUp
                </a>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="/"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Dropdown
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <a className="dropdown-item" href="/">
                      Action
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="/">
                      Another action
                    </a>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <a className="dropdown-item" href="/">
                      Something else here
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
            
          </div>
        </div>
      </nav>
    </div>
  );
}
