// import axios from 'axios';
// import React, { useEffect, useState } from 'react';
// import * as XLSX from "xlsx"; // Import the xlsx library

// function EmployeeWork() {

//     //to print the client list
//       const handlePrint = () => {
//           const printContent = document.getElementById("printableTable").innerHTML;
//           const originalContent = document.body.innerHTML;

//           document.body.innerHTML = printContent;
//           window.print();
//           document.body.innerHTML = originalContent;
//           window.location.reload(); // Refresh the page to restore the UI
//       };

//       //to export the client list to excel
//       const exportToExcel = () => {
//           const worksheet = XLSX.utils.json_to_sheet(work);
//           const workbook = XLSX.utils.book_new();
//           XLSX.utils.book_append_sheet(workbook, worksheet, "work");
//           XLSX.writeFile(workbook, "Employee_Work.xlsx");
//       };

//       //Reset function
//       let reset = () => {
//         // document.getElementById("employee").value = "";
//         // document.getElementById("status").value = "";
//         // document.getElementById("fromDate").value = "";
//         // document.getElementById("toDate").value = "";
//         status = "";
//         employee = "";
//         fromDate = "";
//         toDate = "";
//       };


//   //to get the Employee Work from the WorkSchedules table
//   const [employee, setEmployee] = useState([]);
//   useEffect(() => {
//     axios.get(import.meta.env.VITE_BASEURL + "/users")
//       .then((res) => {
//         setEmployee(res.data);
//       })
//   }, []);

//   //to get the Employee Work from the WorkSchedules table
//   const [work, setWork] = useState([]);
//   useEffect(() => {
//     axios.get(import.meta.env.VITE_BASEURL + "/workschedules")
//       .then((res) => {
//         setWork(res.data);
//       })
//   }, []);

//   return (
//     <>
//       <main id="main" className="main">
//         <div className="pagetitle">
//           <h1>General Reports</h1>
//           <nav>
//             <ol className="breadcrumb">
//               <li class="breadcrumb-item"><a href='/dashboard' class="text-decoration-none">Home</a></li>
//               <li className="breadcrumb-item"><a>General Reports</a></li>
//               <li className="breadcrumb-item active">Employee Work</li>
//             </ol>
//           </nav>
//         </div>

//         <div class="container mt-4">
//           <div class="row g-3 align-items-end">
//             <div class="col-md-3 col-sm-6">
//               <label for="employee" class="form-label fw-bold">EMPLOYEE</label>
//               <select class="form-select shadow" id="employee" name='employee'>
//                 <option value="">Select Employee</option>
//                 {
//                   employee.map((employee) => {
//                     //console.log(roleData);
//                     return (
//                       <option key={employee.id} value={employee.id}> {employee.name} </option>
//                     )
//                   })
//                 }
//               </select>
//             </div>

//             <div class="col-md-3 col-sm-6">
//               <label for="Stutus" class="form-label fw-bold">STATUS</label>
//               <select class="form-select shadow" id="status" name='status'>
//                 <option value="">Select Status</option>
//                 <option value="1">Yes</option>
//                 <option value="2">No</option>
//                 <option value="3">Pending</option>
//               </select>
//             </div>
//             <div class="col-md-3 col-sm-6">
//               <label for="fromDate" class="form-label fw-bold">FROM DATE</label>
//               <input type="date" class="form-control shadow" id="fromDate" name='formDate' />
//             </div>
//             <div class="col-md-3 col-sm-6">
//               <label for="toDate" class="form-label fw-bold">TO DATE</label>
//               <input type="date" class="form-control shadow" id="toDate" name='toDate' />
//             </div>
//           </div>
//           <div class="row mt-4">
//             <div class="col-12 text-center">
//               <button class="btn btn-info me-2 text-white">Show</button>
//               <button class="btn btn-danger me-2" onClick={reset}>Reset</button>
//               <button class="btn btn-primary me-2" onClick={handlePrint}>Print</button>
//               <button class="btn btn-success me-2" onClick={exportToExcel}>Export</button>
//             </div>
//           </div>
//         </div>
//         <hr />


//         <div className='text-end me-5'>
//           <span className=" text-danger fw-bold h6">Total Records : {work.length}</span>
//         </div>

//         {/* Table */}
//         <div className="container mt-4" id="printableTable">
//           <div className="card shadow-lg card-responsive ">
//             <div className="card-header bg-white text-dark text-center my-3">
//               <h5 className="fw-bold">Employee Work Report</h5>
//             </div>
//             <div className="card-body px-3">
//               <div className="table-responsive">
//                 <table className="table table-hover table-bordered text-center align-middle">
//                   <thead className="table-secondary">
//                     <tr>
//                       <th>No</th>
//                       <th>Employee Name</th>
//                       <th>Title</th>
//                       <th>Description</th>
//                       <th>Date</th>
//                       <th>Status</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {
//                       work.map((eachData, index) => (
//                         <tr key={eachData.id}>
//                           <td>{index + 1}</td>
//                           <td>{eachData.username}</td>
//                           <td>{eachData.title}</td>
//                           <td>{eachData.description}</td>
//                           <td>{eachData.workDate}</td>
//                           <td>{eachData.status}</td>
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

// export default EmployeeWork



import axios from 'axios';
import React, { useEffect, useState } from 'react';
import * as XLSX from "xlsx"; // Import the xlsx library

