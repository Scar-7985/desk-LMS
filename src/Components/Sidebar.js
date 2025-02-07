import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faBookBookmark, faCubes, faHouse, faUserGear } from '@fortawesome/free-solid-svg-icons';

const Sidebar = ({ showSidebar }) => {
  const location = useLocation();
  const [activeItem, setActiveItem] = useState(location.pathname);

  useEffect(() => {
    setActiveItem(location.pathname);
  }, [location.pathname]);

  const menuItems = [
    { title: 'Home', icon: faHouse, path: '/' },
    { title: 'Courses', icon: faBook, path: '/courses' },
    { title: 'Quiz', icon: faCubes, path: '/quiz-category' },
    { title: 'My Courses', icon: faBookBookmark, path: '/my-courses' },
    { title: 'Profile', icon: faUserGear, path: '/profile' },
  ];

  return (
    <div className={`app ${showSidebar ? '' : 'is-folded'}`}>
      <div className="layout">
        <div
          className="side-nav"
          style={{
            width: showSidebar ? '240px' : '80px',
            left: 0
          }}
        >
          <div className="side-nav-inner">
            <ul className="side-nav-menu scrollable">
              {menuItems.map((item, index) => (
                <li
                  key={index}
                  className="nav-item"
                  style={{
                    backgroundColor: activeItem === item.path ? 'rgba(63, 135, 245, 0.1)' : '',
                    borderRight: activeItem === item.path ? '3px solid rgb(63, 136, 245)' : '',
                  }}
                >
                  <NavLink
                    to={item.path}
                    className="single-link"
                    style={{ textDecoration: 'none' }}
                  >
                    <span className="icon-holder" style={{ paddingLeft: showSidebar ? '' : '16px' }}>
                      <FontAwesomeIcon icon={item.icon} style={{ fontSize: '14px' }} />
                    </span>
                    {
                      showSidebar &&
                      <span className="title">{item.title}</span>
                    }
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
