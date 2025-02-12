import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { SITE_URL } from '../Auth/Define';

const QuizGame = () => {

    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const strtQuizId = params.get("quizId");
    const [quizData, setQuizData] = useState([]);
    const [questNumber, setQuestNumber] = useState(0);
    const [answers, setAnswers] = useState([]);
    const [quizSubmitted, setQuizSubmitted] = useState(false);
    const [result, setResult] = useState(null);
    const [disableButton, setDisableButton] = useState(false);
    const [timeLeft, setTimeLeft] = useState(10 * 60);
    const [timeCompleted, setTimeCompleted] = useState(0);
    const [showModal, setShowModal] = useState(false);

    const navigate = useNavigate();


    useEffect(() => {
        const fetchQuestions = async () => {
            axios.post(`${SITE_URL}new/app/api/get_questions.php`, { exam_id: strtQuizId }).then(resp => {
                // console.log("Api resp => ", resp.data.slice(0, 1).map((item) => item));
                setQuizData(resp.data);
                const initialAnswers = resp.data.map(() => null);
                setAnswers(initialAnswers);

            }).catch(error => {
                console.log('Error fetching quiz data:', error);
            })
        };

        fetchQuestions();

    }, []);


    useEffect(() => {
        if (timeLeft > 0) {
            const timer = setInterval(() => {
                setTimeLeft((prevTime) => prevTime - 1);
            }, 1000);


            return () => clearInterval(timer);
        } else {
            setDisableButton(true);
            handleSubmit()
        }
    }, [timeLeft]);

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${minutes.toString().padStart(2, '0')}:${seconds
            .toString()
            .padStart(2, '0')}`;
    };


    const filteredQuestion = useMemo(() => {
        return quizData.length > 0 ? quizData[questNumber] : null;
    }, [quizData, questNumber]);



    const nextQuestion = () => {
        setQuestNumber((prev) => prev + 1);
    };

    const prevQuestion = () => {
        setQuestNumber((prev) => prev - 1);
    };

    const handleAnswerChange = (e) => {
        const updatedAnswers = [...answers];
        updatedAnswers[questNumber] = e.target.value;
        setAnswers(updatedAnswers);
    };

    const handleSubmit = () => {
        const elapsedTime = 10 * 60 - timeLeft;
        setTimeCompleted(elapsedTime);
        // Check answers and calculate result
        const optionMapping = {
            option_a: 'A',
            option_b: 'B',
            option_c: 'C',
            option_d: 'D',
        };
        let correctCount = 0;
        answers.forEach((answer, index) => {
            const correctAnswer = quizData[index]?.correct_answer;
            const mappedAnswer = optionMapping[answer];
            if (mappedAnswer === correctAnswer) {
                correctCount++;
            }
        });

        const totalQuestions = quizData.length;
        const score = (correctCount / totalQuestions) * 100;

        setResult({ correctCount, totalQuestions, score });
        setQuizSubmitted(true);
    };

    const formatElapsedTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${minutes.toString().padStart(2, '0')}:${seconds
            .toString()
            .padStart(2, '0')}`;
    };

    return (
        <>

            <div className=''>
                {quizData.length > 0 && !quizSubmitted ? (
                    <div className="bg-white py-2 px-3 rounded shadow border w-100 h-100 py-3" style={{ position: 'relative' }}>
                        <div className="d-flex justify-content-between align-items-center mb-2">
                            <h3 className='m-0'>Question: {questNumber + 1} <span className='font-size-17 font-weight-semibold'>of </span>{quizData.length}</h3>
                            <h5 className='btn btn-warning' style={{ width: '80px' }}>{formatTime(timeLeft)}</h5>
                        </div>

                        {filteredQuestion ? (
                            <div
                                style={{ minHeight: 'calc(100vh - 186px)' }}
                            >
                                <div className="mb-4">
                                    <p
                                        id='question_holder'
                                        className='p-5 font-size-19'
                                        dangerouslySetInnerHTML={{ __html: filteredQuestion.question_text }}
                                    />

                                </div>
                                {/* <img src='assets/images/others/cpu.jpg' width={150} /> */}
                                <div className="row font-size-18">
                                    {['option_a', 'option_b', 'option_c', 'option_d'].map((opt, index) => (
                                        <div className='col-6' key={index}>
                                            <label
                                                key={index}
                                                className="btn btn-secondary btn-tone text-left px-2 py-3 w-100 my-2"
                                                style={{ cursor: 'pointer' }}
                                            >

                                                <input
                                                    className="radio mr-3"
                                                    type="radio"
                                                    name="Ans"
                                                    value={opt}
                                                    onChange={handleAnswerChange}
                                                    checked={answers[questNumber] === opt}
                                                />

                                                <span className='font-size-16 font-weight-semibold' dangerouslySetInnerHTML={{ __html: filteredQuestion[opt] }} />
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <p>No question available</p>
                        )}

                        <div className="d-flex justify-content-between align-items-center m-t-50">
                            <button
                                onClick={prevQuestion}
                                className={`btn btn-${questNumber === 0 ? 'secondary' : 'info'} btn-tone btn-lg d-flex align-items-center`}

                                disabled={questNumber === 0 || disableButton}
                            >
                                <ion-icon name="arrow-back-outline"></ion-icon>
                                <span className=''>Previous</span>
                            </button>
                            <button
                                className="btn btn-lg btn-success"
                                onClick={() => setShowModal(true)}
                            >
                                Submit
                            </button>

                            <button
                                onClick={nextQuestion}
                                className={`btn btn-${questNumber + 1 === quizData.length ? 'secondary' : 'success'} btn-tone btn-lg d-flex align-items-center`}
                                disabled={questNumber + 1 === quizData.length || disableButton}
                            >
                                <span className=''>Next</span>
                                <ion-icon name="arrow-forward-outline"></ion-icon>
                            </button>

                        </div>
                    </div>
                ) : quizSubmitted ? (
                    <div className="text-center py-5">
                        <h3>Quiz Completed!</h3>
                        <p>
                            You got {result.correctCount} out of {result.totalQuestions} correct answers <br />
                            ({result.score.toFixed(2)}%).
                        </p>
                        <p>Time Taken: {formatElapsedTime(timeCompleted)}</p>
                        <button onClick={() => window.close()} className="btn btn-success shadow">Go To Quiz Menu</button>
                    </div>
                ) : (
                    <div className="text-center py-5">
                        <div className="spinner-border text-success" role="status"></div>
                    </div>
                )}
            </div>

            {/* Submit Confirmation Pop-up */}

            {
                showModal &&
                <div>
                    <div className="modal-backdrop fade show" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}></div>
                    <div className="modal fade show" id="exampleModalCenter" style={{ display: 'block' }}>
                        <div className="modal-dialog modal-dialog-centered">
                            <div className="modal-content text-center">
                                <div className="modal-header justify-content-center py-2">
                                    <h3 className="modal-title" id="exampleModalCenterTitle">Submit Quiz</h3>
                                </div>
                                <div className="modal-body" style={{ fontSize: '16px' }}>
                                    Are you sure you want to Submit ?
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-default" data-dismiss="modal" onClick={() => setShowModal(false)}>Cancel</button>
                                    <button type="button" className="btn btn-primary" onClick={() => { handleSubmit(); setShowModal(false) }}>Okay</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }


        </>
    );
};

export default QuizGame;