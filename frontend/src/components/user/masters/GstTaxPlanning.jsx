import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

function GstTaxPlanning() {
  const [id, setId] = useState(null); // State to track the ID of the item being updated
  let user = JSON.parse(localStorage.getItem("user"));

  //to get data from backend
  const [gstData, setGstData] = useState([]);

  function loadData() {
    //console.log(import.meta.env.VITE_BASEURL + "/gst");
    axios.get(import.meta.env.VITE_BASEURL + "/gsts")
      .then((res) => {
        console.log(res.data);
        setGstData(res.data);
      })
      .catch((error) => console.error("Error fetching gst :", error));
  };

  useEffect(() => {
    loadData()
  }, []);

  //to post data
  const [gst, setGst] = useState({
    title: "",
    gstCode: "",
    cgstPercent: "",
    sgstPercent: "",
    igstPercent: "",
    agencyId: user.agencyId
  });

  // Handle Input Change
  const handleChangeGstData = (e) => {
    //console.log(e.target.value)
    setGst({ ...gst, [e.target.name]: e.target.value });
    console.log(gst);
  };

  // Handle Form Submission (Save Or Update)
  const handleSubmitGstData = async (e) => {
    e.preventDefault();

    if (!id) {
      try {
        const response = await axios.post(`${import.meta.env.VITE_BASEURL}/gsts`, gst); // No ID for new entry
        alert("Gst added successfully!");
        console.log(response.data);
        setGst({ title: "", gstCode: "", cgstPercent: "", sgstPercent: "", igstPercent: "" }); // Clear form
      } catch (error) {
        console.error("Error adding Gst:", error);
      }
    } else {
      try {
        const response = await axios.post(`${import.meta.env.VITE_BASEURL}/gsts`, { ...gst, id }); // Include ID for update
        alert("Gst updated successfully!");
        console.log(response.data);
        setId(null); // Reset ID after updating
        setGst({ title: "", gstCode: "", cgstPercent: "", sgstPercent: "", igstPercent: "" }); // Clear form
      } catch (error) {
        console.error("Error updating Gst:", error);
      }
    }

    loadData(); // Refresh gst list after operation
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
        axios.delete(import.meta.env.VITE_BASEURL + "/gsts/" + id)
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
  };


  //To get data in form for update
  function handleUpdate(id) {
    axios.get(import.meta.env.VITE_BASEURL + "/gsts/" + id)
      .then((res) => {
        //console.log(res.data.data);

        // Populate the form fields with fetched gst data
        setGst({
          id: res.data.id,
          agencyId: res.data.agencyId,
          title: res.data.title,
          gstCode: res.data.gstCode,
          cgstPercent: res.data.cgstPercent,
          sgstPercent: res.data.sgstPercent,
          igstPercent: res.data.igstPercent,
        });

        setId(id); // Store the ID to switch to "update mode"
      })
      .catch((err) => {
        console.error("Error fetching gst data:", err);
      });
  };

  //To reset form
  function handleReset() {
    setGst({
      title: "",
      gstCode: "",
      cgstPercent: "",
      sgstPercent: "",
      igstPercent: ""
    });
    setId(null); // Reset ID when form is reset
  };

  return (
    <>
      <main id="main" className="main">

        <div class="pagetitle">
          <h1>GST Tax Planning</h1>
          <nav>
            <ol class="breadcrumb">
              <li class="breadcrumb-item"><a href='/dashboard' class="text-decoration-none">Home</a></li>
              <li class="breadcrumb-item"><a>Masters</a></li>
              <li class="breadcrumb-item active">GST Tax Planning</li>
            </ol>
          </nav>
        </div>
        {/* GST Tax Planning form */}
        <div class="container mt-4">
          <div class="card shadow">
            <div class="card-body">
              <form onSubmit={handleSubmitGstData}>
                {/* <!-- First Row: GST Plan Title & GST Code --> */}
                <div class="row mb-3">
                  <div class="col-md-6 col-sm-6">
                    <label for="gstTitle" class="form-label fw-bold">GST Plan Title <span class="text-danger">*</span></label>
                    <input onChange={handleChangeGstData} value={gst.title} name="title" type="text" class="form-control" placeholder="Enter GST Plan Title" required />
                  </div>
                  <div class="col-md-6 col-sm-6">
                    <label for="gstCode" class="form-label fw-bold">GST Code <span class="text-danger">*</span></label>
                    <input onChange={handleChangeGstData} value={gst.gstCode} name="gstCode" type="text" class="form-control" placeholder="Enter GST Code" required />
                  </div>
                </div>

                {/* <!-- Second Row: CGST, SGST, IGST Percent --> */}
                <div class="row mb-3">
                  <div class="col-md-4 col-sm-4">
                    <label for="cgst" class="form-label fw-bold">CGST Percent <span class="text-danger">*</span></label>
                    <input onChange={handleChangeGstData} value={gst.cgstPercent} name="cgstPercent" type="number" class="form-control" placeholder="Enter CGST Percent" required />
                  </div>
                  <div class="col-md-4 col-sm-4">
                    <label for="sgst" class="form-label fw-bold">SGST Percent <span class="text-danger">*</span></label>
                    <input onChange={handleChangeGstData} value={gst.sgstPercent} name="sgstPercent" type="number" class="form-control" placeholder="Enter SGST Percent" required />
                  </div>
                  <div class="col-md-4 col-sm-4">
                    <label for="igst" class="form-label fw-bold">IGST Percent <span class="text-danger">*</span></label>
                    <input onChange={handleChangeGstData} value={gst.igstPercent} name="igstPercent" type="number" class="form-control" placeholder="Enter IGST Percent" required />
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

        {/* Tax Planning Table */}
        <div className="container mt-5">
          <div className="card shadow-lg">
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-hover table-bordered text-center">
                  <thead className="table-secondary">
                    <tr>
                      <th>No</th>
                      <th>GST Plan Title</th>
                      <th>GST Code</th>
                      <th>CGST (%)</th>
                      <th>SGST (%)</th>
                      <th>IGST (%)</th>
                      {/* <th>Agency</th> */}
                      {/* <th>Created By</th> */}
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      gstData.map((eachData, index) => {
                        return (
                          <tr key={eachData.id}>
                            <td>{index + 1}</td>
                            <td>{eachData.title}</td>
                            <td>{eachData.gstCode}</td>
                            <td>{eachData.cgstPercent}</td>
                            <td>{eachData.sgstPercent}</td>
                            <td>{eachData.igstPercent}</td>
                            {/* <td>{eachData.agencyId}</td> */}

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

export default GstTaxPlanning