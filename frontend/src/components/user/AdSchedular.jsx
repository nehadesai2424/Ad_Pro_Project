// import React, { useState, useEffect } from "react";

// function AdSchedular() {
//     const [month, setMonth] = useState(new Date().getMonth());
//     const [year, setYear] = useState(new Date().getFullYear());
//     const [days, setDays] = useState([]);

//     useEffect(() => {
//         generateCalendar(month, year);
//     }, [month, year]);

//     useEffect(() => {
//         const interval = setInterval(() => {
//             const currentDate = new Date();
//             setMonth(currentDate.getMonth());
//             setYear(currentDate.getFullYear());
//         }, 60000);

//         return () => clearInterval(interval);
//     }, []);

//     function generateCalendar(selectedMonth, selectedYear) {
//         const firstDay = new Date(selectedYear, selectedMonth, 1).getDay();
//         const daysInMonth = new Date(selectedYear, selectedMonth + 1, 0).getDate();
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

//     return (
//         <main id="main" className="main">
//             <div className="pagetitle">
//                 <h1>Ad-Schedular</h1>
//                 <nav>
//                     <ol className="breadcrumb">
//                         <li class="breadcrumb-item"><a href='/dashboard' class="text-decoration-none">Home</a></li>
//                         <li className="breadcrumb-item active">Ad-Schedular</li>
//                     </ol>
//                 </nav>
//             </div>

//             <div className="container mt-3">
//                 {/* <h3 className="text-primary text-center">AD-SCHEDULAR</h3> */}

//                 {/* Responsive Month-Year Selectors */}
//                 <div className="row justify-content-center my-3">
//                     <div className="col-6 col-sm-3 mb-2">
//                         <select
//                             className="form-select shadow w-100"
//                             value={month}
//                             onChange={(e) => setMonth(parseInt(e.target.value))}
//                         >
//                             {[
//                                 "January", "February", "March", "April", "May", "June",
//                                 "July", "August", "September", "October", "November", "December"
//                             ].map((m, index) => (
//                                 <option key={index} value={index}>{m}</option>
//                             ))}
//                         </select>
//                     </div>

//                     <div className="col-6 col-sm-3 mb-2">
//                         <select
//                             className="form-select shadow w-100"
//                             value={year}
//                             onChange={(e) => setYear(parseInt(e.target.value))}
//                         >
//                             <option value="2024">2024</option>
//                             <option value="2025">2025</option>
//                             <option value="2026">2026</option>
//                         </select>
//                     </div>
//                 </div>

//                 {/* Responsive Calendar Table */}
//                 <div className="card shadow p-3 px-4">
//                     <div className="text-center fw-bold text-primary fs-5 pb-3">
//                         {`${new Date(year, month).toLocaleString('default', { month: 'long' }).toUpperCase()} ${year}`}
//                     </div>

//                     <div className="table-responsive">
//                         <table className="table table-bordered text-center">
//                             <thead className="table-light">
//                                 <tr>
//                                     <th>Sunday</th>
//                                     <th>Monday</th>
//                                     <th>Tuesday</th>
//                                     <th>Wednesday</th>
//                                     <th>Thursday</th>
//                                     <th>Friday</th>
//                                     <th>Saturday</th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 {days.map((week, weekIndex) => (
//                                     <tr key={weekIndex}>
//                                         {week.map((day, dayIndex) => (
//                                             <td
//                                                 key={dayIndex}
//                                                 className={
//                                                     day
//                                                         ? `p-2 ${day.isSunday ? "bg-light" : ""} ${day.isToday ? "bg-primary bg-opacity-25 text-dark fw-bold" : ""}`
//                                                         : "p-2"
//                                                 }
//                                             >
//                                                 {day ? (
//                                                     <>
//                                                         <strong>{day.date}</strong>
//                                                         <br />
//                                                         <small>
//                                                             <a href="#" className="text-primary text-decoration-none">New Ad</a>
//                                                         </small>
//                                                     </>
//                                                 ) : null}
//                                             </td>
//                                         ))}
//                                     </tr>
//                                 ))}
//                             </tbody>
//                         </table>
//                     </div>
//                 </div>
//             </div>
//         </main>
//     );
// }

