import React, { useEffect, useState } from 'react';
import logo from '../assets/img/logo.png';
import axios from 'axios';

function Register() {

  // to get state data
  const [state, setState] = useState([]);
  useEffect(() => {
    axios.get(import.meta.env.VITE_BASEURL + "/states")
      .then((res) => {
        // console.log(res.data);
        setState(res.data);
      })
  }, [])

  //to post data
  const [agency, setAgency] = useState({
    name: "",
    address: "",
    city: "",
    district: "",
    stateId: "",
    ownername: "",
    contact: "",
    email: ""
  });

  // Handle Input Change
  const handleChangeAgencyData = (e) => {
    //console.log(e.target.value)
    setAgency({ ...agency, [e.target.name]: e.target.value });
  };


  // Handle Form Submission (Save Or Update)
  const handleSubmitAgencyData = async (e) => {
    e.preventDefault();

    // if (!id) {
    try {
      const response = await axios.post(`${import.meta.env.VITE_BASEURL}/authentication/register`, agency);
      if (response.data.status == "success") {
        alert(response.data.message);
        setAgency({ name: "", address: "", city: "", district: "", stateId: "", ownername: "", contact: "", email: "", logopath: "", signaturepath: "", stamppath: "" }); // Clear form
      }
      else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error("Error adding Agency:", error);
    }
    // } 
  };

  return (
    <>
      <main>
        <div className="container">
          <section className="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-lg-7 col-md-9 d-flex flex-column align-items-center justify-content-center"> {/* Increased width */}

                  <div className="d-flex justify-content-center py-4">
                    <a href="index.html" className="logo d-flex align-items-center w-auto text-decoration-none">
                      <img src={logo} alt="ADPRO Logo" />
                      <span className="d-none d-lg-block">ADPRO</span>
                    </a>
                  </div>

                  <div className="card mb-3 w-100"> {/* Make the card take full width */}
                    <div className="card-body">
                      <div className="pb-2">
                        <h5 className="card-title text-center pb-0 fs-4">Create an Account</h5>
                        <p className="text-center small">Enter agency details to register</p>
                      </div>

                      <form onSubmit={handleSubmitAgencyData} className="row g-3 needs-validation" required>
                        <div className="col-md-6">
                          <label className="form-label fw-bold">Agency Name <span class="text-danger">*</span></label>
                          <input onChange={handleChangeAgencyData} value={agency.name} name="name" type="text" className="form-control" required />
                          <div className="invalid-feedback">Please enter the agency name!</div>
                        </div>

                        <div className="col-md-6">
                          <label className="form-label fw-bold">Address <span class="text-danger">*</span></label>
                          <input onChange={handleChangeAgencyData} value={agency.address} name="address" type="text" className="form-control" required />
                          <div className="invalid-feedback">Please enter the address!</div>
                        </div>

                        <div className="col-md-6">
                          <label className="form-label fw-bold">City <span class="text-danger">*</span></label>
                          <input onChange={handleChangeAgencyData} value={agency.city} name="city" type="text" className="form-control" required />
                          <div className="invalid-feedback">Please enter the city!</div>
                        </div>

                        <div className="col-md-6">
                          <label className="form-label fw-bold">District <span class="text-danger">*</span></label>
                          <input onChange={handleChangeAgencyData} value={agency.district} name="district" type="text" className="form-control" required />
                          <div className="invalid-feedback">Please enter the district!</div>
                        </div>

                        <div className="col-md-6">
                          <label className="form-label fw-bold">State <span class="text-danger">*</span></label>
                          <select onChange={handleChangeAgencyData} value={agency.stateId} name="stateId" className="form-select" required>
                            <option value={""} selected disabled>Select State</option>
                            {
                              state.map((state) => {
                                //console.log(roleData);
                                return (
                                  <option key={state.id} value={state.id}> {state.name} </option>
                                )
                              })
                            }
                          </select>
                          <div className="invalid-feedback">Please select a state!</div>
                        </div>

                        {/* <div className="col-md-6">
                          <label className="form-label fw-bold">GST Number <span class="text-danger">*</span></label>
                          <input onChange={handleChangeAgencyData} value={agency.gstNo} name="gstNo" type="text" className="form-control" required />
                          <div className="invalid-feedback">Please enter GST number!</div>
                        </div> */}

                        <div className="col-md-6">
                          <label className="form-label fw-bold">Owner Name <span class="text-danger">*</span></label>
                          <input onChange={handleChangeAgencyData} value={agency.ownername} name="ownername" type="text" className="form-control" required />
                          <div className="invalid-feedback">Please enter the owner's name!</div>
                        </div>

                        <div className="col-md-6">
                          <label className="form-label fw-bold">Contact Number <span class="text-danger">*</span></label>
                          <input onChange={handleChangeAgencyData} value={agency.contact} name="contact" type="text" className="form-control" required />
                          <div className="invalid-feedback">Please enter a valid contact number!</div>
                        </div>

                        <div className="col-md-6">
                          <label className="form-label fw-bold">Email <span class="text-danger">*</span></label>
                          <input onChange={handleChangeAgencyData} value={agency.email} type="email" name="email" className="form-control" required />
                          <div className="invalid-feedback">Please enter a valid email address!</div>
                        </div>

                        <div className="col-12">
                          <div className="form-check">
                            <input className="form-check-input" name="terms" type="checkbox" id="acceptTerms" required />
                            {/* <label className="form-check-label" htmlFor="acceptTerms">
                              I agree and accept the <a href="/terms-conditions">terms and conditions</a>
                            </label> */}
                            <label className="form-check-label" htmlFor="acceptTerms">
                              I agree and accept the <a href="#" data-bs-toggle="modal" data-bs-target="#termsModal">terms and conditions</a>
                            </label>

                            <div className="invalid-feedback">You must agree before submitting.</div>
                          </div>
                        </div>

                        <div className="col-12">
                          <button className="btn btn-primary w-100" type="submit"> Create Agency Account</button>
                        </div>

                        <div className="col-12 text-center">
                          <p className="small mb-0">Already registered? <a href="/">Log in</a></p>
                        </div>
                      </form>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Terms and Conditions Modal */}
        <div className="modal fade" id="termsModal" tabIndex="-1" aria-labelledby="termsModalLabel" aria-hidden="true">
          <div className="modal-dialog modal-dialog-scrollable">
            <div className="modal-content">
              <div className="modal-header">
                <div className="w-100 text-center">
                  <h5 className="modal-title" id="termsModalLabel">Terms and Conditions</h5>
                </div>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <p className='fw-bold'>By registering your agency, you agree to the following terms :</p>
                <ul>
                  <li>You confirm that all provided information is accurate and up to date.</li>
                  <li>You are responsible for maintaining the confidentiality of your login credentials.</li>
                  <li>You will comply with all applicable laws and regulations.</li>
                  <li>We reserve the right to suspend or terminate your account for any misuse or false information.</li>
                  <li>You consent to receive email/SMS updates related to your agency account.</li>
                  <li>Terms may be updated at any time without prior notice.</li>
                </ul>
                <p>For detailed terms or inquiries, please contact support or visit our official website.</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Close</button>
              </div>
            </div>
          </div>
        </div>

      </main>
    </>
  );
}

export default Register;
