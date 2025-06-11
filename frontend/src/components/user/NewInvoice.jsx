import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router';

function NewInvoice() {

    let navigate = useNavigate(); //to navigate to another page
    let { id } = useParams();//to get the id from the url

    let user = JSON.parse(localStorage.getItem("user")); //get the user data from local storage

    //to get the client list from the backend
    const [client, setClient] = useState([]);
    useEffect(() => {
        axios.get(import.meta.env.VITE_BASEURL + "/clients")
            .then((res) => {
                setClient(res.data);
            })
    }, []);

    //to get the gst list from the backend
    const [gst, setGst] = useState([]);
    useEffect(() => {
        axios.get(import.meta.env.VITE_BASEURL + "/gsts")
            .then((res) => {
                setGst(res.data);
            })
    }, []);

    //to post the invoice data to the backend
    const [invoice, setInvoice] = useState({
        invoiceNo: "",
        invoiceDate: "",
        clientId: "",
        itemCount: "",
        amount: "",
        discount: "",
        taxableAmount: "",
        gstId: "",
        cgstPercent: "",
        cgstAmount: "",
        sgstPercent: "",
        sgstAmount: "",
        igstPercent: "",
        igstAmount: "",
        billAmount: "",
        //advance: "",
        agencyId: user.agencyId
    });

    // Handle Input Change
    const handleChange = (e) => {
        //console.log(e.target.value)
        setInvoice({ ...invoice, [e.target.name]: e.target.value });
    };

    // Handle Form Submission (Save Or Update)
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!id) {
            try {
                const response = await axios.post(`${import.meta.env.VITE_BASEURL}/designprintinvoices`, invoice);
                alert("invoice added successfully!");
                console.log(response.data);
                setInvoice({ invoiceNo: "", invoiceDate: "", clientId: "", itemCount: "", amount: "", discount: "", taxableAmount: "", gstId: "", cgstPercent: "", cgstAmount: "", sgstPercent: "", sgstAmount: "", igstPercent: "", igstAmount: "", billAmount: "" }); // Clear form
            } catch (error) {
                console.error("Error adding Invoice:", error);
            }
        } else {
            try {
                const response = await axios.post(`${import.meta.env.VITE_BASEURL}/designprintinvoices`, { ...invoice, id }); // Include ID for update
                alert("Invoice updated successfully!");
                console.log(response.data);
                setId(null); // Reset ID after updating
                setInvoice({ invoiceNo: "", invoiceDate: "", clientId: "", itemCount: "", amount: "", discount: "", taxableAmount: "", gstId: "", cgstPercent: "", cgstAmount: "", sgstPercent: "", sgstAmount: "", igstPercent: "", igstAmount: "", billAmount: "" }); // Clear form
            } catch (error) {
                console.error("Error updating Invoice:", error);
            }
        }
        navigate("/design-print-invoices") // Redirect to the invoice list page after submission
    };


    //to get the invoice data from the backend for update
    useEffect(() => {
        if (id) {
            axios.get(import.meta.env.VITE_BASEURL + "/designprintinvoices/" + id)
                .then((res) => {
                    console.log(res.data);
                    setInvoice({
                        invoiceNo: res.data.invoiceNo,
                        invoiceDate: res.data.invoiceDate,
                        clientId: res.data.clientId,
                        itemCount: res.data.itemCount,
                        amount: res.data.amount,
                        discount: res.data.discount,
                        taxableAmount: res.data.taxableAmount,
                        gstId: res.data.gstId,
                        cgstPercent: res.data.cgstPercent,
                        cgstAmount: res.data.cgstAmount,
                        sgstPercent: res.data.sgstPercent,
                        sgstAmount: res.data.sgstAmount,
                        igstPercent: res.data.igstPercent,
                        igstAmount: res.data.igstAmount,
                        billAmount: res.data.billAmount,
                        //advance: res.data.advance,
                        agencyId: user.agencyId
                    })
                })
        }
    }, [id])

    // Handle Form Reset
    const handleReset = () => {
        setInvoice({
            invoiceNo: "",
            invoiceDate: "",
            clientId: "",
            itemCount: "",
            amount: "",
            discount: "",
            taxableAmount: "",
            gstId: "",
            cgstPercent: "",
            cgstAmount: "",
            sgstPercent: "",
            sgstAmount: "",
            igstPercent: "",
            igstAmount: "",
            billAmount: "",
        });
    };

    return (
        <>
            <main id="main" className="main">
                <div className="container mt-4">
                    <div className="card shadow">
                        <div className="card-header bg-primary text-white text-center">
                            <h5>Invoice Information</h5>
                        </div>
                        <div className="card-body">
                            <form onSubmit={handleSubmit} onReset={handleReset}>
                                {/* 1st row - Invoice No. with ? button and Invoice Date */}
                                <div className="row mb-3">
                                    <div className="col-md-6">
                                        <label className="form-label fw-bold">Invoice No. <span className="text-danger">*</span></label>
                                        <div className="input-group">
                                            <input type="text" className="form-control" onChange={handleChange} value={invoice.invoiceNo} name="invoiceNo" required />
                                            <button className="btn btn-primary fw-bold" type="button">?</button>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label fw-bold">Invoice Date <span className="text-danger">*</span></label>
                                        <input type="date" className="form-control" onChange={handleChange} value={invoice.invoiceDate} name="invoiceDate" required />
                                    </div>
                                </div>

                                {/* 2nd row - Client dropdown, No. of Items input, and Show Details button aligned */}
                                <div className="row mb-5 align-items-end">
                                    <div className="col-md-5">
                                        <label className="form-label fw-bold">Client <span className="text-danger">*</span></label>
                                        <select className="form-select" onChange={handleChange} value={invoice.clientId} name="clientId" required>
                                            <option value="">Select Client</option>
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
                                    <div className="col-md-5">
                                        <label className="form-label fw-bold">No. of Items <span className="text-danger">*</span></label>
                                        <input type="number" className="form-control" onChange={handleChange} value={invoice.itemCount} name="itemCount" required />
                                    </div>
                                    <div className="col-md-2 d-flex justify-content-start">
                                        <button type="button" className="btn btn-primary">Show Details</button>
                                    </div>
                                </div>
                                <hr />


                                {/* third Row */}
                                <div className="row mb-3 mt-5">
                                    <div className="col-md-3">
                                        <label className="form-label fw-bold"> Amount <span className="text-danger">*</span></label>
                                        <input type="number" className="form-control" onChange={handleChange} value={invoice.amount} name="amount" />
                                    </div>
                                    <div className="col-md-3">
                                        <label className="form-label fw-bold"> Discount Amount <span className="text-danger">*</span></label>
                                        <input type="number" className="form-control" onChange={handleChange} value={invoice.discount} name="discount" required />
                                    </div>
                                    <div className="col-md-3">
                                        <label className="form-label fw-bold">Taxable Amount <span className="text-danger">*</span></label>
                                        <input type="number" className="form-control" onChange={handleChange} value={invoice.taxableAmount} name="taxableAmount" required />
                                    </div>

                                    <div className="col-md-3">
                                        <label className="form-label fw-bold">GST Tax Type <span className="text-danger">*</span></label>
                                        <select className="form-select" onChange={handleChange} value={invoice.gstId} name="gstId" required >
                                            <option value="">Select</option>
                                            {
                                                gst.map((gst) => {
                                                    //console.log(client);
                                                    return (
                                                        <option key={gst.id} value={gst.id}> {gst.title} </option>
                                                    )
                                                })
                                            }
                                        </select>
                                    </div>
                                </div>

                                {/* fourth Row */}
                                <div className="row mb-3">

                                    <div className="col-md-2">
                                        <label className="form-label fw-bold">CGST % <span className="text-danger">*</span></label>
                                        <input type="number" className="form-control" onChange={handleChange} value={invoice.cgstPercent} name="cgstPercent" required />
                                    </div>
                                    <div className="col-md-2">
                                        <label className="form-label fw-bold">CGST Amount <span className="text-danger">*</span></label>
                                        <input type="number" className="form-control" onChange={handleChange} value={invoice.cgstAmount} name="cgstAmount" required />
                                    </div>
                                    <div className="col-md-2">
                                        <label className="form-label fw-bold">SGST % <span className="text-danger">*</span></label>
                                        <input type="number" className="form-control" onChange={handleChange} value={invoice.sgstPercent} name="sgstPercent" required />
                                    </div>
                                    <div className="col-md-2">
                                        <label className="form-label fw-bold">SGST Amount <span className="text-danger">*</span></label>
                                        <input type="number" className="form-control" onChange={handleChange} value={invoice.sgstAmount} name="sgstAmount" required />
                                    </div>
                                    <div className="col-md-2">
                                        <label className="form-label fw-bold">IGST % <span className="text-danger">*</span></label>
                                        <input type="number" className="form-control" onChange={handleChange} value={invoice.igstPercent} name="igstPercent" required />
                                    </div>
                                    <div className="col-md-2">
                                        <label className="form-label fw-bold">IGST Amount <span className="text-danger">*</span></label>
                                        <input type="number" className="form-control" onChange={handleChange} value={invoice.igstAmount} name="igstAmount" required />
                                    </div>
                                </div>

                                {/* fifth Row */}
                                <div className="row mb-3">
                                    <div className="col-md-6">
                                        <label className="form-label fw-bold">Bill Amount <span className="text-danger">*</span></label>
                                        <input type="number" className="form-control" onChange={handleChange} value={invoice.billAmount} name="billAmount" required />
                                    </div>
                                    {/* <div className="col-md-6">
                                        <label className="form-label fw-bold">Advance <span className="text-danger">*</span></label>
                                        <input type="number" className="form-control" name="advance" required />
                                    </div> */}
                                </div>

                                {/* Buttons */}
                                <div className="d-flex justify-content-center">
                                    <button type="submit" className="btn btn-success me-2">Save</button>
                                    <button type="reset" className="btn btn-danger me-2">Cancel</button>
                                    <button className="btn btn-primary">Print Invoice</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}

export default NewInvoice