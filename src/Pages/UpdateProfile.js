import React from 'react'
import { useState, useEffect } from "react";
import axios from "axios";
import { SITE_URL } from "../Auth/Define";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import Skeleton from "react-loading-skeleton";


const UpdateProfile = () => {

    const navigate = useNavigate();

    const [showSkeleton, setShowSkeleton] = useState(true);

    const [profilePic, setProfilePic] = useState(null);
    const [showChangeImage, setShowChangedImage] = useState(false);
    const [formData, setFormData] = useState({
        login_id: window.localStorage.getItem("login_id"),
        uname: "",
        phone: "",
        email: "",
        address: "",
        uimage: ""
    });

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const response = await axios.post(`${SITE_URL}new/app/api/get_profile.php`, {
                    login_id: formData.login_id,
                });
                const data = response.data;

                setFormData({
                    login_id: formData.login_id,
                    uname: data.name || "",
                    email: data.email || "",
                    address: data.address || "",
                    phone: data.phone || "",
                    uimage: data.profile_pic || "",
                });
                setProfilePic(data.profile_pic);
                setShowSkeleton(false);

            } catch (error) {
                console.error("Error fetching details:", error);
            }
        };

        fetchDetails();
    }, []);


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleImageChange = (e) => {
        const { name, files } = e.target;
        const file = files[0];

        const imageURL = URL.createObjectURL(file);
        console.log(imageURL);

        setFormData((prevData) => ({
            ...prevData,
            [name]: file,
        }));

        setShowChangedImage(imageURL);
    };



    const handleUpdate = async (e) => {
        // console.log(formData);

        e.preventDefault();
        let formdata = new FormData();
        formdata.append("login_id", formData.login_id);
        formdata.append("uname", formData.uname);
        formdata.append("phone", formData.phone);
        formdata.append("email", formData.email);
        formdata.append("address", formData.address);
        formdata.append("uimage", formData.uimage);
        formdata.append("last_image", profilePic);

        try {
            const response = await axios.post(
                `${SITE_URL}new/app/api/update_profile.php`, formdata);

            if (response.data.status === 101) {
                toast.error(response.data.msg);
                // console.log(response);

            } else {
                toast.success(response.data.msg);
                window.localStorage.removeItem('user_name');
                window.localStorage.removeItem('user_email');
                window.localStorage.setItem('user_name', formData.uname);
                window.localStorage.setItem('user_email', formData.email);
                setTimeout(() => {
                    window.location.reload();
                }, 1000);
            }
            // console.log("Profile changes:", response.data);
        } catch (error) {
            console.error("Error updating profile:", error);
        }
    };



    return (
        <div className="p-2"
            style={{ position: 'relative', zIndex: '100' }}>
            {
                !showSkeleton ? (

                    <div className="card">
                        <div className="card-header">
                            <h4 className="card-title">Profile Infomation</h4>
                        </div>
                        <form className="card-body" onSubmit={handleUpdate}>
                            <div className="media align-items-center">
                                <div className="avatar avatar-image  m-h-10 m-r-15" style={{ height: "80px", width: "80px" }}>
                                    {
                                        showChangeImage
                                            ? <img src={showChangeImage} alt="Preview" />
                                            : <img src={`${SITE_URL}new/app/upload/profile_pic/${profilePic}`} alt="" />
                                    }
                                </div>
                                <div className="m-l-20 m-r-20">
                                    <h5 className="m-b-5 font-size-18">Change Avatar</h5>
                                    <label htmlFor="imageFile" className="btn btn-tone btn-primary" style={{ cursor: 'pointer' }}>Change</label>
                                    <input
                                        type="file"
                                        className={`form-control`}
                                        id="imageFile"
                                        onChange={handleImageChange}
                                        name='uimage'
                                        style={{ display: 'none' }}
                                    />
                                </div>
                                <div>

                                </div>
                            </div>
                            <hr className="m-v-25" />
                            <div>
                                <div className="form-row">
                                    <div className="form-group col-md-4">
                                        <label className="font-weight-semibold" htmlFor="userName">User Name</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Your name"
                                            name="uname"
                                            value={formData.uname}
                                            onChange={handleChange}
                                            style={{ backgroundColor: '#E8F0FE' }}

                                        />
                                    </div>
                                    <div className="form-group col-md-4">
                                        <label className="font-weight-semibold" htmlFor="email">Email</label>
                                        <input
                                            type="text"
                                            className="form-control" id="email5"
                                            placeholder="E-mail"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            style={{ backgroundColor: '#E8F0FE' }}

                                        />
                                    </div>
                                    <div className="form-group col-md-4">
                                        <label className="font-weight-semibold" htmlFor="phoneNumber">Phone no. Verified</label>&nbsp;
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-patch-check-fill text-success" viewBox="0 0 16 16">
                                            <path d="M10.067.87a2.89 2.89 0 0 0-4.134 0l-.622.638-.89-.011a2.89 2.89 0 0 0-2.924 2.924l.01.89-.636.622a2.89 2.89 0 0 0 0 4.134l.637.622-.011.89a2.89 2.89 0 0 0 2.924 2.924l.89-.01.622.636a2.89 2.89 0 0 0 4.134 0l.622-.637.89.011a2.89 2.89 0 0 0 2.924-2.924l-.01-.89.636-.622a2.89 2.89 0 0 0 0-4.134l-.637-.622.011-.89a2.89 2.89 0 0 0-2.924-2.924l-.89.01zm.287 5.984-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7 8.793l2.646-2.647a.5.5 0 0 1 .708.708" />
                                        </svg>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Your Phone"
                                            readOnly
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            style={{ backgroundColor: '#E8F0FE' }}

                                        />
                                    </div>
                                </div>
                                <div className="form-row">

                                    <div className="form-group col-md-12">
                                        <label className="font-weight-semibold" htmlFor="dob">Address</label>
                                        <textarea
                                            className="form-control" id="address"
                                            placeholder="Address here..."
                                            name="address"
                                            value={formData.address}
                                            onChange={handleChange}
                                            style={{
                                                backgroundColor: '#E8F0FE',
                                                height: '100px',
                                            }}

                                        />
                                    </div>

                                </div>
                                <div className="form-row mt-2">
                                    <div className="form-group col-md-12 text-center">
                                        <button className="btn btn-tone btn-primary w-100" type="submit">Update</button>
                                    </div>
                                </div>

                            </div>
                        </form>
                    </div>
                ) : (
                    <React.Fragment>
                        <Skeleton width={"100%"} height={50} />
                        <Skeleton width={"100%"} height={100} />
                        <Skeleton width={"100%"} height={400} />
                    </React.Fragment>
                )
            }
        </div>
    )
}

export default UpdateProfile;