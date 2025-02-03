import React, { useState, useEffect } from 'react';
import HeroBanner from '../Components/HeroBanner';
import { Link } from 'react-router-dom';
import Card from '../Components/Card'
import axios from 'axios';
import { SITE_URL } from '../Auth/Define';
import ListCard from '../Components/ListCard';
import Skeleton from 'react-loading-skeleton'
import Footer from '../Components/Footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

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

  return (
    <>
      <div className="main-content mt-2" style={{ padding: '0 20px' }}>
        <div className="row">
          <div className="col-md-12 col-lg-12 mb-4">
            <HeroBanner />
          </div>

        </div>

        <div className="main-content d-none">
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

        <div className="page-header mt-3">
          <h3 className="header-title text-muted">Trending</h3>
        </div>
        <div className="row m-t-20">
          {
            courseData.length > 0 ? (
              courseData.slice(0, 4).map((item) => {
                return (
                  <div className="col-sm-12 col-lg-6 col-xl-3">
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
                  <div className="col-sm-12 col-lg-6 col-xl-3" key={index}>
                    <Card showSkeleton={true} />
                  </div>
                )
              })
            )
          }
        </div>

        <div className="page-header m-t-20">
          <h3 className="header-title text-muted">Recommended</h3>
        </div>

        <div className="row px-2 m-t-10">
          {
            courseData.length > 0 ? (
              courseData.slice(0, 4).map((item) => {
                return (
                  <ListCard
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

        {/* Why Choose Us Starts */}

        <div class="card p-25">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <img src='/assets/images/others/choose.jpg' width={500} className="rounded" />
            </div>
            <div className="col-lg-6">
              <h2 className="font-size-50 font-weight-semibold">Why Choose Us ?</h2>
              <p>Pixlogix is India's 1st "SOTD"" award winner by awwwards.com with a vast experience of 15+ years. With a versatile experience of building high-performing websites and ecommerce solutions, we offer a wide range of services, including web design, web development, ecommerce development, mobile app development, and SEO.</p>
              <h5>Take a look at our value addition points:</h5>
              <div className="row">
                <div className="col-lg-6">
                  <div class="m-b-10">

                    <FontAwesomeIcon className="text-success" icon={faCheck} />
                    <span className='m-l-10'>Expertise and Experience</span>

                  </div>
                  <div class="m-b-10">
                    <FontAwesomeIcon className="text-success" icon={faCheck} />
                    <span className='m-l-10'>SEO-Friendly Website Development</span>
                  </div>
                  <div class="m-b-10">
                    <FontAwesomeIcon className="text-success" icon={faCheck} />
                    <span className='m-l-10'>Track Record of Quality Work</span>
                  </div>
                  <div class="m-b-10">
                    <FontAwesomeIcon className="text-success" icon={faCheck} />
                    <span className='m-l-10'>Customized Solutions</span>
                  </div>

                </div>

                <div className="col-lg-6">

                  <div class="m-b-10">
                    <FontAwesomeIcon className="text-success" icon={faCheck} />
                    <span className='m-l-10'>Conversion-Driven Designs</span>
                  </div>
                  <div class="m-b-10">
                    <FontAwesomeIcon className="text-success" icon={faCheck} />
                    <span className='m-l-10'>Timely Delivery</span>
                  </div>
                  <div class="m-b-10">
                    <FontAwesomeIcon className="text-success" icon={faCheck} />
                    <span className='m-l-10'>Competitive Pricing</span>
                  </div>
                  <div class="m-b-10">
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



      </div>
      {/* <Footer /> */}
    </>
  );
};

export default Home;
