import React from "react";
import { Link } from "react-router-dom";
function AuthLinks(props) {
  return (
    <div>
      <ul className="navbar-nav ml-auto">
        <li>
          {" "}
          <Link className="nav-link" to="/feed">
            Post Feed
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/dashboard">
            Dashboard
          </Link>
        </li>
        <li>
          <Link to="/" className="nav-link" onClick={props.clicked}>
            <img
              className="rounded-circle"
              src={props.user.avatar}
              alt={props.name}
              title="You must have a Gravatar connected to your email to display an image"
              style={{ width: "25px", marginRight: "5px" }}
            />
            {""}
            Logout
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default AuthLinks;
