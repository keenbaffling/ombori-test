import React from 'react';
import PropTypes from 'prop-types';
import './Loading.scss';

const Loading = props => {
  if (!props.isLoading) {
    return null;
  }

  return (
    <div className="loading">
      <div className="circle">
        <span className="circle-0" />
        <span className="circle-1" />
        <span className="circle-2" />
      </div>
    </div>
  );
};

Loading.propTypes = {
  isLoading: PropTypes.bool
};

Loading.defaultProps = {
  isLoading: true
};

export default Loading;
