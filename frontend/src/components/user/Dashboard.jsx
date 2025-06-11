import React from 'react'
import { Link } from 'react-router-dom';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// Registering necessary components from Chart.js
ChartJS.register(ArcElement, Tooltip, Legend);


function Dashboard() {

  // Sample data for the donut charts
  const data = {
    labels: ['Client Ads', 'Newspaper Ads', 'E-MEDIA R. O.', 'PRESS-MEDIA R. O.'],
    datasets: [
      {
        data: [0.04, 38.05, 74.86, 85.42], // example data, percentages
        backgroundColor: ['#ffcc00', '#36b9cc', '#1cc88a', '#f6c23e'], // colors for each section
        borderWidth: 0,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          font: {
            size: 12,
            weight: 'bold',
          },
        },
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return tooltipItem.label + ': ' + tooltipItem.raw.toFixed(2) + '%';
          },
        },
      },
    },
  };


  return (
    <>
      <main id="main" className="main">
        <div className="pagetitle">
          <h1>Dashboard</h1>
          <nav>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link class="text-decoration-none" to={"/dashboard"}>Home</Link>
              </li>
              <li className="breadcrumb-item active">Dashboard</li>
            </ol>
          </nav>
        </div>

        <div class="container mt-4 border-bottom pb-4 shadow">
          <div class="row g-3 align-items-end">
            {/* <!-- From Date --> */}
            <div class="col-md-3 col-sm-6">
              <label for="fromDate" class="form-label fw-bold">FROM DATE</label>
              <input type="date" class="form-control shadow" id="fromDate" />
            </div>

            {/* <!-- To Date --> */}
            <div class="col-md-3 col-sm-6">
              <label for="toDate" class="form-label fw-bold">TO DATE</label>
              <input type="date" class="form-control shadow" id="toDate" />
            </div>

            {/* <!-- Buttons --> */}
            <div class="col-auto ms-auto">
              <button class="btn btn-primary me-2">Show</button>
              <button class="btn btn-danger">Reset</button>
            </div>
          </div>
        </div>


        {/* --------- */}

        <div class="container pb-4 pt-5">
          <h6 class=" shadow p-2 mb-4 text-uppercase fw-bold">E-Media Financial Status</h6>
          <div class="row g-3">
            {/* <!-- RO Amount --> */}
            <div class="col-md-3">
              <div class="d-flex bg-white border rounded shadow-sm">
                <div class="text-white d-flex align-items-center justify-content-center px-3" style={{ backgroundColor: '#e55683' }} >
                  ₹
                </div>
                <div class="p-2">
                  <small class="text-muted text-uppercase">RO Amount</small><br />
                  <span class="fw-bold text-success">20400131.24</span>
                </div>
              </div>
            </div>

            {/* <!-- Invoice Amount --> */}
            <div class="col-md-3">
              <div class="d-flex bg-white border rounded shadow-sm">
                <div class="text-white d-flex align-items-center justify-content-center px-3" style={{ backgroundColor: '#e55683' }}>
                  ₹
                </div>
                <div class="p-2">
                  <small class="text-muted text-uppercase">Invoice Amount</small><br />
                  <span class="fw-bold text-primary">22637850.58</span>
                </div>
              </div>
            </div>

            {/* <!-- Paid Amount --> */}
            <div class="col-md-3">
              <div class="d-flex bg-white border rounded shadow-sm">
                <div class="text-white d-flex align-items-center justify-content-center px-3" style={{ backgroundColor: '#e55683' }}>
                  ₹
                </div>
                <div class="p-2">
                  <small class="text-muted text-uppercase">Paid Amount</small><br />
                  <span class="fw-bold text-success">10000.00</span>
                </div>
              </div>
            </div>

            {/* <!-- Remaining Amount --> */}
            <div class="col-md-3">
              <div class="d-flex bg-white border rounded shadow-sm">
                <div class=" text-white d-flex align-items-center justify-content-center px-3" style={{ backgroundColor: '#e55683' }}>
                  ₹
                </div>
                <div class="p-2">
                  <small class="text-muted text-uppercase">Remaining Amount</small><br />
                  <span class="fw-bold text-primary">22637850.58</span>
                </div>
              </div>
            </div>

            {/* <!-- Commission Amount --> */}
            <div class="col-md-3">
              <div class="d-flex bg-white border rounded shadow-sm">
                <div class="text-white d-flex align-items-center justify-content-center px-3" style={{ backgroundColor: '#e55683' }}>
                  ₹
                </div>
                <div class="p-2">
                  <small class="text-muted text-uppercase">Commission Amount</small><br />
                  <span class="fw-bold text-success">868744.70</span>
                </div>
              </div>
            </div>

            {/* <!-- E-Media GST --> */}
            <div class="col-md-3">
              <div class="d-flex bg-white border rounded shadow-sm">
                <div class="text-white d-flex align-items-center justify-content-center px-3" style={{ backgroundColor: '#e55683' }}>
                  ₹
                </div>
                <div class="p-2">
                  <small class="text-muted text-uppercase">E-Media GST</small><br />
                  <span class="fw-bold text-success">3066483.46</span>
                </div>
              </div>
            </div>

            {/* <!-- E-Media Client GST --> */}
            <div class="col-md-3">
              <div class="d-flex bg-white border rounded shadow-sm">
                <div class="text-white d-flex align-items-center justify-content-center px-3" style={{ backgroundColor: '#e55683' }}>
                  ₹
                </div>
                <div class="p-2">
                  <small class="text-muted text-uppercase">E-Media Client GST</small><br />
                  <span class="fw-bold text-success">3433861.74</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* ------------------------ */}

        <div class="container py-4">
          <h6 class="shadow p-2 mb-4  text-uppercase fw-bold">P-Media Financial Status</h6>
          <div class="row g-3">
            {/* <!-- RO Amount --> */}
            <div class="col-md-3">
              <div class="d-flex bg-white border rounded shadow-sm">
                <div class="text-white d-flex align-items-center justify-content-center px-3" style={{ backgroundColor: '#3399FF ' }}>
                  ₹
                </div>
                <div class="p-2">
                  <small class="text-muted text-uppercase">RO Amount</small><br />
                  <span class="fw-bold text-success">67394542.40</span>
                </div>
              </div>
            </div>

            {/* <!-- Invoice Amount --> */}
            <div class="col-md-3">
              <div class="d-flex bg-white border rounded shadow-sm">
                <div class="text-white d-flex align-items-center justify-content-center px-3" style={{ backgroundColor: '#3399FF ' }}>
                  ₹
                </div>
                <div class="p-2">
                  <small class="text-muted text-uppercase">Invoice Amount</small><br />
                  <span class="fw-bold text-primary">58128622.78</span>
                </div>
              </div>
            </div>

            {/* <!-- Paid Amount --> */}
            <div class="col-md-3">
              <div class="d-flex bg-white border rounded shadow-sm">
                <div class="text-white d-flex align-items-center justify-content-center px-3" style={{ backgroundColor: '#3399FF ' }}>
                  ₹
                </div>
                <div class="p-2">
                  <small class="text-muted text-uppercase">Paid Amount</small><br />
                  <span class="fw-bold text-success">6048.00</span>
                </div>
              </div>
            </div>

            {/* <!-- Remaining Amount --> */}
            <div class="col-md-3">
              <div class="d-flex bg-white border rounded shadow-sm">
                <div class="text-white d-flex align-items-center justify-content-center px-3" style={{ backgroundColor: '#3399FF ' }}>
                  ₹
                </div>
                <div class="p-2">
                  <small class="text-muted text-uppercase">Remaining Amount</small><br />
                  <span class="fw-bold text-primary">58122574.78</span>
                </div>
              </div>
            </div>

            {/* <!-- Commission Amount --> */}
            <div class="col-md-3">
              <div class="d-flex bg-white border rounded shadow-sm">
                <div class="text-white d-flex align-items-center justify-content-center px-3" style={{ backgroundColor: '#3399FF ' }}>
                  ₹
                </div>
                <div class="p-2">
                  <small class="text-muted text-uppercase">Commission Amount</small><br />
                  <span class="fw-bold text-success">10389085.56</span>
                </div>
              </div>
            </div>

            {/* <!-- P-Media GST --> */}
            <div class="col-md-3">
              <div class="d-flex bg-white border rounded shadow-sm">
                <div class="text-white d-flex align-items-center justify-content-center px-3" style={{ backgroundColor: '#3399FF ' }}>
                  ₹
                </div>
                <div class="p-2">
                  <small class="text-muted text-uppercase">P-Media GST</small><br />
                  <span class="fw-bold text-success">3217006.10</span>
                </div>
              </div>
            </div>

            {/* <!-- P-Media Client GST --> */}
            <div class="col-md-3">
              <div class="d-flex bg-white border rounded shadow-sm">
                <div class="text-white d-flex align-items-center justify-content-center px-3" style={{ backgroundColor: '#3399FF ' }}>
                  ₹
                </div>
                <div class="p-2">
                  <small class="text-muted text-uppercase">P-Media Client GST</small><br />
                  <span class="fw-bold text-success">2750077.17</span>
                </div>
              </div>
            </div>
          </div>
        </div>


        {/* ------------------- */}

        <div class="container py-4">
          <h6 class="shadow p-2 mb-4 text-uppercase fw-bold">Invoice Financial Status</h6>
          <div class="row g-3">
            {/* <!-- Invoice Amount --> */}
            <div class="col-md-3">
              <div class="d-flex bg-white border rounded shadow-sm">
                <div class="bg-danger text-white d-flex align-items-center justify-content-center px-3">
                  ₹
                </div>
                <div class="p-2">
                  <small class="text-muted text-uppercase">Invoice Amount</small><br />
                  <span class="fw-bold text-primary">14364829.93</span>
                </div>
              </div>
            </div>

            {/* <!-- Paid Amount --> */}
            <div class="col-md-3">
              <div class="d-flex bg-white border rounded shadow-sm">
                <div class="bg-danger text-white d-flex align-items-center justify-content-center px-3">
                  ₹
                </div>
                <div class="p-2">
                  <small class="text-muted text-uppercase">Paid Amount</small><br />
                  <span class="fw-bold text-success">11376.00</span>
                </div>
              </div>
            </div>

            {/* <!-- Remaining Amount --> */}
            <div class="col-md-3">
              <div class="d-flex bg-white border rounded shadow-sm">
                <div class="bg-danger text-white d-flex align-items-center justify-content-center px-3">
                  ₹
                </div>
                <div class="p-2">
                  <small class="text-muted text-uppercase">Remaining Amount</small><br />
                  <span class="fw-bold text-primary">14353453.93</span>
                </div>
              </div>
            </div>

            {/* <!-- Invoice GST Amount --> */}
            <div class="col-md-3">
              <div class="d-flex bg-white border rounded shadow-sm">
                <div class="bg-danger text-white d-flex align-items-center justify-content-center px-3">
                  ₹
                </div>
                <div class="p-2">
                  <small class="text-muted text-uppercase">Invoice GST Amount</small><br />
                  <span class="fw-bold text-primary">1934890.80</span>
                </div>
              </div>
            </div>
          </div>
        </div>


        {/* ------------------------------------ */}
        <div className="container mt-4">
          <div className="row">
            {/* Client Ads(%) */}
            <div className="col-md-6 mb-4">
              <div className="border p-2 text-center">
                <div className="fw-bold small mb-2">Client Ads(%)</div>
                <div className="bg-white p-3 shadow-sm d-flex justify-content-center">
                  <div style={{ width: '250px', height: '250px' }}>
                    <Doughnut data={data} options={options} />
                  </div>
                </div>
              </div>
            </div>

            {/* Newspaper Ads(%) */}
            <div className="col-md-6 mb-4">
              <div className="border p-2 text-center">
                <div className="fw-bold small mb-2">Newspaper Ads(%)</div>
                <div className="bg-white p-3 shadow-sm d-flex justify-content-center">
                  <div style={{ width: '250px', height: '250px' }}>
                    <Doughnut data={data} options={options} />
                  </div>
                </div>
              </div>
            </div>

            {/* E-MEDIA R. O.(%) */}
            <div className="col-md-6 mb-4">
              <div className="border p-2 text-center">
                <div className="fw-bold small mb-2">E-MEDIA R. O.(%)</div>
                <div className="bg-white p-3 shadow-sm d-flex justify-content-center">
                  <div style={{ width: '250px', height: '250px' }}>
                    <Doughnut data={data} options={options} />
                  </div>
                </div>
              </div>
            </div>

            {/* PRESS-MEDIA R. O.(%) */}
            <div className="col-md-6 mb-4">
              <div className="border p-2 text-center">
                <div className="fw-bold small mb-2">PRESS-MEDIA R. O.(%)</div>
                <div className="bg-white p-3 shadow-sm d-flex justify-content-center">
                  <div style={{ width: '250px', height: '250px' }}>
                    <Doughnut data={data} options={options} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>






      </main>
    </>
  )
}

export default Dashboard