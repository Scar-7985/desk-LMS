import { faCirclePlay } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

const VideoCard = ({ image, title, update_on, goToLink }) => {
  return (

    <div
      onClick={goToLink}
      className="card"
      style={{ cursor: 'pointer' }}>
      <div className='relative'>
        <img className="card-img-top" src={image} style={{ height: '280px' }} alt="" />

        <div className='absolute'
          style={{
            left: '0', top: '0', right: '0', bottom: '0',
            width: '100%', height: '100%',
            display: 'grid', placeItems: 'center'
          }}>
          <span className='px-4 py-2 rounded' style={{ background: 'rgba(0,0,0,.3)', cursor: 'pointer' }}>
            <FontAwesomeIcon icon={faCirclePlay} className='text-white' style={{ fontSize: '30px' }} />
          </span>
        </div>
      </div>
      <div className="card-body">
        <h4 className="m-t-10">{title}</h4>
        <p className="m-b-20">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eius, ratione.</p>
        <div className="d-flex align-items-center justify-content-between">
          <p className="m-b-0 text-dark font-weight-semibold font-size-15">Last Updated |
            <span className='text-success' style={{ fontSize: '12px' }}> {update_on}</span>
          </p>
          <button className="btn btn-secondary btn-tone">
            Play Video
          </button>
        </div>
      </div>
    </div>
  )
}

export default VideoCard
