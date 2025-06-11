import React from 'react'
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

function NewEMediaRo() {

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
    const [emedia, setEmedia] = useState([]);
    useEffect(() => {
        axios.get(import.meta.env.VITE_BASEURL + "/emedias")
            .then((res) => {
                setEmedia(res.data);
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
    const [emediaRo, setEmediaRo] = useState({
        agencyId: user.agencyId,
        financialYear: "",
        roNo: "",
        roDate: "",
        clientId: "",
        emediaId: "",
        centers: "",
        language: "",
        caption: "",
        noOfRecords: "",
        totalSpots: "",
        totalCharges: "",
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
        setEmediaRo({ ...emediaRo, [e.target.name]: e.target.value });
    };

    // Handle Form Submission (Save Or Update)
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!id) {
            try {
                const response = await axios.post(`${import.meta.env.VITE_BASEURL}/emediaros`, emediaRo);
                alert("Emedia-Ro added successfully!");
                console.log(response.data);
                setEmediaRo({ financialYear: "", roNo: "", roDate: "", clientId: "", emediaId: "", centers: "", language: "", caption: "", noOfRecords: "", totalSpots: "", totalCharges: "", comissionPercent: "", comissionAmount: "", chequeNo: "", chequeDate: "", bankName: "", roBillAmount: "", instructions: "", gstId: "", cgstPercent: "", cgstAmount: "", sgstPercent: "", sgstAmount: "", igstPercent: "", igstAmount: "", ccPercent: "", ccAmount: "", status: "" }); // Clear form
            } catch (error) {
                console.error("Error adding Emedia-Ro:", error);
            }
        } else {
            try {
                const response = await axios.post(`${import.meta.env.VITE_BASEURL}/emediaros`, { ...emediaRo, id }); // Include ID for update
                alert("Emedia-Ro updated successfully!");
                console.log(response.data);
                setId(null); // Reset ID after updating
                setEmediaRo({ financialYear: "", roNo: "", roDate: "", clientId: "", emediaId: "", centers: "", language: "", caption: "", noOfRecords: "", totalSpots: "", totalCharges: "", comissionPercent: "", comissionAmount: "", chequeNo: "", chequeDate: "", bankName: "", roBillAmount: "", instructions: "", gstId: "", cgstPercent: "", cgstAmount: "", sgstPercent: "", sgstAmount: "", igstPercent: "", igstAmount: "", ccPercent: "", ccAmount: "", status: "", }); // Clear form
            } catch (error) {
                console.error("Error updating Emedia-Ro:", error);
            }
        }
        navigate("/e-media-ro") // Redirect to the e-media-ro list page after submission
    };

    //to get the invoice data from the backend for update
    useEffect(() => {
        if (id) {
            axios.get(import.meta.env.VITE_BASEURL + "/emediaros/" + id)
                .then((res) => {
                    console.log(res.data);
                    setEmediaRo({
                        roNo: res.data.roNo,
                        roDate: res.data.roDate,
                        clientId: res.data.clientId,
                        emediaId: res.data.emediaId,
                        centers: res.data.centers,
                        language: res.data.language,
                        caption: res.data.caption,
                        noOfRecords: res.data.noOfRecords,
                        totalSpots: res.data.totalSpots,
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
                        financialYear: res.data.financialYear,
                        agencyId: user.agencyId
                    })
                })
        }
    }, [id])

    // Handle Form Reset
    const handleReset = () => {
        setEmediaRo({
            financialYear: "",
            roNo: "",
            roDate: "",
            clientId: "",
            emediaId: "",
            centers: "",
            language: "",
            caption: "",
            noOfRecords: "",
            totalSpots: "",
            totalCharges: "",
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
                            <h5>E-Media RO Information</h5>
                        </div>
                        <div class="card-body">
                            <form onSubmit={handleSubmit} onReset={handleReset}>
                                <div class="row mb-3">
                                    <div class="col-md-2">
                                        <label class="form-label fw-bold">R. O. No</label>
                                        <div className="input-group">
                                            <input onChange={handleChange} value={emediaRo.roNo} name="roNo" type="text" class="form-control" />
                                            <button className="btn btn-primary fw-bold" type="button">?</button>
                                        </div>
                                    </div>
                                    <div class="col-md-2">
                                        <label class="form-label fw-bold">R. O. Date</label>
                                        <input onChange={handleChange} value={emediaRo.roDate} name="roDate" type="date" class="form-control" />
                                    </div>
                                    <div class="col-md-4">
                                        <label class="form-label fw-bold">Media Bill No</label>
                                        <input name="roDate" type="text" class="form-control" />
                                    </div>
                                    <div class="col-md-4">
                                        <label class="form-label fw-bold">Media Bill Amount</label>
                                        <input type="text" class="form-control" />
                                    </div>
                                </div>

                                <div class="row mb-3">
                                    <div class="col-md-6">
                                        <label class="form-label fw-bold">Client</label>
                                        <select onChange={handleChange} value={emediaRo.clientId} name="clientId" class="form-select">
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
                                    <div class="col-md-6">
                                        <label class="form-label fw-bold">Publication</label>
                                        <select onChange={handleChange} value={emediaRo.emediaId} name="emediaId" class="form-select">
                                            <option>Select</option>
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
                                </div>

                                <div class="row mb-3">
                                    <div class="col-md-6">
                                        <label class="form-label fw-bold">Broadcast Center</label>
                                        <input onChange={handleChange} value={emediaRo.centers} name="centers" type="text" class="form-control" />
                                    </div>
                                    <div class="col-md-6">
                                        <label class="form-label fw-bold">Language</label>
                                        <select onChange={handleChange} value={emediaRo.language} name="language" class="form-select">
                                            <option value="">Select</option>
                                            <option>Marathi</option>
                                            <option>Hindi</option>
                                            <option>English</option>
                                        </select>
                                    </div>
                                </div>

                                <div class="row mb-3">
                                    <div class="col-md-4">
                                        <label class="form-label fw-bold">Caption</label>
                                        <input onChange={handleChange} value={emediaRo.caption} name="caption" type="text" class="form-control" />
                                    </div>
                                    <div class="col-md-4">
                                        <label class="form-label fw-bold">No. of Records</label>
                                        <input onChange={handleChange} value={emediaRo.noOfRecords} name="noOfRecords" type="text" class="form-control" />
                                    </div>
                                    <div class="col-md-4 d-flex align-items-end">
                                        <button type="button" class="btn btn-primary w-100">Fill Spot Location</button>
                                    </div>
                                </div>

                                <div class="mb-3">
                                    <input type='text' class="form-control" rows="3" readOnly></input>
                                </div>

                                <div class="row mb-3">
                                    <div class="col-md-2">
                                        <label class="form-label fw-bold">Total Spots</label>
                                        <input onChange={handleChange} value={emediaRo.totalSpots} name="totalSpots" type="text" class="form-control" />
                                    </div>
                                    <div class="col-md-2">
                                        <label class="form-label fw-bold">Total Charges</label>
                                        <input onChange={handleChange} value={emediaRo.totalCharges} name="totalCharges" type="text" class="form-control" />
                                    </div>
                                    <div class="col-md-2">
                                        <label class="form-label fw-bold">Commission (%)</label>
                                        <input onChange={handleChange} value={emediaRo.comissionPercent} name="comissionPercent" type="text" class="form-control" />
                                    </div>
                                    <div class="col-md-3">
                                        <label class="form-label fw-bold">Commission Amount</label>
                                        <input onChange={handleChange} value={emediaRo.comissionAmount} name="comissionAmount" type="text" class="form-control" />
                                    </div>
                                    <div class="col-md-3">
                                        <label class="form-label fw-bold">GST Tax Type</label>
                                        <select onChange={handleChange} value={emediaRo.gstId} name="gstId" class="form-select">
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
                                </div>

                                <div class="row mb-3">
                                    <div class="col-md-2">
                                        <label class="form-label fw-bold">CGST %</label>
                                        <input onChange={handleChange} value={emediaRo.cgstPercent} name="cgstPercent" type="number" class="form-control" />
                                    </div>
                                    <div class="col-md-2">
                                        <label class="form-label fw-bold">CGST Amount</label>
                                        <input onChange={handleChange} value={emediaRo.cgstAmount} name="cgstAmount" type="number" class="form-control" />
                                    </div>
                                    <div class="col-md-2">
                                        <label class="form-label fw-bold">SGST %</label>
                                        <input onChange={handleChange} value={emediaRo.sgstPercent} name="sgstPercent" type="number" class="form-control" />
                                    </div>
                                    <div class="col-md-2">
                                        <label class="form-label fw-bold">SGST Amount</label>
                                        <input onChange={handleChange} value={emediaRo.sgstAmount} name="sgstAmount" type="number" class="form-control" />
                                    </div>
                                    <div class="col-md-2">
                                        <label class="form-label fw-bold">IGST %</label>
                                        <input onChange={handleChange} value={emediaRo.igstPercent} name="igstPercent" type="number" class="form-control" />
                                    </div>
                                    <div class="col-md-2">
                                        <label class="form-label fw-bold">IGST Amount</label>
                                        <input onChange={handleChange} value={emediaRo.igstAmount} name="igstAmount" type="number" class="form-control" />
                                    </div>
                                </div>

                                <div class="row mb-3">
                                    <div class="col-md-4">
                                        <label class="form-label fw-bold">Cheque No</label>
                                        <input onChange={handleChange} value={emediaRo.chequeNo} name="chequeNo" type="text" class="form-control" />
                                    </div>
                                    <div class="col-md-4">
                                        <label class="form-label fw-bold">Cheque Date</label>
                                        <input onChange={handleChange} value={emediaRo.chequeDate} name="chequeDate" type="date" class="form-control" />
                                    </div>
                                    <div class="col-md-4">
                                        <label class="form-label fw-bold">Bank Name</label>
                                        <input onChange={handleChange} value={emediaRo.bankName} name="bankName" type="text" class="form-control" />
                                    </div>
                                </div>

                                <div class="row mb-3">
                                    <div class="col-md-6">
                                        <label class="form-label fw-bold">RO Bill Amount</label>
                                        <input onChange={handleChange} value={emediaRo.roBillAmount} name="roBillAmount" type="number" class="form-control" />
                                    </div>
                                    <div class="col-md-6">
                                        <label class="form-label fw-bold">Instructions</label>
                                        <textarea onChange={handleChange} value={emediaRo.instructions} name="instructions" class="form-control" rows="2"></textarea>
                                    </div>
                                </div>

                                <div class="text-center">
                                    <button type="submit" class="btn btn-success me-2">Save</button>
                                    <button type="reset" class="btn btn-danger me-2">Cancel</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

            </main>
        </>
    )
}

export default NewEMediaRo