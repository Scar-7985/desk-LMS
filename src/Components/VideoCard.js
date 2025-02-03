import { faCirclePlay } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Link } from 'react-router-dom'

const VideoCard = ({ image, title, update_on, goToLink }) => {
  return (

    <div class="card">
      <div className='relative'>
        <img class="card-img-top" src={image} style={{ height: '240px' }} alt="" />

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
      <div class="card-body">
        <h4 class="m-t-10">{title}</h4>
        <p class="m-b-20">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eius, ratione.</p>
        <div class="d-flex align-items-center justify-content-between">
          <p class="m-b-0 text-dark font-weight-semibold font-size-15">Last Updated |
            <span className='text-success' style={{ fontSize: '12px' }}> {update_on}</span>
          </p>
          <button class="btn btn-secondary btn-tone" onClick={goToLink}>
            Play Video
          </button>
        </div>
      </div>
    </div>
  )
}

export default VideoCard
