import React, { useState, useEffect } from 'react';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import SearchBar from './SearchBar';
import { isAuthenticated } from '../Auth/Define';
import { toast } from 'react-toastify';
import axios from 'axios';
import { SITE_URL } from '../Auth/Define';
import Skeleton from 'react-loading-skeleton';

const Navbar = () => {
  const navigate = useNavigate();

  const location = useLocation();
  const [profilePic, setProfilePic] = useState(null);
  const [showProfile, setShowProfile] = useState(false);
  const [showLogOut, setShowLogOut] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [showSkeleton, setShowSkeleton] = useState(false);


  const [menuItems] = useState([
    { title: "Home", path: "/" },
    { title: "Courses", path: "/courses" },
    { title: "Quiz", path: "/quiz-category" },
    { title: "My Courses", path: "/my-courses" },
  ]);


  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await axios.post(`${SITE_URL}new/app/api/get_profile.php`, {
          login_id: window.localStorage.getItem("login_id"),
        });
        const data = response.data;

        setProfilePic(data.profile_pic);
        setShowSkeleton(false);
      } catch (error) {
        console.error("Error fetching details:", error);
      }
    };

    fetchDetails();
  }, []);

  const LogOut = () => {
    window.localStorage.clear();
    toast.success("Logged Out Successfully");
    setTimeout(() => {
      navigate('/');
      window.location.reload();
    }, 1000);
  };

  return (
    <div className='app'>
      <div className="layout">
        <div className="header">
          <div
            className="logo logo-dark p-0"
            style={{ width: '240px', display: 'grid', placeItems: 'center', overflow: 'hidden' }}
          >
            <Link to={'/'}>
              <img src={`/assets/images/logo/brand-full.png`} style={{ width: '240px', height: '70px' }} alt="Logo" />
            </Link>
          </div>

          <div className="nav-wrap align-items-center">
            <ul className="nav-left d-flex">
              {/* Add Something */}
            </ul>

            <div className="nav-center d-flex justify-content-center align-items-center w-100">
              {menuItems.map((item, index) => (
                <Link
                  to={item.path}
                  className={`font-size-15 px-1 mx-2 ${location.pathname === item.path ? "text-secondary" : "text-dark"}`}
                  key={index}
                  style={{
                    borderBottom: location.pathname === item.path ? "3px solid #9D86FF" : "none",
                    letterSpacing: '0.8px'
                  }}
                >
                  {item.title}
                </Link>
              ))}
            </div>

            {/* Search Bar */}
            <ul className="nav-right">

              <li className="toggle-menu" onClick={() => setShowSearch(true)}>
                <i className="anticon anticon-search" style={{ fontSize: '20px' }}></i>
              </li>

              {/* Profile Dropdown */}
              {
                showSkeleton
                  ? <Skeleton width={40} height={40} style={{ borderRadius: '50%' }} />
                  : <li className="dropdown dropdown-animated scale-left">
                    <div className="pointer" onClick={() => { isAuthenticated ? setShowProfile(!showProfile) : navigate('/login') }}>
                      <div className="avatar avatar-image m-h-10 m-r-15">
                        {/* Profile Pic */}
                        {
                              isAuthenticated
                                ? <img src={`${SITE_URL}new/app/upload/profile_pic/${profilePic}`} alt="" />
                                : <img src={'/assets/images/avatars/avatar.png'} alt="" />
                            }
                      </div>
                    </div>

                    <div className={`dropdown-menu pop-profile ${showProfile ? "show" : ""}`}>
                      <div className="p-h-20 p-b-15 m-b-10 border-bottom">
                        <div className="d-flex">
                          <div className="avatar avatar-lg avatar-image">
                            <img src={`${SITE_URL}new/app/upload/profile_pic/${profilePic}`} alt="" />
                          </div>
                          <div className="m-l-10">
                            <p className="m-b-0 text-dark font-weight-semibold">
                              {window.localStorage.getItem("user_name")}
                            </p>
                            <p className="m-b-0 opacity-07">{window.localStorage.getItem("login_id")}</p>
                          </div>
                        </div>
                      </div>
                      <Link to={'/profile'} className="dropdown-item d-block p-h-15 p-v-10" onClick={() => setShowProfile(false)}>
                        <div className="d-flex align-items-center justify-content-between">
                          <div>
                            <i className="anticon opacity-04 font-size-16 anticon-user"></i>
                            <span className="m-l-10">Account Settings</span>
                          </div>
                          <i className="anticon font-size-10 anticon-right"></i>
                        </div>
                      </Link>
                      <div className="dropdown-item d-block p-h-15 p-v-10" style={{ cursor: 'pointer' }} onClick={() => { setShowLogOut(true); setShowProfile(false); }}>
                        <div className="d-flex align-items-center justify-content-between">
                          <div>
                            <i className="anticon opacity-04 font-size-16 anticon-logout"></i>
                            <span className="m-l-10">Log Out</span>
                          </div>
                          <i className="anticon font-size-10 anticon-right"></i>
                        </div>
                      </div>
                    </div>
                  </li>
              }

              <li className={`${showProfile ? "d-block" : "d-none"}`}
                style={{ position: 'absolute', left: '0', top: '0', width: '100vw', height: '100vh', background: 'transparent' }}
                onClick={() => setShowProfile(false)}>
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
    </div>
  );
};

export default Navbar;
