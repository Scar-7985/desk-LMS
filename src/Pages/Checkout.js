import React from 'react'

const Checkout = () => {

  return (
    <div className="main-content p-2">
      <div className="card">
        <div className="card-body">
          <div className="row">
            <div className="col-lg-8">
              <form>
                <h3>Billing Address</h3>
                <div className="form-group">
                  <label for="formGroupExampleInput">Name</label>
                  <input type="text" className="form-control" id="formGroupExampleInput" placeholder="Enter your name" />
                </div>
                <div className="form-group">
                  <label for="formGroupExampleInput2">Email</label>
                  <input type="text" className="form-control" id="formGroupExampleInput2" placeholder="Enter your email" />
                </div>
                <div className="form-group">
                  <label for="formGroupExampleInput2">Address</label>
                  <textarea className="form-control" id="formGroupExampleInput2" placeholder="Enter your address" rows={3} />
                </div>
                <hr />
                <h2>Payment</h2>

                <div className="row">

                  <div className="col-sm-10">
                    <div className="radio">
                      <input type="radio" name="gridRadios" id="gridRadios1" value="option1" checked />
                      <label for="gridRadios1">
                        Credit card
                      </label>
                    </div>
                    <div className="radio">
                      <input type="radio" name="gridRadios" id="gridRadios2" value="option2" />
                      <label for="gridRadios2">
                        Debit card
                      </label>
                    </div>
                    <div className="radio">
                      <input type="radio" name="gridRadios" id="gridRadios3" value="option3" />
                      <label for="gridRadios3">
                        Paypal
                      </label>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="form-group col-6">
                    <label for="formGroupExampleInput2">Name on card</label>
                    <input type="text" className="form-control" id="formGroupExampleInput2" placeholder="Another input" />
                  </div>
                  <div className="form-group col-6">
                    <label for="formGroupExampleInput2">Credit card number</label>
                    <input type="text" className="form-control" id="formGroupExampleInput2" placeholder="Another input" />
                  </div>
                </div>
                <div className="row">
                  <div className="form-group col-4">
                    <label for="formGroupExampleInput2">Expiration</label>
                    <input type="text" className="form-control" id="formGroupExampleInput2" placeholder="Another input" />
                  </div>
                  <div className="form-group col-4">
                    <label for="formGroupExampleInput2">CVV</label>
                    <input type="text" className="form-control" id="formGroupExampleInput2" placeholder="Another input" />
                  </div>

                </div>
                <hr />

                <button className="btn btn-primary w-100">Continue to chechout</button>

              </form>
            </div>
            <div className="col-lg-4">

              <div className="card border-0" style={{ position: 'sticky', top: '80px' }}>
                <img className="card-img-top img-fluid pb-4" src="/assets/images/others/img-8.jpg" alt="" />
                <div className="card-body border-radius-10 py-2 px-0" style={{ border: '1px solid #d1d0d0' }}>

                  <div className="col-12 d-flex justify-content-between align-items-center px-2 py-2">
                    <p className="m-b-0 text-dark font-weight-semibold font-size-18">HTML+CSS</p>
                    <p className="m-b-0">
                      <span className=' text-dark font-weight-semibold font-size-18 text-success'>₹ 399</span>
                      <span style={{ textDecoration: 'line-through' }} className="text-muted font-weight-normal font-size-12 ml-2">₹ 499</span>
                    </p>
                  </div>
                  <div className="col-12 d-flex justify-content-between align-items-center px-2 py-2" style={{ backgroundColor: '#e5f9f6' }}>
                    <p className="m-b-0 text-dark font-weight-semibold font-size-14">Discount</p>
                    <p className="m-b-0 text-dark font-weight-semibold font-size-15 text-success">- ₹ 50</p>
                  </div>

                  <div className="col-12 d-flex justify-content-between align-items-center px-2 py-2">
                    <p className="m-b-0 text-dark font-weight-semibold font-size-15">Total(₹)</p>
                    <span className='text-success font-weight-semibold font-size-20'>₹ 349</span>
                  </div>

                </div>

                <div className="p-2 ounded-lg border-radius-10 mt-2" style={{ border: '1px solid #d1d0d0' }}>
                  <div className="d-flex align-items-center justify-content-between">
                    <input type="text" placeholder="Promo code" className="form-control"
                      style={{ borderTopRightRadius: '0', borderBottomRightRadius: '0' }} />
                    <button className="btn btn-secondary btn-tone" style={{ borderTopLeftRadius: '0', borderBottomLeftRadius: '0' }}>Redeem</button>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Checkout