function EmployeeWork() {

  // Fetch employee data from the API
  const [employee, setEmployee] = useState([]);
  useEffect(() => {
    axios.get(import.meta.env.VITE_BASEURL + "/users")
      .then((res) => setEmployee(res.data));
  }, []);

  // Fetch work data from the API
  const [work, setWork] = useState([]);
  useEffect(() => {
    axios.get(import.meta.env.VITE_BASEURL + "/workschedules")
      .then((res) => setWork(res.data));
  }, []);


  // Controlled input states
  const [selectedEmployee, setSelectedEmployee] = useState('');
  const [status, setStatus] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');

  // Filter work data based on selected filters
  const handleShow = () => {
    axios.get(import.meta.env.VITE_BASEURL + "/workschedules").then((res) => {
      let filtered = res.data;
      //console.log(res.data);

      if (selectedEmployee) {
        filtered = filtered.filter(w => w.userId === parseInt(selectedEmployee));
      }

      if (status) {
        filtered = filtered.filter(w => w.status === status);
      }

      if (fromDate) {
        filtered = filtered.filter(w => new Date(w.workDate) >= new Date(fromDate));
      }

      if (toDate) {
        filtered = filtered.filter(w => new Date(w.workDate) <= new Date(toDate));
      }

      setWork(filtered);
    });
  };

  // Reset filters and clear the table
  const reset = () => {
    setSelectedEmployee('');
    setStatus('');
    setFromDate('');
    setToDate('');
  };

  // Print the table
  const handlePrint = () => {
    const printContent = document.getElementById("printableTable").innerHTML;
    const originalContent = document.body.innerHTML;
    document.body.innerHTML = printContent;
    window.print();
    document.body.innerHTML = originalContent;
    window.location.reload();
  };

  // Export to Excel function
  const exportToExcel = () => {
    const confirmExport = window.confirm("Do you want to export the Employee work list to Excel?");
    if (confirmExport) {
      const worksheet = XLSX.utils.json_to_sheet(work);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "work");
      XLSX.writeFile(workbook, "Employee_Work.xlsx");
    }
  };

  return (
    <main id="main" className="main">
      <div className="pagetitle">
        <h1>General Reports</h1>
        <nav>
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href='/dashboard' className="text-decoration-none">Home</a>
            </li>
            <li className="breadcrumb-item">General Reports</li>
            <li className="breadcrumb-item active">Employee Work</li>
          </ol>
        </nav>
      </div>

      <div className="container mt-4 shadow pb-4">
        <div className="row g-3 align-items-end">
          <div className="col-md-3 col-sm-6">
            <label htmlFor="employee" className="form-label fw-bold">EMPLOYEE</label>
            <select className="form-select shadow" id="employee" value={selectedEmployee} onChange={e => setSelectedEmployee(e.target.value)}>
              <option value="">Select Employee</option>
              {
                employee.map(emp => (
                  <option key={emp.id} value={emp.id}>{emp.name}</option>
                ))
              }
            </select>
          </div>

          <div className="col-md-3 col-sm-6">
            <label htmlFor="status" className="form-label fw-bold">STATUS</label>
            <select className="form-select shadow" id="status" value={status} onChange={e => setStatus(e.target.value)}>
              <option value="">Select Status</option>
              <option value="1">Done</option>
              <option value="2">Not Done</option>
            </select>
          </div>

          <div className="col-md-3 col-sm-6">
            <label htmlFor="fromDate" className="form-label fw-bold">FROM DATE</label>
            <input type="date" className="form-control shadow" id="fromDate" value={fromDate} onChange={e => setFromDate(e.target.value)} />
          </div>

          <div className="col-md-3 col-sm-6">
            <label htmlFor="toDate" className="form-label fw-bold">TO DATE</label>
            <input type="date" className="form-control shadow" id="toDate" value={toDate} onChange={e => setToDate(e.target.value)} />
          </div>
        </div>

        <div className="row mt-4">
          <div className="col-12 text-center">
            <button className="btn btn-info me-2 text-white" onClick={handleShow}>Show</button>
            <button className="btn btn-danger me-2" onClick={reset}>Reset</button>
            <button className="btn btn-primary me-2" onClick={handlePrint}>Print</button>
            <button className="btn btn-success me-2" onClick={exportToExcel}>Export</button>
          </div>
        </div>
      </div>

      <div className='text-end me-5 mt-4'>
        <span className="text-danger fw-bold h6">Total Records: {work.length}</span>
      </div>

      <div className="container mt-4" id="printableTable">
        <div className="card shadow-lg card-responsive">
          <div className="card-header bg-white text-dark text-center my-3">
            <h5 className="fw-bold">Employee Work Report</h5>
          </div>
          <div className="card-body px-3">
            <div className="table-responsive">
              <table className="table table-hover table-bordered text-center align-middle">
                <thead className="table-secondary">
                  <tr>
                    <th>No</th>
                    <th>Employee Name</th>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Date</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    work.map((eachData, index) => (
                      <tr key={eachData.id}>
                        <td>{index + 1}</td>
                        <td>{eachData.username}</td>
                        <td>{eachData.title}</td>
                        <td>{eachData.description}</td>
                        <td>{eachData.workDate}</td>
                        <td>
                          {eachData.status === "1" ? "Yes" :
                            eachData.status === "2" ? "No" :
                              eachData.status === "3" ? "Pending" :
                                eachData.status}
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
  );
}

export default EmployeeWork;



