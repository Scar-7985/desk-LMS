import React from 'react'
import Skeleton from 'react-loading-skeleton'
import { Link } from 'react-router-dom'

const DetailPage = ({ image, o_price, a_price, duration, update_on, program_name, program_desc, videoList, pdfList, goToQuiz, status, goToWatch, goToBuy, showSkeleton = false }) => {
    return (
        <div className="main-content p-2">

            <div className="card">
                <div className="card-body">

                    <div className='row gap-2'>
                        <div className='col-lg-8'>
                            {
                                showSkeleton
                                    ? <Skeleton height={"460px"} />
                                    : <img src={image} alt="imaged" className="card-img-top" style={{ height: '460px', }} />
                            }
                        </div>
                        <div className="tab-content col-lg-4 d-flex flex-column justify-content-between mt-4 mt-lg-0">
                            {/* ============================ */}
                            {
                                showSkeleton
                                    ? <Skeleton height={"150px"} />
                                    : <div className="d-flex flex-column align-items-start justify-content-between">
                                        <div className="m-b-0 text-dark font-weight-semibold d-flex justify-content-between align-items-center w-100">
                                            <div className='d-flex justify-content-between' style={{ width: '60%' }}>
                                                <h3 className="font-weight-bold" style={{ wordBreak: 'break-word' }}>{showSkeleton ? <Skeleton width={300} height={30} /> : program_name}</h3>
                                            </div>
                                            <div className='' >
                                                <span className='text-success' style={{ fontSize: '24px' }}>{`₹ ${o_price}`}</span>
                                                <span className='text-muted ml-1' style={{ textDecoration: 'line-through', fontSize: '14px' }}>{`₹ ${a_price}`}</span>
                                            </div>

                                        </div>

                                        <div className='d-flex flex-column'>
                                            <h6 className='mb-0'>Duration: <span className='text-success'>{duration} Months</span></h6>
                                            <h6>Last Updated | <span className='text-success' style={{ fontSize: '12px' }}>{update_on}</span></h6>
                                        </div>
                                    </div>
                            }


                            {
                                showSkeleton
                                    ? <Skeleton height={180} width={240} />
                                    : <div className="d-flex flex-column mt-2">
                                        <h3 className='font-weight-bold mb-0'>What you'll learn :</h3>
                                        <div className="m-b-5 mt-2">
                                            <i className="anticon anticon-check text-success"></i>
                                            <span className='m-l-10'>Selector, flex, grid, animation etc</span>
                                        </div>
                                        <div className="m-b-5">
                                            <i className="anticon anticon-check text-success"></i>
                                            <span className='m-l-10'>Advanced css, media query </span>
                                        </div>
                                        {
                                            [0, 1, 2, 3,].map((index) => {
                                                return (
                                                    <div className="m-b-5" key={index}>
                                                        <i className="anticon anticon-check text-success"></i>
                                                        <span className='m-l-10'>Irish skinny grinder affogato</span>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                            }

                            <div className='d-flex flex-column gap-2 mt-3'>
                                {
                                    showSkeleton
                                        ? (
                                            <>

                                                <Skeleton className='btn' />
                                                <Skeleton className='btn mt-1' />
                                            </>
                                        ) : (
                                            <>
                                                {
                                                    status === 0 ? (
                                                        <>
                                                            <button onClick={goToBuy} className='btn btn-success'>Buy Now</button>
                                                            {/* <Link to={goToQuiz} className='btn btn-secondary mt-2'>Play Quiz</Link> */}
                                                        </>

                                                    ) : (
                                                        <>
                                                            <button onClick={goToWatch} className='btn btn-success'>Watch Now</button>
                                                            <button onClick={goToQuiz} className='btn btn-secondary mt-2'>Start Quiz</button>
                                                        </>
                                                    )
                                                }
                                            </>
                                        )
                                }
                            </div>

                            {/* ============================ */}
                        </div>
                    </div>

                    {
                        showSkeleton
                            ? <Skeleton height={100} />
                            : <p className='mt-4 mb-0' dangerouslySetInnerHTML={{ __html: program_desc }} />
                    }

                </div>

            </div>

            <div className="card">
                <div className="card-body">
                    <div className="row">
                        <div className="col-12 col-lg-8">
                            <div className="page-header px-2">
                                <h2 className="header-title">{showSkeleton ? <Skeleton width={140} height={36} /> : "Videos"}</h2>
                            </div>
                            <div className="row">
                                {showSkeleton ? (
                                    <div className="col-12">
                                        <Skeleton width={"100%"} height={400} />
                                    </div>
                                ) : videoList}
                            </div>
                        </div>
                        <div className="col-12 col-lg-4 d-flex flex-column mt-4 mt-lg-0">
                            <div className="page-header px-2">
                                <h2 className="header-title">{showSkeleton ? <Skeleton width={100} height={36} /> : "PDF"}</h2>
                            </div>
                            {showSkeleton ? (
                                <div className="col-12">
                                    <Skeleton width={"100%"} height={400} />
                                </div>) : pdfList
                            }
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default DetailPage
