// import React, { useEffect, useState } from 'react'
// import { Link } from 'react-router'
// import axios from 'axios'
// import Swal from 'sweetalert2';

// function DesignPrintInvoices() {

//   //to get the client list from the backend
//   const [client, setClient] = useState([]);
//   useEffect(() => {
//     axios.get(import.meta.env.VITE_BASEURL + "/clients")
//       .then((res) => {
//         setClient(res.data);
//       })
//   }, []);

//   //to get the invoice list from the backend
//   const [invoice, setInvoice] = useState([]);

//   function loadData() {
//     axios.get(import.meta.env.VITE_BASEURL + "/designprintinvoices")
//       .then((res) => {
//         setInvoice(res.data);
//       })
//       .catch((error) => console.error("Error fetching invoice:", error));
//   }

//   useEffect(() => {
//     loadData()        // Load data when the component mounts
//   }, [])

//   //To delete data
//   function handleDelete(id) {
//     Swal.fire({
//       title: "Are you sure?",
//       text: "You won't be able to revert this!",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#d33",
//       cancelButtonColor: "#3085d6",
//       confirmButtonText: "Yes, delete it!"
//     }).then((result) => {
//       if (result.isConfirmed) {
//         axios.delete(import.meta.env.VITE_BASEURL + "/designprintinvoices/" + id)
//           .then((res) => {
//             console.log(res.data);
//             loadData(); // Refresh the data after deletion
//             Swal.fire({
//               title: "Deleted!",
//               text: "Your item has been deleted.",
//               icon: "success"
//             });
//           })
//           .catch((error) => {
//             console.error("Error deleting item:", error);
//             Swal.fire({
//               title: "Error!",
//               text: "Something went wrong. Please try again later.",
//               icon: "error"
//             });
//           });
//       }
//     });
//   }


//   return (
//     <>
//       <main id="main" className="main">
//         <div class="pagetitle">
//           <h1>Designing & Printing Invoices</h1>
//           <nav>
//             <ol class="breadcrumb">
//               <li class="breadcrumb-item"><a href='/dashboard' class="text-decoration-none">Home</a></li>
//               <li class="breadcrumb-item active">Designing & Printing Invoices</li>
//             </ol>
//           </nav>
//         </div>

//         <div class="container mt-4">
//           <div class="row g-3 align-items-end">
//             <div class="col-md-3 col-sm-6">
//               <label for="client" class="form-label fw-bold">CLIENT</label>
//               <select class="form-select shadow" id="client">
//                 <option selected>Select Client</option>
//                 {
//                   client.map((client) => {
//                     //console.log(roleData);
//                     return (
//                       <option key={client.id} value={client.id}> {client.name} </option>
//                     )
//                   })
//                 }
//               </select>
//             </div>
//             <div class="col-md-3 col-sm-6">
//               <label for="fromDate" class="form-label fw-bold">FROM DATE</label>
//               <input type="date" class="form-control shadow" id="fromDate" />
//             </div>
//             <div class="col-md-3 col-sm-6">
//               <label for="toDate" class="form-label fw-bold">TO DATE</label>
//               <input type="date" class="form-control shadow" id="toDate" />
//             </div>
//             <div class="col-md-3 col-sm-6">
//               <label for="search" class="form-label fw-bold">SEARCH</label>
//               <input type="text" class="form-control shadow" id="search" placeholder="Search..." />
//             </div>
//           </div>
//           <div class="row mt-4">
//             <div class="col-12 text-center">
//               <button class="btn btn-primary me-2">Show</button>
//               <button class="btn btn-danger me-2">Reset</button>
//               <Link to="/design-print-invoices/new-invoice" className="btn btn-success">Add New Invoice</Link>
//             </div>
//           </div>
//         </div>
//         <hr />

//         <div className='text-end me-5'>
//           <span className=" text-danger fw-bold h6">Total Records : 1</span>
//         </div>

