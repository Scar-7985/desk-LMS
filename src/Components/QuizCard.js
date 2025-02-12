import React from 'react'
import { Link } from 'react-router-dom'
import Skeleton from 'react-loading-skeleton'

const QuizCard = ({ image, title, desc, date, onClick, showSkeleton = false }) => {
    return (
        <div className="card" onClick={onClick}>
            {showSkeleton ?
                (
                    <Skeleton height={180} />
                ) : (
                    <img
                        className="card-img-top"
                        src={image}
                        style={{ height: '240px' }}
                        alt=""
                    />
                )
            }
            <div className="card-body">
                <h4 className="m-t-10">{showSkeleton ? <Skeleton /> : title}</h4>
                <p className="m-b-10">
                    {showSkeleton ? <Skeleton /> : (
                        <span dangerouslySetInnerHTML={{ __html: desc }} />
                    )}
                </p>
                <p className="m-b-20 d-flex align-items-center">
                    <span className="font-weight-semibold" style={{ fontSize: '14px' }}>
                        {showSkeleton ? <Skeleton width={100} /> : "Last Updated | "}
                    </span>
                    <span className="text-success font-weight-bold ml-1" style={{ fontSize: '12px' }}>
                        {showSkeleton ? <Skeleton width={60} /> : date}
                    </span>
                </p>
                <div className="d-flex align-items-center justify-content-end">

                    {showSkeleton ? (
                        <Skeleton width={80} height={30} />
                    ) : (
                        <button className="btn btn-success btn-tone w-100 px-3">
                            <span className="font-weight-semibold">Start Quiz</span>
                        </button>
                    )
                    }
                </div>
            </div>
        </div>
    );
};

export default QuizCard;

