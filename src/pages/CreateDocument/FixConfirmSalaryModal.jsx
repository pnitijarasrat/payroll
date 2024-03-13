import React from 'react'
import { Modal } from 'antd'
import Button from '../../components/Button/Button'

const FixConfirmSalaryModal = ({ isOpen, selectedMonth, closeHandler }) => {

    const onGoTo = () => {
        return window.location = "/salary"
    }

    return (
        <Modal
            title={"Cannot Create Document"}
            open={isOpen}
            footer={null}
        >
            <div>
                {selectedMonth}{"'"}s salary is not confirmed. Please confirm it before try again.
            </div>
            <div className='footer'
                style={{
                    display: 'flex',
                    gap: '8px',
                    justifyContent: 'flex-end',
                    marginTop: '16px'
                }}
            >
                <Button onClick={closeHandler}>Close</Button>
                <Button primary onClick={onGoTo}>Go to Confirm Salary</Button>
            </div>
        </Modal>
    )
}

export default FixConfirmSalaryModal