import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket, faUser, faBell, faTruck, faReceipt, faComment, faCommentDots } from "@fortawesome/free-solid-svg-icons";

const Profile = () => {
    const navigate = useNavigate();
    const [showLogOut, setShowLogOut] = useState(false);

    const LogOut = () => {
        toast.success("Logged Out Successfully");
        setTimeout(() => {
            window.localStorage.removeItem("login_id");
            window.localStorage.removeItem("user_name");
            window.localStorage.removeItem("user_phone");
            window.localStorage.removeItem("user_email");
            navigate("/");
            window.location.reload();
        }, 2000);
    };

    const profileData = [
        { title: "Edit Profile", path: "/update-profile", icon: faUser },
        { title: "Notifications", path: "/notification", icon: faBell },
        { title: "My Orders", path: "/my-orders", icon: faTruck },
        { title: "Terms & Conditions", path: "/legal-terms", icon: faReceipt },
        { title: "Ask Doubts", path: "/ask-doubts", icon: faComment },
        { title: "Help & Support", path: "/support", icon: faCommentDots },
        { title: "Log Out", path: null, icon: faRightFromBracket },
    ];

    return (
        <div className="px-2">
            <div className="main-content mt-5">
                <div className="row m-t-20">
                    {profileData.map((item, index) => (
                        <div
                            className="col-sm-12 col-md-4 col-lg-3 "
                            key={index}
                            onClick={item.title === "Log Out" ? () => setShowLogOut(true) : null}
                        >
                            <Link to={item.path} className="card border" style={{ textDecoration: 'none' }}>
                                <div className="card-body">
                                    <div className="media align-items-center">
                                        <div
                                            className="avatar avatar-icon avatar-lg avatar-blue"
                                            style={{ display: "grid", placeItems: "center" }}
                                        >
                                            <FontAwesomeIcon icon={item.icon} />
                                        </div>
                                        <div className="m-l-15">
                                            <p className="m-b-0 text-muted" style={{ fontSize: "15px" }}>
                                                {item.title}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))}

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
                </div>
            </div>
        </div>
    );
};

export default Profile;
