import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SearchBar from './SearchBar';

const Navbar = ({ showSidebar, handleSidebar }) => {
  const navigate = useNavigate();
  const [showProfile, setShowProfile] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [showLogOut, setShowLogOut] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  const logout = () => {
    window.localStorage.clear();
    setTimeout(() => {
      navigate('/');
      window.location.reload();
    }, 1500);
  };

  return (
    <>
      <div className="layout">
        <div className="header">
          <div
            className="logo logo-dark"
            style={{ width: `${showSidebar ? '240px' : '80px'}`, display: 'grid', placeItems: 'center' }}
          >
            <Link to={'/'}>
              {showSidebar ? (
                <img src={`/assets/images/logo/logo.png`} alt="Logo" />
              ) : (
                <img src={`/assets/images/logo/favicon.png`} width={"40px"} alt="Logo" />
              )}
            </Link>
          </div>

          <div className="nav-wrap">
            <ul className="nav-left d-flex">
              <li className="toggle-menu" onClick={handleSidebar}>
                <i className={`anticon ${!showSidebar ? 'anticon-menu-unfold' : 'anticon-menu-fold'}`} style={{ fontSize: '20px' }}></i>
              </li>
              <li className="toggle-menu" onClick={() => setShowSearch(true)}>
                <i className="anticon anticon-search" style={{ fontSize: '20px' }}></i>
              </li>
            </ul>

            {/* Notifications */}
            <ul className="nav-right">
              <li className="dropdown dropdown-animated scale-left">
                <Link
                  to="#"
                  onClick={() => setShowNotification(!showNotification)}
                  style={{ textDecoration: 'none' }}
                >
                  <i className="anticon anticon-bell notification-badge"></i>
                </Link>
                {showNotification && (
                  <div className="dropdown-menu pop-notification show">
                    <div className="p-v-15 p-h-25 border-bottom">
                      <p className="text-dark font-weight-semibold m-b-0">
                        <i className="anticon anticon-bell"></i>
                        <span className="m-l-10">Notification</span>
                      </p>
                    </div>
                    <div className="relative">
                      <div className="scrollable" style={{ maxHeight: "300px" }}>
                        <Link className="dropdown-item d-block p-15 border-bottom">
                          <div className="d-flex">
                            <div className="avatar avatar-blue avatar-icon">
                              <i className="anticon anticon-mail"></i>
                            </div>
                            <div className="m-l-15">
                              <p className="m-b-0 text-dark">You received a new message</p>
                              <p className="m-b-0"><small>8 min ago</small></p>
                            </div>
                          </div>
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </li>

              {/* Profile Dropdown */}
              <li className="dropdown dropdown-animated scale-left">
                <div className="pointer" onClick={() => setShowProfile(!showProfile)}>
                  <div className="avatar avatar-image m-h-10 m-r-15">
                    <img src="/assets/images/avatars/thumb-10.jpg" alt="" />
                  </div>
                </div>
                {showProfile && (
                  <div className="dropdown-menu pop-profile show">
                    <div className="p-h-20 p-b-15 m-b-10 border-bottom">
                      <div className="d-flex">
                        <div className="avatar avatar-lg avatar-image">
                          <img src="/assets/images/avatars/thumb-10.jpg" alt="" />
                        </div>
                        <div className="m-l-10">
                          <p className="m-b-0 text-dark font-weight-semibold">
                            {window.localStorage.getItem("login_id (^_^)")}
                          </p>
                          <p className="m-b-0 opacity-07">Web Dev</p>
                        </div>
                      </div>
                    </div>
                    <Link to={'/profile'} className="dropdown-item" onClick={() => setShowProfile(false)}>
                      <span>Account Setting</span>
                    </Link>
                    <div className="dropdown-item" onClick={() => { setShowLogOut(true); setShowProfile(false); }}>
                      <span>Logout</span>
                    </div>
                  </div>
                )}
              </li>

              {/* Logout Confirmation Modal */}
              {showLogOut && (
                <div className="modal fade show d-block" style={{ background: "rgba(0, 0, 0, 0.3)" }}>
                  <div className="modal-dialog w-25">
                    <div className="modal-content">
                      <div className="modal-header text-center">
                        <h5 className="modal-title mx-auto">Log Out</h5>
                      </div>
                      <div className="modal-body text-center py-3">
                        Are you sure you want to <b>Log Out</b>?
                      </div>
                      <div className="modal-footer">
                        <button className="btn btn-danger btn-tone w-50" onClick={logout}>
                          Yes
                        </button>
                        <button className="btn btn-success btn-tone w-50" onClick={() => setShowLogOut(false)}>
                          No
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </ul>
          </div>
        </div>

        {/* Search Bar Component */}
        {showSearch && <SearchBar showSearch={showSearch} setShowSearch={setShowSearch} />}
      </div>
    </>
  );
};

export default Navbar;
