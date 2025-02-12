import React, { useEffect, useContext, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { CourseContext } from '../context/CourseContext';
import axios from 'axios';
import { SITE_URL } from '../Auth/Define';
import QuizCard from '../Components/QuizCard';
import { toast } from 'react-toastify';

const QuizSubCategory = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const { quizId } = location.state || {};


    const [quizData, setQuizData] = useState([]);

    useEffect(() => {
        if (quizId) {
            axios.post(`${SITE_URL}new/app/api/get_quiz_type.php`, { exam_id: quizId }).then(resp => {
                setQuizData(resp.data);
            }).catch(error => {
                console.log(error);
            })
        }
    }, [])

    // console.log(quizData);


    const startQuiz = (Id) => {
        const url = `/quiz?quizId=${Id}`;
        const windowFeatures = `toolbar=no,menubar=no,location=no,status=no,scrollbars=yes,resizable=yes,width=${window.screen.width},height=${window.screen.height},top=0,left=0`;

        const newWindow = window.open(url, "_blank", windowFeatures);

        if (newWindow) {
            const interval = setInterval(() => {
                if (newWindow.closed) {
                    clearInterval(interval);
                    toast.success("Quiz completed successfully!");
                }
            }, 1000);
        }
    };





    return (
        <>
            <div className="main-content p-2">
                <div className="page-header">
                    <h2 className="header-title p-2 text-center">--- Select Quiz ---</h2>
                </div>
                <div className="row">

                    {
                        quizData.length > 0 ? (
                            quizData.map((item, index) => {
                                return (
                                    <div className="col-sm-12 col-md-6 col-lg-4" key={index}>
                                        <QuizCard
                                            onClick={() => startQuiz(item.exam_id)}
                                            image={`${SITE_URL}new/app/upload/exam_img/${item.image}`}
                                            title={item.exam_name}
                                            desc={item.description}
                                            date={item.date}
                                        />
                                    </div>
                                )
                            })

                        ) : (<h1>No Quiz to show</h1>)
                    }


                </div>
            </div>
        </>
    )
}

export default QuizSubCategory
