import React, { Component } from "react";
import isEmpty from "../../validation/is-empty";
import { Link } from "react-router-dom";
class ProfileHeader extends Component {
  render() {
    const { profile } = this.props;
    return (
      <div className="row">
        <div className="col-md-12">
          <div className="card card-body bg-info text-white mb-3">
            <div className="row">
              <div className="col-4 col-md-3 m-auto">
                <img
                  className="rounded-circle"
                  src={profile.user.avatar}
                  alt=""
                />
              </div>
            </div>
            <div className="text-center">
              <h1 className="display-4 text-center">{profile.user.name}</h1>
              <p className="lead text-center">
                {profile.status}{" "}
                {isEmpty(profile.company) ? null : (
                  <span>at {profile.company}</span>
                )}
              </p>
              {isEmpty(profile.location) ? null : <p>{profile.location}</p>}
              <p>
                {isEmpty(profile.website) ? null : (
                  <Link className="text-white p-2" to={profile.website}>
                    <i className="fas fa-globe fa-2x" />
                  </Link>
                )}

                {isEmpty(profile.social && profile.social.twitter) ? null : (
                  <Link className="text-white p-2" to={profile.social.twitter}>
                    <i className="fab fa-twitter fa-2x" />
                  </Link>
                )}

                {isEmpty(profile.social && profile.social.facebook) ? null : (
                  <Link className="text-white p-2" to={profile.social.facebook}>
                    <i className="fab fa-facebook fa-2x" />
                  </Link>
                )}

                {isEmpty(profile.social && profile.social.linkedin) ? null : (
                  <Link className="text-white p-2" to={profile.social.linkedin}>
                    <i className="fab fa-linkedin fa-2x" />
                  </Link>
                )}

                {isEmpty(profile.social && profile.social.youtube) ? null : (
                  <Link className="text-white p-2" to={profile.social.youtube}>
                    <i className="fab fa-youtube fa-2x" />
                  </Link>
                )}
                {isEmpty(profile.social && profile.social.instagram) ? null : (
                  <Link
                    className="text-white p-2"
                    to={profile.social.instagram}
                  >
                    <i className="fab fa-instagram fa-2x" />
                  </Link>
                )}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ProfileHeader;