//         {/* Table */}
//         <div className="container mt-4">
//           <div className="card shadow-lg card-responsive ">
//             <div className="card-header bg-white text-dark text-center my-3">
//               <h5 className="fw-bold">Invoice List</h5>
//             </div>
//             <div className="card-body px-3">
//               <div className="table-responsive">
//                 <table className="table table-hover table-bordered text-center align-middle">
//                   <thead className="table-secondary">
//                     <tr>
//                       <th>Invoice No</th>
//                       <th>Invoice Date</th>
//                       <th>Client</th>
//                       <th>Amount</th>
//                       <th>Discount</th>
//                       <th>Taxable Amount</th>
//                       <th>CGST %</th>
//                       <th>CGST Amount</th>
//                       <th>SGST %</th>
//                       <th>SGST Amount</th>
//                       <th>IGST %</th>
//                       <th>IGST Amount</th>
//                       <th>Invoice Amount</th>
//                       <th>Paid</th>
//                       <th>Remaining</th>
//                       <th>Action</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {
//                       invoice.map((eachData, index) => (
//                         <tr key={eachData.id}>
//                           {/* <td>{index + 1}</td> */}
//                           <td>{eachData.invoiceNo}</td>
//                           <td>{eachData.invoiceDate}</td>
//                           <td>{eachData.clientId}</td>
//                           <td>{eachData.amount}</td>
//                           <td>{eachData.discount}</td>
//                           <td>{eachData.taxableAmount}</td>
//                           <td>{eachData.cgstPercent}</td>
//                           <td>{eachData.cgstAmount}</td>
//                           <td>{eachData.sgstPercent}</td>
//                           <td>{eachData.sgstAmount}</td>
//                           <td>{eachData.igstPercent}</td>
//                           <td>{eachData.igstAmount}</td>
//                           <td>{eachData.billAmount}</td>
//                           <td>{eachData.paid}</td>
//                           <td>{eachData.remaining}</td>
//                           <td>
//                             {/* First row of buttons */}
//                             <div className="d-flex justify-content-center">

//                               {/* Edit button */}
//                               <Link to={"/design-print-invoices/new-invoice/" + eachData.id}>
//                                 <button className="btn btn-sm btn-primary me-2" style={{ height: "30px", width: "30px" }}><i className="fas fa-edit"></i></button>
//                               </Link>

//                               <button className="btn btn-sm btn-danger" style={{ height: "30px", width: "30px" }} onClick={() => handleDelete(eachData.id)}><i className="fas fa-trash-alt"></i></button>
//                             </div>
//                             {/* Second row of buttons */}
//                             <div className="d-flex justify-content-center mt-1">
//                               <button className="btn btn-sm btn-success me-2" style={{ height: "30px", width: "30px" }}><i class="fa-solid fa-indian-rupee-sign"></i></button>
//                               <button className="btn btn-sm btn-dark" style={{ height: "30px", width: "30px" }}><i className="fas fa-print"></i></button>
//                             </div>
//                           </td>
//                         </tr>
//                       ))
//                     }
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           </div>
//         </div>

//       </main>

//     </>
//   )
// }

// export default DesignPrintInvoices



import React, { useEffect, useState } from 'react'
import { Link } from 'react-router'
import axios from 'axios'
import Swal from 'sweetalert2';

