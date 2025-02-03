import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SearchBar from './SearchBar';
import { isAuthenticated } from '../Auth/Define';
import { toast } from 'react-toastify';

const Navbar = ({ showSidebar, handleSidebar }) => {
  const navigate = useNavigate();
  const [showProfile, setShowProfile] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [showLogOut, setShowLogOut] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  const LogOut = () => {
    window.localStorage.clear();
    toast.success("Logged Out Successfully");
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
                <div className={`dropdown-menu pop-notification ${showNotification ? "show" : ""}`}>
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
              </li>

              {/* Profile Dropdown */}
              <li className="dropdown dropdown-animated scale-left">
                <div className="pointer" onClick={() => { isAuthenticated ? setShowProfile(!showProfile) : navigate('/login') }}>
                  <div className="avatar avatar-image m-h-10 m-r-15">
                    <img src="/assets/images/avatars/thumb-10.jpg" alt="" />
                  </div>
                </div>

                <div className={`dropdown-menu pop-profile ${showProfile ? "show" : ""}`}>
                  <div className="p-h-20 p-b-15 m-b-10 border-bottom">
                    <div className="d-flex">
                      <div className="avatar avatar-lg avatar-image">
                        <img src="/assets/images/avatars/thumb-10.jpg" alt="" />
                      </div>
                      <div className="m-l-10">
                        <p className="m-b-0 text-dark font-weight-semibold">
                          {window.localStorage.getItem("user_name")}
                        </p>
                        <p className="m-b-0 opacity-07">{window.localStorage.getItem("login_id")}</p>
                      </div>
                    </div>
                  </div>
                  <Link to={'/profile'} class="dropdown-item d-block p-h-15 p-v-10" onClick={() => setShowProfile(false)}>
                    <div class="d-flex align-items-center justify-content-between">
                      <div>
                        <i class="anticon opacity-04 font-size-16 anticon-user"></i>
                        <span class="m-l-10">Account Settings</span>
                      </div>
                      <i class="anticon font-size-10 anticon-right"></i>
                    </div>
                  </Link>
                  <div class="dropdown-item d-block p-h-15 p-v-10" style={{ cursor: 'pointer' }} onClick={() => { setShowLogOut(true); setShowProfile(false); }}>
                    <div class="d-flex align-items-center justify-content-between">
                      <div>
                        <i class="anticon opacity-04 font-size-16 anticon-logout"></i>
                        <span class="m-l-10">Log Out</span>
                      </div>
                      <i class="anticon font-size-10 anticon-right"></i>
                    </div>
                  </div>
                </div>
              </li>
              <li className={`${(showProfile || showNotification) ? "d-block" : "d-none"}`}
                style={{ position: 'absolute', left: '0', top: '0', width: '100vw', height: '100vh', background: 'transparent' }}
                onClick={() => { setShowNotification(false); setShowProfile(false) }}>
              </li>

              {/* Logout Confirmation Modal */}
              {showLogOut && (
                <div
                  className="modal fade show"
                  style={{
                    background: "rgba(0,0,0,.3)",
                    display: "grid",
                    placeItems: "center",
                  }}
                >
                  <div className="modal-dialog w-50">
                    <div className="modal-content">
                      <div
                        className="modal-icon text-danger text-center m-0 pt-2 px-0 pb-0"
                        style={{ fontSize: "50px" }}
                      >
                        <FontAwesomeIcon icon={faRightFromBracket} />
                      </div>
                      <div className="modal-header text-center p-0 border-0 m-0">
                        <h5 className="modal-title mx-auto">Log Out</h5>
                      </div>
                      <div className="modal-body text-center py-3">
                        Are you sure you want to <b>Log Out</b>?
                      </div>
                      <div className="modal-footer mt-3 p-0">
                        <div
                          className="btn-inline w-100 p-0 m-0"
                          style={{ borderRight: "1px solid #EDEDED" }}
                        >
                          <span
                            className="btn border-0 w-100 py-3"
                            style={{ cursor: "pointer" }}
                            onClick={LogOut}
                          >
                            YES
                          </span>
                        </div>
                        <div className="btn-inline w-100 p-0 m-0">
                          <span
                            className="btn border-0 w-100 py-3"
                            style={{ cursor: "pointer" }}
                            onClick={() => setShowLogOut(false)}
                          >
                            NO
                          </span>
                        </div>
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
