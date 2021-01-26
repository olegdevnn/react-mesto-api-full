import React from 'react';

import PropTypes from 'prop-types';
import { Redirect, Route } from 'react-router';

import { SING_IN_LINK } from '../utils/utils';

const ProtectedRoute = ({ component: Component, loggedIn, ...props }) => {
  if (loggedIn === null) {
    return null;
  }

  return (
    <Route>
      {
        // eslint-disable-next-line react/jsx-props-no-spreading
        loggedIn ? <Component {...props} /> : <Redirect to={SING_IN_LINK} from="/" />
      }
    </Route>
  );
};

ProtectedRoute.propTypes = {
  loggedIn: PropTypes.bool,
  component: PropTypes.elementType.isRequired,
};

ProtectedRoute.defaultProps = {
  loggedIn: null,
};

export default ProtectedRoute;
