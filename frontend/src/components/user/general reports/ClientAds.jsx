import axios from 'axios';
import React, { useEffect, useState } from 'react';
import * as XLSX from "xlsx"; // Import the xlsx library

function ClientAds() {

    //to get the Ad list from the backend
    const [ad, setAd] = useState([]);
    useEffect(() => {
        axios.get(import.meta.env.VITE_BASEURL + "/adschedules")
            .then((res) => {
                setAd(res.data);
            })
    }, []);


    //to get the client list from the backend
    const [client, setClient] = useState([]);
    useEffect(() => {
        axios.get(import.meta.env.VITE_BASEURL + "/clients")
            .then((res) => {
                setClient(res.data);
            })
    }, []);

    //formatting the date to dd-mm-yyyy
    const formatDate = (dateStr) => {
        const date = new Date(dateStr);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // months are 0-indexed
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
    };

    //to print the client list
    const handlePrint = () => {
        const printContent = document.getElementById("printableTable").innerHTML;
        const originalContent = document.body.innerHTML;

        document.body.innerHTML = printContent;
        window.print();
        document.body.innerHTML = originalContent;
        window.location.reload(); // Refresh the page to restore the UI
    };

    //to export the client list to excel
    const exportToExcel = () => {
        const confirmExport = window.confirm("Do you want to export the ad list to Excel?");
        if (confirmExport) {
            const worksheet = XLSX.utils.json_to_sheet(ad);
            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, worksheet, "Ads");
            XLSX.writeFile(workbook, "Ad_List.xlsx");
        }
    };
    

    //reset the form
    const resetForm = () => {
        document.getElementById("client").value = "Select Client";
        document.getElementById("fromDate").value = "";
        document.getElementById("toDate").value = "";
    };

    return (
        <>
            <main id="main" className="main">
                <div className="pagetitle">
                    <h1>General Reports</h1>
                    <nav>
                        <ol className="breadcrumb">
                            <li class="breadcrumb-item"><a href='/dashboard' class="text-decoration-none">Home</a></li>
                            <li className="breadcrumb-item"><a>General Reports</a></li>
                            <li className="breadcrumb-item active">Client Ads</li>
                        </ol>
                    </nav>
                </div>

                <div class="container mt-4 shadow pb-4">
                    <div class="row g-3 align-items-end">
                        <div class="col-md-4 col-sm-6">
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
                            <button class="btn btn-info me-2 text-white">Show</button>
                            <button class="btn btn-danger me-2" onClick={resetForm}>Reset</button>
                            <button class="btn btn-primary me-2" onClick={handlePrint}>Print</button>
                            <button class="btn btn-success me-2" onClick={exportToExcel}>Export</button>
                        </div>
                    </div>
                </div>

                <div className='text-end me-5 mt-4'>
                    <span className=" text-danger fw-bold h6">Total Records : {ad.length}</span>
                </div>

                {/* Table */}
                <div className="container mt-4" id='printableTable'>
                    <div className="card shadow-lg card-responsive ">
                        <div className="card-header bg-white text-dark text-center my-3">
                            <h5 className="fw-bold">Client Ads Report</h5>
                        </div>
                        <div className="card-body px-3">
                            <div className="table-responsive">
                                <table className="table table-hover table-bordered text-center align-middle">
                                    <thead className="table-secondary">
                                        <tr>
                                            <th>No</th>
                                            <th>Client Name</th>
                                            <th>Date</th>
                                            <th>Description</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            ad.map((eachData, index) => (
                                                <tr key={eachData.id}>
                                                    <td>{index + 1}</td>
                                                    <td>{eachData.clientname}</td>
                                                    {/* <td>{eachData.adDate}</td> */}
                                                    <td>{formatDate(eachData.adDate)}</td>
                                                    <td>{eachData.description}</td>
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

export default ClientAds