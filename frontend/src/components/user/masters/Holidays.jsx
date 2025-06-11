// import React, { useState, useEffect, useRef } from "react";
// import axios from "axios";
// import Swal from "sweetalert2";

// function Holidays() {
//     const [month, setMonth] = useState(new Date().getMonth());
//     const [year, setYear] = useState(new Date().getFullYear());
//     const [days, setDays] = useState([]);
//     const [holidayList, setHolidayList] = useState([]);
//     const [holiday, setHoliday] = useState({ holidayDate: "", reason: "", every_year: "No" });
//     const [modalHoliday, setModalHoliday] = useState({ date: "", reasons: [] });

//     const popoverRefs = useRef({});

//     // Function to handle month and year changes
//     useEffect(() => {
//         generateCalendar(month, year);
//         fetchHolidays();
//     }, [month, year]);

//     // Function to initialize Bootstrap popovers
//     useEffect(() => {
//         const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
//         tooltipTriggerList.forEach((el) => {
//             new bootstrap.Popover(el);
//         });
//     }, [holidayList, days]);

//     // Function to fetch holidays from the server
//     function fetchHolidays() {
//         axios.get(`${import.meta.env.VITE_BASEURL}/holidays`)
//             .then((res) => {
//                 setHolidayList(res.data)
//                 // console.log(res.data);
//             })
//             .catch((err) => console.error("Failed to fetch holidays:", err));

//     }

//     useEffect(() => {
//         fetchHolidays();
//     }, []);


//     // Function to generate the calendar for the selected month and year
//     function generateCalendar(selectedMonth, selectedYear) {
//         const firstDay = new Date(selectedYear, selectedMonth, 1).getDay();
//         const daysInMonth = new Date(selectedMonth === 11 ? selectedYear + 1 : selectedYear, (selectedMonth + 1) % 12, 0).getDate();
//         let date = 1;
//         let calendarDays = [];
//         const today = new Date();
//         const isCurrentMonth = selectedMonth === today.getMonth() && selectedYear === today.getFullYear();

//         for (let i = 0; i < 6; i++) {
//             let row = [];
//             for (let j = 0; j < 7; j++) {
//                 if (i === 0 && j < firstDay) {
//                     row.push(null);
//                 } else if (date > daysInMonth) {
//                     row.push(null);
//                 } else {
//                     row.push({
//                         date,
//                         isSunday: j === 0,
//                         isToday: isCurrentMonth && date === today.getDate(),
//                     });
//                     date++;
//                 }
//             }
//             calendarDays.push(row);
//         }

//         setDays(calendarDays);
//     }

//     // Function to handle input changes in the holiday form
//     const handleChange = (e) => {
//         const { name, value, type, checked } = e.target;
//         setHoliday((prev) => ({
//             ...prev,
//             [name]: type === "checkbox" ? (checked ? "Yes" : "No") : value,
//         }));
//     };

//     // Function to handle form submission
//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         const [year, month, day] = holiday.holidayDate.split("-");
//         const formattedDate = `${day}-${month}-${year}`;

//         try {
//             await axios.post(`${import.meta.env.VITE_BASEURL}/holidays`, {
//                 ...holiday,
//                 holidayDate: formattedDate,
//             });
//             alert("Holiday added successfully!");
//             setHoliday({ holidayDate: "", reason: "", every_year: "No" });
//             fetchHolidays();
//             const modal = bootstrap.Modal.getInstance(document.getElementById("addHolidayModal"));
//             modal.hide();
//         } catch (error) {
//             console.error("Error adding Holiday:", error);
//             alert("Error saving holiday");
//         }
//     };

//     // Function to format date as DD-MM-YYYY
//     const formatDate = (d, m, y) => {
//         return `${d.toString().padStart(2, "0")}-${(m + 1).toString().padStart(2, "0")}-${y}`;
//     };

//     // Function to open the reason modal
//     const openReasonModal = (dateStr, reasons) => {
//         setModalHoliday({ date: dateStr, reasons });
//         const modal = new bootstrap.Modal(document.getElementById("reasonModal"));
//         modal.show();
//     };

