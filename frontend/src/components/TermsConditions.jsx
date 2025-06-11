import React from 'react';
import logo from '../assets/img/logo.png'; // adjust path if needed
import { Link } from 'react-router-dom';

function TermsAndConditions() {
  return (
    <main>
      <div className="container">
        <section className="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-8 col-md-10 d-flex flex-column align-items-center justify-content-center">

                <div className="d-flex justify-content-center py-4">
                  <Link to="/" className="logo d-flex align-items-center w-auto text-decoration-none">
                    <img src={logo} alt="ADPRO Logo" />
                    <span className="d-none d-lg-block">ADPRO</span>
                  </Link>
                </div>

                <div className="card mb-3 w-100">
                  <div className="card-body">
                    <div className="pb-2">
                      <h5 className="card-title text-center pb-0 fs-4">Terms and Conditions</h5>
                      <p className="text-center small">Please read the terms carefully before registering your agency.</p>
                    </div>

                    <div className="terms-content" style={{ maxHeight: "60vh", overflowY: "auto" }}>
                      <p>By registering your agency on this platform, you agree to the following terms:</p>
                      <ul>
                        <li>All information provided must be accurate and truthful.</li>
                        <li>You are responsible for protecting your login credentials and account access.</li>
                        <li>You agree to use this platform in compliance with all applicable laws and regulations.</li>
                        <li>We reserve the right to suspend or terminate accounts found to be misused or fraudulent.</li>
                        <li>You consent to receiving communications regarding your account and platform updates.</li>
                        <li>We may update these terms at any time without prior notice. It is your responsibility to review them periodically.</li>
                        <li>Any violation of the terms may result in legal action or account termination.</li>
                      </ul>
                      <p>For questions or further clarification, please contact our support team.</p>
                    </div>

                    <div className="text-center mt-4">
                      <Link to="/signup" className="btn btn-primary">
                        Back to Registration
                      </Link>
                    </div>

                  </div>
                </div>

              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

export default TermsAndConditions;
