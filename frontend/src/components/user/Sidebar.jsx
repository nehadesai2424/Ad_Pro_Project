import React from 'react'
import { Link, useNavigate } from 'react-router-dom';

function Sidebar() {
  let navigate = useNavigate();

  function logout(e){
    e.preventDefault();
    localStorage.clear();
    navigate("/");
  }

  return (
    <>
      <aside id="sidebar" class="sidebar">
        <ul class="sidebar-nav" id="sidebar-nav">
          <li class="nav-item">
            <Link class="nav-link collapsed " to={"/dashboard"}>
              <i class="bi bi-grid"></i>
              <span>Dashboard</span>
            </Link>
          </li>

          <li class="nav-item">
            <Link class="nav-link collapsed " to={"/mywork"}>
              <i class="bi bi-calendar"></i>
              <span>My Work</span>
            </Link>
          </li>

          <li class="nav-item">
            <a
              class="nav-link collapsed"
              data-bs-target="#components-nav"
              data-bs-toggle="collapse"
              href="#"
            >
              <i class="bi bi-menu-button-wide"></i>
              <span>Masters</span>
              <i class="bi bi-chevron-down ms-auto"></i>
            </a>
            <ul
              id="components-nav"
              class="nav-content collapse"
              data-bs-parent="#sidebar-nav"
            >
              <li>
                <Link to={"/masters/employees"} className='text-decoration-none'>
                  <i class="bi bi-circle"></i>
                  <span>Employees</span>
                </Link>
              </li>
              <li>
                <Link to={"/masters/clients"} className='text-decoration-none'>
                  <i class="bi bi-circle"></i>
                  <span>Clients</span>
                </Link>
              </li>
              <li>
                <Link to={"/masters/pmedia"} className='text-decoration-none'>
                  <i class="bi bi-circle"></i>
                  <span>P-media</span>
                </Link>
              </li>
              <li>
                <Link to={"/masters/emedia"} className='text-decoration-none'>
                  <i class="bi bi-circle"></i>
                  <span>E-media</span>
                </Link>
              </li>
              <li>
                <Link to={"/masters/holidays"} className='text-decoration-none' >
                  <i class="bi bi-circle"></i>
                  <span>Holidays</span>
                </Link>
                <Link to={"/masters/gst-tax-planning"} className='text-decoration-none'>
                  <i class="bi bi-circle"></i>
                  <span>GST Tax Planning</span>
                </Link>
              </li>
            </ul>
          </li>
          <li class="nav-item">
            <Link class="nav-link  collapsed" to={"/e-media-ro"}>
              <i class="bi bi-pencil-square"></i>
              <span>E-Media RO</span>
            </Link>
          </li>
          <li class="nav-item">
            <Link class="nav-link collapsed" to={"/p-media-ro"}>
              <i class="bi bi-pencil-square"></i>
              <span>P-Media RO</span>
            </Link>
          </li>
          <li class="nav-item">
            <Link class="nav-link collapsed " to={"/design-print-invoices"}>
              <i class="bi bi-pencil-square"></i>
              <span>Design & Printing Invoices</span>
            </Link>
          </li>
          <li class="nav-item">
            <Link class="nav-link collapsed " to={"/ad-schedular"}>
              <i class="bi bi-calendar"></i>
              <span>Ad Schedular</span>
            </Link>
          </li>
          <li class="nav-item">
            <Link class="nav-link collapsed " to={"/work-schedular"}>
              <i class="bi bi-calendar"></i>
              <span>Work Schedular</span>
            </Link>
          </li>

          {/*  */}
          <li class="nav-item">
            <a class="nav-link collapsed" data-bs-target="#financial-nav" data-bs-toggle="collapse" href="#">
              <i class="bi bi-layout-text-window-reverse"></i><span> Financial Reports</span><i class="bi bi-chevron-down ms-auto"></i>
            </a>
            <ul id="financial-nav" class="nav-content collapse " data-bs-parent="#sidebar-nav">
              <li>
                <Link class="nav-link collapsed " to={"/financial-reports/e-media-ro-list"}>
                  <i class="bi bi-circle"></i>
                  <span>E-Media RO List</span>
                </Link>
              </li>
              <li>
                <Link class="nav-link collapsed " to={"/financial-reports/p-media-ro-list"}>
                  <i class="bi bi-circle"></i>
                  <span>P-Media RO List</span>
                </Link>
              </li>

              <li>
                <Link class="nav-link collapsed " to={"/financial-reports/design-print-report"}>
                  <i class="bi bi-circle"></i>
                  <span>Design & Printing Invoices</span>
                </Link>
              </li>

            </ul>
          </li>

          <li class="nav-item">
            <a class="nav-link collapsed" data-bs-target="#general-nav" data-bs-toggle="collapse" href="#">
              <i class="bi bi-layout-text-window-reverse"></i><span>General Reports</span><i class="bi bi-chevron-down ms-auto"></i>
            </a>
            <ul id="general-nav" class="nav-content collapse " data-bs-parent="#sidebar-nav">
              <li>
                <Link to={"/general-reports/employee-work"} className='text-decoration-none'>
                  <i class="bi bi-circle"></i>
                  <span>Employee Work</span>
                </Link>
              </li>
              <li>
                <Link to={"/general-reports/client-list"} className='text-decoration-none'>
                  <i class="bi bi-circle"></i>
                  <span>Client List</span>
                </Link>
              </li>
              <li>
                <Link to={"/general-reports/client-ads"} className='text-decoration-none'>
                  <i class="bi bi-circle"></i>
                  <span>Client Ads</span>
                </Link>
              </li>
              <li>
                <Link to={"/general-reports/holidays-list"} className='text-decoration-none'>
                  <i class="bi bi-circle"></i>
                  <span>Holidays List</span>
                </Link>
              </li>
            </ul>
          </li>

          <li class="nav-item">
            <Link class="nav-link collapsed" onClick={(e) => { logout(e); }}>
            <i class="bi bi-box-arrow-right fs-5"></i>
              <span>Logout</span>
            </Link>
          </li>
        </ul>
      </aside>
    </>
  )
}

export default Sidebar