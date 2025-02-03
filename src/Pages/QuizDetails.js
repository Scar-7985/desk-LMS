import { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { CourseContext } from '../context/CourseContext';
import { SITE_URL } from '../Auth/Define';
import DetailPage from '../Components/DetailPage';
import VideoCard from '../Components/VideoCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilePdf } from '@fortawesome/free-solid-svg-icons';

const QuizDetails = () => {

  const { courseData, videoData } = useContext(CourseContext);
  const { quizId } = useParams();

  // Show specific course details
  const filteredCourse = courseData.find((item) => String(item.program_name) === String(quizId));
  // console.log('filteredCourse => ', filteredCourse);


  if (!filteredCourse) {
    // console.error('Course not found');
  }

  const filteredVideo = filteredCourse ? videoData.filter((item) => String(item.category) === String(filteredCourse.id)) : [];

  const [videoLink, setVideoLink] = useState('#');

  useEffect(() => {
    if (filteredCourse && filteredVideo.length > 0) {
      setVideoLink(String(filteredVideo[0].id));
    } else {
      console.error('Video not found or course is unavailable');
    }
  }, [filteredCourse, filteredVideo]);


  const navigate = useNavigate();
  const goToPDF = (pid) => {
    navigate("/pdf-view",
      // { state: { pdfId: pid } }
    );
  }

  const playVideo = (vid) => {
    navigate("/video", { state: { vidId: vid } });
  }

  return (
    <>

      {
        filteredCourse ? (
          <DetailPage
            goToQuiz={"/quiz"}
            image={`${SITE_URL}new/app/upload/course_img/${filteredCourse.img}`}
            o_price={filteredCourse.of_price}
            a_price={filteredCourse.ac_price}
            duration={filteredCourse.program_duration}
            update_on={filteredCourse.update_on}
            program_name={filteredCourse.program_name}
            program_desc={filteredCourse.program_desc}
            videoList={
              filteredVideo.length > 0 ?
                (
                  filteredVideo.map((item) => {
                    return (
                      <div className="col-sm-12 col-xl-6" key={item.id}>
                        <VideoCard
                          image={`${SITE_URL}new/app/upload/video_thumb/${item.thumb}`}
                          title={item.title}
                          update_on={item.update_on}
                          goToLink={() => playVideo(videoLink)}
                        />
                      </div>
                    )
                  })
                ) : (
                  <p className='text-center w-100 py-5'>No Videos Available for this Course</p>
                )
            }
            pdfList={
              [0, 1, 2, 3].map((index) => {
                return (
                  <div class="card" key={index}>
                    <div class="card-body py-3">
                      <div class="d-flex justify-content-between align-items-center">
                        <div class="d-flex align-items-center">
                          <FontAwesomeIcon className='text-danger' icon={faFilePdf} style={{ fontSize: '26px' }} />
                          <span class="ml-3 text-gray font-weight-semibold">Web Dev Intro</span>
                        </div>
                        <div class="">
                          <button class="btn btn-primary btn-tone btn-sm font-weight-semibold" onClick={goToPDF}>
                            View
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })
            }
          />
        ) : (

          <DetailPage showSkeleton={true} />
        )
      }


    </>
  )
};

export default QuizDetails;