function DesignPrintInvoices() {


  const [showModal, setShowModal] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null);

  const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD format
  const [paymentDate, setPaymentDate] = useState(today);
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');



  //to get the client list from the backend
  const [client, setClient] = useState([]);
  useEffect(() => {
    axios.get(import.meta.env.VITE_BASEURL + "/clients")
      .then((res) => {
        setClient(res.data);
      })
  }, []);

  //to get the invoice list from the backend
  const [invoice, setInvoice] = useState([]);

  function loadData() {
    axios.get(import.meta.env.VITE_BASEURL + "/designprintinvoices")
      .then((res) => {
        setInvoice(res.data);
      })
      .catch((error) => console.error("Error fetching invoice:", error));
  }

  useEffect(() => {
    loadData()        // Load data when the component mounts
  }, [])

  //To delete data
  function handleDelete(id) {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(import.meta.env.VITE_BASEURL + "/designprintinvoices/" + id)
          .then((res) => {
            console.log(res.data);
            loadData(); // Refresh the data after deletion
            Swal.fire({
              title: "Deleted!",
              text: "Your item has been deleted.",
              icon: "success"
            });
          })
          .catch((error) => {
            console.error("Error deleting item:", error);
            Swal.fire({
              title: "Error!",
              text: "Something went wrong. Please try again later.",
              icon: "error"
            });
          });
      }
    });
  }


  return (
    <>
      <main id="main" className="main">
        <div class="pagetitle">
          <h1>Designing & Printing Invoices</h1>
          <nav>
            <ol class="breadcrumb">
              <li class="breadcrumb-item"><a href='/dashboard' class="text-decoration-none">Home</a></li>
              <li class="breadcrumb-item active">Designing & Printing Invoices</li>
            </ol>
          </nav>
        </div>

        <div class="container mt-4 shadow pb-4">
          <div class="row g-3 align-items-end">
            <div class="col-md-3 col-sm-6">
              <label for="client" class="form-label fw-bold">CLIENT</label>
              <select class="form-select shadow" id="client">
                <option selected>Select Client</option>
                {
                  client.map((client) => {
                    //console.log(roleData);
                    return (
                      <option key={client.id} value={client.id}> {client.name} </option>
                    )
                  })
                }
              </select>
            </div>
            <div class="col-md-3 col-sm-6">
              <label for="fromDate" class="form-label fw-bold">FROM DATE</label>
              <input type="date" class="form-control shadow" id="fromDate" />
            </div>
            <div class="col-md-3 col-sm-6">
              <label for="toDate" class="form-label fw-bold">TO DATE</label>
              <input type="date" class="form-control shadow" id="toDate" />
            </div>
            <div class="col-md-3 col-sm-6">
              <label for="search" class="form-label fw-bold">SEARCH</label>
              <input type="text" class="form-control shadow" id="search" placeholder="Search..." />
            </div>
          </div>
          <div class="row mt-4">
            <div class="col-12 text-center">
              <button class="btn btn-primary me-2">Show</button>
              <button class="btn btn-danger me-2">Reset</button>
              <Link to="/design-print-invoices/new-invoice" className="btn btn-success">Add New Invoice</Link>
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
              <h5 className="fw-bold">Invoice List</h5>
            </div>
            <div className="card-body px-3">
              <div className="table-responsive">
                <table className="table table-hover table-bordered text-center align-middle">
                  <thead className="table-secondary">
                    <tr>
                      <th>Invoice No</th>
                      <th>Invoice Date</th>
                      <th>Client</th>
                      <th>Amount</th>
                      <th>Discount</th>
                      <th>Taxable Amount</th>
                      <th>CGST %</th>
                      <th>CGST Amount</th>
                      <th>SGST %</th>
                      <th>SGST Amount</th>
                      <th>IGST %</th>
                      <th>IGST Amount</th>
                      <th>Invoice Amount</th>
                      <th>Paid</th>
                      <th>Remaining</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      invoice.map((eachData, index) => (
                        <tr key={eachData.id}>
                          {/* <td>{index + 1}</td> */}
                          <td>{eachData.invoiceNo}</td>
                          <td>{eachData.invoiceDate}</td>
                          <td>{eachData.clientId}</td>
                          <td>{eachData.amount}</td>
                          <td>{eachData.discount}</td>
                          <td>{eachData.taxableAmount}</td>
                          <td>{eachData.cgstPercent}</td>
                          <td>{eachData.cgstAmount}</td>
                          <td>{eachData.sgstPercent}</td>
                          <td>{eachData.sgstAmount}</td>
                          <td>{eachData.igstPercent}</td>
                          <td>{eachData.igstAmount}</td>
                          <td>{eachData.billAmount}</td>
                          <td>{eachData.paid}</td>
                          <td>{eachData.remaining}</td>
                          <td>
                            {/* First row of buttons */}
                            <div className="d-flex justify-content-center">

                              {/* Edit button */}
                              <Link to={"/design-print-invoices/new-invoice/" + eachData.id}>
                                <button className="btn btn-sm btn-primary me-2" style={{ height: "30px", width: "30px" }}><i className="fas fa-edit"></i></button>
                              </Link>

                              <button className="btn btn-sm btn-danger" style={{ height: "30px", width: "30px" }} onClick={() => handleDelete(eachData.id)}><i className="fas fa-trash-alt"></i></button>
                            </div>
                            {/* Second row of buttons */}
                            <div className="d-flex justify-content-center mt-1">
                              <button
                                className="btn btn-sm btn-success me-2"
                                style={{ height: "30px", width: "30px" }}
                                onClick={() => {
                                  setSelectedInvoice(eachData);
                                  setShowModal(true);
                                }}
                              >
                                <i className="fa-solid fa-indian-rupee-sign"></i>
                              </button>
                              <button className="btn btn-sm btn-dark" style={{ height: "30px", width: "30px" }}><i className="fas fa-print"></i></button>
                            </div>
                          </td>
                        </tr>
                      ))
                    }
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

      </main>

      {/* Modal for Payment Details */}
      {showModal && selectedInvoice && (
        <>
          <div
            className="modal fade show d-block"
            tabIndex="-1"
            role="dialog"
            style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
            onClick={() => setShowModal(false)}
          >
            <div
              className="modal-dialog modal-lg modal-dialog-centered"
              role="document"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="modal-content">
                <div className="modal-header">
                  <div className="w-100 text-center">
                    <h5 className="modal-title fw-bold">Invoice Payment Details</h5>
                  </div>
                  <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
                </div>
                <div className="modal-body">
                  <div className="row mb-3">
                    <div className="col"><strong>Invoice No :</strong> {selectedInvoice.invoiceNo}</div>
                    <div className="col"><strong>Invoice Date :</strong> {selectedInvoice.invoiceDate}</div>
                  </div>
                  <div className="row mb-3">
                    <div className="col"><strong>Client :</strong> {selectedInvoice.clientId}</div>
                    <div className="col"><strong>Invoice Amount :</strong> {selectedInvoice.billAmount}</div>
                  </div>
                  <div className="row mb-3">
                    <div className="col"><strong>Remaining Amount :</strong> {selectedInvoice.remaining}</div>
                  </div>

                  <hr />

                  <div className="row">
                    <div className="col">
                      <label className="form-label">Payment Date</label>
                      <input
                        type="date"
                        className="form-control"
                        value={paymentDate}
                        onChange={(e) => setPaymentDate(e.target.value)}
                      />
                    </div>
                    <div className="col">
                      <label className="form-label">Amount</label>
                      <input
                        type="number"
                        className="form-control"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="mb-3 mt-3">
                    <label className="form-label">Description</label>
                    <input
                      type="text"
                      className="form-control"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </div>
                </div>

                <div className="modal-footer">
                  <button className="btn btn-success">Save</button>
                  <button className="btn btn-danger" onClick={() => setShowModal(false)}>Close</button>
                </div>
                <hr />

                {/* Payment Records Table */}
                <div className="px-4 pb-4">
                  <div className="text-center">
                    <h5 className="fw-bold mb-3">Previous Payments</h5>

                  </div>
                  <table className="table table-bordered mt-2">
                    <thead className="table-secondary">
                      <tr>
                        <th>No</th>
                        <th>Payment Date</th>
                        <th>Description</th>
                        <th>Amount</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedInvoice.payments?.length > 0 ? (
                        selectedInvoice.payments.map((pmt, index) => (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{pmt.date}</td>
                            <td>{pmt.description}</td>
                            <td>{pmt.amount}</td>
                            <td></td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="5" className="text-center text-muted">No payments recorded</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </>
      )}





    </>
  )
}

export default DesignPrintInvoices