import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import { SITE_URL, isAuthenticated } from './Define';

const UserStatus = () => {
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated) {
            axios.post(`${SITE_URL}new/app/api/user_status.php`, { login_id: isAuthenticated }, {
                headers: { 'Content-Type': 'application/json' }
            })
                .then(response => {
                    // console.log('User response:', response.data);
                    // ================== If user is banned by admin ================== //
                    if (response.data.user_status === 0) {
                        toast.error("Your Profile was banned by admin");
                        setTimeout(() => {
                            window.localStorage.removeItem("login_id");
                            window.localStorage.removeItem("user_name");
                            window.localStorage.removeItem("user_phone");
                            window.localStorage.removeItem("user_email");
                            navigate('/');
                            window.location.reload();
                        }, 2000);
                    }
                    // ================== If user is banned by admin ================== //
                })
                .catch(error => {
                    console.error('Error fetching user status:', error);
                });
        } else {
            console.log('No authenticated user found.');
        }
        // ================== If user has not yet updated his details ================== //

        if (isAuthenticated && (window.localStorage.getItem("user_name") === "null")) {
            navigate('/update-profile');
        }
        // ================== If user has not yet updated his details ================== //
    }, [location.pathname]);

    return null;
};

export default UserStatus;
