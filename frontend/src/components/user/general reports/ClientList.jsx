import axios from 'axios';
import React, { useEffect, useState } from 'react'
import * as XLSX from "xlsx"; // Import the xlsx library

function ClientList() {

    //to get the client list from the backend
    const [client, setClient] = useState([]);
    useEffect(() => {
        axios.get(import.meta.env.VITE_BASEURL + "/clients")
            .then((res) => {
                setClient(res.data);
            })
    }, []);

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
        const confirmExport = window.confirm("Do you want to export the client list to Excel?");
        if (confirmExport) {
        const worksheet = XLSX.utils.json_to_sheet(client);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Clients");
        XLSX.writeFile(workbook, "Client_List.xlsx");
        }
    };

    return (
        <>
            <main id="main" className="main">
                <div className="pagetitle">
                    <h1>Clients</h1>
                    <nav>
                        <ol className="breadcrumb">
                        <li class="breadcrumb-item"><a href='/dashboard' class="text-decoration-none">Home</a></li>
                            <li className="breadcrumb-item"><a>General Reports</a></li>
                            <li className="breadcrumb-item active">Client List</li>
                        </ol>
                    </nav>
                </div>

                {/* Buttons */}
                <div className="d-flex flex-wrap gap-2 mb-3">
                    <button className="btn btn-primary px-4" onClick={handlePrint}>
                        Print
                    </button>
                    <button className="btn btn-success px-4 ms-2" onClick={exportToExcel}>
                        Export
                    </button>
                </div>

                <div className='text-end me-5'>
                    <span className=" text-danger fw-bold h6">Total Records : {client.length}</span>
                </div>
                {/* Client Table */}
                <div className="container mt-4" id="printableTable">
                    <div className="card shadow-lg card-responsive ">
                        <div className="card-header bg-white text-dark text-center my-3">
                            <h5 className="fw-bold">Client List</h5>
                        </div>
                        <div className="card-body px-3">
                            <div className="table-responsive">
                                <table className="table table-hover table-bordered text-center">
                                    <thead className="table-secondary">
                                        <tr>
                                            <th>ID</th>
                                            <th>Client Name</th>
                                            <th>Contact</th>
                                            <th>Address</th>
                                            <th>State</th>
                                            <th>GST No.</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            client.map((eachData, index) => (
                                                <tr key={eachData.id}>
                                                    <td>{index + 1}</td>
                                                    <td>{eachData.name}</td>
                                                    <td>{eachData.contact}</td>
                                                    <td>{eachData.address}</td>
                                                    <td>{eachData.statename}</td>
                                                    <td>{eachData.gstNo}</td>
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

export default ClientList;