//     // Function to delete a holiday
//     const deleteHoliday = async (holidayId) => {
//         Swal.fire({
//             title: "Are you sure?",
//             text: "You won't be able to revert this!",
//             icon: "warning",
//             showCancelButton: true,
//             confirmButtonColor: "#d33",
//             cancelButtonColor: "#3085d6",
//             confirmButtonText: "Yes, delete it!"
//         }).then(async (result) => {
//             if (result.isConfirmed) {
//                 try {
//                     await axios.delete(`${import.meta.env.VITE_BASEURL}/holidays/${holidayId}`);

//                     // Close the modal after successful delete
//                     const modal = bootstrap.Modal.getInstance(document.getElementById("reasonModal"));
//                     modal.hide();

//                     Swal.fire("Deleted!", "The holiday has been deleted.", "success");
//                     fetchHolidays();
//                 } catch (err) {
//                     console.error("Error deleting holiday:", err);
//                     Swal.fire("Error!", "Something went wrong. Please try again later.", "error");
//                 }
//             }
//         });
//     };

//     return (
//         <main id="main" className="main">
//             {/* Page Title */}
//             <div className="pagetitle">
//                 <h1>Holidays</h1>
//                 <nav>
//                     <ol className="breadcrumb">
//                         <li className="breadcrumb-item"><a href="/dashboard" className="text-decoration-none">Home</a></li>
//                         <li className="breadcrumb-item"><a>Masters</a></li>
//                         <li className="breadcrumb-item active">Holidays</li>
//                     </ol>
//                 </nav>
//             </div>

