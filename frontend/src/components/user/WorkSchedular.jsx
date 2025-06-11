// import axios from "axios";
// import React, { useState, useEffect } from "react";

// function WorkSchedular() {
//     const [month, setMonth] = useState(new Date().getMonth());
//     const [year, setYear] = useState(new Date().getFullYear());
//     const [days, setDays] = useState([]);
//     const [selectedDate, setSelectedDate] = useState(""); //selected date in dd-mm-yyyy format

//     // Load calendar
//     useEffect(() => {
//         generateCalendar(month, year);
//     }, [month, year]);

//     // Auto-update time (every 60 seconds)
//     useEffect(() => {
//         const interval = setInterval(() => {
//             const now = new Date();
//             setMonth(now.getMonth());
//             setYear(now.getFullYear());
//         }, 60000);
//         return () => clearInterval(interval);
//     }, []);

//     function generateCalendar(m, y) {
//         const firstDay = new Date(y, m, 1).getDay();
//         const daysInMonth = new Date(y, m + 1, 0).getDate();

//         const today = new Date();
//         const isCurrentMonth = today.getMonth() === m && today.getFullYear() === y;

//         let calendar = [];
//         let date = 1;

//         for (let i = 0; i < 6; i++) {
//             let week = [];
//             for (let j = 0; j < 7; j++) {
//                 if ((i === 0 && j < firstDay) || date > daysInMonth) {
//                     week.push(null);
//                 } else {
//                     week.push({
//                         date,
//                         isSunday: j === 0,
//                         isToday: isCurrentMonth && date === today.getDate(),
//                     });
//                     date++;
//                 }
//             }
//             calendar.push(week);
//         }

//         setDays(calendar);
//     }

//     const handleOpenModal = (date) => {
//         const fullDate = new Date(year, month, date);
//         const dd = String(fullDate.getDate()).padStart(2, '0');
//         const mm = String(fullDate.getMonth() + 1).padStart(2, '0');
//         const yyyy = fullDate.getFullYear();
//         const formatted = `${dd}-${mm}-${yyyy}`; // dd-mm-yyyy format

//         setSelectedDate(formatted);
//         setWork({ userId: "", title: "", description: "" });

//         const modalElement = document.getElementById("workModal");
//         if (window.bootstrap?.Modal && modalElement) {
//             const modal = new window.bootstrap.Modal(modalElement);
//             modal.show();
//         }
//     };

//     // Get employee data
//     const [employee, setEmployee] = useState([]);
//     useEffect(() => {
//         axios.get(import.meta.env.VITE_BASEURL + "/users")
//             .then((res) => setEmployee(res.data))
//             .catch((err) => console.error("Failed to fetch employees", err));
//     }, []);

//     //to post data work schedule
//     const [work, setWork] = useState({
//         userId: "",
//         title: "",
//         description: "",
//     });

//     const handleChange = (e) => {
//         setWork({ ...work, [e.target.name]: e.target.value });
//     };

//     //to submit data
//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         try {
//             await axios.post(`${import.meta.env.VITE_BASEURL}/workschedules`, {
//                 ...work,
//                 workDate: selectedDate,
//             });
//             alert("Work added successfully!");

//             setWork({ userId: "", title: "", description: "" });

//             const modal = window.bootstrap?.Modal.getInstance(document.getElementById("workModal"));
//             if (modal) modal.hide();
//         } catch (err) {
//             console.error("Error adding work:", err);
//             alert("Error saving work. Please try again.");
//         }
//     };

//     return (
//         <main id="main" className="main">
//             <div className="pagetitle">
//                 <h1>Work-Schedular</h1>
//                 <nav>
//                     <ol className="breadcrumb">
//                         <li className="breadcrumb-item">
//                             <a href="/dashboard" className="text-decoration-none">Home</a>
//                         </li>
//                         <li className="breadcrumb-item active">Work-Schedular</li>
//                     </ol>
//                 </nav>
//             </div>

//             <div className="container mt-3">
//                 <div className="row justify-content-center my-3">
//                     <div className="col-6 col-sm-3 mb-2">
//                         <select className="form-select shadow" value={month} onChange={e => setMonth(Number(e.target.value))}>
//                             {[
//                                 "January", "February", "March", "April", "May", "June",
//                                 "July", "August", "September", "October", "November", "December"
//                             ].map((m, i) => (
//                                 <option key={i} value={i}>{m}</option>
//                             ))}
//                         </select>
//                     </div>
//                     <div className="col-6 col-sm-3 mb-2">
//                         <select className="form-select shadow" value={year} onChange={e => setYear(Number(e.target.value))}>
//                             {[2024, 2025, 2026].map(y => (
//                                 <option key={y} value={y}>{y}</option>
//                             ))}
//                         </select>
//                     </div>
//                 </div>

