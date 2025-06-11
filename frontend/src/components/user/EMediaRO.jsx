import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router';
import Swal from 'sweetalert2';

function EMediaRO() {
    //to get emedia ro list from backend and show in table
    const [emediaRO, setEmediaRO] = useState([]);
    function loadData() {
        axios.get(import.meta.env.VITE_BASEURL + "/emediaros")
            .then((res) => {
                setEmediaRO(res.data);
            })
            .catch((error) => console.error("Error fetching emdiaro:", error));
    }

    useEffect(() => {
        loadData()        // Load data when the component mounts
    }, [])


    // to get emedia data
    const [emedia, setEmedia] = useState([]);
    useEffect(() => {
        axios.get(import.meta.env.VITE_BASEURL + "/emedias")
            .then((res) => {
                // console.log(res.data);
                setEmedia(res.data);
            })
    }, [])

    // to get client data
    const [client, setClient] = useState([]);
    useEffect(() => {
        axios.get(import.meta.env.VITE_BASEURL + "/clients")
            .then((res) => {
                // console.log(res.data);
                setClient(res.data);
            })
    }, [])

    //to reset filter data 
    const resetFilter = () => {
        document.getElementById("status").value = "Select Status";
        document.getElementById("publication").value = "Select Publication";
        document.getElementById("client2").value = "Select Client";
        document.getElementById("payStatus").value = "Pay Status";
        document.getElementById("fromDate2").value = "";
        document.getElementById("toDate2").value = "";
        document.getElementById("search").value = "";
    }

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
                axios.delete(import.meta.env.VITE_BASEURL + "/emediaros/" + id)
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
                    <h1>E-Media RO List</h1>
                    <nav>
                        <ol class="breadcrumb">
                            <li class="breadcrumb-item"><a href='/dashboard' class="text-decoration-none">Home</a></li>
                            <li class="breadcrumb-item active">E-Media RO List</li>
                        </ol>
                    </nav>
                </div>


                <div className="container shadow pb-2">
                    {/* Filter Section */}
                    <div className="row g-3 align-items-end mt-2">
                        <div className="col-md-3 col-sm-6">
                            <label htmlFor="status" className="form-label fw-bold">STATUS</label>
                            <select className="form-select shadow" id="status">
                                <option selected>Select Status</option>
                                <option value="pending">Pending</option>
                                <option value="approved">Approved</option>
                                <option value="rejected">Rejected</option>
                            </select>
                        </div>
                        <div className="col-md-3 col-sm-6">
                            <label htmlFor="publication" className="form-label fw-bold">PUBLICATION</label>
                            <select className="form-select shadow" id="publication">
                                <option selected>Select Publication</option>
                                {
                                    emedia.map((emedia) => {
                                        //console.log(emedia);
                                        return (
                                            <option key={emedia.id} value={emedia.id}> {emedia.name} </option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                        <div className="col-md-3 col-sm-6">
                            <label htmlFor="client2" className="form-label fw-bold">CLIENT</label>
                            <select className="form-select shadow" id="client2">
                                <option selected>Select Client</option>
                                {
                                    client.map((client) => {
                                        //console.log(client);
                                        return (
                                            <option key={client.id} value={client.id}> {client.name} </option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                        <div className="col-md-3 col-sm-6">
                            <label htmlFor="payStatus" className="form-label fw-bold">PAY STATUS</label>
                            <select className="form-select shadow" id="payStatus">
                                <option selected>Pay Status</option>
                                <option value="all">All</option>
                                <option value="partially">Partially</option>
                                <option value="fully">Fully</option>
                                <option value="notPaid">Not Paid</option>
                            </select>
                        </div>
                    </div>

                    <div className="row g-3 align-items-end mt-2 mb-4">
                        <div className="col-md-2 col-sm-6">
                            <label htmlFor="fromDate2" className="form-label fw-bold">FROM DATE</label>
                            <input type="date" className="form-control shadow" id="fromDate2" />
                        </div>
                        <div className="col-md-2 col-sm-6">
                            <label htmlFor="toDate2" className="form-label fw-bold">TO DATE</label>
                            <input type="date" className="form-control shadow" id="toDate2" />
                        </div>
                        <div className="col-md-3 col-sm-6">
                            <label htmlFor="search" className="form-label fw-bold">SEARCH RO/INVOICE NO</label>
                            <input type="text" className="form-control shadow" id="search" />
                        </div>
                        {/* <div className="col-md-1 col-sm-1"></div> */}
                        <div className="col-md-4 col-sm-6 text-end">
                            <button class="btn btn-info text-white me-2">Show</button>
                            <button class="btn btn-danger me-2" onClick={resetFilter}>Reset</button>
                            {/* <button class="btn btn-success me-2" >Add New RO</button> */}
                            <Link to="/e-media-ro/new-emedia-ro" className="btn btn-success me-2">Add New RO</Link>
                        </div>
                    </div>
                </div>


                {/* Table */}
                <div className="container mt-5">
                    <div className="card shadow-lg card-responsive ">
                        {/* <div className="card-header bg-white text-dark text-center my-3">
                            <h5 className="fw-bold">E-Media RO List</h5>
                        </div> */}
                        <div className="card-body px-3">
                            <div className="table-responsive">
                                <table className="table table-hover table-bordered text-center align-middle">
                                    <thead className="table-secondary">
                                        <tr>
                                            <th>RO No</th>
                                            <th>RO Date</th>
                                            <th>Invoice No</th>
                                            <th>Invoice Date</th>
                                            <th>Client</th>
                                            <th>Publication</th>
                                            <th>RO Amount</th>
                                            <th>Discount</th>
                                            <th> GST </th>
                                            <th>Invoice Amount</th>
                                            <th>Paid</th>
                                            <th>Remaining</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            emediaRO.map((eachData, index) => (
                                                <tr key={eachData.id}>
                                                    {/* <td>{index + 1}</td> */}
                                                    <td>{eachData.roNo}</td>
                                                    <td>{eachData.roDate}</td>
                                                    <td>{eachData.invoiceNo}</td>
                                                    <td>{eachData.invoiceDate}</td>
                                                    <td>{eachData.clientId}</td>
                                                    <td>{eachData.emediaId}</td>
                                                    <td>{eachData.roAmount}</td>
                                                    <td>{eachData.discount}</td>
                                                    <td>{eachData.gstId}</td>
                                                    <td>{eachData.invoiceAmount}</td>
                                                    <td>{eachData.paid}</td>
                                                    <td>{eachData.remaining}</td>
                                                    <td>
                                                        <div className="d-flex justify-content-center">
                                                            {/* Edit button */}
                                                            <Link to={"/e-media-ro/new-emedia-ro/" + eachData.id} className="btn btn-sm btn-primary me-2" style={{ height: "30px", width: "30px" }}><i className="fas fa-edit"></i></Link>
                                                            {/* Delete button */}
                                                            <button className="btn btn-sm btn-danger" style={{ height: "30px", width: "30px" }} onClick={() => handleDelete(eachData.id)}><i className="fas fa-trash"></i></button>
                                                        </div>

                                                        <div className="d-flex justify-content-center mt-1">
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
        </>
    )
}

export default EMediaRO