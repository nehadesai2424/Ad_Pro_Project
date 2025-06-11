
import { BrowserRouter, Routes, Route } from "react-router-dom"

//Pages
import Login from "./components/Login"
import ForgotPassword from "./components/ForgotPassword"
import Register from "./components/Register"
import TermsConditions from "./components/TermsConditions"
import Landing from "./components/user/Landing"
import Dashboard from "./components/user/Dashboard"
import MyWork from "./components/user/MyWork"

//Masters
import Clients from "./components/user/masters/Clients"
import Employees from "./components/user/masters/Employees"
import PMedia from "./components/user/masters/PMedia"
import EMedia from "./components/user/masters/EMedia"
import Holidays from "./components/user/masters/Holidays"
import GstTaxPlanning from "./components/user/masters/GstTaxPlanning"

import EMediaRO from "./components/user/EMediaRO"
import PMediaRO from "./components/user/PMediaRO"
import NewEMediaRo from "./components/user/NewEMediaRo"
import NewPMediaRo from "./components/user/NewPMediaRo"

import DesignPrintInvoices from "./components/user/DesignPrintInvoices"
import NewInvoice from "./components/user/NewInvoice"

import AdSchedular from "./components/user/AdSchedular"
import WorkSchedular from "./components/user/WorkSchedular"

//financial reports
import EMediaRoList from "./components/user/financial report/EMediaRoList"
import DesignPrintReport from "./components/user/financial report/DesignPrintReport"
import PMediaRoList from "./components/user/financial report/PMediaRoList"

//general reports
import EmployeeWork from "./components/user/general reports/EmployeeWork"
import ClientList from "./components/user/general reports/ClientList"
import ClientAds from "./components/user/general reports/ClientAds"
import HolidaysList from "./components/user/general reports/HolidaysList"




function App() {

  return (
    <>

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/signup" element={<Register />} />
          {/* <Route path="/terms-conditions" element={<TermsConditions />} /> */}


          <Route path="dashboard" element={<Landing />}>
            <Route index element={<Dashboard />} />
          </Route>

          <Route path="mywork" element={<Landing />}>
            <Route index element={<MyWork />} />
          </Route>

          <Route path="masters" element={<Landing />}>
            <Route path="clients" element={<Clients />} />
            <Route path="employees" element={<Employees />} />
            <Route path="pmedia" element={<PMedia />} />
            <Route path="emedia" element={<EMedia />} />
            <Route path="holidays" element={<Holidays />} />
            <Route path="gst-tax-planning" element={<GstTaxPlanning />} />
          </Route>

          <Route path="e-media-ro" element={<Landing />}>
            <Route index element={<EMediaRO />} />
          </Route>
          <Route path="e-media-ro/new-emedia-ro" element={<Landing />}>
            <Route index element={<NewEMediaRo />} />
            <Route path=":id" element={<NewEMediaRo />} />  // This will match /e-media-ro/new-emedia-ro/:id
          </Route>

          <Route path="p-media-ro" element={<Landing />}>
            <Route index element={<PMediaRO />} />
          </Route>
          <Route path="p-media-ro/new-pmedia-ro" element={<Landing />}>
            <Route index element={<NewPMediaRo />} />
            <Route path=":id" element={<NewPMediaRo />} />  // This will match /p-media-ro/new-pmedia-ro/:id
          </Route>

          <Route path="design-print-invoices" element={<Landing />}>
            <Route index element={<DesignPrintInvoices />} />
          </Route>
          <Route path="design-print-invoices/new-invoice" element={<Landing />}>
            <Route index element={<NewInvoice />} />
            <Route path=":id" element={<NewInvoice />} />  // This will match /design-print-invoices/new-invoice/:id
          </Route>

          <Route path="ad-schedular" element={<Landing />}>
            <Route index element={<AdSchedular />} />
          </Route>

          <Route path="work-schedular" element={<Landing />}>
            <Route index element={<WorkSchedular />} />
          </Route>

          <Route path="financial-reports" element={<Landing />}>
            <Route path="e-media-ro-list" element={<EMediaRoList />} />
            <Route path="p-media-ro-list" element={<PMediaRoList />} />
            <Route path="design-print-report" element={<DesignPrintReport />} />
          </Route>

          <Route path="general-reports" element={<Landing />}>
            <Route path="employee-work" element={<EmployeeWork />} />
            <Route path="client-list" element={<ClientList />} />
            <Route path="client-ads" element={<ClientAds />} />
            <Route path="holidays-list" element={<HolidaysList />} />
          </Route>

        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
