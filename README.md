# AdPro - Advertisement Scheduling System

AdPro is a full-stack advertisement scheduling and management system built using **React (with Vite)**, **Node.js (Express)**, and **MySQL**. It helps agencies and clients organize, schedule, and track advertisements efficiently with a calendar-based interface, reminders, and real-time status updates.

---

## 📁 Project Structure

```
Ad_Pro_Project/
├── frontend/           # React (Vite) frontend
├── backend/            # Node.js/Express backend
├── ad_pro_db.sql       # MySQL schema and sample data
└── README.md           # Project documentation

```
---

## Tech Stack

- **Frontend**: React + Vite, Bootstrap 5, Axios
- **Backend**: Node.js, Express.js
- **Database**: MySQL
- **Other Tools**: dotenv, nodemon (for development)

---

## Features

-  **Calendar View** : Visual ad schedule layout
-  **Ad Entry Form** : Add new ads with client, newspaper, date, and reminders
-  **Export to Excel** : Download ad schedule for reports
-  **Reminders** : For agency and client (before and on ad date)
-  **Toggle Status** : Mark ad as done or pending from calendar modal
-  **Popover Details** : Hover to see ad info without leaving the calendar
-  **Responsive UI** : Built with Bootstrap for a clean, mobile-friendly interface

---

## Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/nehadesai2424/Ad_Pro_Project.git
cd Ad_Pro_Project
```

---

### 2. Backend Setup (Node.js)

```bash
cd backend
npm install
```

Start the backend server:

```bash
npm start
```

---

### 3. Frontend Setup (React + Vite)

```bash
cd ../frontend
npm install
npm run dev
```

---

## 🛠️ Database Setup

1. Open your MySQL client (e.g., phpMyAdmin, Workbench, or CLI).
2. Create a new database:

```sql
CREATE DATABASE ad_pro_db;
```

3. Import the `ad_pro_db.sql` file provided in the root directory.

This will create required tables and optional sample data.

---

## Export to Excel (Optional Feature)

If implemented, the ad list can be exported as an Excel file using libraries like `xlsx` in React.

---

- Make sure MySQL is running before starting the backend.

