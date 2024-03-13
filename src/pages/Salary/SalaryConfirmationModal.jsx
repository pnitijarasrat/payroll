import React, { useEffect, useState } from 'react'
import { Modal, Space, DatePicker, Spin } from 'antd'
import Button from '../../components/Button/Button'
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import useEmployeeAPI from "../../API/useEmployeeAPI";
import useSalaryAPI from "../../API/useSalaryAPI";

dayjs.extend(customParseFormat);

const SalaryConfirmationModal = ({ isOpen, selectedMonth, closeHandler, get }) => {

    const { isGetting, employee, getEmployee } = useEmployeeAPI()
    const { confirmSalary, isConfirming } = useSalaryAPI()

    const handleConfirm = () => {
        const newConfirmation = {
            employeePaymentMonth: selectedMonth,
            isConfirmed: true
        }
        confirmSalary(newConfirmation, get)
        closeHandler()
    }

    useEffect(() => {
        getEmployee()
    }, [])

    return (
        <Modal
            open={isOpen}
            closeIcon={null}
            title={"Salary Confirmation"}
            footer={null}
        >
            <Space direction='vertical'>
                <div>Payment Date: 25 {selectedMonth}</div>
                <div>Payment Disclosure Time to Employee: <DatePicker defaultValue={dayjs('2024/01/25', 'YYYY/MM/DD')} /></div>
            </Space>
            <br />
            <br />
            <Spin spinning={isGetting}>
                <table className='table'>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Salary</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            employee.map((em) => (
                                <tr key={em.staffId}>
                                    <td>{em.nameTh} {em.lastNameTh}</td>
                                    <td>{em.salary}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </Spin>
            <div className='footer'
                style={{
                    display: 'flex',
                    gap: '8px',
                    justifyContent: 'flex-end',
                    marginTop: '16px'
                }}
            >
                <Button onClick={closeHandler}>Cancel</Button>
                <Button primary onClick={handleConfirm}>
                    {isConfirming ? 'Confirming...' : 'Confirm'}
                </Button>
            </div>
        </Modal>
    )
}

export default SalaryConfirmationModal