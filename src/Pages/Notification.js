import { useState, useEffect } from "react";
import axios from "axios";
import { SITE_URL } from "../Auth/Define";
import Skeleton from "react-loading-skeleton";


const Notification = () => {

  const [showSkeleton, setShowSkeleton] = useState(true);
  const [notification, setNotification] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalNotification, setModalNotification] = useState(null);

  useEffect(() => {
    const fetchNotificaton = async () => {
      try {
        const response = await axios.get(`${SITE_URL}new/app/api/notification.php`);
        const data = response.data;
        setNotification(data);
        setShowSkeleton(false);
      } catch (error) {
        console.log("Could not fetch Notifications");

      }
    }

    fetchNotificaton();
  }, [])

  const handleShowModal = (notificationId) => {
    const filteredNotification = notification.find((item) => item.id === notificationId);
    setModalNotification(filteredNotification);
    setShowModal(true);
  }


  return (
    <>

      <div className="main-content m-2">
        <div className="card">
          <div className="card-body">
            <div className="d-flex ">
              <h4 className="text-center">Notifications</h4>
            </div>
            <div className="m-t-30">
              <div className="table-responsive">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th>Sr no.</th>
                      <th>Title</th>
                      <th>Description</th>
                      <th>Date & Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      !showSkeleton ? (
                        notification.length > 0 ? (
                          notification.map((item, index) => {
                            return (
                              <tr key={index} onClick={() => handleShowModal(item.id)} >
                                <td>{index + 1}</td>
                                <td>
                                  <div className="d-flex align-items-center">
                                    <div className="d-flex align-items-center">
                                      {
                                        item.img === "" ? null :
                                          <div className="avatar avatar-image" style={{ height: "30px", minWidth: "30px", maxWidth: "30px" }}>
                                            <img src={`${SITE_URL}new/app/upload/notification_img/${item.img}`} alt="" />
                                          </div>
                                      }
                                      <h6 className="m-l-10 m-b-0">{item.title}</h6>
                                    </div>
                                  </div>
                                </td>
                                <td>{item.notification_desc}</td>
                                <td>{item.created_on}</td>
                              </tr>
                            )
                          })) : (
                          <tr>
                            <td colSpan={4} className="text-center font-weight-semibold" style={{ backgroundColor: '#F8FAFD' }}>No Notifications to show</td>
                          </tr>
                        )
                      ) : (
                        <tr>
                          <td><Skeleton height={30} /></td>
                          <td><Skeleton height={30} /></td>
                          <td><Skeleton height={30} /></td>
                          <td><Skeleton height={30} /></td>
                        </tr>
                      )
                    }

                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showModal && (
        <div>
          {/* Backdrop with click handler */}
          <div className="modal-backdrop fade show" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}></div>

          <div className="modal fade show" style={{ display: 'block', paddingRight: '17px' }} aria-modal="true">
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content" style={{ zIndex: '500' }}>
                <div className="modal-header">
                  <h5 className="modal-title text-center w-100">{modalNotification.title}</h5>
                </div>
                <div className="modal-body d-flex flex-column align-items-center py-2">
                  <img src={`${SITE_URL}new/app/upload/notification_img/${modalNotification.img}`} style={{ width: '60px' }} alt="" />
                  <p></p>
                  <p>{modalNotification.notification_desc}</p>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-primary" onClick={() => setShowModal(false)}>
                    Okay
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}



    </>
  )
}

export default Notification;