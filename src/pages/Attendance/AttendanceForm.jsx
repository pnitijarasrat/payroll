import React, { useEffect } from 'react'
import { Form, Input } from 'antd'
import { useForm } from 'antd/es/form/Form'
import Button from '../../components/Button/Button'
import useAttendanceAPI from '../../API/useAttendanceAPI'
import moment from 'moment'

import { options } from './UpdateAttendanceModal'


const AttendanceForm = ({ attendanceType, selectedEmployee, handleBack, selectedMonth, handleClose, handleGetAfterUpdate }) => {
    const [attendanceForm] = useForm()
    const { updateAttendance, isUpdating, isUpdateSuccess, attendance, getAttendance, isGettingAttendance } = useAttendanceAPI()

    const valueArray = options.map((opt) => (opt.value))
    const selectedValue = attendanceType.map((at) => (at.value))

    useEffect(() => {
        getAttendance(selectedMonth)
    }, [])

    const handleSubmit = () => {
        const idArray = []
        const payload = []
        for (let key in attendanceForm.getFieldsValue()) {
            const id = key.split("_")[1]
            if (!idArray.includes(id)) {
                idArray.push(id)
            }
        }
        for (let i = 0; i < idArray.length; i++) {
            const at = attendance.filter((at) => (at.employeeId === idArray[i]))
            let lastAttendance = {}
            valueArray.map(value => lastAttendance[value] = 0)
            if (at[0].attendanceData.length !== 0) {
                lastAttendance = at[0].attendanceData[at[0].attendanceData.length - 1]
            }
            const employeeAttendance = {
                employeeId: idArray[i],
                latestUpdate: moment().format("DD MMM YYYY"),
                month: selectedMonth
            }
            valueArray.forEach(value => {
                employeeAttendance[value] = attendanceForm.getFieldValue(`${value}_${idArray[i]}`) ?
                    attendanceForm.getFieldValue(`${value}_${idArray[i]}`)
                    : lastAttendance[value] ? lastAttendance[value] : 0
                // attendance.filter((at) => (at.employeeId === idArray[i])).attendanceData[attendance[0].attendanceData.length - 1][value]
            })

            payload.push(employeeAttendance)
        }
        updateAttendance(payload, handleGetAfterUpdate)
    }

    return (
        <Form
            form={attendanceForm}
        >
            {
                !isUpdateSuccess ?
                    <table className='table'>
                        <thead>
                            <tr>
                                <th>Staff Code</th>
                                <th>Name</th>
                                {
                                    attendanceType.map((type) => (
                                        <th key={type.label}>{type.label}</th>
                                    ))
                                }
                            </tr>
                        </thead>
                        <tbody>
                            {
                                selectedEmployee.map((em) => (
                                    <tr key={em.staffId}
                                        style={{ verticalAlign: 'baseline' }}
                                    >
                                        <td>{em.staffId}</td>
                                        <td style={{ minWidth: '150px' }}>{em.nameTh} {em.lastNameTh}</td>
                                        {
                                            attendanceType.map((type) => (
                                                <td key={type.label}>
                                                    <Form.Item name={`${type.value}_${em._id}`} style={{ minWidth: '70px' }}>
                                                        <Input />
                                                    </Form.Item>
                                                </td>
                                            ))
                                        }
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table> :
                    <div>
                        Update Attendance Successfully
                    </div>
            }
            <div className='footer'
                style={{
                    display: 'flex',
                    gap: '8px',
                    justifyContent: 'flex-end',
                    marginTop: '16px'
                }}
            >
                {
                    !isUpdateSuccess ?
                        <>
                            <Button onClick={handleBack}>Back</Button>
                            <Button primary onClick={handleSubmit}>{
                                isUpdating ? 'Updating' : 'Update'
                            }
                            </Button>
                        </>
                        :
                        <>
                            <Button onClick={handleClose}>Close</Button>
                        </>
                }
            </div>
        </Form>
    )
}

export default AttendanceForm