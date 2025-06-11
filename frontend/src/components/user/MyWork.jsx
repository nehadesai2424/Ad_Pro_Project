import React, { useEffect, useState } from 'react'

function MyWork() {
    const [month, setMonth] = useState(new Date().getMonth());
    const [year, setYear] = useState(new Date().getFullYear());
    const [days, setDays] = useState([]);

    useEffect(() => {
        generateCalendar(month, year);
    }, [month, year]);

    useEffect(() => {
        const interval = setInterval(() => {
            const currentDate = new Date();
            setMonth(currentDate.getMonth());
            setYear(currentDate.getFullYear());
        }, 60000);

        return () => clearInterval(interval);
    }, []);

    function generateCalendar(selectedMonth, selectedYear) {
        const firstDay = new Date(selectedYear, selectedMonth, 1).getDay();
        const daysInMonth = new Date(selectedYear, selectedMonth + 1, 0).getDate();
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

    return (
        <>
            <main id="main" className="main">
                <div className="pagetitle">
                    <h1>My Work</h1>
                    <nav>
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item">
                                <a href='/dashboard' className="text-decoration-none">Home</a>
                            </li>
                            <li className="breadcrumb-item active">My Work</li>
                        </ol>
                    </nav>
                </div>

                <div className="container mt-3">
                    <div className="row justify-content-center my-3">
                        <div className="col-6 col-sm-3 mb-2">
                            <select
                                className="form-select shadow w-100"
                                value={month}
                                onChange={(e) => setMonth(parseInt(e.target.value))}
                            >
                                {[
                                    "January", "February", "March", "April", "May", "June",
                                    "July", "August", "September", "October", "November", "December"
                                ].map((m, index) => (
                                    <option key={index} value={index}>{m}</option>
                                ))}
                            </select>
                        </div>

                        <div className="col-6 col-sm-3 mb-2">
                            <select
                                className="form-select shadow w-100"
                                value={year}
                                onChange={(e) => setYear(parseInt(e.target.value))}
                            >
                                <option value="2024">2024</option>
                                <option value="2025">2025</option>
                                <option value="2026">2026</option>
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
                                        <th>Sunday</th>
                                        <th>Monday</th>
                                        <th>Tuesday</th>
                                        <th>Wednesday</th>
                                        <th>Thursday</th>
                                        <th>Friday</th>
                                        <th>Saturday</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {days.map((week, weekIndex) => (
                                        <tr key={weekIndex}>
                                            {week.map((day, dayIndex) => (
                                                <td
                                                    key={dayIndex}
                                                    className={
                                                        day
                                                            ? `p-2 ${day.isSunday ? "bg-light" : ""} ${day.isToday ? "bg-primary bg-opacity-25 text-dark fw-bold" : ""}`
                                                            : "p-2"
                                                    }
                                                >
                                                    {day && (
                                                        <>
                                                            <strong>{day.date}</strong>
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
            </main>
        </>
    )
}

export default MyWork
