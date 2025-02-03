import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faReceipt } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import { SITE_URL } from '../Auth/Define'
import Skeleton from 'react-loading-skeleton'

const LegalTerms = () => {

  const [termCondition, setTermsCondition] = useState(null)



  useEffect(() => {
    const fetchTermsCondition = async () => {
      try {
        const response = await axios.get(`${SITE_URL}new/app/api/terms-and-conditions.php`);
        const data = response.data;
        setTermsCondition(data);
      } catch (error) {
      }
    }

    fetchTermsCondition();
  }, [])

  return (
    <>
      <div className="col-md-12 my-3">
        <div className="card">
          <div className="card-body">

            <div className="d-flex justify-content-between">
              <div className="media align-items-center justify-content-between">
                <div className="avatar avatar-lg avatar-image avatar-blue rounded" style={{ display: 'grid', placeItems: 'center' }}>
                  <FontAwesomeIcon icon={faReceipt} style={{ fontSize: '26px' }} />
                </div>
                <div className="m-l-10">
                  <h2 className="m-b-0">Terms & Conditions</h2>
                </div>
              </div>
            </div>

            <div className="m-t-40">
              {
                termCondition ?
                  (
                    <p dangerouslySetInnerHTML={{ __html: termCondition.legalterms }} />
                  )
                  : (
                    <>
                      <Skeleton width={"20%"} height={30} />
                      <Skeleton width={"30%"} height={20} style={{ marginTop: '16px' }} />
                      <Skeleton height={400} style={{ marginTop: '16px' }} />
                    </>
                  )
              }
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default LegalTerms
