import React from 'react'

function DesignPrintReport() {
  return (
    <>
    <main id="main" className="main">
        <div class="pagetitle">
          <h1>Designing & Printing Invoices</h1>
          <nav>
            <ol class="breadcrumb">
            <li class="breadcrumb-item"><a href='/dashboard' class="text-decoration-none">Home</a></li>
              <li class="breadcrumb-item"><a>Financial Reports</a></li>
              <li class="breadcrumb-item active">Designing & Printing Invoices</li>
            </ol>
          </nav>
        </div>

        <div class="container mt-4 shadow pb-4">
          <div class="row g-3 align-items-end">
            <div class="col-md-4 col-sm-6">
              <label for="client" class="form-label fw-bold">CLIENT</label>
              <select class="form-select shadow" id="client">
                <option selected>Select Client</option>
                <option value="1">Client 1</option>
                <option value="2">Client 2</option>
                <option value="3">Client 3</option>
              </select>
            </div>
            <div class="col-md-4 col-sm-6">
              <label for="fromDate" class="form-label fw-bold">FROM DATE</label>
              <input type="date" class="form-control shadow" id="fromDate" />
            </div>
            <div class="col-md-4 col-sm-6">
              <label for="toDate" class="form-label fw-bold">TO DATE</label>
              <input type="date" class="form-control shadow" id="toDate" />
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
              <h5 className="fw-bold">Design & Printing Invoice Report</h5>
            </div>
            <div className="card-body px-3">
              <div className="table-responsive">
                <table className="table table-hover table-bordered text-center align-middle">
                  <thead className="table-secondary">
                    <tr>
                      <th>No</th>
                      <th>Invoice No</th>
                      <th>Invoice Date</th>
                      <th>Client</th>
                      <th>Amount</th>
                      <th>Discount</th>
                      <th>Taxable Amount</th>
                      <th>Client GST Code</th>
                      <th>GST Amount</th>
                      <th>Invoice Amount</th>
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

export default DesignPrintReport