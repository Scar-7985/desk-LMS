import React, { useState, useEffect } from 'react';
import HeroBanner from '../Components/HeroBanner';
import Card from '../Components/Card'
import axios from 'axios';
import { SITE_URL } from '../Auth/Define';
import ListCard from '../Components/ListCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleUp, faCheck } from '@fortawesome/free-solid-svg-icons';

const Home = () => {

  const [courseData, setCourseData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [notification, setNotification] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [course, category, notification] = await axios.all([
          axios.post(`${SITE_URL}new/app/api/get_course.php`),
          axios.post(`${SITE_URL}new/app/api/get_category.php`),
          axios.post(`${SITE_URL}new/app/api/notification.php`),
        ]);
        setCourseData(course.data);
        setCategoryData(category.data);
        setNotification(notification.data);

      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const [activeIndex, setActiveIndex] = useState(0);
  const handleClick = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const accordionData = [
    {
      title: "What is the HTML & CSS?",
      content:
        "HTML is the standard markup language for creating Web pages. CSS is used to define styles for your web pages, including the design, layout and variations in display for different devices and screen sizes.",
    },
    {
      title: "What is the React?",
      content:
        "React is a JavaScript library for building user interfaces. React is used to build single page applications.React allows us to create reusable UI components.",
    },
    {
      title: "Is PHP dead?",
      content:
        "No, PHP is not dead. While it may not be as trendy as newer languages like JavaScript (Node.js), Python, or Go, it is still widely used for web development.",
    },

  ];

  return (
    <>
      <div className="main-content">
        <div className="row">
          <div className="col-md-12 col-lg-12 mb-4">
            <HeroBanner />
          </div>

        </div>

        <div className="main-content d-none px-2">
          <div className="row">
            {categoryData.map((item, index) => {
              return (
                <div className="col-md-6 col-lg-3" key={index}>
                  <div className="card" style={{ position: 'relative', overflow: 'hidden', height: '80px' }}>
                    <img src={`${SITE_URL}new/app/upload/category_img/${item.image}`} style={{ width: '100%', height: '100%', position: 'absolute', left: '0', top: '0' }} alt="" />
                    <div className="card-body">
                      <div className="media align-items-center">
                        <div className="m-l-15">
                          <h5 className="m-b-0 text-white">{item.ser_title}</h5>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="main-content px-3 bg-white">
          <div className="page-header mt-3 px-2">
            <h2 className="header-title pt-5 text-center" style={{ letterSpacing: '0.8px' }}>---- Trending Courses ----</h2>
          </div>
          <div className="row m-t-50">
            {
              courseData.length > 0 ? (
                courseData.slice(0, 4).map((item, index) => {
                  return (
                    <div className="col-sm-12 col-md-6 col-lg-4 col-xl-3" key={index}>
                      <Card
                        image={`${SITE_URL}new/app/upload/course_img/${item.img}`}
                        title={item.program_name}
                        desc={item.program_desc.length > 30 ? item.program_desc.substring(0, 30) + ('...') : item.program_desc}
                        date={item.update_on}
                        aPrice={item.ac_price}
                        oPrice={item.of_price}
                        goToLink={`/course-detail/${item.program_name}`}
                      />
                    </div>
                  )
                })
              ) : (
                [0, 1, 2, 3].map((index) => {
                  return (
                    <div className="col-sm-12 col-md-6 col-lg-4 col-xl-3" key={index}>
                      <Card showSkeleton={true} />
                    </div>
                  )
                })
              )
            }
          </div>
        </div>

        <div className="main-content px-3 bg-white mt-5">
          <div className="page-header mt-3 px-2">
            <h2 className="header-title pt-5 text-center" style={{ letterSpacing: '0.8px' }}>---- Recommended Courses ----</h2>
          </div>

          <div className="row m-t-50 mx-2">
            {
              courseData.length > 0 ? (
                courseData.slice(0, 4).map((item, index) => {
                  return (
                    <ListCard
                      key={index}
                      image={`${SITE_URL}new/app/upload/course_img/${item.img}`}
                      title={item.program_name}
                      date={item.update_on}
                      desc={item.program_desc}
                      aPrice={item.ac_price}
                      oPrice={item.of_price}
                      goToLink={`/course-detail/${item.program_name}`}
                    />
                  )
                })
              ) : (
                [0, 1, 2, 3].map((index) => {
                  return (
                    <ListCard
                      key={index}
                      showSkeleton={true}
                    />
                  )
                })
              )
            }
          </div>
        </div>

        {/* Why Choose Us Starts */}

        <div className="card mx-2 py-4">
          <div className="row align-items-center">
            <div className="col-xl-6" style={{ display: 'grid', placeItems: 'center' }}>
              <img src='/assets/images/others/choose.jpg' width={500} className="rounded" />
            </div>
            <div className="col-xl-6 text-md-center text-xl-left d-flex flex-column align-items-center mt-5 mt-xl-0">
              <h2 className="font-size-50 font-weight-semibold w-100">Why Choose Us ?</h2>
              <p>Xyz is India's 1st "SOTD"" award winner by awwwards.com with a vast experience of 15+ years. With a versatile experience of building high-performing websites and ecommerce solutions, we offer a wide range of services, including web design, web development, ecommerce development, mobile app development, and SEO.</p>
              <h5 className='mb-3 text-xl-left w-100'>Take a look at our value addition points:</h5>
              <div className="row w-100">
                <div className="col-6 text-left">
                  <div className="m-b-10 w-100">
                    <FontAwesomeIcon className="text-success" icon={faCheck} />
                    <span className='m-l-10'>Expertise and Experience</span>
                  </div>
                  <div className="m-b-10 w-100">
                    <FontAwesomeIcon className="text-success" icon={faCheck} />
                    <span className='m-l-10'>SEO-Friendly Websites</span>
                  </div>
                  <div className="m-b-10 w-100">
                    <FontAwesomeIcon className="text-success" icon={faCheck} />
                    <span className='m-l-10'>Record of Quality Work</span>
                  </div>
                  <div className="m-b-10 w-100">
                    <FontAwesomeIcon className="text-success" icon={faCheck} />
                    <span className='m-l-10'>Customized Solutions</span>
                  </div>

                </div>

                <div className="col-6 text-left">

                  <div className="m-b-10">
                    <FontAwesomeIcon className="text-success" icon={faCheck} />
                    <span className='m-l-10'>Conversion-Driven Designs</span>
                  </div>
                  <div className="m-b-10">
                    <FontAwesomeIcon className="text-success" icon={faCheck} />
                    <span className='m-l-10'>Timely Delivery</span>
                  </div>
                  <div className="m-b-10">
                    <FontAwesomeIcon className="text-success" icon={faCheck} />
                    <span className='m-l-10'>Competitive Pricing</span>
                  </div>
                  <div className="m-b-10">
                    <FontAwesomeIcon className="text-success" icon={faCheck} />
                    <span className='m-l-10'>Support and Maintenance</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Why Choose Us Ends */}

        <div className="card">
          <div className='card-body' style={{ width: '100%' }}>
            <img src="/assets/images/others/poster-2.jpg" style={{ width: '100%', height: '100%' }} alt="" />
          </div>
        </div>

        {/* Frequently Asked Questions */}

        <div className="main-content px-2">
          <div className="card">
            <div className="card-body">
              <h2 className="text-center">Frequently Asked Questions</h2>
              <div className="m-t-25">
                <div className="accordion">
                  {accordionData.map((item, index) => (
                    <div className="card mb-2 py-0" key={index}>
                      <div className="card-header">
                        <h5 className="card-title" style={{ position: 'relative' }}>
                          <button
                            className={`btn btn-primary w-100 text-left ${activeIndex === index ? "" : "collapsed"}`}
                            onClick={() => handleClick(index)}


                          >
                            <span className="font-weight-semibold">
                              {item.title}
                            </span>

                            {
                              <FontAwesomeIcon icon={activeIndex === index ? faAngleDown : faAngleUp}
                                style={{ position: 'absolute', right: '15px' }} />
                            }


                          </button>
                        </h5>
                      </div>
                      <div
                        className={`collapse ${activeIndex === index ? "show" : ""}`}
                      >
                        <div className="card-body" style={{ backgroundColor: '#F8F9FC' }}>{item.content}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>



      </div>
      {/* <Footer /> */}
    </>
  );
};

export default Home;
