import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { CourseContext } from '../context/CourseContext'
// import VideoCard from '../components/VideoCard';
import { SITE_URL } from '../Auth/Define';
import axios from 'axios';
// import CardListSkeleton from '../components/CardListSkeleton'
import Card from '../Components/Card';

const MyCourses = () => {

  // =========== Skeleton UI Starts =========== //
  const [showSkeleton, setShowSkeleton] = useState(true);
  const [skeletonData, setSkeletonData] = useState([
    { id: 1, title: "loading-skeleton" },
    { id: 2, title: "loading-skeleton" },
    { id: 3, title: "loading-skeleton" },
    { id: 4, title: "loading-skeleton" }
  ]);
  // =========== Skeleton UI Ends =========== //

  const [courseData, setCourseData] = useState([]);
  const purchasedCourses = courseData.filter((item) => item.status === 1);

  useEffect(() => {
    axios.post(`${SITE_URL}new/app/api/get_course.php`).then(response => {
      setCourseData(response.data);
      setShowSkeleton(false);
    }).catch(error => {
      console.log("Could not fetch my purchased courses => ", error);
    })
  }, [])

  return (
    <div className="main-content px-3 bg-white">
      <div className="page-header mt-3 px-2">
        <h2 className="header-title py-4 text-center" style={{ letterSpacing: '0.8px' }}>---- My Courses ----</h2>
      </div>

      <div className="row px-2 m-t-10">
        {
          courseData ? (
            courseData.length > 0 ?
              (
                purchasedCourses.map((item, index) => {
                  return (
                    <div className="col-md-3" key={index}>
                      <Card
                        image={`https://wealthsaga.store/new/app/upload/course_img/${item.img}`}
                        title={item.program_name.length > 20 ? item.program_name.substring(0, 20) + ('...') : item.program_name}
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
                    <div className="col-md-3" key={index}>
                      <Card
                        showSkeleton={true}
                      />
                    </div>
                  )
                })
              )
          ) : (
            <div className='d-flex flex-column justify-content-center align-items-center' style={{ width: '100%', height: '200px' }}>
              <div className='mb-2'>You have not purchased any courses yet .</div>
              <Link to='/courses' className='btn btn-md btn-success text-white'>Explore Courses</Link>
            </div>
          )
        }
      </div>
    </div>
  )
}

export default MyCourses