// export default AdSchedular;


// import React, { useState, useEffect } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
// import axios from "axios";

// function AdSchedular() {
//     const [month, setMonth] = useState(new Date().getMonth());
//     const [year, setYear] = useState(new Date().getFullYear());
//     const [days, setDays] = useState([]);
//     const [selectedDate, setSelectedDate] = useState("");

//     useEffect(() => {
//         generateCalendar(month, year);
//     }, [month, year]);

//     useEffect(() => {
//         const interval = setInterval(() => {
//             const currentDate = new Date();
//             setMonth(currentDate.getMonth());
//             setYear(currentDate.getFullYear());
//         }, 60000);
//         return () => clearInterval(interval);
//     }, []);

//     const handleNewAdClick = (day) => {
//         const fullDate = new Date(year, month, day.date);
//         const yyyy = fullDate.getFullYear();
//         const mm = String(fullDate.getMonth() + 1).padStart(2, '0');
//         const dd = String(fullDate.getDate()).padStart(2, '0');
//         const formattedDate = `${yyyy}-${mm}-${dd}`; // Local time safe

//         setSelectedDate(formattedDate);

//         const modal = new window.bootstrap.Modal(document.getElementById("adModal"));
//         modal.show();
//     };


//     const generateCalendar = (selectedMonth, selectedYear) => {
//         const firstDay = new Date(selectedYear, selectedMonth, 1).getDay();
//         const daysInMonth = new Date(selectedMonth === 11 ? selectedYear + 1 : selectedYear, selectedMonth + 1, 0).getDate();
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
//     };

//     //to get the client list from the backend
//     const [client, setClient] = useState([]);
//     useEffect(() => {
//         axios.get(import.meta.env.VITE_BASEURL + "/clients")
//             .then((res) => {
//                 setClient(res.data);
//             })
//     }, []);

//     //to get the client list from the backend
//     const [pmedia, setPmedia] = useState([]);
//     useEffect(() => {
//         axios.get(import.meta.env.VITE_BASEURL + "/pmedias")
//             .then((res) => {
//                 setPmedia(res.data);
//             })
//     }, []);

//     //to post the ad data to the backend
//     const [ad, setAd] = useState({});
//     const handleAdSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             await axios.post(`${import.meta.env.VITE_BASEURL}/adschedules`, {
//                 ...ad,
//                 adDate: selectedDate,
//             });
//             alert("Ad saved successfully!");
//             setAd({
//                 agencyId: "",
//                 clientId: "",
//                 pmediaId: "",
//                 description: "",
//                 pmediaRoId: "",
//                 beforeClientMessage: "",
//                 beforeAgencyMessage: "",
//                 onDateClientMessage: "",
//                 onDateAgencyMessage: ""
//             });
//             // fetchAds(); // call to refresh ad list (like fetchWorks)
//             const modal = window.bootstrap?.Modal.getInstance(document.getElementById("adModal"));
//             if (modal) modal.hide();
//         } catch (err) {
//             console.error("Error saving ad:", err);
//             alert("Error saving ad. Please try again.");
//         }
//     };

//     const handleChange = (e) => {
//         setAd({ ...ad, [e.target.name]: e.target.value });
//     };



//     return (
//         <main className="main" id="main">
//             <div className="pagetitle">
//                 <h1>Ad-Schedular</h1>
//                 <nav>
//                     <ol className="breadcrumb">
//                         <li className="breadcrumb-item">
//                             <a href="/dashboard" className="text-decoration-none">Home</a>
//                         </li>
//                         <li className="breadcrumb-item active">Ad-Schedular</li>
//                     </ol>
//                 </nav>
//             </div>

