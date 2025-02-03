import React from 'react'
import { Link } from 'react-router-dom'
import Skeleton from 'react-loading-skeleton'

const ListCard = ({ image, title, date, desc, aPrice, oPrice, goToLink, showSkeleton = false }) => {

    return (

        <div className="card w-100">
            <div className="card-body">
                <div className="row">
                    <div className="col-md-3" style={{ height: '200px' }}>
                        {showSkeleton ?
                            (
                                <Skeleton height={180} />
                            ) : (
                                <img className="img-fluid h-100" src={image} alt="" />
                            )
                        }

                    </div>
                    <div className="col-md-9 d-flex flex-column justify-content-between">

                        <div>
                            <h4 className="m-b-10">{showSkeleton ? <Skeleton /> : title}</h4>
                            <div className="d-flex align-items-center m-t-5 m-b-15">
                                <span className="text-gray font-weight-semibold">{showSkeleton ? <Skeleton width={100} /> : "Last Updated | "}</span>
                                <span className="text-success font-weight-semibold ml-1">{showSkeleton ? <Skeleton width={70} /> : date}</span>
                            </div>
                            {
                                showSkeleton ? <Skeleton height={60} /> : <p className="m-b-20" dangerouslySetInnerHTML={{ __html: desc }} />
                            }
                        </div>
                        <div>
                            <div className="d-flex justify-content-between align-items-center">
                                <div className='d-flex align-items-center font-weight-semibold'>
                                    <span className='text-success' style={{ fontSize: '18px' }}>{showSkeleton ? <Skeleton width={60} height={26} /> : `₹ ${aPrice}`}</span>
                                    <span className='text-muted ml-1' style={{ textDecoration: 'line-through', fontSize: '12px' }}>{showSkeleton ? <Skeleton width={40} height={20} /> : `₹ ${oPrice}`}</span>
                                </div>
                                {showSkeleton ? (
                                    <Skeleton width={120} height={40} />
                                ) : (
                                    <Link to={goToLink} className="btn btn-success btn-tone  px-3">
                                        <span className="font-weight-semibold">Open Course</span>
                                    </Link>
                                )
                                }
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>

    )
}

export default ListCard
