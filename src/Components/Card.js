import React from 'react'
import { Link } from 'react-router-dom'
import Skeleton from 'react-loading-skeleton'

const Card = ({ image, title, desc, date, aPrice, oPrice, goToLink, showSkeleton = false }) => {
    return (
        <div className="card">
            {showSkeleton ?
                (
                    <Skeleton height={180} />
                ) : (
                    <img
                        className="card-img-top"
                        src={image}
                        style={{ height: '180px' }}
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
                <div className="d-flex align-items-center justify-content-between">
                    <p className="m-b-0 text-dark font-weight-semibold font-size-15 d-flex align-items-center">
                        <span className="text-success" style={{ fontSize: '18px' }}>
                            {showSkeleton ? <Skeleton width={60} /> : `₹ ${aPrice}`}
                        </span>
                        <span className="text-muted ml-1" style={{ textDecoration: 'line-through', fontSize: '12px' }}>
                            {showSkeleton ? <Skeleton width={50} /> : `₹ ${oPrice}`}
                        </span>
                    </p>
                    {showSkeleton ? (
                        <Skeleton width={80} height={30} />
                    ) : (
                        <Link to={goToLink} className="btn btn-success btn-tone  px-3">
                            <span className="font-weight-semibold">Open Course</span>
                        </Link>
                    )
                    }
                </div>
            </div>
        </div>
    );
};

export default Card;

