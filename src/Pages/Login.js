import React, { useState, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { SITE_URL } from '../Auth/Define';

const Login = () => {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({ phone_no: '' });
    const [otpSent, setOtpSent] = useState(false);
    const [ShowResend, setShowResend] = useState(false);
    const [ReadOnly, setReadOnly] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const otpTimerRef = useRef(null);  // Add useRef hook

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        // console.log(formData);

        e.preventDefault();
        setIsSubmitting(true);
        axios.post(`${SITE_URL}new/app/inc/config/login-query2.php`, formData, {
            headers: { 'Content-Type': 'application/json' }
        })
            .then(response => {


                if (response.data.status === 101) {
                    toast.error(response.data.msg);
                    setIsSubmitting(false);
                }
                else if (response.data.status === 102) {
                    document.querySelector("#otpBtn").disabled = true;
                    toast.success(response.data.msg)
                    setOtpSent(true);
                    setReadOnly(true)
                    setIsSubmitting(false);
                    let timer = 30;
                    const timerFunc = setInterval(() => {
                        if (timer > 0) {
                            if (otpTimerRef.current) {  // Safely update the timer using ref
                                otpTimerRef.current.innerHTML = `Resend OTP in: ${timer -= 1}`;
                            }
                        } else {
                            clearInterval(timerFunc);
                            if (otpTimerRef.current) {  // Safely clear the timer
                                otpTimerRef.current.innerHTML = '';
                            }
                            setShowResend(true);
                        }
                    }, 1000);

                }
                else if (response.data.status === 100) {
                    toast.success(response.data.msg)
                    // console.log("response => ", response);

                    setTimeout(() => {
                        if (otpTimerRef.current) {  // Safely clear the timer when login is successful
                            otpTimerRef.current.innerHTML = '';
                        }
                        setIsSubmitting(false);
                        const login_id = response.data.login;
                        const user_name = response.data.name;
                        const user_phone = response.data.phone;
                        const user_email = response.data.email;
                        window.localStorage.setItem('login_id', login_id);
                        window.localStorage.setItem('user_name', user_name);
                        window.localStorage.setItem('user_phone', user_phone);
                        window.localStorage.setItem('user_email', user_email);
                        // ============================================== //

                        if (response.data.name) {
                            navigate('/');
                        } else {
                            navigate('/update-profile?backBtn=false');
                        }
                        window.location.reload();
                    }, 1000);

                }

            })
            .catch(error => {
                setIsSubmitting(false);
                console.log('Error => ', error);
            });
    };

    const handleOtpChange = (e, index) => {
        document.getElementById("otpBtn").disabled = false;
        const value = e.target.value.slice(-1);
        const otpArray = formData.otp ? [...formData.otp] : ["", "", "", ""];
        otpArray[index] = value;

        setFormData({ ...formData, otp: otpArray.join("") });

        if (value && e.target.nextSibling) {
            e.target.nextSibling.focus();
        }
    };

    const handleOtpKeyDown = (e, index) => {
        if (e.key === "Backspace") {
            const otpArray = formData.otp ? [...formData.otp] : ["", "", "", ""];
            otpArray[index] = "";
            setFormData({ ...formData, otp: otpArray.join("") });

            if (index > 0) {
                e.target.previousSibling.focus();
            }
        }
    };

    const resendOtp = () => {
        setShowResend(false);
        setOtpSent(false);
        document.querySelector('#otpBtn').disabled = false;
        document.querySelector('#otpBtn').click();
    };

    return (
        <>
            <div className="app">
                <div className="container-fluid">
                    <div className="d-flex p-v-20 flex-column justify-content-between">
                        <div className="container">
                            <div className="row align-items-center">
                                <div className="col-md-6 d-none d-md-block">
                                    <img className="img-fluid" src="assets/images/others/login.png" alt="" />
                                </div>
                                <div className="m-l-auto col-md-5 ">
                                    <div className="card shadow-lg">
                                        <div className="card-body">
                                            <h2 className="m-t-20">Log In</h2>
                                            <p className="m-b-30">Enter your mobile no. to get access</p>
                                            <form onSubmit={handleSubmit}>

                                                {
                                                    !otpSent ? (
                                                        <div className="form-group boxed">
                                                            <div className="input-wrapper">
                                                                <label className="label" htmlFor="txt">E-mail/Phone number</label>
                                                                <input
                                                                    id="phone_no"
                                                                    name="phone_no"
                                                                    type="text"
                                                                    className="form-control"
                                                                    readOnly={ReadOnly}
                                                                    value={formData.phone_no}
                                                                    onChange={handleChange}
                                                                />
                                                            </div>
                                                        </div>
                                                    ) : (
                                                        <div className="form-group boxed">
                                                            <div className="input-wrapper">
                                                                <label className="label" htmlFor="email1">Enter the correct OTP</label>
                                                                <div className="d-flex justify-content-between">
                                                                    {[0, 1, 2, 3].map((index) => (
                                                                        <input
                                                                            key={index}
                                                                            type="text"
                                                                            maxLength={1}
                                                                            autoComplete="one-time-code"
                                                                            className="form-control otp-input text-center p-0"
                                                                            onChange={(e) => handleOtpChange(e, index)}
                                                                            onKeyDown={(e) => handleOtpKeyDown(e, index)}
                                                                            value={formData.otp?.[index] || ""}
                                                                            style={{ width: '50px', height: '50px', fontSize: '22px', fontWeight: '500' }}
                                                                        />
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )
                                                }
                                                <div className="form-button-group p-0 mt-4">
                                                    <button
                                                        id='otpBtn'
                                                        type="submit"
                                                        className="btn btn-primary btn-block"
                                                        style={{ height: '40px' }}
                                                    >
                                                        {otpSent ? "Submit" : "Continue"}
                                                    </button>
                                                </div>
                                                <div className="d-flex justify-content-between align-items-center mt-3">
                                                    {otpSent &&
                                                        <div id='otp_timer' ref={otpTimerRef} style={{ fontSize: '12px', fontWeight: '500' }}></div>
                                                    }
                                                    {ShowResend &&
                                                        <div
                                                            className="text-danger btn btn-sm btn-hover"
                                                            style={{ cursor: 'pointer', fontSize: '12px', fontWeight: '500', color: '#FF4C6F' }}
                                                            onClick={resendOtp}
                                                        >
                                                            Resend OTP ?
                                                        </div>
                                                    }
                                                </div>

                                            </form>
                                            {
                                                !otpSent && <button className='btn btn-danger btn-tone w-100' onClick={() => navigate('/')}>Leave</button>
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );

};

export default Login;