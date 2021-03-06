import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logOutUser } from "../../../store/actions/authActions";
import { clearCurrentProfile } from "../../../store/actions/profileActions";
import AuthLinks from "./AuthLinks";
import GuestLinks from "./GuestLinks";
class Navbar extends Component {
  onLogoutClick(e) {
    e.preventDefault();
    this.props.clearCurrentProfile();
    this.props.logOutUser();
  }
  render() {
    const { isAuthenticated, user } = this.props.auth;
    return (
      <div>
        {/** Navbar**/}
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
          <div className="container">
            <Link className="navbar-brand" to="/">
              GeekExchange
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#mobile-nav"
            >
              <span className="navbar-toggler-icon" />
            </button>
            <div className="collapse navbar-collapse" id="mobile-nav">
              <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                  <Link className="nav-link" to="/profiles">
                    {" "}
                    Developers
                  </Link>
                </li>
              </ul>
              {isAuthenticated === true ? (
                <AuthLinks
                  user={user}
                  clicked={this.onLogoutClick.bind(this)}
                />
              ) : (
                <GuestLinks />
              )}
            </div>
          </div>
        </nav>
      </div>
    );
  }
}

Navbar.propTypes = {
  logOutUser: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(
  mapStateToProps,
  { logOutUser, clearCurrentProfile }
)(Navbar);
