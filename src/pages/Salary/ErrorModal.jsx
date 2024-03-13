import React from 'react'
import { Modal } from 'antd'
import Button from '../../components/Button/Button'
import { footer } from '../../components/theme/theme'
import moment from 'moment'

const ErrorModal = ({ isOpen, closeHandler, selectedMonth }) => {
    const monthDiff = []
    console.log(moment(selectedMonth).month())

    for (let i = 0; i < moment(selectedMonth).month(); i++) {
        monthDiff.push(`${moment().month(i).format('MMM')} 2024`)
    }
    return (
        <Modal
            title={`Cannot Confirm Salary of ${selectedMonth}`}
            closeIcon={null}
            footer={null}
            open={isOpen}
        >
            <div>There are {monthDiff.length} unconfirmed month{monthDiff.length > 1 ? 's' : ''}.</div>
            <ul>
                {
                    monthDiff.map((month) => (<li className='month-li' key={month}>{month}</li>))
                }
            </ul>
            <div>
                You can confirm this month after confirming the month{monthDiff.length > 1 ? 's ' : ' '}
                above in orderly.
            </div>
            <div style={{ ...footer, marginTop: '8px' }}>
                <Button onClick={closeHandler}>OK</Button>
            </div>
        </Modal>
    )
}

export default ErrorModal