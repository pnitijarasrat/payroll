import React from 'react'
import { Modal } from 'antd'
import Button from '../../components/Button/Button'
import useSalaryAPI from '../../API/useSalaryAPI'

const UnconfirmModal = ({ isOpen, selectedMonth, closeHandler, get }) => {

    const { confirmSalary, isConfirming } = useSalaryAPI()

    const handleUnconfirmation = () => {
        confirmSalary({
            employeePaymentMonth: selectedMonth,
            isConfirmed: false
        }, get)
        closeHandler()
    }

    return (
        <Modal
            title={`Unconfirm Salary`}
            closeIcon={null}
            footer={null}
            open={isOpen}
        >
            {!isConfirming ? `Do you want to unconfirm salary of ${selectedMonth}` : `Unconfirming`}
            <div className='footer' style={{
                display: 'flex',
                gap: '8px',
                justifyContent: 'flex-end',
                marginTop: '16px'
            }}
            >
                <Button onClick={closeHandler}>No</Button>
                <Button primary onClick={handleUnconfirmation}>Yes</Button>
            </div>
        </Modal>
    )
}

export default UnconfirmModal