//                 <div className="card shadow p-3 px-4">
//                     <div className="text-center fw-bold text-primary fs-5 pb-3">
//                         {`${new Date(year, month).toLocaleString('default', { month: 'long' }).toUpperCase()} ${year}`}
//                     </div>

//                     <div className="table-responsive">
//                         <table className="table table-bordered text-center">
//                             <thead className="table-light">
//                                 <tr>
//                                     {["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"].map(day => (
//                                         <th key={day}>{day}</th>
//                                     ))}
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 {days.map((week, i) => (
//                                     <tr key={i}>
//                                         {week.map((day, j) => (
//                                             <td key={j} className={`p-2 ${day?.isSunday ? "bg-light" : ""} ${day?.isToday ? "bg-primary bg-opacity-25 text-dark fw-bold" : ""}`}>
//                                                 {day && (
//                                                     <>
//                                                         <strong>{day.date}</strong>
//                                                         <br />
//                                                         <small>
//                                                             <a href="#" className="text-primary text-decoration-none" onClick={(e) => {
//                                                                 e.preventDefault();
//                                                                 handleOpenModal(day.date);
//                                                             }}>
//                                                                 New Work
//                                                             </a>
//                                                         </small>
//                                                     </>
//                                                 )}
//                                             </td>
//                                         ))}
//                                     </tr>
//                                 ))}
//                             </tbody>
//                         </table>
//                     </div>
//                 </div>
//             </div>

//             {/* Modal */}
//             <div className="modal fade" id="workModal" tabIndex="-1" aria-labelledby="workModalLabel" aria-hidden="true">
//                 <div className="modal-dialog">
//                     <form className="modal-content" onSubmit={handleSubmit}>
//                         <div className="modal-header justify-content-center">
//                             <div className="w-100 text-center">
//                                 <h5 className="modal-title fw-bold" id="workModalLabel">Add New Work</h5>
//                             </div>
//                             <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
//                         </div>
//                         <div className="modal-body">
//                             <div className="row">
//                                 <div className="col-md-6 col-sm-6 mb-3">
//                                     <label className="form-label fw-bold">Work Date</label>
//                                     <input type="text" name="workDate" className="form-control" value={selectedDate} readOnly />
//                                 </div>
//                                 <div className="col-md-6 col-sm-6 mb-3">
//                                     <label className="form-label fw-bold">Employee</label>
//                                     <select onChange={handleChange} name="userId" value={work.userId} className="form-select" required>
//                                         <option value="">Select Employee</option>
//                                         {employee.map(emp => (
//                                             <option key={emp.id} value={emp.id}>{emp.name}</option>
//                                         ))}
//                                     </select>
//                                 </div>
//                             </div>
//                             <div className="mb-3">
//                                 <label className="form-label fw-bold">Work Title</label>
//                                 <input type="text" onChange={handleChange} name="title" value={work.title} className="form-control" required />
//                             </div>
//                             <div className="mb-3">
//                                 <label className="form-label fw-bold">Work Description</label>
//                                 <textarea onChange={handleChange} name="description" value={work.description} className="form-control" rows="3" required />
//                             </div>
//                         </div>
//                         <div className="modal-footer">
//                             <button type="submit" className="btn btn-success">Save</button>
//                             <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Cancel</button>
//                         </div>
//                     </form>
//                 </div>
//             </div>
//         </main>
//     );
// }

// export default WorkSchedular;



import axios from "axios";
import React, { useState, useEffect, useRef } from "react";

function WorkSchedular() {
    const [month, setMonth] = useState(new Date().getMonth());
    const [year, setYear] = useState(new Date().getFullYear());
    const [days, setDays] = useState([]);
    const [selectedDate, setSelectedDate] = useState("");
    const [employee, setEmployee] = useState([]);
    const [work, setWork] = useState({ userId: "", title: "", description: "" });
    const [worksByDate, setWorksByDate] = useState({});
    const [selectedWorks, setSelectedWorks] = useState([]);
    const popoverRefs = useRef({});

    // Load calendar
    useEffect(() => {
        generateCalendar(month, year);
        fetchWorks();
    }, [month, year]);

    // Auto-update time (every 60 seconds)
    useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date();
            setMonth(now.getMonth());
            setYear(now.getFullYear());
        }, 60000);
        return () => clearInterval(interval);
    }, []);

    // Generate calendar
    const generateCalendar = (m, y) => {
        const firstDay = new Date(y, m, 1).getDay();
        const daysInMonth = new Date(y, m + 1, 0).getDate();
        const today = new Date();
        const isCurrentMonth = today.getMonth() === m && today.getFullYear() === y;

        let calendar = [], date = 1;
        for (let i = 0; i < 6; i++) {
            let week = [];
            for (let j = 0; j < 7; j++) {
                if ((i === 0 && j < firstDay) || date > daysInMonth) {
                    week.push(null);
                } else {
                    week.push({
                        date,
                        isSunday: j === 0,
                        isToday: isCurrentMonth && date === today.getDate(),
                    });
                    date++;
                }
            }
            calendar.push(week);
        }
        setDays(calendar);
    };

    // Fetch employee data
    useEffect(() => {
        axios.get(import.meta.env.VITE_BASEURL + "/users")
            .then((res) => setEmployee(res.data))
            .catch((err) => console.error("Failed to fetch employees", err));
    }, []);

    // Fetch work schedules
    const fetchWorks = () => {
        axios.get(`${import.meta.env.VITE_BASEURL}/workschedules`)
            .then((res) => {
                const grouped = res.data.reduce((acc, work) => {
                    if (!acc[work.workDate]) acc[work.workDate] = [];
                    acc[work.workDate].push(work);
                    return acc;
                }, {});
                setWorksByDate(grouped);
            });
    };

    // Initialize popovers
    useEffect(() => {
        const popovers = document.querySelectorAll('[data-bs-toggle="popover"]');
        popovers.forEach(el => {
            new window.bootstrap.Popover(el);
        });
    }, [worksByDate]);

    //
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${import.meta.env.VITE_BASEURL}/workschedules`, {
                ...work,
                workDate: selectedDate,
            });
            alert("Work added successfully!");
            setWork({ userId: "", title: "", description: "" });
            fetchWorks();
            const modal = window.bootstrap?.Modal.getInstance(document.getElementById("workModal"));
            if (modal) modal.hide();
        } catch (err) {
            console.error("Error adding work:", err);
            alert("Error saving work. Please try again.");
        }
    };

    const handleChange = (e) => {
        setWork({ ...work, [e.target.name]: e.target.value });
    };

    const handleOpenModal = (date) => {
        const fullDate = new Date(year, month, date);
        const formatted = formatDate(fullDate);
        setSelectedDate(formatted);
        setWork({ userId: "", title: "", description: "" });
        const modal = new window.bootstrap.Modal(document.getElementById("workModal"));
        modal.show();
    };

    const openDetailModal = (date, works) => {
        setSelectedDate(date);
        setSelectedWorks(works);
        const modal = new window.bootstrap.Modal(document.getElementById("workDetailModal"));
        modal.show();
    };

    const handleToggle = async (workId, currentStatus) => {
        const newStatus = currentStatus === "Done" ? "Not Done" : "Done";
        const updatedWork = selectedWorks.find(w => w.id === workId);
        if (!updatedWork) return;

        try {
            await axios.post(`${import.meta.env.VITE_BASEURL}/workschedules`, {
                ...updatedWork,
                status: newStatus,
                id: workId,
            });
            setSelectedWorks(prev =>
                prev.map(w => (w.id === workId ? { ...w, status: newStatus } : w))
            );
            fetchWorks();
            alert("Work status updated successfully!");
        } catch (err) {
            console.error("Error updating status", err);
            alert("Failed to update work status.");
        }
    };



    const renderPopover = (dateKey, works) => {
        const list = works.map((w, i) => `<div>${i + 1}. ${w.title}</div>`).join('');
        return `<div class='fw-bold'>${dateKey}</div><hr style="margin: 4px 0;" />${list}`;
    };

    const formatDate = (d) => {
        const dd = String(d.getDate()).padStart(2, '0');
        const mm = String(d.getMonth() + 1).padStart(2, '0');
        const yyyy = d.getFullYear();
        return `${dd}-${mm}-${yyyy}`;
    };

    return (
        <main id="main" className="main">
            {/* Page title */}
            <div className="pagetitle">
                <h1>Work-Schedular</h1>
                <nav>
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                            <a href="/dashboard" className="text-decoration-none">Home</a>
                        </li>
                        <li className="breadcrumb-item active">Work-Schedular</li>
                    </ol>
                </nav>
            </div>

            <div className="container mt-3">
                <div className="row justify-content-center my-3">
                    <div className="col-6 col-sm-3 mb-2">
                        <select className="form-select shadow" value={month} onChange={e => setMonth(Number(e.target.value))}>
                            {["January", "February", "March", "April", "May", "June", "July", "August",
                                "September", "October", "November", "December"].map((m, i) => (
                                    <option key={i} value={i}>{m}</option>
                                ))}
                        </select>
                    </div>
                    <div className="col-6 col-sm-3 mb-2">
                        <select className="form-select shadow" value={year} onChange={e => setYear(Number(e.target.value))}>
                            {[2024, 2025, 2026].map(y => (
                                <option key={y} value={y}>{y}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="card shadow p-3 px-4">
                    <div className="text-center fw-bold text-primary fs-5 pb-3">
                        {`${new Date(year, month).toLocaleString('default', { month: 'long' }).toUpperCase()} ${year}`}
                    </div>

                    <div className="table-responsive">
                        <table className="table table-bordered text-center">
                            <thead className="table-light">
                                <tr>
                                    {["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"].map(day => (
                                        <th key={day}>{day}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {days.map((week, i) => (
                                    <tr key={i}>
                                        {week.map((day, j) => {
                                            if (!day) return <td key={j}></td>;

                                            const fullDate = new Date(year, month, day.date);
                                            const formatted = formatDate(fullDate);
                                            const workList = worksByDate[formatted] || [];
                                            const showNewWorkLink = fullDate >= new Date(new Date().setHours(0, 0, 0, 0));

                                            return (
                                                <td key={j} className={`p-2 ${day.isSunday ? "bg-light" : ""} ${day.isToday ? "bg-primary bg-opacity-25 text-dark fw-bold" : ""}`}>
                                                    <div><strong>{day.date}</strong></div>

                                                    {workList.length > 0 && (
                                                        <div className="mt-1">
                                                            <span
                                                                className="badge fw-bold text-dark bg-warning cursor-pointer"
                                                                // style={{ backgroundColor: "#fde047", cursor: "pointer" }}
                                                                ref={(el) => popoverRefs.current[formatted] = el}
                                                                data-bs-toggle="popover"
                                                                data-bs-html="true"
                                                                data-bs-trigger="hover"
                                                                data-bs-placement="right"
                                                                data-bs-content={renderPopover(formatted, workList)}
                                                                onClick={() => openDetailModal(formatted, workList)}
                                                                role="button"
                                                            >
                                                                Work : {workList.length}
                                                            </span>
                                                        </div>
                                                    )}

                                                    {showNewWorkLink && (
                                                        <div className="mt-1">
                                                            <small>
                                                                <a href="#" className="text-primary text-decoration-none" onClick={(e) => {
                                                                    e.preventDefault();
                                                                    handleOpenModal(day.date);
                                                                }}>New Work</a>
                                                            </small>
                                                        </div>
                                                    )}
                                                </td>
                                            );
                                        })}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Add Work Modal */}
            <div className="modal fade" id="workModal" tabIndex="-1" aria-hidden="true">
                <div className="modal-dialog">
                    <form className="modal-content" onSubmit={handleSubmit}>
                        <div className="modal-header justify-content-center">
                            <div className="w-100 text-center">
                                <h5 className="modal-title fw-bold">Add New Work</h5>
                            </div>
                            <button type="button" className="btn-close position-absolute end-0 me-3" data-bs-dismiss="modal" />
                        </div>
                        <div className="modal-body">
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label className="form-label fw-bold">Work Date</label>
                                    <input type="text" name="workDate" className="form-control" value={selectedDate} readOnly />
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label className="form-label fw-bold">Employee</label>
                                    <select onChange={handleChange} name="userId" value={work.userId} className="form-select" required>
                                        <option value="">Select</option>
                                        {employee.map(emp => (
                                            <option key={emp.id} value={emp.id}>{emp.name}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className="mb-3">
                                <label className="form-label fw-bold">Work Title</label>
                                <input type="text" onChange={handleChange} name="title" value={work.title} className="form-control" required />
                            </div>
                            <div className="mb-3">
                                <label className="form-label fw-bold">Work Description</label>
                                <textarea onChange={handleChange} name="description" value={work.description} className="form-control" rows="3" required />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="submit" className="btn btn-success">Save</button>
                            <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Cancel</button>
                        </div>
                    </form>
                </div>
            </div>

            {/* Work Detail Modal */}
            <div className="modal fade" id="workDetailModal" tabIndex="-1" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <div className="w-100 text-center">
                                <h5 className="modal-title fw-bold">Works to be done on : {selectedDate}</h5>
                            </div>
                            <button type="button" className="btn-close position-absolute end-0 me-3" data-bs-dismiss="modal" />
                        </div>
                        <div className="modal-body">
                            <table className="table table-bordered text-center">
                                <thead className="table-light">
                                    <tr>
                                        <th>No</th>
                                        <th>Employee</th>
                                        <th>Title</th>
                                        <th>Description</th>
                                        <th>Done ?</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {selectedWorks.map((w, idx) => (
                                        <tr key={w.id}>
                                            <td>{idx + 1}</td>
                                            <td>{employee.find(e => e.id === w.userId)?.name || "Unknown"}</td>
                                            <td>{w.title}</td>
                                            <td>{w.description}</td>
                                            <td>
                                                <div className="form-check form-switch d-flex justify-content-center">
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        checked={w.status === "Done"}
                                                        onChange={() => handleToggle(w.id, w.status)}
                                                    />
                                                    <label className="form-check-label ms-2">
                                                        {w.status === "Done" ? "Yes" : "No"}
                                                    </label>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="modal-footer justify-content-center">
                            <button className="btn btn-danger" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default WorkSchedular;





















