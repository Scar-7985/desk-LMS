import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';
import { SITE_URL } from '../Auth/Define'
import Skeleton from 'react-loading-skeleton';

const QuizCategory = () => {

  const [quizCategory, setQuizCategory] = useState([]);

  useEffect(() => {
    axios.post(`${SITE_URL}new/app/api/get_category.php`).then(response => {
      setQuizCategory(response.data);
    }).catch(error => {
      console.log("Coud not fetch Quiz Category => ", error);
    })
  }, [])

  return (
    <div className="">
      <div className="page-header d-flex px-2 py-2">
        <h4 className="header-title text-muted">Quiz</h4>
      </div>
      <div className="row mx-1">
        {
            quizCategory.length > 0 ? (
              quizCategory.map((item) => {
                return (
                  <div className="col-sm-12 col-lg-6 col-xl-3"
                    key={item.id}>
                    <div
                      className="card border"
                      style={{ textDecoration: 'none' }}>
                      <img className="card-img-top" src={`${SITE_URL}new/app/upload/category_img/${item.image}`} alt="" />
                      <div className="card-body">
                        <h4 className="m-t-10" dangerouslySetInnerHTML={{ __html: item.ser_title.length > 50 ? item.ser_title.substring(0, 50) + "..." : item.ser_title }} />
                        <div className="d-flex align-items-center justify-content-between">
                          <p className="m-b-0 text-dark font-weight-semibold font-size-15 pt-0 mt-0">Last Updated</p>
                          <p className="m-b-0 text-muted font-weight-semibold font-size-15 pt-0 mt-0">{item.update_on}</p>
                        </div>
                      </div>
                      <Link to={`/quiz_type/${item.ser_title}`} className="btn btn-warning btn-tone w-100">
                        Explore Courses
                      </Link>
                    </div>
                  </div>
                )
              })
            ) : (
              [0, 1, 2, 3].map((index) => {
                            return (
                              <div className="col-sm-12 col-lg-6 col-xl-3"
                                key={index}>
                                <div
                                  className="card border"
                                  style={{ textDecoration: 'none' }}>
                                  <div className="card-img-top"><Skeleton height={200} /></div>
                                  <div className="card-body">
                                    <h4 className="m-t-10"><Skeleton /></h4>
                                    <div className="d-flex align-items-center justify-content-between">
                                      <p className="m-b-0 text-dark font-weight-semibold font-size-15 pt-0 mt-0"><Skeleton width={100} /></p>
                                      <p className="m-b-0 text-muted font-weight-semibold font-size-15 pt-0 mt-0"><Skeleton width={100} /></p>
                                    </div>
                                  </div>
                                  <div className="w-100">
                                    <Skeleton height={40} />
                                  </div>
                                </div>
                              </div>
                            )
                          })
            )
        }
      </div>

    </div>



  );
}

export default QuizCategory
