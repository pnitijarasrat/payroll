import React, { useEffect, useState } from 'react'
import useAttendanceAPI from '../../API/useAttendanceAPI';
import Button from '../../components/Button/Button';
import SalaryAttendanceView from './SalaryAttendanceView';
import { Spin, message } from 'antd';
import useEmployeeAPI from "../../API/useEmployeeAPI";

const SalaryTable = ({ selectedMonth }) => {
    const { attendance, isGettingAttendance, getAttendance } = useAttendanceAPI()
    const { isGetting, getEmployee, employee } = useEmployeeAPI()

    const [id, setId] = useState('')
    const [atId, setAtId] = useState('')
    const [modalOpen, setModalOpen] = useState(false)

    useEffect(() => {
        getEmployee()
        getAttendance(selectedMonth)
        console.log(attendance)
    }, [selectedMonth])

    const handleViewAttendance = () => {
        setModalOpen(true)
    }

    return (
        <>
            <SalaryAttendanceView id={id} attendanceId={atId} isOpen={modalOpen} closeHandler={() => { setModalOpen(false) }} />
            {
                !isGetting && !isGettingAttendance ?
                    <table className='table'>
                        <thead>
                            <tr>
                                <th>Staff Code</th>
                                <th>Name</th>
                                <th>Attendance</th>
                                <th>Salary</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                employee ?
                                    employee.map((em) => (
                                        <tr key={em.staffId}>
                                            <td>{em.staffId}</td>
                                            <td>{em.nameTh} {em.lastNameTh}</td>
                                            <td>
                                                {
                                                    attendance.length !== 0 &&
                                                    (
                                                        attendance.filter((at) => (em._id === at.employeeId))[0].attendanceData.length === 0 ?
                                                            'No Attendance' :
                                                            <Button onClick={() => {
                                                                const at = attendance.filter((at) => (em._id === at.employeeId))[0]
                                                                if (at.attendanceData.length === 0) {
                                                                    return message.info(`This employee has no attendance data of ${selectedMonth}`)
                                                                }
                                                                setId(em._id)
                                                                setAtId(at.attendanceData[at.attendanceData.length - 1]._id)
                                                                handleViewAttendance()
                                                            }
                                                            }
                                                            >
                                                                View
                                                            </Button>
                                                    )
                                                }
                                            </td>
                                            <td>{em.salary} THB.</td>
                                        </tr>
                                    )) :
                                    <></>
                            }
                        </tbody>
                    </table> :
                    <div>
                        Loading...
                    </div>
            }

        </>
    )
}

export default SalaryTable