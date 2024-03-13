import React, { useState } from 'react'
import { Modal, Checkbox, message, } from 'antd';
import Button from '../../components/Button/Button';
import AttendanceForm from './AttendanceForm';
import useAttendanceAPI from '../../API/useAttendanceAPI';

export const options = [
    {
        label: 'Work Day',
        value: 'workDay'
    },
    {
        label: 'Absence Day',
        value: 'absenceDay'
    },
    {
        label: 'Vacation Day',
        value: 'vacationDay'
    },
    {
        label: 'Sick Day',
        value: 'sickDay'
    },
    {
        label: 'Business Leave Day',
        value: 'businessLeaveDay'
    },
    {
        label: 'Vacation Hour',
        value: 'vacationHour'
    },
    {
        label: 'Work Hour',
        value: 'workHour'
    },
    {
        label: 'OT Hour',
        value: 'otHour'
    },
    {
        label: 'OT Holiday Hour',
        value: 'otHolidayHour'
    },
];

const UpdateAttendanceModal = ({ isOpen, closeHandler, selectedEmployee, selectedMonth, handleGetAfterUpdate }) => {
    const [array, setArray] = useState([])
    const [modalRender, setModalRender] = useState('selection')

    const handleSelectType = (type) => {
        const mockArray = array
        if (array.indexOf(type) > -1) {
            mockArray.splice(array.indexOf(type), 1)
        } else {
            mockArray.push(type)
        }
        setArray(mockArray)
    }

    const handleTypeConfirm = () => {
        if (array.length === 0) {
            return message.info('Please select at least one attendance type')
        }
        else {
            return setModalRender('form')
        }
    }

    return (
        <Modal
            open={isOpen}
            footer={null}
            title="Update Attendance"
            closeIcon={null}
            className='update-attendance-modal'
        >
            <div style={{ display: modalRender === 'selection' ? 'block' : 'none' }}>
                Please select attendance type.
                <Checkbox.Group style={{ width: '100%', flexDirection: 'column' }}>
                    {options.map((opt) => (
                        <Checkbox
                            key={opt.value}
                            value={opt.value}
                            onChange={() => { handleSelectType(opt.value) }}>
                            {opt.label}
                        </Checkbox>
                    ))}
                </Checkbox.Group>
                <div className='footer'
                    style={{
                        display: 'flex',
                        gap: '8px',
                        justifyContent: 'flex-end',
                        marginTop: '16px'
                    }}
                >
                    <Button onClick={closeHandler}>Cancel</Button>
                    <Button primary onClick={handleTypeConfirm}>Next</Button>
                </div>
            </div>
            <div style={{ display: modalRender === 'form' ? 'block' : 'none' }}>
                <AttendanceForm
                    attendanceType={options.filter((opt) => (array.includes(opt.value)))}
                    selectedEmployee={selectedEmployee}
                    handleBack={() => { setModalRender('selection') }}
                    selectedMonth={selectedMonth}
                    handleClose={closeHandler}
                    handleGetAfterUpdate={handleGetAfterUpdate}
                />
            </div>
        </Modal >
    )
}

export default UpdateAttendanceModal