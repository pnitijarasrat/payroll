import React, { useState, useEffect } from "react"
import Card from '../../components/Card/Card'
import Header from '../../components/Header/Header'
import Button from '../../components/Button/Button'
import { DatePicker, message, ConfigProvider, Spin } from "antd";
import moment from "moment";
import SalaryTable from "./SalaryTable";
import { theme } from "../../components/theme/theme";
import SalaryConfirmationModal from "./SalaryConfirmationModal";
import useSalaryAPI from "../../API/useSalaryAPI";
import UnconfirmModal from "./UnconfirmModal";
import ErrorModal from "./ErrorModal";

const Salary = () => {
    const [selectedMonth, setSelectedMonth] = useState(null)
    const [confirmModal, setConfirmModal] = useState(false)
    const [unConfirmModal, setUnConfirmModal] = useState(false)
    const [errorModal, setErrorModal] = useState(false)

    const { getSalary, salary, isGettingSalary } = useSalaryAPI()

    const handleSelectMonth = (value) => {
        if (!value) return
        setSelectedMonth(moment(value.$d).format("MMM YYYY"))
    }

    const handleConfirmClick = () => {
        if (!selectedMonth) return message.info('Please Select Month.')
        if (selectedMonth !== 'Jan 2024') return setErrorModal(true)
        setConfirmModal(true)
    }

    const handleUnConfirmClick = () => {
        if (!selectedMonth) return message.info('Please Select Month.')
        setUnConfirmModal(true)
    }

    useEffect(() => {
        getSalary(selectedMonth)
    }, [selectedMonth])

    return (
        <div className="page-container">
            {salary.length !== 0 && <UnconfirmModal
                isOpen={unConfirmModal}
                closeHandler={() => { setUnConfirmModal(false) }}
                selectedMonth={selectedMonth}
                get={() => getSalary(selectedMonth)}
            />}
            <SalaryConfirmationModal
                isOpen={confirmModal}
                closeHandler={() => { setConfirmModal(false) }}
                selectedMonth={selectedMonth}
                get={() => getSalary(selectedMonth)}
            />
            <ErrorModal
                isOpen={errorModal}
                selectedMonth={selectedMonth}
                closeHandler={() => { setErrorModal(false) }}
            />
            <ConfigProvider theme={theme}>
                <Card>
                    <Header>Salary</Header>
                    <div className="action-control">
                        <div>
                            Month :
                            <DatePicker picker="month" onChange={(value) => {
                                handleSelectMonth(value)
                            }} />
                        </div>
                        <div>
                            <Button>Prov. and Ded. Items</Button>
                            <Button>Export Payslip</Button>
                            {
                                isGettingSalary ? <Button disabled>Loading...</Button> : (
                                    salary.length === 0 ?
                                        <Button primary onClick={handleConfirmClick}>Confirm Salary</Button>
                                        :
                                        salary[salary.length - 1].isConfirmed ?
                                            <Button primary onClick={handleUnConfirmClick}>Unconfirm Salary</Button>
                                            :
                                            <Button primary onClick={handleConfirmClick}>Confirm Salary</Button>
                                )
                            }
                        </div>
                    </div>
                    {
                        selectedMonth ?
                            <>
                                <br />
                                <div className="action-control">
                                    <div className="attendance-header">
                                        Selected Month : {selectedMonth}
                                    </div>
                                    <div className="attendance-header">
                                        Status : {
                                            isGettingSalary ? 'Loading...' :
                                                (salary.length === 0 ?
                                                    <div className="confirmed-tag unconfirmed">
                                                        Not Confirmed
                                                    </div> :
                                                    salary[salary.length - 1].isConfirmed ?
                                                        <div className="confirmed-tag confirm">
                                                            Confirmed
                                                        </div> :
                                                        <div className="confirmed-tag unconfirmed">
                                                            Not Confirmed
                                                        </div>)
                                        }
                                    </div>
                                </div>
                                <SalaryTable
                                    selectedMonth={selectedMonth}
                                    handleConfirmClick={handleConfirmClick}
                                />
                            </> :
                            <div style={{ padding: '32px', textAlign: 'center' }}>
                                Please Select Month to View Salary Data or Confirm Salary.
                            </div>
                    }
                </Card>
            </ConfigProvider>
        </div>
    )
}

export default Salary