//             {/* Calendar UI */}
//             <div className="container mt-3">
//                 <div className="row justify-content-center my-3">
//                     <div className="col-6 col-sm-3 mb-2">
//                         <select className="form-select shadow" value={month} onChange={(e) => setMonth(parseInt(e.target.value))}>
//                             {["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"].map((m, index) => (
//                                 <option key={index} value={index}>{m}</option>
//                             ))}
//                         </select>
//                     </div>
//                     <div className="col-6 col-sm-3 mb-2">
//                         <select className="form-select shadow" value={year} onChange={(e) => setYear(parseInt(e.target.value))}>
//                             {[2024, 2025, 2026].map((y) => <option key={y} value={y}>{y}</option>)}
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
//                                     {["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"].map((d, idx) => (
//                                         <th key={idx}>{d}</th>
//                                     ))}
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 {days.map((week, weekIndex) => (
//                                     <tr key={weekIndex}>
//                                         {week.map((day, dayIndex) => {
//                                             if (!day) return <td key={dayIndex} className="p-2"></td>;

//                                             const formattedDate = formatDate(day.date, month, year);
//                                             const reasons = holidayList.filter(h => h.holidayDate === formattedDate);

//                                             const popoverContent = `
//                                                 <div class="fw-bold border-bottom pb-1 mb-1">${formattedDate}</div>
//                                                 ${reasons.map((r, i) => `<div>${i + 1}. ${r.reason}</div>`).join("")}
//                                             `;

//                                             return (
//                                                 <td
//                                                     key={dayIndex}
//                                                     className={`align-middle p-2 ${day.isSunday ? "bg-light" : ""} ${day.isToday ? "bg-primary bg-opacity-25 text-dark fw-bold" : ""}`}
//                                                 >
//                                                     <div><strong>{day.date}</strong></div>
//                                                     {reasons.length > 0 && (
//                                                         <div className="mt-1">
//                                                             <span
//                                                                 className="badge text-dark fw-bold"
//                                                                 style={{ height: "25px", cursor: "pointer", backgroundColor: "#f4d03f" }}
//                                                                 ref={(el) => popoverRefs.current[formattedDate] = el}
//                                                                 data-bs-toggle="popover"
//                                                                 data-bs-html="true"
//                                                                 data-bs-trigger="hover"
//                                                                 data-bs-placement="right"
//                                                                 title=""
//                                                                 data-bs-content={popoverContent}
//                                                                 onClick={() => openReasonModal(formattedDate, reasons)}
//                                                                 role="button"
//                                                             >
//                                                                 Reasons : {reasons.length}
//                                                             </span>
//                                                         </div>
//                                                     )}
//                                                     <div>
//                                                         <small>
//                                                             <a
//                                                                 href="#"
//                                                                 className="text-primary text-decoration-none"
//                                                                 data-bs-toggle="modal"
//                                                                 data-bs-target="#addHolidayModal"
//                                                                 onClick={() => {
//                                                                     const selectedDate = new Date(year, month, day.date);
//                                                                     const formatted = selectedDate.toLocaleDateString('en-CA'); // YYYY-MM-DD
//                                                                     setHoliday((prev) => ({
//                                                                         ...prev,
//                                                                         holidayDate: formatted,
//                                                                     }));
//                                                                 }}
//                                                             >
//                                                                 New Holiday
//                                                             </a>
//                                                         </small>
//                                                     </div>
//                                                 </td>
//                                             );
//                                         })}
//                                     </tr>
//                                 ))}
//                             </tbody>
//                         </table>
//                     </div>
//                 </div>
//             </div>

//             {/* New Holiday Modal */}
//             <div className="modal fade" id="addHolidayModal" tabIndex="-1" aria-labelledby="addHolidayModalLabel" aria-hidden="true">
//                 <div className="modal-dialog modal-dialog-centered">
//                     <div className="modal-content">
//                         <div className="modal-header">
//                             <div className="w-100 text-center">
//                                 <h5 className="modal-title fw-bold" id="addHolidayModalLabel">Add New Holiday</h5>
//                             </div>
//                             <button type="button" className="btn-close position-absolute end-0 me-3" data-bs-dismiss="modal" aria-label="Close"></button>
//                         </div>
//                         <form onSubmit={handleSubmit}>
//                             <div className="modal-body">
//                                 <div className="row mb-3">
//                                     <div className="col-md-6">
//                                         <label className="form-label fw-bold">Date</label>
//                                         <input onChange={handleChange} value={holiday.holidayDate} name="holidayDate" type="text" className="form-control" required readOnly />
//                                     </div>
//                                     <div className="col-md-6">
//                                         <label className="form-label fw-bold">Every Year on Same Day</label>
//                                         <div className="form-check form-switch mt-2">
//                                             <input className="form-check-input" type="checkbox" id="repeatEveryYear" name="every_year" checked={holiday.every_year === "Yes"} onChange={handleChange} />
//                                             <label className="form-check-label ms-2" htmlFor="repeatEveryYear">{holiday.every_year}</label>
//                                         </div>
//                                     </div>
//                                 </div>
//                                 <div className="mb-3">
//                                     <label className="form-label fw-bold">Holiday Details <span className="text-danger">*</span></label>
//                                     <input type="text" onChange={handleChange} value={holiday.reason} name="reason" className="form-control" required />
//                                 </div>
//                             </div>
//                             <div className="modal-footer">
//                                 <button type="submit" className="btn btn-success">Save</button>
//                                 <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Cancel</button>
//                             </div>
//                         </form>
//                     </div>
//                 </div>
//             </div>

//             {/* Reason Modal */}
//             <div className="modal fade" id="reasonModal" tabIndex="-1" aria-labelledby="reasonModalLabel" aria-hidden="true">
//                 <div className="modal-dialog modal-dialog-centered modal-lg">
//                     <div className="modal-content">
//                         <div className="modal-header">
//                             <div className="w-100 text-center">
//                                 <h5 className="modal-title text-orange fw-bold" id="reasonModalLabel">Reasons for the holiday on : {modalHoliday.date}</h5>
//                             </div>
//                             <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
//                         </div>
//                         <div className="modal-body">
//                             <table className="table table-bordered">
//                                 <thead className="table-light">
//                                     <tr>
//                                         <th>No</th>
//                                         <th>Details</th>
//                                         <th>Every Year</th>
//                                         <th>Actions</th>
//                                     </tr>
//                                 </thead>
//                                 <tbody>
//                                     {modalHoliday.reasons.map((r, idx) => (
//                                         <tr key={idx}>
//                                             <td>{idx + 1}</td>
//                                             <td>{r.reason}</td>
//                                             <td>{r.every_year}</td>
//                                             <td><button className="btn btn-sm btn-danger"
//                                                 //data-bs-dismiss="modal"
//                                                 onClick={() => deleteHoliday(r.id)}><i className="bi bi-trash"></i></button>
//                                             </td>
//                                         </tr>
//                                     ))}
//                                 </tbody>
//                             </table>
//                         </div>
//                         <div className="modal-footer justify-content-center">
//                             <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Close</button>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </main>
//     );
// }

// export default Holidays;


import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Swal from "sweetalert2";

function Holidays() {
    const [month, setMonth] = useState(new Date().getMonth());
    const [year, setYear] = useState(new Date().getFullYear());
    const [days, setDays] = useState([]);
    const [holidayList, setHolidayList] = useState([]);
    const [holiday, setHoliday] = useState({ holidayDate: "", reason: "", every_year: "No" });
    const [modalHoliday, setModalHoliday] = useState({ date: "", reasons: [] });

    const popoverRefs = useRef({});

    // Function to handle month and year changes
    useEffect(() => {
        generateCalendar(month, year);
        fetchHolidays();
    }, [month, year]);

    // Function to initialize Bootstrap popovers
    useEffect(() => {
        const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
        tooltipTriggerList.forEach((el) => {
            new bootstrap.Popover(el);
        });
    }, [holidayList, days]);

    // Function to fetch holidays from the server
    function fetchHolidays() {
        axios.get(`${import.meta.env.VITE_BASEURL}/holidays`)
            .then((res) => {
                setHolidayList(res.data);
            })
            .catch((err) => console.error("Failed to fetch holidays:", err));
    }

    // Function to handle month and year changes
    useEffect(() => {
        fetchHolidays();
    }, []);

    // Function to generate the calendar for the selected month and year
    function generateCalendar(selectedMonth, selectedYear) {
        const firstDay = new Date(selectedYear, selectedMonth, 1).getDay();
        const daysInMonth = new Date(selectedMonth === 11 ? selectedYear + 1 : selectedYear, (selectedMonth + 1) % 12, 0).getDate();
        let date = 1;
        let calendarDays = [];
        const today = new Date();
        const isCurrentMonth = selectedMonth === today.getMonth() && selectedYear === today.getFullYear();

        for (let i = 0; i < 6; i++) {
            let row = [];
            for (let j = 0; j < 7; j++) {
                if (i === 0 && j < firstDay) {
                    row.push(null);
                } else if (date > daysInMonth) {
                    row.push(null);
                } else {
                    row.push({
                        date,
                        isSunday: j === 0,
                        isToday: isCurrentMonth && date === today.getDate(),
                    });
                    date++;
                }
            }
            calendarDays.push(row);
        }
        setDays(calendarDays);
    }

    // Function to handle input changes in the holiday form
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setHoliday((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? (checked ? "Yes" : "No") : value,
        }));
    };

    // Function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        const [year, month, day] = holiday.holidayDate.split("-");
        const formattedDate = `${day}-${month}-${year}`;

        try {
            await axios.post(`${import.meta.env.VITE_BASEURL}/holidays`, {
                ...holiday,
                holidayDate: formattedDate,
            });
            alert("Holiday added successfully!");
            setHoliday({ holidayDate: "", reason: "", every_year: "No" });
            fetchHolidays();
            const modal = bootstrap.Modal.getInstance(document.getElementById("addHolidayModal"));
            modal.hide();
        } catch (error) {
            console.error("Error adding Holiday:", error);
            alert("Error saving holiday");
        }
    };

    // Function to format date as DD-MM-YYYY
    const formatDate = (d, m, y) => {
        return `${d.toString().padStart(2, "0")}-${(m + 1).toString().padStart(2, "0")}-${y}`;
    };

    // Function to open the reason modal
    const openReasonModal = (dateStr, reasons) => {
        setModalHoliday({ date: dateStr, reasons });
        const modal = new bootstrap.Modal(document.getElementById("reasonModal"));
        modal.show();
    };

    // Function to delete a holiday
    const deleteHoliday = async (holidayId) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await axios.delete(`${import.meta.env.VITE_BASEURL}/holidays/${holidayId}`);
                    const modal = bootstrap.Modal.getInstance(document.getElementById("reasonModal"));
                    modal.hide();
                    Swal.fire("Deleted!", "The holiday has been deleted.", "success");
                    fetchHolidays();
                } catch (err) {
                    console.error("Error deleting holiday:", err);
                    Swal.fire("Error!", "Something went wrong. Please try again later.", "error");
                }
            }
        });
    };

    return (
        <main id="main" className="main">
            {/* Page Title */}
            <div className="pagetitle">
                <h1>Holidays</h1>
                <nav>
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><a href="/dashboard" className="text-decoration-none">Home</a></li>
                        <li className="breadcrumb-item"><a>Masters</a></li>
                        <li className="breadcrumb-item active">Holidays</li>
                    </ol>
                </nav>
            </div>

            {/* Calendar UI */}
            <div className="container mt-3">
                <div className="row justify-content-center my-3">
                    <div className="col-6 col-sm-3 mb-2">
                        <select className="form-select shadow" value={month} onChange={(e) => setMonth(parseInt(e.target.value))}>
                            {["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"].map((m, index) => (
                                <option key={index} value={index}>{m}</option>
                            ))}
                        </select>
                    </div>
                    <div className="col-6 col-sm-3 mb-2">
                        <select className="form-select shadow" value={year} onChange={(e) => setYear(parseInt(e.target.value))}>
                            {[2024, 2025, 2026].map((y) => <option key={y} value={y}>{y}</option>)}
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
                                    {["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"].map((d, idx) => (
                                        <th key={idx}>{d}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {days.map((week, weekIndex) => (
                                    <tr key={weekIndex}>
                                        {week.map((day, dayIndex) => {
                                            if (!day) return <td key={dayIndex} className="p-2"></td>;

                                            const formattedDate = formatDate(day.date, month, year);

                                            const reasons = holidayList.filter(h => {
                                                if (h.every_year === "Yes") {
                                                    const [d, m] = h.holidayDate.split("-");
                                                    const currentDay = day.date.toString().padStart(2, "0");
                                                    const currentMonth = (month + 1).toString().padStart(2, "0");
                                                    return d === currentDay && m === currentMonth;
                                                } else {
                                                    return h.holidayDate === formattedDate;
                                                }
                                            });

                                            const popoverContent = `
                                                <div class="fw-bold border-bottom pb-1 mb-1">${formattedDate}</div>
                                                ${reasons.map((r, i) => `<div>${i + 1}. ${r.reason}</div>`).join("")}
                                            `;

                                            return (
                                                <td
                                                    key={dayIndex}
                                                    className={`align-middle p-2 ${day.isSunday ? "bg-light" : ""} ${day.isToday ? "bg-primary bg-opacity-25 text-dark fw-bold" : ""}`}
                                                >
                                                    <div><strong>{day.date}</strong></div>
                                                    {reasons.length > 0 && (
                                                        <div className="mt-1">
                                                            <span
                                                                className="badge text-dark fw-bold bg-warning cursor-pointer"
                                                                // style={{ height: "25px", cursor: "pointer", backgroundColor: "#f4d03f" }}
                                                                ref={(el) => popoverRefs.current[formattedDate] = el}
                                                                data-bs-toggle="popover"
                                                                data-bs-html="true"
                                                                data-bs-trigger="hover"
                                                                data-bs-placement="right"
                                                                title=""
                                                                data-bs-content={popoverContent}
                                                                onClick={() => openReasonModal(formattedDate, reasons)}
                                                                role="button"
                                                            >
                                                                Reasons : {reasons.length}
                                                            </span>
                                                        </div>
                                                    )}
                                                    <div>
                                                        <small>
                                                            {/* <a
                                                                href="#"
                                                                className="text-primary text-decoration-none"
                                                                data-bs-toggle="modal"
                                                                data-bs-target="#addHolidayModal"
                                                                onClick={() => {
                                                                    const selectedDate = new Date(year, month, day.date);
                                                                    const formatted = selectedDate.toLocaleDateString('en-CA'); // YYYY-MM-DD
                                                                    setHoliday((prev) => ({
                                                                        ...prev,
                                                                        holidayDate: formatted,
                                                                    }));
                                                                }}
                                                            >
                                                                New Holiday
                                                            </a> */}
                                                            <a
                                                                href="#"
                                                                className="text-primary text-decoration-none"
                                                                data-bs-toggle="modal"
                                                                data-bs-target="#addHolidayModal"
                                                                onClick={() => {
                                                                    const selectedDate = new Date(year, month, day.date);
                                                                    const dayPart = String(selectedDate.getDate()).padStart(2, '0');
                                                                    const monthPart = String(selectedDate.getMonth() + 1).padStart(2, '0');
                                                                    const yearPart = selectedDate.getFullYear();
                                                                    const formatted = `${dayPart}-${monthPart}-${yearPart}`; // dd-mm-yyyy
                                                                    setHoliday((prev) => ({
                                                                        ...prev,
                                                                        holidayDate: formatted,
                                                                    }));
                                                                }}
                                                            >
                                                                New Holiday
                                                            </a>

                                                        </small>
                                                    </div>
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

            {/* New Holiday Modal */}
            <div className="modal fade" id="addHolidayModal" tabIndex="-1" aria-labelledby="addHolidayModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <div className="w-100 text-center">
                                <h5 className="modal-title fw-bold" id="addHolidayModalLabel">Add New Holiday</h5>
                            </div>
                            <button type="button" className="btn-close position-absolute end-0 me-3" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="modal-body">
                                <div className="row mb-3">
                                    <div className="col-md-6">
                                        <label className="form-label fw-bold">Date</label>
                                        <input onChange={handleChange} value={holiday.holidayDate} name="holidayDate" type="text" className="form-control" required readOnly />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label fw-bold">Every Year on Same Day</label>
                                        <div className="form-check form-switch mt-2">
                                            <input className="form-check-input" type="checkbox" id="repeatEveryYear" name="every_year" checked={holiday.every_year === "Yes"} onChange={handleChange} />
                                            <label className="form-check-label ms-2" htmlFor="repeatEveryYear">{holiday.every_year}</label>
                                        </div>
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label fw-bold">Holiday Details <span className="text-danger">*</span></label>
                                    <input type="text" onChange={handleChange} value={holiday.reason} name="reason" className="form-control" required />
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="submit" className="btn btn-success">Save</button>
                                <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            {/* Reason Modal */}
            <div className="modal fade" id="reasonModal" tabIndex="-1" aria-labelledby="reasonModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <div className="w-100 text-center">
                                <h5 className="modal-title text-orange fw-bold" id="reasonModalLabel">Reasons for the holiday on : {modalHoliday.date}</h5>
                            </div>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <table className="table table-bordered">
                                <thead className="table-light">
                                    <tr>
                                        <th>No</th>
                                        <th>Details</th>
                                        <th>Every Year</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {modalHoliday.reasons.map((r, idx) => (
                                        <tr key={idx}>
                                            <td>{idx + 1}</td>
                                            <td>{r.reason}</td>
                                            <td>{r.every_year}</td>
                                            <td>
                                                <button className="btn btn-sm btn-danger" onClick={() => deleteHoliday(r.id)}>
                                                    <i className="bi bi-trash"></i>
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="modal-footer justify-content-center">
                            <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default Holidays;