//             <div className="container mt-3">
//                 <div className="row justify-content-center mb-3">
//                     <div className="col-6 col-sm-3">
//                         <select className="form-select" value={month} onChange={(e) => setMonth(parseInt(e.target.value))}>
//                             {[
//                                 "January", "February", "March", "April", "May", "June",
//                                 "July", "August", "September", "October", "November", "December"
//                             ].map((m, index) => (
//                                 <option key={index} value={index}>{m}</option>
//                             ))}
//                         </select>
//                     </div>
//                     <div className="col-6 col-sm-3">
//                         <select className="form-select" value={year} onChange={(e) => setYear(parseInt(e.target.value))}>
//                             {[2024, 2025, 2026].map((y) => (
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
//                                 {days.map((week, weekIndex) => (
//                                     <tr key={weekIndex}>
//                                         {week.map((day, dayIndex) => (
//                                             <td key={dayIndex} className={day
//                                                 ? `p-2 ${day.isSunday ? "bg-light" : ""} ${day.isToday ? "bg-primary bg-opacity-25 text-dark fw-bold" : ""}`
//                                                 : "p-2"}>
//                                                 {day && (
//                                                     <>
//                                                         <strong>{day.date}</strong><br />
//                                                         <small>
//                                                             <a href="#" className="text-primary text-decoration-none" onClick={() => handleNewAdClick(day)}>New Ad</a>
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

//             {/* Bootstrap Modal */}
//             {/* Bootstrap Modal */}
//             <div className="modal fade" id="adModal" tabIndex="-1">
//                 <div className="modal-dialog modal-lg modal-dialog-centered">
//                     <div className="modal-content">
//                         <div className="modal-header">
//                             <div className="w-100 text-center">
//                                 <h5 className="modal-title fw-bold">Add New Advertise</h5>
//                             </div>
//                             <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
//                         </div>
//                         <form onSubmit={handleAdSubmit}>
//                             <div className="modal-body">
//                                 <div className="row mb-3">
//                                     <div className="col-md-5">
//                                         <label className="form-label fw-bold">Advertise Date</label>
//                                         <input type="text" className="form-control" value={selectedDate} readOnly />
//                                     </div>
//                                     <div className="col-md-7">
//                                         <label className="form-label fw-bold">Client</label>
//                                         <select onChange={handleChange} name="clientId" value={ad.clientId} className="form-select">
//                                             <option>Select</option>
//                                             {client.map((client) => (
//                                                 <option key={client.id} value={client.id}>{client.name}</option>
//                                             ))}
//                                         </select>
//                                     </div>
//                                 </div>

//                                 <div className="row mb-3">
//                                     <div className="col-md-5">
//                                         <label className="form-label fw-bold">Newspaper</label>
//                                         <select onChange={handleChange} name="pmediaId" value={ad.pmediaId} className="form-select">
//                                             <option>Select</option>
//                                             {pmedia.map((pmedia) => (
//                                                 <option key={pmedia.id} value={pmedia.id}>{pmedia.name}</option>
//                                             ))}
//                                         </select>
//                                     </div>
//                                     <div className="col-md-7">
//                                         <label className="form-label fw-bold">Description</label>
//                                         <textarea rows="1" onChange={handleChange} name="description" value={ad.description} className="form-control"></textarea>
//                                     </div>
//                                 </div>

//                                 {/* Reminder Section - One Day Before */}
//                                 <div className="row mb-3">
//                                     <div className="col-md-6">
//                                         <label className="form-label fw-bold">Agency - One Day Before Ad</label>
//                                         <div className="form-check form-switch d-flex align-items-center mb-2">
//                                             <input className="form-check-input me-2" type="checkbox" id="agencyReminder1" />
//                                             <input type="text" className="form-control" value="11:00 AM" readOnly style={{ width: "100px" }} />
//                                         </div>
//                                         <textarea onChange={handleChange} name="beforeAgencyMessage" value={ad.beforeAgencyMessage} rows="2" className="form-control" placeholder="Reminder message"></textarea>
//                                     </div>

