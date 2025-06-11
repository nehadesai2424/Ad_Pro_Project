import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

function EMedia() {
    const [id, setId] = useState(null); // State to store the ID of the client being updated
    let user = JSON.parse(localStorage.getItem("user")); 

    //to get data from backend
    const [emediaData, setEmediaData] = useState([]);

    function loadData() {
        //console.log(import.meta.env.VITE_BASEURL + "/pmedias");
        axios.get(import.meta.env.VITE_BASEURL + "/emedias")
            .then((res) => {
                console.log(res.data);
                setEmediaData(res.data);
            })
            .catch((error) => console.error("Error fetching e-media:", error));
    };

    useEffect(() => {
        loadData()
    }, [])

    // to get state data
    const [state, setState] = useState([]);
    useEffect(() => {
        axios.get(import.meta.env.VITE_BASEURL + "/states")
            .then((res) => {
                // console.log(res.data);
                setState(res.data);
            })
    }, [])

    //to post data
    const [emedia, setEmedia] = useState({
        name: "",
        contact: "",
        address: "",
        stateId: "",
        gstNo: "",
        agencyId: user.agencyId
    });

    // Handle Input Change
    const handleChangeEmediaData = (e) => {
        //console.log(e.target.value)
        setEmedia({ ...emedia, [e.target.name]: e.target.value });
    };


    // Handle Form Submission (Save Or Update)
    const handleSubmitEmediaData = async (e) => {
        e.preventDefault();

        if (!id) {
            try {
                const response = await axios.post(`${import.meta.env.VITE_BASEURL}/emedias`, emedia);
                alert("Emedia added successfully!");
                console.log(response.data);
                setEmedia({ name: "", contact: "", address: "", stateId: "", gstNo: "" }); // Clear form
            } catch (error) {
                console.error("Error adding Emedia:", error);
            }
        } else {
            try {
                const response = await axios.post(`${import.meta.env.VITE_BASEURL}/emedias`, { ...emedia, id }); // Include ID for update
                alert("Emedia updated successfully!");
                console.log(response.data);
                setId(null); // Reset ID after updating
                setEmedia({ name: "", contact: "", address: "", stateId: "", gstNo: "" }); // Clear form
            } catch (error) {
                console.error("Error updating Emedia:", error);
            }
        }

        loadData(); // Refresh Emedia list after operation
    };

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
                axios.delete(import.meta.env.VITE_BASEURL + "/emedias/" + id)
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

    //To get data in form for update
    function handleUpdate(id) {
        axios.get(import.meta.env.VITE_BASEURL + "/emedias/" + id)
            .then((res) => {
                //console.log(res.data.data);

                // Populate the form fields with fetched emdeia data
                setEmedia({
                    name: res.data.name,
                    contact: res.data.contact,
                    address: res.data.address,
                    stateId: res.data.stateId,
                    gstNo: res.data.gstNo,
                    agencyId: res.data.agencyId
                });

                setId(id); // Store the ID to switch to "update mode"
            })
            .catch((err) => {
                console.error("Error fetching emedia data:", err);
            });

    };

    //To reset form
    function handleReset() {
        setEmedia({
            name: "",
            contact: "",
            address: "",
            stateId: "",
            gstNo: ""
        });
        setId(null); // Reset ID when form is reset
    }

    return (
        <>
            <main id="main" className="main">

                <div class="pagetitle">
                    <h1>E-Media</h1>
                    <nav>
                        <ol class="breadcrumb">
                        <li class="breadcrumb-item"><a href='/dashboard' class="text-decoration-none">Home</a></li>
                            <li class="breadcrumb-item"><a>Masters</a></li>
                            <li class="breadcrumb-item active">E-Media</li>
                        </ol>
                    </nav>
                </div>

                {/* E-Media Form */}
                <div class="container mt-4">
                    <div class="card shadow">
                        <div class="card-body">
                            <form onSubmit={handleSubmitEmediaData}>
                                {/* <!-- First Row: Name & Contact --> */}
                                <div class="row mb-3">
                                    <div class="col-md-6 col-sm-6">
                                        <label for="emediaName" class="form-label fw-bold">Name <span class="text-danger">*</span></label>
                                        <input onChange={handleChangeEmediaData} value={emedia.name} name="name" type="text" class="form-control" placeholder="Enter name" required />
                                    </div>
                                    <div class="col-md-6 col-sm-6">
                                        <label for="contact" class="form-label fw-bold">Contact <span class="text-danger">*</span></label>
                                        <input onChange={handleChangeEmediaData} value={emedia.contact} name="contact" type="tel" class="form-control" id="contact" placeholder="Enter contact number" required />
                                    </div>
                                </div>

                                {/* <!-- Second Row: Address --> */}
                                <div class="row mb-3">
                                    <div class="col-md-12">
                                        <label for="address" class="form-label fw-bold">Address <span class="text-danger">*</span></label>
                                        <textarea onChange={handleChangeEmediaData} value={emedia.address} name="address" class="form-control" id="address" rows="2" placeholder="Enter address" required></textarea>
                                    </div>
                                </div>

                                {/* <!-- Third Row: State & GST Number --> */}
                                <div class="row mb-3">
                                    <div class="col-md-6 col-sm-6">
                                        <label for="state" class="form-label fw-bold">State <span class="text-danger">*</span></label>
                                        <select onChange={handleChangeEmediaData} value={emedia.stateId} name="stateId" class="form-select" id="stateId" required>
                                            <option value={""}>Select State</option>
                                            {
                                                state.map((state) => {
                                                    //console.log(roleData);
                                                    return (
                                                        <option key={state.id} value={state.id}> {state.name} </option>
                                                    )
                                                })
                                            }
                                        </select>
                                    </div>
                                    <div class="col-md-6 col-sm-6">
                                        <label for="gst" class="form-label fw-bold">GST Number <span class="text-danger">*</span></label>
                                        <input onChange={handleChangeEmediaData} value={emedia.gstNo} name="gstNo" type="text" class="form-control" id="gst" placeholder="Enter GST number" required />
                                    </div>
                                </div>

                                {/* <!-- Buttons --> */}
                                <div class="d-flex justify-content-end">
                                    <button type="submit" class="btn btn-success me-2">Save</button>
                                    <button type="reset" class="btn btn-danger" onClick={handleReset}>Cancel</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

                {/* E-Media Table */}
                <div class="container mt-5">
                    <div class="card shadow-lg">
                        <div class="card-body">
                            <div className="table-responsive">
                                <table class="table table-hover table-bordered text-center">
                                    <thead class="table-secondary">
                                        <tr>
                                            <th>No</th>
                                            <th>Name</th>
                                            <th>Contact</th>
                                            <th>Address</th>
                                            <th>State</th>
                                            {/* <th>Agency</th> */}
                                            <th>GST No.</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            emediaData.map((eachData, index) => {
                                                return (
                                                    <tr>
                                                        <td>{index + 1}</td>
                                                        <td>{eachData.name}</td>
                                                        <td>{eachData.contact}</td>
                                                        <td>{eachData.address}</td>
                                                        <td>{eachData.stateName}</td>
                                                        <td>{eachData.gstNo}</td>
                                                        <td>
                                                            <div className="d-flex justify-content-center flex-wrap gap-1">
                                                                <button className="btn btn-primary btn-sm" onClick={() => handleUpdate(eachData.id)}>
                                                                    <i className="bi bi-pencil-square"></i>
                                                                </button>
                                                                <button className="btn btn-danger btn-sm" onClick={() => handleDelete(eachData.id)} >
                                                                    <i className="bi bi-trash"></i>
                                                                </button>
                                                            </div>
                                                        </td>

                                                    </tr>
                                                )
                                            })
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

export default EMedia