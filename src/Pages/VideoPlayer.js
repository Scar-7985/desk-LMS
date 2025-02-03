import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { CourseContext } from '../context/CourseContext';
import { SITE_URL } from '../Auth/Define';

const VideoPlayer = () => {

  const { videoData } = useContext(CourseContext);
  const { getVideoId } = useParams();
  const [currentVideoId, setCurrentVideoId] = useState(null);


  useEffect(() => {
    if (getVideoId) {
      setCurrentVideoId(Number(getVideoId));
    } else if (videoData && videoData.length > 0) {
      setCurrentVideoId(videoData[0].id);
    }
  }, [getVideoId, videoData]);

  const currentVideo = videoData?.find((item) => Number(item.id) === Number(currentVideoId));

  const handleRelatedVideoClick = (id) => {
    setCurrentVideoId(id);
  };

  if (!videoData || videoData.length === 0) {
    return <div className="text-center">No videos available.</div>;
  }

  if (!currentVideo) {
    return <div className="text-center">Video not found.</div>;
  }

  const relatedVideos = videoData.filter(
    (item) => Number(item.category) === Number(currentVideo.category) && item.id !== currentVideo.id
  );


  return (
    <>

      <div className="d-flex flex-column " style={{ position: 'relative', display: 'none' }}>
        <div className="bg-white sticky-top" style={{ top: '56px', zIndex: '50' }}>
          <video
            key={currentVideoId}
            id="my-video"
            className="video-js vjs-default-skin img-fluid"
            controls
            preload="auto"
            muted
            style={{ width: '100%', height: '200px', display: 'none' }}
          >
            <source
              src={`${SITE_URL}new/app/upload/video/${currentVideo.video}`}
              type="video/mp4"
            />
          </video>

        </div>

        <div className="d-fle flex-column px-2 d-none" style={{ paddingBottom: '80px', }}>

          {
            relatedVideos.length > 0 ?

              (<>
                <div className='text-center py-2'>More Videos</div>
                {relatedVideos.map((item) => (
                  <div
                    key={item.id}
                    className="card shadow border"
                    onClick={() => handleRelatedVideoClick(item.id)}
                    style={{ cursor: 'pointer' }}
                  >
                    {item.title}
                    {/* <VideoCard
                                            title={item.title}
                                            image={`${SITE_URL}new/app/upload/video_thumb/${item.thumb}`}
                                            alt={`thumbnail`}
                                            category={item.category}
                                            of_price={item.of_price}
                                            ac_price={item.ac_price}
                                        /> */}
                  </div>
                ))}
              </>
              ) : (
                <div className='text-center py-4 d-none'>No more videos available for <br />
                  "{currentVideo.title}"
                </div>
              )
          }
        </div>
      </div>




      <div className="main-content p-2">
        <div className="card">
          <div className="card-body p-3">
            <div className="row">

              <div className="col-8 p-0 d-flex flex-column">
                <div style={{ height: '500px' }}>

                  <video
                    key={currentVideoId}
                    id="my-video"
                    className=""
                    controls
                    preload="auto"
                    muted
                    style={{ width: '100%', height: '100%' }}
                  >
                    <source
                      src={`${SITE_URL}new/app/upload/video/${currentVideo.video}`}
                      type="video/mp4"
                    />
                  </video>
                </div>
                <div className="text-dark border p-2 d-flex flex-column" style={{ fontSize: '14px', fontWeight: '600', backgroundColor: '#F2F2F2' }}>
                  <span>{currentVideo.title}</span>
                  <span className='text-muted'>Category: {currentVideo.category}</span>
                </div>
              </div>

              <div className="col-4">
                <div class="row px-4">
                  {

                    relatedVideos.map((item, i) => {
                      return (
                        <div
                          onClick={() => handleRelatedVideoClick(item.id)}
                          className="card col-12 p-0 shadow mb-2"
                          style={{ cursor: 'pointer' }}
                        >
                          <div className="d-flex align-items-center card-body p-1">
                            <div className="" style={{ position: 'relative', height: '100%' }}>
                              <img src={`${SITE_URL}new/app/upload/video_thumb/${item.thumb}`} alt="" width='100px' className='border-radius-4' />
                              <span className='px-1 text-light bg-dark rounded' style={{ position: 'absolute', bottom: '0', right: '0', opacity: '0.8' }}>30:15</span>
                            </div>
                            <div className="p-l-15">
                              <div className="m-b-0 font-weight-semibold font-size-16">{item.video}</div>
                              <p className="msg-overflow m-b-0 text-muted font-size-12">
                                Wow, that was cool!
                              </p>
                            </div>
                          </div>

                        </div>
                      )
                    })
                  }

                </div>
              </div>
            </div>

          </div>
        </div>
      </div>


    </>
  );
};

export default VideoPlayer;