//                                     <div className="col-md-6">
//                                         <label className="form-label fw-bold">Client - One Day Before Ad</label>
//                                         <div className="form-check form-switch d-flex align-items-center mb-2">
//                                             <input className="form-check-input me-2" type="checkbox" id="clientReminder1" />
//                                             <input type="text" className="form-control" value="11:00 AM" readOnly style={{ width: "100px" }} />
//                                         </div>
//                                         <textarea onChange={handleChange} name="beforeClientMessage" value={ad.beforeClientMessage} rows="2" className="form-control" placeholder="Reminder message"></textarea>
//                                     </div>
//                                 </div>

//                                 {/* Reminder Section - On Ad Day */}
//                                 <div className="row mb-3">
//                                     <div className="col-md-6">
//                                         <label className="form-label fw-bold">Agency - On Ad Day</label>
//                                         <div className="form-check form-switch d-flex align-items-center mb-2">
//                                             <input className="form-check-input me-2" type="checkbox" id="agencyReminderAdDay" />
//                                             <input type="text" className="form-control" value="11:00 AM" readOnly style={{ width: "100px" }} />
//                                         </div>
//                                         <textarea onChange={handleChange} name="onDateAgencyMessage" value={ad.onDateAgencyMessage} rows="2" className="form-control" placeholder="Reminder message"></textarea>
//                                     </div>

//                                     <div className="col-md-6">
//                                         <label className="form-label fw-bold">Client - On Ad Day</label>
//                                         <div className="form-check form-switch d-flex align-items-center mb-2">
//                                             <input className="form-check-input me-2" type="checkbox" id="clientReminderAdDay" />
//                                             <input type="text" className="form-control" value="11:00 AM" readOnly style={{ width: "100px" }} />
//                                         </div>
//                                         <textarea onChange={handleChange} name="onDateClientMessage" value={ad.onDateClientMessage} rows="2" className="form-control" placeholder="Reminder message"></textarea>
//                                     </div>
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

//         </main>
//     );
// }

// export default AdSchedular;



import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import Swal from "sweetalert2";

