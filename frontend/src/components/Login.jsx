import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/img/logo.png';
import axios from 'axios';


function Login() {
  let navigate = useNavigate();

  const [data, setData] = useState({
      email : "",
      password : "",
  });

   // Handle Input Change
   const handleChange = (e) => {
    //console.log(e.target.value)
    setData({ ...data, [e.target.name]: e.target.value });
};


  async function login(e) {
    e.preventDefault();
    try {
      const response = await axios.post(`${import.meta.env.VITE_BASEURL}/authentication/login`, data);      
      if(response.data.status == "success"){
        localStorage.setItem("user", JSON.stringify(response.data.data));
        navigate("/dashboard");
      }
      else{
        alert(response.data.message);
      }
  } catch (error) {
      console.error("Error adding Agency:", error);
  }
    // navigate('/dashboard');
  }

  return (
    <>
      <main>
        <div className="container">

          <section className="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-lg-4 col-md-6 d-flex flex-column align-items-center justify-content-center">

                  <div className="d-flex justify-content-center py-4">
                    <a href="index.html" className="logo d-flex align-items-center w-auto text-decoration-none">
                      <img src={logo} />
                      <span className="d-none d-lg-block">ADPRO</span>
                    </a>
                  </div>
                  <div className="card mb-3">

                    <div className="card-body">

                      <div className="pb-2">
                        <h5 className="card-title text-center pb-0 fs-4">Login to Your Account</h5>
                        <p className="text-center small">Enter your username & password to login</p>
                      </div>

                      <div className="row g-3 needs-validation">

                        <div className="col-12">
                          <label for="yourUsername" className="form-label fw-bold">Username</label>
                          <div className="input-group has-validation">
                            <span id="inputGroupPrepend"></span> 
                            {/* className="input-group-text"  */}
                            <input type="text" name="email" onChange={(e)=>{ handleChange(e) }} className="form-control" id="yourUsername" required />
                            <div className="invalid-feedback">Please enter your username.</div>
                          </div>
                        </div>

                        <div className="col-12">
                          <label for="yourPassword" className="form-label fw-bold">Password</label>
                          <input type="password" name="password" onChange={(e)=>{ handleChange(e) }} className="form-control" id="yourPassword" required />
                          <div className="invalid-feedback">Please enter your password!</div>
                        </div>
                        <div className="col-12">
                          <button className="btn btn-primary w-100" onClick={(e) => { login(e); }} type="submit">Login</button>
                        </div>
                        <div className="col-12">
                          <p className="small mb-0">Don't have account? <Link to={"/signup"}>Create an account</Link></p>
                        </div>
                        <div className="col-12">
                          <p className="small mb-0">Forgot password? <Link to={"/forgot-password"}>Recover password</Link></p>
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
      <a href="#" className="back-to-top d-flex align-items-center justify-content-center"><i className="bi bi-arrow-up-short"></i></a>
    </>
  )
}

export default Login