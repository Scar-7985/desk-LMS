import React from 'react'
import { Link } from 'react-router-dom'
const Doubts = () => {
  return (
    <>

      <div className="app">
        <div className="layout">
          <div className="main-content">
            <div className="container-fluid p-h-0">
              <div className="chat chat-app row">
                <div className="chat-list w-100 d-none"> {/* ============ */}
                  <div className="chat-user-tool">
                    <i className="anticon anticon-search search-icon p-r-10 font-size-20"></i>
                    <input placeholder="Search..." />
                  </div>
                </div>
                <div className="chat-content w-100">
                  <div className="conversation">
                    <div className="conversation-wrapper">
                      <div className="conversation-header justify-content-between">
                        <div className="media align-items-center">
                          <Link className="chat-close m-r-20 d-md-none d-block text-dark font-size-18 m-t-5" style={{ textDecoration: 'none' }}>
                            <i className="anticon anticon-left-circle"></i>
                          </Link>
                          <div className="avatar avatar-image">
                            <img src="assets/images/avatars/thumb-1.jpg" alt="" />
                          </div>
                          <div className="p-l-15">
                            <h6 className="m-b-0">Erin Gonzales</h6>
                            <p className="m-b-0 text-muted font-size-13 m-b-0">
                              <span className="badge badge-success badge-dot m-r-5"></span>
                              <span>Online</span>
                            </p>
                          </div>
                        </div>
                        <div className="dropdown dropdown-animated scale-left">
                          <Link className="text-dark font-size-20" data-toggle="dropdown" style={{ textDecoration: 'none' }}>
                            <i className="anticon anticon-setting"></i>
                          </Link>
                          <div className="dropdown-menu">
                            <button className="dropdown-item" type="button">Action</button>
                            <button className="dropdown-item" type="button">Another action</button>
                            <button className="dropdown-item" type="button">Something else here</button>
                          </div>
                        </div>
                      </div>
                      <div className="conversation-body" style={{ height: 'calc(100vh - 150px)' }}>
                        <div className="msg justify-content-center">
                          <div className="font-weight-semibold font-size-12"> 7:57PM </div>
                        </div>
                        <div className="msg msg-recipient">
                          <div className="m-r-10">
                            <div className="avatar avatar-image">
                              <img src="assets/images/avatars/thumb-1.jpg" alt="" />
                            </div>
                          </div>
                          <div className="bubble">
                            <div className="bubble-wrapper">
                              <span>Hey, let me show you something nice!</span>
                            </div>
                          </div>
                        </div>
                        <div className="msg msg-sent">
                          <div className="bubble">
                            <div className="bubble-wrapper">
                              <span>Oh! What is it?</span>
                            </div>
                          </div>
                        </div>
                        <div className="msg msg-recipient">
                          <div className="m-r-10">
                            <div className="avatar avatar-image">
                              <img src="assets/images/avatars/thumb-1.jpg" alt="" />
                            </div>
                          </div>
                          <div className="bubble">
                            <div className="bubble-wrapper p-5">
                              <img src="../../../s3.envato.com/files/249796117/preview.__large_preview.png" alt="https://s3.envato.com/files/249796117/preview.__large_preview.png" />
                            </div>
                          </div>
                        </div>
                        <div className="msg msg-recipient">
                          <div className="bubble m-l-50">
                            <div className="bubble-wrapper">
                              <span>Applicator - Bootstrap 4 Admin Template</span>
                            </div>
                          </div>
                        </div>
                        <div className="msg msg-recipient">
                          <div className="bubble m-l-50">
                            <div className="bubble-wrapper">
                              <span>A creative, responsive and highly customizable admin template</span>
                            </div>
                          </div>
                        </div>
                        <div className="msg msg-sent">
                          <div className="bubble">
                            <div className="bubble-wrapper">
                              <span>Wow, that was cool!</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="conversation-footer">
                        <input className="chat-input" type="text" placeholder="Type a message..." />
                        <ul className="list-inline d-flex align-items-center m-b-0">
                          <li className="list-inline-item m-r-15">
                            <Link className="text-gray font-size-20" data-toggle="tooltip" title="Emoji" style={{ textDecoration: 'none' }}>
                              <i className="anticon anticon-smile"></i>
                            </Link>
                          </li>
                          <li className="list-inline-item m-r-15">
                            <Link className="text-gray font-size-20" data-toggle="tooltip" title="Attachment" style={{ textDecoration: 'none' }}>
                              <i className="anticon anticon-paper-clip"></i>
                            </Link>
                          </li>
                          <li className="list-inline-item">
                            <button className="d-none d-md-block btn btn-primary">
                              <span className="m-r-10">Send</span>
                              <i className="far fa-paper-plane"></i>
                            </button>
                            <Link className="text-gray font-size-20 d-md-none d-block" style={{ textDecoration: 'none' }}>
                              <i className="far fa-paper-plane"></i>
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  )
}

export default Doubts