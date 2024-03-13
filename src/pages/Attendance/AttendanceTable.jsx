import React, { useState, useEffect } from 'react'
import { Checkbox, Spin } from 'antd'
import { Link } from 'react-router-dom'
import Button from '../../components/Button/Button'
import useAttendanceAPI from '../../API/useAttendanceAPI'
import UpdateAttendanceModal from './UpdateAttendanceModal'

const AttendanceTable = ({ employee, isLoading, handleSelectEmployee, selectedMonth, isModalOpen, closeHandler, updateArray }) => {

    const { isGettingAttendance, getAttendance, attendance } = useAttendanceAPI()

    useEffect(() => {
        getAttendance(selectedMonth)
    }, [selectedMonth])

    return (
        <>
            <UpdateAttendanceModal
                isOpen={isModalOpen}
                closeHandler={closeHandler}
                selectedEmployee={updateArray}
                selectedMonth={selectedMonth}
                handleGetAfterUpdate={() => getAttendance(selectedMonth)}
            />
            <Spin spinning={isLoading}>
                <table className='table'>
                    <thead>
                        <tr>
                            <th></th>
                            <th>Note</th>
                            <th>Staff Code</th>
                            <th>Name</th>
                            <th>Latest Update</th>
                            <th>Attendance Linked</th>
                            <th />
                        </tr>
                    </thead>
                    <tbody>
                        {
                            employee.length !== 0 ?
                                (employee.map((em) => (
                                    <tr key={em._id}
                                    >
                                        <td><Checkbox onClick={() => {
                                            handleSelectEmployee(em)
                                        }} /></td>
                                        <td>Note</td>
                                        <td>{em.staffId}</td>
                                        <td>{em.nameTh} {em.lastNameTh}</td>
                                        {
                                            attendance.length !== 0 ?
                                                attendance.map((at) => {
                                                    if (at.employeeId === em._id && at.attendanceData.length !== 0) {
                                                        return (
                                                            <>
                                                                <td key={em._id}>
                                                                    {
                                                                        at.attendanceData[at.attendanceData.length - 1].latestUpdate ?
                                                                            at.attendanceData[at.attendanceData.length - 1].latestUpdate : 'No Update'
                                                                    }
                                                                </td>
                                                                <td>Not</td>
                                                                <td>
                                                                    <Link to={`/attendance/${em._id}/${at
                                                                        .attendanceData[at.attendanceData.length - 1]._id}`}
                                                                    >
                                                                        <Button>View</Button>
                                                                    </Link>
                                                                </td>
                                                            </>
                                                        )
                                                    }
                                                }) :
                                                <>
                                                    <td key={em._id}>No Update</td>
                                                    <td>Not</td>
                                                    <td>
                                                        <Link>
                                                            <Button disabled>View</Button>
                                                        </Link>
                                                    </td>
                                                </>
                                        }
                                    </tr>
                                ))) :
                                <div style={{ padding: '16px' }}>No Employee</div>
                        }
                    </tbody>
                </table>
            </Spin>
        </>

    )
}

export default AttendanceTable