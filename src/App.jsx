import { Route, Routes } from "react-router-dom"
import Employee from "./pages/Employee/Employee"
import EmployeeRegister from "./pages/Employee/EmployeeRegister/EmployeeRegister"
import EmployeeInfo from "./pages/Employee/EmployeeInfo/EmployeeInfo"
import Attendance from "./pages/Attendance/Attendance"
import EmployeeAttendanceInfo from "./pages/Attendance/EmployeeAttendanceInfo"
import Salary from "./pages/Salary/Salary"
import CreateDocument from "./pages/CreateDocument/CreateDocument"
import { NotAvailable } from "./pages/NotAvailable/NotAvailable"
import Navigator from "./components/Navigator/Navigator"
import Dashboard from "./pages/Dashboard/Dashboard"
import Top from "./components/Top/Top"
import './App.css'

export default function App() {

  return (
    <div style={{ display: 'flex', backgroundColor: "#f1f1f1", marginTop: '50px' }}>
      <Top />
      <Navigator />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/employee" element={<Employee />} />
        <Route path="/employee/register" element={<EmployeeRegister />} />
        <Route path="/employee/:id" element={<EmployeeInfo />} />
        <Route path="/attendance" element={<Attendance />} />
        <Route path="/attendance/:employeeId/:attendanceId" element={<EmployeeAttendanceInfo />} />
        <Route path="/salary" element={<Salary />} />
        <Route path="/create-document" element={<CreateDocument />} />
        <Route path="/year-end" element={<NotAvailable />} />
        <Route path="/setting" element={<NotAvailable />} />
      </Routes>
    </div>
  )
}