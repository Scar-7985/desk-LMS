import React, { useState, useEffect, useContext } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { CourseContext } from '../context/CourseContext'
import axios from 'axios'
import { SITE_URL } from '../Auth/Define'
import Card from '../Components/Card'

const QuizType = () => {

  const navigate = useNavigate();
  const location = useLocation();
  const { quizType } = location.state;
  const { courseData } = useContext(CourseContext);

  const filteredQuiz = courseData.filter((item) => Number(item.category) === Number(quizType));

  return (
    <>
      <div className='pb-5'>
        <div className='row px-2 pb-5'>

          {
            filteredQuiz ? (
              filteredQuiz.length > 0 ?
                (
                  filteredQuiz.map((item) => (
                    <div className="col-sm-12 col-md-6 col-lg-4 col-xl-3" key={item.id}>
                      <Card
                        image={`${SITE_URL}new/app/upload/course_img/${item.img}`}
                        title={item.program_name.length > 20 ? item.program_name.substring(0, 20) + ('...') : item.program_name}
                        desc={item.program_desc.length > 50 ? item.program_desc.substring(0, 50) + ('...') : item.program_desc}
                        date={item.update_on}
                        aPrice={item.ac_price}
                        oPrice={item.of_price}
                        goToLink={`/quiz_details/${item.program_name}`}
                      />
                    </div>
                  ))
                ) : (
                  <div className="col-sm-12 col-lg-6 col-xl-3" style={{ fontWeight: '500' }}>No quiz available here.</div>
                )) : (
              [0, 1, 2, 3].map((index) => {
                return (
                  <div className="col-sm-12 col-lg-6 col-xl-3" key={index}>
                    <Card showSkeleton={true} />
                  </div>
                )
              })
            )}
        </div>
      </div>
    </>
  )
}

export default QuizType
