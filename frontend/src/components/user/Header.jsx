import React, { useEffect, useState } from 'react'
import logo from '../../assets/img/logo.png';
import profile from '../../assets/img/profile-img.jpg';
import { useNavigate } from 'react-router';


function Header() {

  let navigate = useNavigate();

  let [user, setUser] = useState({});

  useEffect(() => {
    if (localStorage.getItem("user") == null) {
      navigate("/");
    }
    setUser(JSON.parse(localStorage.getItem("user")));
  }, []);


  function logout(e) {
    e.preventDefault();
    localStorage.clear();
    navigate("/");
  }

  return (
    <>
      {/* <!-- ======= Header ======= --> */}
      <header id="header" class="header fixed-top d-flex align-items-center">

        <div class="d-flex align-items-center justify-content-between">
          <a href="index.html" class="logo d-flex align-items-center text-decoration-none">
            <img src={logo} alt="" />
            <span class="d-none d-lg-block">ADPRO</span>
          </a>
          <i class="bi bi-list toggle-sidebar-btn"></i>
        </div>
        {/* <!-- End Logo --> */}

        <div class="mx-3 mt-3">
          <h5 className='fw-bold' style={{color:"#012970"}}> Agency : {user.agencyname}</h5>
        </div>
        {/* <!-- End Search Bar --> */}

        <nav class="header-nav ms-auto">
          <ul class="d-flex align-items-center">

            <li class="nav-item d-block d-lg-none">
              <a class="nav-link nav-icon search-bar-toggle " href="#">
                <i class="bi bi-search"></i>
              </a>
            </li>
            {/* <!-- End Search Icon--> */}

            <li class="nav-item dropdown">

              <a class="nav-link nav-icon" href="#" data-bs-toggle="dropdown">
                <i class="bi bi-bell"></i>
                <span class="badge bg-primary badge-number">4</span>
              </a>


            </li>
            {/* <!-- End Notification Nav --> */}

            <li class="nav-item dropdown">

              <a class="nav-link nav-icon" href="#" data-bs-toggle="dropdown">
                <i class="bi bi-chat-left-text"></i>
                <span class="badge bg-success badge-number">3</span>
              </a>
              {/* <!-- End Messages Icon --> */}


            </li>
            {/* <!-- End Messages Nav --> */}

            <li class="nav-item dropdown pe-3">

              <a class="nav-link nav-profile d-flex align-items-center pe-0" href="#" data-bs-toggle="dropdown">
                <img src={profile} alt="Profile" class="rounded-circle" />
                <span class="d-none d-md-block dropdown-toggle ps-2">{user.name}</span>
              </a>
              {/* <!-- End Profile Iamge Icon --> */}

              <ul class="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile">
                <li class="dropdown-header">
                  <h6>{user.name}</h6>
                  <span>{user.rolename}</span>
                </li>
                <li>
                  <hr class="dropdown-divider" />
                </li>

                <li>
                  <a class="dropdown-item d-flex align-items-center" href="">
                    <i class="bi bi-person"></i>
                    <span>My Profile</span>
                  </a>
                </li>
                <li>
                  <hr class="dropdown-divider" />
                </li>

                <li>
                  <a class="dropdown-item d-flex align-items-center" href="">
                    <i class="bi bi-gear"></i>
                    <span>Account Settings</span>
                  </a>
                </li>
                <li>
                  <hr class="dropdown-divider" />
                </li>

                <li>
                  <a class="dropdown-item d-flex align-items-center" href="">
                    <i class="bi bi-question-circle"></i>
                    <span>Need Help?</span>
                  </a>
                </li>
                <li>
                  <hr class="dropdown-divider" />
                </li>

                <li>
                  <span style={{ cursor: "pointer" }} class="dropdown-item d-flex align-items-center" onClick={(e) => { logout(e) }}>
                    <i class="bi bi-box-arrow-right"></i>
                    <span>Sign Out</span>
                  </span>
                </li>

              </ul>
              {/* <!-- End Profile Dropdown Items --> */}
            </li>
            {/* <!-- End Profile Nav --> */}

          </ul>
        </nav>
        {/* <!-- End Icons Navigation --> */}

      </header>
      {/* <!-- End Header --> */}
    </>
  )
}

export default Header