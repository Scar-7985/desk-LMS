import { useState, useEffect } from "react";
import axios from "axios";
import { SITE_URL } from "../Auth/Define";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";


const UpdateProfile = () => {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        login_id: window.localStorage.getItem("login_id"),
        uname: "",
        phone: "",
        email: "",
        address: "",
    });

    useEffect(() => {

        fetchDetails();
    }, []);

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
            });
        } catch (error) {
            console.error("Error fetching details:", error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                `${SITE_URL}new/app/api/update_profile.php`,
                formData,
                {
                    headers: { "Content-Type": "application/json" },
                }
            );

            if (response.data.status === 101) {
                toast.error(response.data.msg);
            } else {
                toast.success(response.data.msg);
                window.localStorage.removeItem('user_name');
                window.localStorage.removeItem('user_email');
                window.localStorage.setItem('user_name', formData.uname);
                window.localStorage.setItem('user_email', formData.email);
                setTimeout(() => {
                    navigate('/profile');
                }, 2000);
            }
            // console.log("Profile updated:", response.data);
        } catch (error) {
            console.error("Error updating profile:", error);
        }
    };



    return (
        <div className="p-2"
            style={{ position: 'relative', zIndex: '100' }}>

            <div class="card">
                <div class="card-header">
                    <h4 class="card-title">Profile Infomation</h4>
                </div>
                <div class="card-body">
                    <div class="media align-items-center">
                        <div class="avatar avatar-image  m-h-10 m-r-15" style={{ height: "80px", width: "80px" }}>
                            <img src="/assets/images/avatars/thumb-10.jpg" alt="" />
                        </div>
                        <div class="m-l-20 m-r-20">
                            <h5 class="m-b-5 font-size-18">Change Avatar</h5>
                            <p className='m-0' style={{ color: 'black', fontWeight: '500' }}>
                                {window.localStorage.getItem("user_name") === 'null' ? '' : window.localStorage.getItem("user_name")}
                            </p>
                            <p className='m-0' style={{ fontSize: '12px' }}><span>+91</span> {formData.phone}</p>
                        </div>
                        <div>
                            <button class="btn btn-tone btn-primary ">Change</button>
                        </div>
                    </div>
                    <hr class="m-v-25" />
                    <form onSubmit={handleUpdate}>
                        <div class="form-row">
                            <div class="form-group col-md-4">
                                <label class="font-weight-semibold" for="userName">User Name</label>
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
                            <div class="form-group col-md-4">
                                <label class="font-weight-semibold" for="email">Email</label>
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
                            <div class="form-group col-md-4">
                                <label class="font-weight-semibold" for="phoneNumber">Phone number Verified</label>&nbsp;
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
                        <div class="form-row">

                            <div class="form-group col-md-12">
                                <label class="font-weight-semibold" for="dob">Address</label>
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
                        <div class="form-row mt-2">
                            <div class="form-group col-md-12 text-center">
                                <button class="btn btn-tone btn-primary w-100">Update</button>
                            </div>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    )
}

export default UpdateProfile;