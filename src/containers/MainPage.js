import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions } from 'actions/user';

class HomePage extends React.Component {
  componentDidMount() {
    this.props.dispatch(userActions.getAll());
  }

  render() {
    const { user, users } = this.props;
    return (
      <div>
        <h1>Hi {user.firstName}!</h1>
        {users.loading && <em>Loading users...</em>}
        {users.items && (
          <ul>
            {users.items.map(user => (
              <li key={user.id}>{user.firstName + ' ' + user.lastName}</li>
            ))}
          </ul>
        )}
        <p>
          <Link to="/login">Logout</Link>
        </p>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { users, authentication } = state;
  const { user } = authentication;
  return {
    user,
    users,
  };
}

export default connect(mapStateToProps)(HomePage);
