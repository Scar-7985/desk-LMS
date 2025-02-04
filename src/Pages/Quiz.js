import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom';

const QuizGame = () => {

    const [quizData, setQuizData] = useState([]);
    const [questNumber, setQuestNumber] = useState(0);
    const [answers, setAnswers] = useState([]);
    const [quizSubmitted, setQuizSubmitted] = useState(false);
    const [result, setResult] = useState(null);
    const [disableButton, setDisableButton] = useState(false);
    const [timeLeft, setTimeLeft] = useState(10 * 60);
    const [timeCompleted, setTimeCompleted] = useState(0);
    const [showModal, setShowModal] = useState(false);



    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const response = await axios.get('https://vikrant.westonik.com/quiz.php');
                setQuizData(response.data);

                const initialAnswers = response.data.map(() => null);
                setAnswers(initialAnswers);
                window.localStorage.setItem("canNavigateBack:", false)
            } catch (error) {
                console.error('Error fetching quiz data:', error);
                alert('Failed to fetch quiz data. Please try again later.');
            }
        };

        fetchQuestions();

        // ============================================ //



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
        // console.log('Submitted Answers:', answers);

        // Check answers and calculate result
        let correctCount = 0;
        answers.forEach((answer, index) => {
            const correctAnswer = quizData[index]?.ans;
            const selectedAnswer = quizData[index]?.[answer];

            if (selectedAnswer === correctAnswer) {
                correctCount++;
            }
        });

        const totalQuestions = quizData.length;
        const score = (correctCount / totalQuestions) * 100;

        setResult({ correctCount, totalQuestions, score });
        setQuizSubmitted(true);
        window.localStorage.removeItem("canNavigateBack:")
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

            <div className='p-2'>
                {quizData.length > 0 && !quizSubmitted ? (
                    <div className="bg-white pt-4 px-3 pb-2 rounded shadow border w-100 h-100" style={{ position: 'relative' }}>
                        <div className="d-flex justify-content-between align-items-center mb-4">
                            <h3 className='m-0'>Question: {questNumber + 1}</h3>
                            <h5 className='btn btn-warning' style={{ width: '80px' }}>{formatTime(timeLeft)}</h5>
                        </div>

                        {filteredQuestion ? (
                            <div style={{ height: 'calc(100vh - 234px)' }}>
                                <div className="mb-4">
                                    <p
                                        className='p-5 font-size-19'
                                    >{filteredQuestion.quest}
                                    </p>

                                </div>
                                {/* <img src='assets/images/others/cpu.jpg' width={150} /> */}
                                <div className="d-flex flex-column gap-2 mb-4 font-size-18">
                                    {['opt_a', 'opt_b', 'opt_c', 'opt_d'].map((opt, index) => (
                                        <label
                                            key={index}
                                            className="btn btn-secondary btn-tone text-left px-2 py-3"
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

                                            {filteredQuestion[opt]}
                                        </label>

                                    ))}
                                </div>
                            </div>
                        ) : (
                            <p>No question available</p>
                        )}

                        <div className="d-flex justify-content-between align-items-center">
                            <button
                                onClick={prevQuestion}
                                className={`btn btn-${questNumber === 0 ? 'secondary' : 'info'} btn-tone d-flex align-items-center`}
                                style={{ height: '40px' }}
                                disabled={questNumber === 0 || disableButton}
                            >
                                <ion-icon name="arrow-back-outline"></ion-icon>
                                <span className=''>Previous</span>
                            </button>


                            <button
                                className="btn btn-success"
                                onClick={() => setShowModal(true)}
                            >
                                Submit
                            </button>

                            <button
                                onClick={nextQuestion}
                                className={`btn btn-${questNumber + 1 === quizData.length ? 'secondary' : 'success'} btn-tone d-flex align-items-center`}
                                style={{ height: '40px' }}
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
                        <Link to={'/'} className="btn btn-success shadow">Go To Home</Link>
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
                    <div class="modal fade show" id="exampleModalCenter" style={{ display: 'block' }}>
                        <div class="modal-dialog modal-dialog-centered">
                            <div class="modal-content text-center">
                                <div class="modal-header justify-content-center py-2">
                                    <h3 class="modal-title" id="exampleModalCenterTitle">Submit Quiz</h3>
                                </div>
                                <div class="modal-body" style={{ fontSize: '16px' }}>
                                    Are you sure you want to Submit ?
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-default" data-dismiss="modal" onClick={() => setShowModal(false)}>Cancel</button>
                                    <button type="button" class="btn btn-primary" onClick={() => { handleSubmit(); setShowModal(false) }}>Okay</button>
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