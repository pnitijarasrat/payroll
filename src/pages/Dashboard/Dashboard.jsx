import React, { useEffect } from 'react'
import Card from '../../components/Card/Card'
import Header from '../../components/Header/Header'
import { Link } from 'react-router-dom'
import {
    UsergroupAddOutlined,
    ClockCircleOutlined,
    CheckCircleOutlined,
    SnippetsOutlined
} from '@ant-design/icons';
import './Dashboard.css';
import useEmployeeAPI from '../../API/useEmployeeAPI'
import useAttendanceAPI from '../../API/useAttendanceAPI'
import useSalaryAPI from '../../API/useSalaryAPI'

const Dashboard = () => {

    const { isGetting, employee, getEmployee } = useEmployeeAPI()
    const { isGettingAttendance, latestUpdate, getLatestUpdate } = useAttendanceAPI()
    const { isGettingSalary, latestSalary, getLatestSalary } = useSalaryAPI()

    useEffect(() => {
        getEmployee()
        getLatestUpdate()
        getLatestSalary()
    }, [])

    const tdlArr = [
        {
            icon: <UsergroupAddOutlined type='message' style={{ fontSize: '72px' }} />,
            name: "Register Employee",
            path: "/employee",
            desc: <div>{!isGetting ? `New employee: ${employee.length}` : 'Loading...'}</div>
        },
        {
            icon: <ClockCircleOutlined type='message' style={{ fontSize: '72px' }} />,
            name: "Update Attendance",
            path: "/attendance",
            desc: <div>{!isGettingAttendance ? (!latestUpdate ? `Latest Update: No Update` : `Latest Update: ${latestUpdate.latestUpdate}`) : 'Loading...'}</div>
        },
        {
            icon: <CheckCircleOutlined type='message' style={{ fontSize: '72px' }} />,
            name: "Confirm Salary",
            path: "/salary",
            desc: <div>{!isGettingSalary ? (!latestSalary ? `Latest Confirm: No Update` : `Latest Confirm: ${latestSalary[latestSalary.length - 1].employeePaymentMonth}`) : 'Loading...'}</div>
        },
        {
            icon: <SnippetsOutlined type='message' style={{ fontSize: '72px' }} />,
            name: "Create Document",
            path: "/create-document"
        },
    ]

    return (
        <div className='page-container'>
            <Card>
                <Header>To Do List</Header>
                <div className='tdl-container'>
                    {
                        tdlArr.map((tdl) => (
                            <Link to={tdl.path} key={tdl.name}>
                                <div className='tdl-card'>
                                    <div className='tdl-header'>
                                        <div>{tdl.icon}</div>
                                        <div>{tdl.name}</div>
                                    </div>
                                    <div className='tdl-desc'>{tdl.desc}</div>
                                </div>
                            </Link>
                        ))
                    }
                </div>
            </Card>
        </div>
    )
}

export default Dashboard