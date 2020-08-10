import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Menu, Dropdown, Spin } from 'antd';
import { UserOutlined, DownOutlined } from '@ant-design/icons';

// Actions
import { fetchUser, logout } from '../../actions/UserActions';

// Selectors
import { getUser } from '../../selectors/UserSelectors';

// Styles
import './Header.scss';

const propTypes = {
  style: PropTypes.object,
  isStaffRoute: PropTypes.bool,
  user: PropTypes.object,
  fetchUser: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
  history: PropTypes.object
};

const Header = ({ style, isStaffRoute, user, fetchUser, logout, history }) => {
  const segment = isStaffRoute ? '/a2hl-management/' : '/';

  useEffect(() => {
    if (!user.data) {
      const type = isStaffRoute ? 'staffs' : 'customers';
      fetchUser(type);
    }
  }, [isStaffRoute]);

  const handleLogout = () => {
    logout();
    history.push(segment + 'login');
  };

  const handleChangePassword = () => {
    history.push(segment + 'utils/password');
  };

  const handleChangeProfile = () => {
    history.push(segment + 'utils/profile');
  };

  const { loading, data } = user;
  const userName = data ? data.name : null;

  return (
    <header className="header" style={style}>
      <h1 className="header__left">
        {isStaffRoute ? 'A2HL Management' : 'A2HL Internet Banking'}
      </h1>
      <div className="header__right">
        <Spin spinning={loading}>
          <Dropdown
            overlay={
              <Menu>
                <Menu.Item onClick={handleChangeProfile}>
                  Update Profile
                </Menu.Item>
                <Menu.Item onClick={handleChangePassword}>
                  Change password
                </Menu.Item>
                <Menu.Item onClick={handleLogout}>Logout</Menu.Item>
              </Menu>
            }
          >
            <span style={{ cursor: 'pointer', fontSize: '18px' }}>
              <UserOutlined />
              <span style={{ fontSize: '16px', margin: '0 8px' }}>
                {userName}
              </span>
              <DownOutlined style={{ marginLeft: '4px' }} />
            </span>
          </Dropdown>
        </Spin>
      </div>
    </header>
  );
};

Header.propTypes = propTypes;

const mapStateToProps = state => {
  return {
    user: getUser(state)
  };
};

export default withRouter(
  connect(mapStateToProps, { fetchUser, logout })(Header)
);
