import React, { Component } from 'react';
import reqres from '../../api/reqres';
import Loading from '../Loading';
import User from './User';
import './Users.scss';

const getUsersUrl = query =>
  `/api/users?page=${query.page}&per_page=${query.per_page}`;

class Users extends Component {
  state = {
    isLoading: true,
    error: null,
    users: [],
    page: 1,
    per_page: 5,
    total: 0,
    total_pages: 0
  };

  usersEl = React.createRef();
  timeout = null;

  componentDidMount() {
    this.timeout = setTimeout(
      () => this.handleFetchUsers(this.state.page, 5),
      3000
    );
    this.usersEl.current.addEventListener('scroll', this.handleScroll, false);
  }

  componentWillUnmount() {
    clearTimeout(this.timeout);
    this.usersEl.current.removeEventListener(
      'scroll',
      this.handleScroll,
      false
    );
  }

  handleFetchUsers = async (page, per_page) => {
    if (this.state.page === this.state.total_pages) {
      this.setState({ isLoading: false });
      return;
    }

    try {
      let { data } = await reqres.get(getUsersUrl({ page, per_page }));

      this.setState(prevState => ({
        isLoading: false,
        users: [...prevState.users, ...data.data],
        page: data.page,
        per_page: data.per_page,
        total: data.total,
        total_pages: data.total_pages
      }));
    } catch (error) {
      this.setState({ error });
    }
  };

  handleScroll = node => {
    const { target } = node;
    let { page, per_page } = this.state;

    if (
      target.offsetHeight + target.scrollTop === target.scrollHeight &&
      this.state.users.length &&
      !this.state.isLoading
    ) {
      this.setState({ isLoading: true });
      this.handleFetchUsers(page + 1, per_page);
    }
  };

  render() {
    const { isLoading, users, page, total_pages, error } = this.state;

    return (
      <div className="users__wrap">
        <h2 className="heading">Users</h2>
        <div className="users" ref={this.usersEl}>
          {error && <div className="user user--error">{error.message}</div>}
          {!!users.length &&
            users.map(item => <User key={item.id} {...item} />)}
          {page === total_pages && (
            <div className="user user--end">End of list.</div>
          )}
          <Loading isLoading={isLoading} />
        </div>
      </div>
    );
  }
}

export default Users;
