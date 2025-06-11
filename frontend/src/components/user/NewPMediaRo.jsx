import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router';

function NewPMediaRo() {

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

    //to get the emedia list from the backend
    const [pmedia, setPmedia] = useState([]);
    useEffect(() => {
        axios.get(import.meta.env.VITE_BASEURL + "/pmedias")
            .then((res) => {
                setPmedia(res.data);
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

    //to post the emedia-ro data to the backend
    const [pmediaRo, setPmediaRo] = useState({
        agencyId: user.agencyId,
        financialYear: "",
        roNo: "",
        roDate: "",
        clientId: "",
        pmediaId: "",
        centers: "",
        language: "",
        caption: "",
        noOfRecords: "",
        paidDays: "",
        freeDays: "",
        totalCharges: '',
        comissionPercent: "",
        comissionAmount: "",
        chequeNo: "",
        chequeDate: "",
        bankName: "",
        roBillAmount: "",
        instructions: "",
        gstId: "",
        cgstPercent: "",
        cgstAmount: "",
        sgstPercent: "",
        sgstAmount: "",
        igstPercent: "",
        igstAmount: "",
        ccPercent: "",
        ccAmount: "",
        status: ""
    });

    // Handle Input Change
    const handleChange = (e) => {
        //console.log(e.target.value)
        setPmediaRo({ ...pmediaRo, [e.target.name]: e.target.value });
    };

    // Handle Form Submission (Save Or Update)
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!id) {
            try {
                const response = await axios.post(`${import.meta.env.VITE_BASEURL}/pmediaros`, pmediaRo);
                alert("Pmedia-Ro added successfully!");
                console.log(response.data);
                setPmediaRo({ financialYear: "", roNo: "", roDate: "", clientId: "", pmediaId: "", centers: "", language: "", caption: "", noOfRecords: "", paidDays: "", freeDays: "", totalCharges: '', comissionPercent: "", comissionAmount: "", chequeNo: "", chequeDate: "", bankName: "", roBillAmount: "", instructions: "", gstId: "", cgstPercent: "", cgstAmount: "", sgstPercent: "", sgstAmount: "", igstPercent: "", igstAmount: "", ccPercent: "", ccAmount: "", status: "" }); // Clear form
            } catch (error) {
                console.error("Error adding Pmedia-Ro:", error);
            }
        } else {
            try {
                const response = await axios.post(`${import.meta.env.VITE_BASEURL}/pmediaros`, { ...pmediaRo, id }); // Include ID for update
                alert("Pmedia-Ro updated successfully!");
                console.log(response.data);
                setId(null); // Reset ID after updating
                setPmediaRo({ financialYear: "", roNo: "", roDate: "", clientId: "", pmediaId: "", centers: "", language: "", caption: "", noOfRecords: "", paidDays: "", freeDays: "", totalCharges: '', comissionPercent: "", comissionAmount: "", chequeNo: "", chequeDate: "", bankName: "", roBillAmount: "", instructions: "", gstId: "", cgstPercent: "", cgstAmount: "", sgstPercent: "", sgstAmount: "", igstPercent: "", igstAmount: "", ccPercent: "", ccAmount: "", status: "" }); // Clear form
            } catch (error) {
                console.error("Error updating Pmedia-Ro:", error);
            }
        }
        navigate("/p-media-ro") // Redirect to the e-media-ro list page after submission
    };

    //to get the invoice data from the backend for update
    useEffect(() => {
        if (id) {
            axios.get(import.meta.env.VITE_BASEURL + "/pmediaros/" + id)
                .then((res) => {
                    console.log(res.data);
                    setPmediaRo({
                        financialYear: res.data.financialYear,
                        roNo: res.data.roNo,
                        roDate: res.data.roDate,
                        clientId: res.data.clientId,
                        pmediaId: res.data.pmediaId,
                        centers: res.data.centers,
                        language: res.data.language,
                        caption: res.data.caption,
                        noOfRecords: res.data.noOfRecords,
                        paidDays: res.data.paidDays,
                        freeDays: res.data.freeDays,
                        totalCharges: res.data.totalCharges,
                        comissionPercent: res.data.comissionPercent,
                        comissionAmount: res.data.comissionAmount,
                        chequeNo: res.data.chequeNo,
                        chequeDate: res.data.chequeDate,
                        bankName: res.data.bankName,
                        roBillAmount: res.data.roBillAmount,
                        instructions: res.data.instructions,
                        gstId: res.data.gstId,
                        cgstPercent: res.data.cgstPercent,
                        cgstAmount: res.data.cgstAmount,
                        sgstPercent: res.data.sgstPercent,
                        sgstAmount: res.data.sgstAmount,
                        igstPercent: res.data.igstPercent,
                        igstAmount: res.data.igstAmount,
                        ccPercent: res.data.ccPercent,
                        ccAmount: res.data.ccAmount,
                        status: res.data.status,
                        agencyId: user.agencyId

                    })
                })
        }
    }, [id])

    // Handle Form Reset
    const handleReset = () => {
        setPmediaRo({
            financialYear: "",
            roNo: "",
            roDate: "",
            clientId: "",
            pmediaId: "",
            centers: "",
            language: "",
            caption: "",
            noOfRecords: "",
            paidDays: "",
            freeDays: "",
            totalCharges: '',
            comissionPercent: "",
            comissionAmount: "",
            chequeNo: "",
            chequeDate: "",
            bankName: "",
            roBillAmount: "",
            instructions: "",
            gstId: "",
            cgstPercent: "",
            cgstAmount: "",
            sgstPercent: "",
            sgstAmount: "",
            igstPercent: "",
            igstAmount: "",
            ccPercent: "",
            ccAmount: "",
            status: ""
        });
    }

    return (
        <>
            <main id="main" className="main">
                <div class="container mt-4">
                    <div class="card shadow">
                        <div class="card-header bg-primary text-white text-center">
                            <h5>P-Media RO Information</h5>
                        </div>
                        <div class="card-body">
                            <form onSubmit={handleSubmit} onReset={handleReset}>
                                {/* <!-- First Row --> */}
                                <div class="row mb-3">
                                    <div class="col-md-2">
                                        <label class="form-label fw-bold">R. O. No</label>
                                        <div className='input-group'>
                                            <input onChange={handleChange} value={pmediaRo.roNo} name="roNo" type="text" class="form-control" />
                                            <button className="btn btn-primary fw-bold" type="button">?</button>
                                        </div>
                                    </div>
                                    <div class="col-md-2">
                                        <label class="form-label fw-bold">R. O. Date</label>
                                        <input onChange={handleChange} value={pmediaRo.roDate} name="roDate" type="date" class="form-control" />
                                    </div>
                                    <div class="col-md-4">
                                        <label class="form-label fw-bold">Media Bill No</label>
                                        <input type="text" class="form-control" />
                                    </div>
                                    <div class="col-md-4">
                                        <label class="form-label fw-bold">Media Bill Amount</label>
                                        <input type="text" class="form-control" />
                                    </div>
                                </div>

                                {/* <!-- Second Row --> */}
                                <div class="row mb-3">
                                    <div class="col-md-4">
                                        <label class="form-label fw-bold">Client</label>
                                        <select onChange={handleChange} value={pmediaRo.clientId} name="clientId" class="form-select">
                                            <option>Select</option>
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
                                    <div class="col-md-4">
                                        <label class="form-label fw-bold">Newspaper</label>
                                        <select onChange={handleChange} value={pmediaRo.pmediaId} name="pmediaId" class="form-select">
                                            <option>Select</option>
                                            {
                                                pmedia.map((pmedia) => {
                                                    //console.log(emedia);
                                                    return (
                                                        <option key={pmedia.id} value={pmedia.id}> {pmedia.name} </option>
                                                    )
                                                })
                                            }
                                        </select>
                                    </div>
                                    <div class="col-md-4">
                                        <label class="form-label fw-bold">Editions</label>
                                        <input type="text" class="form-control" />
                                    </div>
                                </div>

                                {/* <!-- Third Row: Scheme --> */}
                                <div class="row mb-3">
                                    <div class="col-md-2 d-flex align-items-center ">
                                        <label class="form-label fw-bold ">Scheme</label>
                                    </div>
                                    <div class="col-md-5">
                                        <label class="form-label">No of Paid Days</label>
                                        <input onChange={handleChange} value={pmediaRo.paidDays} name="paidDays" type="text" class="form-control" />
                                    </div>
                                    <div class="col-md-5">
                                        <label class="form-label ">No of Free Days</label>
                                        <input onChange={handleChange} value={pmediaRo.freeDays} name="freeDays" type="text" class="form-control" />
                                    </div>
                                </div>

                                {/* <!-- Fourth Row: Cash & Carry Commission --> */}
                                <div class="row mb-3">
                                    <div class="col-md-2 d-flex align-items-center ">
                                        <label class="form-label fw-bold">Cash & Carry Commission</label>
                                    </div>
                                    <div class="col-md-5">
                                        <label class="form-label ">CC Is Available</label>
                                        <select class="form-select">
                                            <option>No</option>
                                            <option>Yes</option>
                                        </select>
                                    </div>
                                    <div class="col-md-5">
                                        <label class="form-label ">CC Percentage</label>
                                        <input onChange={handleChange} value={pmediaRo.ccPercent} name="ccPercent" type="text" class="form-control" />
                                    </div>
                                </div>


                                {/* <!-- Fifth Row: GST --> */}
                                <div class="row mb-3">
                                    <div class="col-md-3">
                                        <label class="form-label fw-bold">GST Tax Type</label>
                                        <select onChange={handleChange} value={pmediaRo.gstId} name="gstId" class="form-select">
                                            <option>Select</option>
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
                                    <div class="col-md-2">
                                        <label class="form-label fw-bold">CGST%</label>
                                        <input onChange={handleChange} value={pmediaRo.cgstPercent} name="cgstPercent" type="number" class="form-control" />
                                    </div>
                                    <div class="col-md-2">
                                        <label class="form-label fw-bold">SGST%</label>
                                        <input onChange={handleChange} value={pmediaRo.sgstPercent} name="sgstPercent" type="number" class="form-control" />
                                    </div>
                                    <div class="col-md-2">
                                        <label class="form-label fw-bold">IGST%</label>
                                        <input onChange={handleChange} value={pmediaRo.igstPercent} name="igstPercent" type="number" class="form-control" />
                                    </div>
                                    <div class="col-md-3 d-flex align-items-end">
                                        <button type="button" class="btn btn-primary w-100">Show Details Form</button>
                                    </div>
                                </div>

                                <div class="mb-3">
                                    <input type="text" class="form-control" readOnly />
                                </div>

                                {/* <!-- Totals Section --> */}
                                <div class="row mb-3">
                                    <div class="col-md-2">
                                        <label class="form-label fw-bold">RO Total</label>
                                        <input type="text" class="form-control" />
                                    </div>
                                    <div class="col-md-2">
                                        <label class="form-label fw-bold">Commission Total</label>
                                        <input onChange={handleChange} value={pmediaRo.comissionAmount} name="comissionAmount" type="text" class="form-control" />
                                    </div>
                                    <div class="col-md-2">
                                        <label class="form-label fw-bold">CGST Total</label>
                                        <input onChange={handleChange} value={pmediaRo.cgstAmount} name="cgstAmount" type="text" class="form-control" />
                                    </div>
                                    <div class="col-md-2">
                                        <label class="form-label fw-bold">SGST Total</label>
                                        <input onChange={handleChange} value={pmediaRo.sgstAmount} name="sgstAmount" type="text" class="form-control" />
                                    </div>
                                    <div class="col-md-2">
                                        <label class="form-label fw-bold">IGST Total</label>
                                        <input onChange={handleChange} value={pmediaRo.igstAmount} name="igstAmount" type="text" class="form-control" />
                                    </div>
                                    <div class="col-md-2">
                                        <label class="form-label fw-bold">GST Total</label>
                                        <input onChange={handleChange} value={pmediaRo.totalCharges} name="totalCharges" type="text" class="form-control" />
                                    </div>
                                </div>

                                <div class="row mb-4">
                                    <div class="col-md-3">
                                        <label class="form-label fw-bold">C & C Amount</label>
                                        <input onChange={handleChange} value={pmediaRo.ccAmount} name="ccAmount" type="text" class="form-control" />
                                    </div>
                                    <div class="col-md-3">
                                        <label class="form-label fw-bold">RO Bill Amount</label>
                                        <input onChange={handleChange} value={pmediaRo.roBillAmount} name="roBillAmount" type="text" class="form-control" />
                                    </div>
                                    <div class="col-md-3">
                                        <label class="form-label fw-bold">Bank Name</label>
                                        <input onChange={handleChange} value={pmediaRo.bankName} name="bankName" type="text" class="form-control" />
                                    </div>
                                    <div class="col-md-3">
                                        <label class="form-label fw-bold">Instructions</label>
                                        <input onChange={handleChange} value={pmediaRo.instructions} name="instructions" type="text" class="form-control" />
                                    </div>
                                </div>

                                {/* <!-- Buttons --> */}
                                <div class="text-center">
                                    <button type="submit" class="btn btn-success me-2">Save</button>
                                    <button type="reset" class="btn btn-danger">Cancel</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </main>


        </>
    )
}

export default NewPMediaRo