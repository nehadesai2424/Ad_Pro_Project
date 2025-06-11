// import React from 'react'

// function ForgotPassword() {
//   return (
//     <>

//     </>
//   )
// }

// export default ForgotPassword

import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/img/logo.png'; // adjust the path as needed

const ForgotPassword = ({ handleChange, handleSendSMS }) => {
  return (
    <main>
      <div className="container">
        <section className="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-4 col-md-6 d-flex flex-column align-items-center justify-content-center">

                <div className="d-flex justify-content-center py-4">
                  <a href="/" className="logo d-flex align-items-center w-auto text-decoration-none">
                    <img src={logo} alt="Logo" />
                    <span className="d-none d-lg-block">ADPRO</span>
                  </a>
                </div>

                <div className="card mb-3">
                  <div className="card-body">
                    <div className="pb-2">
                      {/* <div className="d-flex justify-content-center py-4">
                        <a href="/" className="logo d-flex align-items-center w-auto text-decoration-none">
                          <img src={logo} alt="Logo" />
                          <span className="d-none d-lg-block">ADPRO</span>
                        </a>
                      </div> */}
                      <h5 className="card-title text-center pb-0 fs-4">Forgot Password</h5>
                      <p className="text-center mb-4 small">Enter your registered mobile number to receive password via SMS</p>
                    </div>

                    <div className="row g-3 needs-validation">
                      <div className="col-12">
                        <label htmlFor="mobile" className="form-label fw-bold">Registered Mobile No</label>
                        <input
                          type="text"
                          name="mobile"
                          placeholder="Your registered mobile no"
                          onChange={handleChange}
                          className="form-control mb-2"
                          id="mobile"
                          required
                        />
                        <div className="invalid-feedback">Please enter your registered mobile number.</div>
                      </div>

                      <div className="col-12">
                        <button
                          className="btn btn-primary w-100"
                          onClick={handleSendSMS}
                          type="button"
                        >
                          Get Password via SMS
                        </button>
                      </div>

                      <div className="col-12">
                        <p className="small mb-0">Back to login? <Link to="/">Go to Login</Link></p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* <div className="credits">
                  Designed by <a href="https://igaptechnologies.com/">iGAP Technologies</a>
                </div> */}

              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default ForgotPassword;

