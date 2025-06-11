import React from 'react'
import axios from 'axios';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

function Employees() {
    const [id, setId] = useState(null); // State to store the ID of the employee being updated
    let user = JSON.parse(localStorage.getItem("user"));

    //to get data 
    const [employeeData, setEmployeeData] = useState([]);

    function loadData() {
        //console.log(import.meta.env.VITE_BASEURL + "/users");
        axios.get(import.meta.env.VITE_BASEURL + "/users")
            .then((res) => {
                console.log(res.data);
                setEmployeeData(res.data);
            })
            .catch((error) => console.error("Error fetching users:", error));
    };

    useEffect(() => {
        loadData()
    }, [])

    //to get Role data
    const [role, setRole] = useState([]);
    useEffect(() => {
        axios.get(import.meta.env.VITE_BASEURL + "/roles")
            .then((res) => {
                // console.log(res.data);
                setRole(res.data);
            })
    }, [])

    //to post data  
    const [employee, setEmployee] = useState({
        name: "",
        roleId: "",
        email: "",
        password: "",
        agencyId: user.agencyId
    });

    // Handle Input Change
    const handleChangeEmployeeData = (e) => {
        //console.log(e.target.value)
        setEmployee({ ...employee, [e.target.name]: e.target.value });
    };

    // Handle Form Submission (Save Or Update)
    const handleSubmitEmployeeData = async (e) => {
        e.preventDefault();
        //console.log(employee);
        // console.log(import.meta.env.VITE_BASEURL);
        // axios.post("http://localhost:8081/users", users)
        //   .then((res) => {
        //     console.log(res.data.data);
        //   })
        if (!id) {
            try {
                const response = await axios.post(`${import.meta.env.VITE_BASEURL}/users`, employee);
                alert("employee added successfully!");
                console.log(response.data);
                setEmployee({ name: "", roleId: "", email: "", password: "" }); // Clear form
            } catch (error) {
                console.error("Error adding employee:", error);
            }
        } else {
            try {
                const response = await axios.post(`${import.meta.env.VITE_BASEURL}/users`, { ...employee, id }); // Include ID for update
                alert("Employee updated successfully!");
                console.log(response.data);
                setId(null); // Reset ID after updating
                setEmployee({ name: "", roleId: "", email: "", password: "" }); // Clear form
            } catch (error) {
                console.error("Error updating Employee:", error);
            }
        }

        loadData(); // Refresh Employee list after operation
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
                axios.delete(import.meta.env.VITE_BASEURL + "/users/" + id)
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
        axios.get(import.meta.env.VITE_BASEURL + "/users/" + id)
            .then((res) => {
                //console.log(res.data.data);

                // Populate the form fields with fetched employee data
                setEmployee({
                    name: res.data.name,
                    roleId: res.data.roleId,
                    email: res.data.email,
                    password: res.data.password,
                    // agencyId: res.data.agencyId
                });
                // console.log(res.data.password);

                setId(id); // Store the ID to switch to "update mode"
            })
            .catch((err) => {
                console.error("Error fetching role data:", err);
            });

    };

    //To reset form
    const handleReset = () => {
        setEmployee({
            name: "",
            roleId: "",
            email: "",
            password: ""
        });
        setId(null); // Reset ID when form is reset
    };

    return (
        <>
            <main id="main" className="main">

                <div class="pagetitle">
                    <h1>Employees</h1>
                    <nav>
                        <ol class="breadcrumb">
                            <li class="breadcrumb-item"><a href='/dashboard' class="text-decoration-none">Home</a></li>
                            <li class="breadcrumb-item"><a>Masters</a></li>
                            <li class="breadcrumb-item active">Employees</li>
                        </ol>
                    </nav>
                </div>

                {/* Employee form */}
                <div class="container mt-4">
                    <div class="card shadow">
                        <div class="card-body">
                            <form onSubmit={handleSubmitEmployeeData}>
                                {/* <!-- First Row: Employee Name & Role --> */}
                                <div class="row mb-3">
                                    <div class="col-md-6 col-sm-6">
                                        <label for="employeeName" class="form-label fw-bold">Employee Name <span class="text-danger">*</span></label>
                                        <input type="text" onChange={handleChangeEmployeeData} value={employee.name} class="form-control" name="name" placeholder="Enter employee name" required />
                                    </div>
                                    <div class="col-md-6 col-sm-6">
                                        <label for="role" class="form-label fw-bold">Role <span class="text-danger">*</span></label>
                                        <select value={employee.roleId} onChange={handleChangeEmployeeData} class="form-select" name="roleId" required>
                                            <option value="">Select Role</option>
                                            {
                                                role.map((role) => {
                                                    //console.log(roleData);
                                                    return (
                                                        <option value={role.id}> {role.name} </option>
                                                    )
                                                })
                                            }
                                        </select>
                                    </div>
                                </div>

                                {/* <!-- Second Row: Email & Password --> */}
                                <div class="row mb-3">
                                    <div class="col-md-6 col-sm-6">
                                        <label for="email" class="form-label fw-bold">Email <span class="text-danger">*</span></label>
                                        <input type="email" onChange={handleChangeEmployeeData} value={employee.email} class="form-control" name="email" placeholder="Enter email" required />
                                    </div>
                                    <div class="col-md-6 col-sm-6">
                                        <label for="password" class="form-label fw-bold">Password <span class="text-danger">*</span></label>
                                        <input type="text" onChange={handleChangeEmployeeData} value={employee.password} class="form-control" name="password" placeholder="Enter password" required />
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

                {/* Employee Table */}
                <div class="container mt-5">
                    <div class="card shadow-lg">
                        <div class="card-body">
                            <div className="table-responsive">
                                <table class="table table-hover table-bordered text-center">
                                    <thead class="table-secondary">
                                        <tr>
                                            <th>No</th>
                                            <th>Employee Name</th>
                                            <th>Role</th>
                                            <th>Email</th>
                                            <th>Password</th>
                                            {/* <th>Agency</th> */}
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                        {
                                            employeeData.map((eachData, index) => {
                                                return (
                                                    <tr>
                                                        <td>{index + 1}</td>
                                                        <td>{eachData.name}</td>
                                                        <td>{eachData.rolename}</td>
                                                        <td>{eachData.email}</td>
                                                        <td>{eachData.password}</td>
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

export default Employees