function AdSchedular() {

    const [month, setMonth] = useState(new Date().getMonth());
    const [year, setYear] = useState(new Date().getFullYear());
    const [days, setDays] = useState([]);
    const [selectedDate, setSelectedDate] = useState("");
    const [displayDate, setDisplayDate] = useState(""); // For UI display
    const [ads, setAds] = useState([]); // Store ads for the current month
    const [selectedDateAds, setSelectedDateAds] = useState([]);


    // Function to fetch ads for the current month
    const handleBadgeClick = (day) => {
        // const fullDate = new Date(year, month, day.date);
        // const yyyy = fullDate.getFullYear();
        // const mm = String(fullDate.getMonth() + 1).padStart(2, '0');
        // const dd = String(fullDate.getDate()).padStart(2, '0');
        // const formattedDate = `${yyyy}-${mm}-${dd}`;
        // // const formattedDate = `${dd}-${mm}-${yyyy}`; // Local time safe
        // setSelectedDate(formattedDate);

        const fullDate = new Date(year, month, day.date);
        const yyyy = fullDate.getFullYear();
        const mm = String(fullDate.getMonth() + 1).padStart(2, '0');
        const dd = String(fullDate.getDate()).padStart(2, '0');

        const displayDate = `${dd}-${mm}-${yyyy}`; // for UI
        const apiDate = `${yyyy}-${mm}-${dd}`; // for backend

        setSelectedDate(apiDate); // save in correct backend format
        setDisplayDate(displayDate); // if you want separate UI display


        const filtered = ads.filter(ad => {
            const adDate = new Date(ad.adDate);
            return adDate.getDate() === day.date && adDate.getMonth() === month && adDate.getFullYear() === year;
        });
        setSelectedDateAds(filtered);

        const modal = new window.bootstrap.Modal(document.getElementById("adDetailModal"));
        modal.show();
    };

    // Function to fetch ads for the current month
    useEffect(() => {
        const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]');
        popoverTriggerList.forEach(popover => new window.bootstrap.Popover(popover));
    }, [ads, days]);


    useEffect(() => {
        generateCalendar(month, year);
    }, [month, year]);

    const fetchAds = () => {
        axios.get(`${import.meta.env.VITE_BASEURL}/adschedules`)
            .then((res) => {
                setAds(res.data);
            })
            .catch((err) => {
                console.error("Error fetching ads:", err);
            });
    };

    useEffect(() => {
        fetchAds();
    }, [month, year]);


    useEffect(() => {
        const interval = setInterval(() => {
            const currentDate = new Date();
            setMonth(currentDate.getMonth());
            setYear(currentDate.getFullYear());
        }, 60000);
        return () => clearInterval(interval);
    }, []);

    const handleNewAdClick = (day) => {
        // const fullDate = new Date(year, month, day.date);
        // const yyyy = fullDate.getFullYear();
        // const mm = String(fullDate.getMonth() + 1).padStart(2, '0');
        // const dd = String(fullDate.getDate()).padStart(2, '0');
        // const formattedDate = `${yyyy}-${mm}-${dd}`;
        // //const formattedDate = `${dd}-${mm}-${yyyy}`; // Local time safe
        // setSelectedDate(formattedDate);

        const fullDate = new Date(year, month, day.date);
        const yyyy = fullDate.getFullYear();
        const mm = String(fullDate.getMonth() + 1).padStart(2, '0');
        const dd = String(fullDate.getDate()).padStart(2, '0');

        const displayDate = `${dd}-${mm}-${yyyy}`; // for UI
        const apiDate = `${yyyy}-${mm}-${dd}`; // for backend

        setSelectedDate(apiDate); // save in correct backend format
        setDisplayDate(displayDate); // if you want separate UI display


        const modal = new window.bootstrap.Modal(document.getElementById("adModal"));
        modal.show();
    };

    const generateCalendar = (selectedMonth, selectedYear) => {
        const firstDay = new Date(selectedYear, selectedMonth, 1).getDay();
        const daysInMonth = new Date(selectedMonth === 11 ? selectedYear + 1 : selectedYear, selectedMonth + 1, 0).getDate();
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
    };

    // To get the client list from the backend
    const [client, setClient] = useState([]);
    useEffect(() => {
        axios.get(import.meta.env.VITE_BASEURL + "/clients")
            .then((res) => {
                setClient(res.data);
            });
    }, []);

    // To get the pmedia list from the backend
    const [pmedia, setPmedia] = useState([]);
    useEffect(() => {
        axios.get(import.meta.env.VITE_BASEURL + "/pmedias")
            .then((res) => {
                setPmedia(res.data);
            });
    }, []);

    // To post the ad data to the backend
    const [ad, setAd] = useState({});
    const handleAdSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${import.meta.env.VITE_BASEURL}/adschedules`, {
                ...ad,
                adDate: selectedDate,
            });
            alert("Ad saved successfully!");
            setAd({
                agencyId: "",
                clientId: "",
                pmediaId: "",
                description: "",
                pmediaRoId: "",
                beforeClientMessage: "",
                beforeAgencyMessage: "",
                onDateClientMessage: "",
                onDateAgencyMessage: ""
            });
            fetchAds(); // call to refresh ad list (like fetchWorks)
            const modal = window.bootstrap?.Modal.getInstance(document.getElementById("adModal"));
            if (modal) modal.hide();
        } catch (err) {
            console.error("Error saving ad:", err);
            alert("Error saving ad. Please try again.");
        }
    };


    const handleChange = (e) => {
        setAd({ ...ad, [e.target.name]: e.target.value });
    };

    // Function to count ads for a particular date
    const getAdCountForDate = (date) => {
        return ads.filter(ad => {
            const adDate = new Date(ad.adDate);
            return adDate.getDate() === date && adDate.getMonth() === month && adDate.getFullYear() === year;
        }).length;
    };

    //delete ad schedule
    const handleDelete = async (adId) => {
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
                    await axios.delete(`${import.meta.env.VITE_BASEURL}/adschedules/${adId}`);
                    const modal = bootstrap.Modal.getInstance(document.getElementById("adDetailModal"));
                    modal.hide();
                    Swal.fire("Deleted!", "The ad has been deleted.", "success");
                    fetchAds(); // Refresh the ad list after deletion
                } catch (err) {
                    console.error("Error deleting ad:", err);
                    Swal.fire("Error!", "Something went wrong. Please try again later.", "error");
                }
            }
        });
    };

    return (
        <main className="main" id="main">
            <div className="pagetitle">
                <h1>Ad-Schedular</h1>
                <nav>
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                            <a href="/dashboard" className="text-decoration-none">Home</a>
                        </li>
                        <li className="breadcrumb-item active">Ad-Schedular</li>
                    </ol>
                </nav>
            </div>

            <div className="container mt-3">
                <div className="row justify-content-center mb-3">
                    <div className="col-6 col-sm-3">
                        <select className="form-select shadow" value={month} onChange={(e) => setMonth(parseInt(e.target.value))}>
                            {[
                                "January", "February", "March", "April", "May", "June",
                                "July", "August", "September", "October", "November", "December"
                            ].map((m, index) => (
                                <option key={index} value={index}>{m}</option>
                            ))}
                        </select>
                    </div>
                    <div className="col-6 col-sm-3 mb-2">
                        <select className="form-select shadow" value={year} onChange={(e) => setYear(parseInt(e.target.value))}>
                            {[2024, 2025, 2026].map((y) => (
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
                                {days.map((week, weekIndex) => (
                                    <tr key={weekIndex}>
                                        {week.map((day, dayIndex) => (
                                            <td key={dayIndex} className={day
                                                ? `p-2 ${day.isSunday ? "bg-light" : ""} ${day.isToday ? "bg-primary bg-opacity-25 text-dark fw-bold" : ""}`
                                                : "p-2"}>
                                                {day && (
                                                    <>
                                                        <strong>{day.date}</strong><br />
                                                        {/* Display Badge if there are ads */}
                                                        {getAdCountForDate(day.date) > 0 && (
                                                            // <span
                                                            //     className="badge bg-warning text-dark"
                                                            //     style={{ cursor: "pointer" }}
                                                            //     onClick={() => handleBadgeClick(day)}
                                                            // >
                                                            //     Ads : {getAdCountForDate(day.date)}
                                                            // </span>

                                                            <span
                                                                className="badge bg-warning text-dark"
                                                                data-bs-toggle="popover"
                                                                data-bs-trigger="hover focus"
                                                                data-bs-html="true"
                                                                data-bs-content={`<div class="text-center fw-bold">Ad Details</div>`}
                                                                style={{ cursor: "pointer" }}
                                                                onClick={() => handleBadgeClick(day)}
                                                            >
                                                                Ads : {getAdCountForDate(day.date)}
                                                            </span>

                                                        )}
                                                        <br />
                                                        <small>
                                                            <a href="#" className="text-primary text-decoration-none" onClick={() => handleNewAdClick(day)}>New Ad</a>
                                                        </small>
                                                    </>
                                                )}
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Bootstrap Modal */}
            <div className="modal fade" id="adModal" tabIndex="-1">
                <div className="modal-dialog modal-lg modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <div className="w-100 text-center">
                                <h5 className="modal-title fw-bold">Add New Advertise</h5>
                            </div>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <form onSubmit={handleAdSubmit}>
                            <div className="modal-body">
                                <div className="row mb-3">
                                    <div className="col-md-5">
                                        <label className="form-label fw-bold">Advertise Date</label>
                                        <input type="text" className="form-control" value={displayDate} readOnly />
                                    </div>
                                    <div className="col-md-7">
                                        <label className="form-label fw-bold">Client</label>
                                        <select onChange={handleChange} name="clientId" value={ad.clientId} className="form-select">
                                            <option>Select</option>
                                            {client.map((client) => (
                                                <option key={client.id} value={client.id}>{client.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                <div className="row mb-3">
                                    <div className="col-md-5">
                                        <label className="form-label fw-bold">Newspaper</label>
                                        <select onChange={handleChange} name="pmediaId" value={ad.pmediaId} className="form-select">
                                            <option>Select</option>
                                            {pmedia.map((pmedia) => (
                                                <option key={pmedia.id} value={pmedia.id}>{pmedia.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="col-md-7">
                                        <label className="form-label fw-bold">Description</label>
                                        <textarea rows="1" onChange={handleChange} name="description" value={ad.description} className="form-control"></textarea>
                                    </div>
                                </div>

                                {/* Reminder Section - One Day Before */}
                                <div className="row mb-3">
                                    <div className="col-md-6">
                                        <label className="form-label fw-bold">Agency - One Day Before Ad</label>
                                        <div className="form-check form-switch d-flex align-items-center mb-2">
                                            <input className="form-check-input me-2" type="checkbox" id="agencyReminder1" />
                                            <input type="text" className="form-control" value="11:00 AM" readOnly style={{ width: "100px" }} />
                                        </div>
                                        <textarea onChange={handleChange} name="beforeAgencyMessage" value={ad.beforeAgencyMessage} rows="2" className="form-control" placeholder="Reminder message"></textarea>
                                    </div>

                                    <div className="col-md-6">
                                        <label className="form-label fw-bold">Client - One Day Before Ad</label>
                                        <div className="form-check form-switch d-flex align-items-center mb-2">
                                            <input className="form-check-input me-2" type="checkbox" id="clientReminder1" />
                                            <input type="text" className="form-control" value="11:00 AM" readOnly style={{ width: "100px" }} />
                                        </div>
                                        <textarea onChange={handleChange} name="beforeClientMessage" value={ad.beforeClientMessage} rows="2" className="form-control" placeholder="Reminder message"></textarea>
                                    </div>
                                </div>

                                {/* Reminder Section - On Ad Day */}
                                <div className="row mb-3">
                                    <div className="col-md-6">
                                        <label className="form-label fw-bold">Agency - On Ad Day</label>
                                        <div className="form-check form-switch d-flex align-items-center mb-2">
                                            <input className="form-check-input me-2" type="checkbox" id="agencyReminderAdDay" />
                                            <input type="text" className="form-control" value="11:00 AM" readOnly style={{ width: "100px" }} />
                                        </div>
                                        <textarea onChange={handleChange} name="onDateAgencyMessage" value={ad.onDateAgencyMessage} rows="2" className="form-control" placeholder="Reminder message"></textarea>
                                    </div>

                                    <div className="col-md-6">
                                        <label className="form-label fw-bold">Client - On Ad Day</label>
                                        <div className="form-check form-switch d-flex align-items-center mb-2">
                                            <input className="form-check-input me-2" type="checkbox" id="clientReminderAdDay" />
                                            <input type="text" className="form-control" value="11:00 AM" readOnly style={{ width: "100px" }} />
                                        </div>
                                        <textarea onChange={handleChange} name="onDateClientMessage" value={ad.onDateClientMessage} rows="2" className="form-control" placeholder="Reminder message"></textarea>
                                    </div>
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

            <div className="modal fade" id="adDetailModal" tabIndex="-1">
                <div className="modal-dialog modal-lg modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title fw-bold w-100 text-center">
                                Ads Scheduled on {displayDate}
                            </h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <div className="modal-body table-responsive">
                            {selectedDateAds.length > 0 ? (
                                <table className="table table-bordered table-hover">
                                    <thead className="table-light">
                                        <tr>
                                            <th>Client</th>
                                            <th>Newspaper</th>
                                            <th>Description</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {selectedDateAds.map((ad, index) => (
                                            <tr key={index}>
                                                <td>{client.find(c => c.id === ad.clientId)?.name || "N/A"}</td>
                                                <td>{pmedia.find(p => p.id === ad.pmediaId)?.name || "N/A"}</td>
                                                <td>{ad.description}</td>
                                                <td>
                                                    <button className="btn btn-sm btn-primary me-2">
                                                        <i className="fas fa-edit"></i>
                                                    </button>
                                                    <button className="btn btn-sm btn-danger" onClick={() => handleDelete(ad.id)}>
                                                        <i className="fas fa-trash"></i>
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            ) : (
                                <p className="text-center">No ads found for this date.</p>
                            )}
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

export default AdSchedular;






