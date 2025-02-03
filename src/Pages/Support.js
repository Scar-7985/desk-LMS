import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';

const Support = () => {

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email_id: window.localStorage.getItem('user_email'),
    phone_no: window.localStorage.getItem('user_phone'),
    name: (window.localStorage.getItem('user_name') === 'null' ? ("USER - " + window.localStorage.getItem('login_id')) : (window.localStorage.getItem('user_name'))),
    subject: '',
    message: '',
  });
  const [showModal, setShowModal] = useState(false);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // console.log('formData => ', formData);

    axios.post('https://wealthsaga.store/new/app/api/support.php', formData).then(response => {

      // console.log("response => ", response.data);

      // toast.error(response.data.msg);

      if (response.data.status === 100) {
        setShowModal(true);
      } else if (response.data.status === 101) {
        toast.warning(response.data.msg);
      }

    }).catch(error => {
      console.log('error => ', error);

    })

  };

  const handleCloseModal = () => {
    setShowModal(false);
    navigate("/profile");
  }

  return (
    <>
      <div className='m-2'>
        <div className="card">
          <div className='text-center'>
            <img src='/assets/images/others/support.png' width={300} />
          </div>

          <div className="card-body p-0">
            <h1 className='text-center'>Hi! How can we help you?</h1>

            <div className="m-t-25" style={{ maxWidth: '700px', margin: 'auto' }}>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="formGroupExampleInput">Subject</label>
                  <select
                    name="subject"
                    className="w-100 py-2 rounded form-control"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                  >
                    <option value="Blank">Select a subject</option>
                    <option value="Course">Course</option>
                    <option value="Order">Order</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="formGroupExampleInput2">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    rows="5"
                    className="form-control"
                    placeholder="Your message here"
                    value={formData.message}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>
                <div className="form-group">
                  <button type='submit' className='btn btn-primary'>Submit</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* =================================== */}

      {
        showModal &&
        <div>
          <div className="modal-backdrop fade show" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}></div>
          <div class="modal fade show" id="exampleModalCenter" style={{ display: 'block' }}>
            <div class="modal-dialog modal-dialog-centered">
              <div class="modal-content flex-column align-items-center text-center">
                <FontAwesomeIcon icon={faCircleCheck} className='text-success pt-3' style={{ fontSize: '50px' }} />
                <div class="modal-body font-weight-semibold">
                  Thank you for reaching out to us! <br />
                  We will respond to you shortly via email.
                </div>
                <div class="modal-footer justify-content-start w-100">
                  <button type="button" class="btn btn-primary w-100" onClick={handleCloseModal}>Okay</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      }

    </>
  )
}

export default Support
