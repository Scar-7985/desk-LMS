import React, { useState, useEffect, useContext } from 'react'
import { useParams, Link } from 'react-router-dom'
import Card from '../Components/Card'
import { CourseContext } from '../context/CourseContext'
import axios from 'axios'
import { SITE_URL } from '../Auth/Define'

const CourseType = () => {

  const { courseType } = useParams();
  // Courses Data
  const { courseData } = useContext(CourseContext);

  const [courseCategory, setCourseCategory] = useState([])

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await axios.get(`${SITE_URL}new/app/api/get_category.php`);
        const data = response.data;
        setCourseCategory(data);
      } catch (error) {

      }
    }

    fetchCategory();
  }, [])

  // Show specific courses of the selected category
  const selectedCategory = courseCategory.find((item) => item.ser_title === courseType)?.id;

  // console.log(courseData.filter((item) => Number(item.category) === Number(selectedCategory)));

  return (
    <>
      <div className='pb-5'>
        <div className="page-header px-2">
          <h3 className="header-title text-muted">{courseType}</h3>
        </div>
        <div className='row p-2'>

          {
            courseData ? (
              courseData.filter((item) => Number(item.category) === Number(selectedCategory)).length > 0 ?
                (
                  courseData
                    .filter((item) => Number(item.category) === Number(selectedCategory))
                    .map((item) => (
                      <div className="col-sm-12 col-lg-6 col-xl-3" key={item.id}>
                        <Card
                          image={`${SITE_URL}new/app/upload/course_img/${item.img}`}
                          title={item.program_name.length > 20 ? item.program_name.substring(0, 20) + ('...') : item.program_name}
                          desc={item.program_desc.length > 50 ? item.program_desc.substring(0, 50) + ('...') : item.program_desc}
                          date={item.update_on}
                          aPrice={item.ac_price}
                          oPrice={item.of_price}
                          goToLink={`/course-detail/${item.program_name}`}
                        />
                      </div>
                    ))
                ) : (
                  [0, 1, 2, 3].map((index) => {
                    return (
                      <div className="col-sm-12 col-lg-6 col-xl-3" key={index}>
                        <Card showSkeleton={true} />
                      </div>
                    )
                  })
                )) : (
              <div className="col-sm-12 col-lg-6 col-xl-3" style={{ fontWeight: '500' }}>No course available here.</div>
            )
          }
        </div>
      </div>
    </>
  )
}

export default CourseType
