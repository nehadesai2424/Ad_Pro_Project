import React from 'react'

function PMediaRoList() {
  return (
    <>
      <main id="main" class="main">
        <div class="pagetitle">
          <h1>P-Media RO List</h1>
          <nav>
            <ol class="breadcrumb">
            <li class="breadcrumb-item"><a href='/dashboard' class="text-decoration-none">Home</a></li>
              <li class="breadcrumb-item"><a>Financial Reports</a></li>
              <li class="breadcrumb-item active">P-Media RO List</li>
            </ol>
          </nav>
        </div>
        
      <div className="container shadow pb-4">
      <div className="row g-3 align-items-end mt-2">
          <div className="col-md-2 col-sm-6">
            <label htmlFor="status" className="form-label fw-bold">STATUS</label>
            <select className="form-select shadow" id="status">
              <option selected>Select Status</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
          <div className="col-md-3 col-sm-6">
            <label htmlFor="paper" className="form-label fw-bold">PAPER</label>
            <select className="form-select shadow" id="paper">
              <option selected>Select Paper</option>
              <option value="1">Pudhari</option>
              <option value="2">Lokmat</option>
              <option value="3">Sakal</option>
            </select>
          </div>
          <div className="col-md-3 col-sm-6">
            <label htmlFor="client2" className="form-label fw-bold">CLIENT</label>
            <select className="form-select shadow" id="client2">
              <option selected>Select Client</option>
              <option value="1">Client 1</option>
              <option value="2">Client 2</option>
              <option value="3">Client 3</option>
            </select>
          </div>
          <div className="col-md-2 col-sm-6">
            <label htmlFor="fromDate2" className="form-label fw-bold">FROM DATE</label>
            <input type="date" className="form-control shadow" id="fromDate2" />
          </div>
          <div className="col-md-2 col-sm-6">
            <label htmlFor="toDate2" className="form-label fw-bold">TO DATE</label>
            <input type="date" className="form-control shadow" id="toDate2" />
          </div>
        </div>

        <div class="row mt-4">
          <div class="col-12 text-center">
            <button class="btn btn-info text-white me-2">Show</button>
            <button class="btn btn-danger me-2">Reset</button>
            <button class="btn btn-primary me-2">Print</button>
            <button class="btn btn-success">Export</button>
          </div>
        </div>
      </div>

        <div className='text-end me-5 mt-4'>
          <span className=" text-danger fw-bold h6">Total Records : 1</span>
        </div>

        {/* Table */}
        <div className="container mt-4">
          <div className="card shadow-lg card-responsive ">
            <div className="card-header bg-white text-dark text-center my-3">
              <h5 className="fw-bold">P-Media RO Report</h5>
            </div>
            <div className="card-body px-3">
              <div className="table-responsive">
                <table className="table table-hover table-bordered text-center align-middle">
                  <thead className="table-secondary">
                    <tr>
                      <th>No</th>
                      <th>RO No</th>
                      <th>RO Date</th>
                      <th>Invoice Nos</th>
                      <th>Client</th>
                      <th>Paper</th>
                      <th>Editions</th>
                      <th>Scheme</th>
                      <th>RO Amount</th>
                      <th>Commission</th>
                      <th>Media GST Code</th>
                      <th>Media GST Amount</th>
                      <th>Media Bill No</th>
                      <th>Media Bill Amount</th>
                      <th>Client GST Code</th>
                      <th>Client GST Amount</th>
                      <th>Discount</th>
                      <th>Invoice Amount</th>
                      <th>Cheque Details</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>..</td>
                      <td>..</td>
                      <td>..</td>
                      <td>..</td>
                      <td>..</td>
                      <td>..</td>
                      <td>..</td>
                      <td>..</td>
                      <td>..</td>
                      <td>..</td>
                      <td>..</td>
                      <td>..</td>
                      <td>..</td>
                      <td>..</td>
                      <td>..</td>
                      <td>..</td>
                      <td>..</td>
                      <td>..</td>
                      <td>..</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

      </main>
    </>
  )
}

export default PMediaRoList