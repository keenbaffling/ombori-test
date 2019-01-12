import React from 'react';
import PropTypes from 'prop-types';

const User = props => (
  <div className="user" data-id={props.id}>
    <div className="user__lf">
      <div
        className="user__avatar"
        style={{ backgroundImage: `url(${props.avatar})` }}
      />
    </div>
    <div className="user__rt">
      <div className="user__name">
        {props.first_name} {props.last_name}
      </div>
    </div>
  </div>
);

User.propTypes = {
  id: PropTypes.number.isRequired,
  avatar: PropTypes.string,
  first_name: PropTypes.string,
  last_name: PropTypes.string
}

export default User;
