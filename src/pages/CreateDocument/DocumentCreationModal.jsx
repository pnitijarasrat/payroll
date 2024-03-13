import React, { useState, useEffect } from 'react'
import { Modal, DatePicker, message } from 'antd'
import moment from 'moment'
import Button from '../../components/Button/Button'
import DocumentSelection from './DocumentSelection'
import DocumentInfoView from './DocumentInfoView'
import useSalaryAPI from '../../API/useSalaryAPI'
import FixConfirmSalaryModal from './FixConfirmSalaryModal'

const getDocName = (doc) => {
    switch (doc) {
        case 'pnd1': return "PND1";
        case 'prov': return "Provision and Deduction List";
        case 'salaryTransfer': return "Salary Transfer";
        case 'socialSecurity': return "Social Security";
        case 'salaryCertificate': return "Salary Certificate";
        case 'employeeCertificate': return "Employee Certificate";
    }
}

const DocumentCreationModal = ({ isOpen, closeHandler }) => {
    const [selectedMonth, setSelectedMonth] = useState(null)
    const [modalRender, setModalRender] = useState('selection')
    const [errorModal, setErrorModal] = useState(false)
    const [array, setArray] = useState([])

    const { isGettingSalary, salary, getSalary } = useSalaryAPI()

    useEffect(() => {
        getSalary(selectedMonth)

    }, [selectedMonth])

    const handleSelectMonth = (value) => {
        if (!value) return
        setSelectedMonth(moment(value.$d).format("MMM YYYY"))
        if (selectedMonth && !isGettingSalary) {
            if (salary[salary.length - 1].isConfirmed) return setModalRender('selection')
            else return setModalRender('unconfirmed-salary')
        }
    }

    const onCancel = () => {
        closeHandler()
    }

    const handleSelectType = (type) => {
        const mockArray = array
        if (array.indexOf(type) > -1) {
            mockArray.splice(array.indexOf(type), 1)
        } else {
            mockArray.push(type)
        }
        setArray(mockArray)
    }

    const handleNext = () => {
        if (array.length === 0) return message.info('Please Select Document before try again.')
        if (!isGettingSalary && !salary[salary.length - 1]?.isConfirmed) return setErrorModal(true)
        else return setModalRender('view-info')
    }

    return (
        <>
            <Modal
                title={"Document Creation"}
                open={isOpen}
                closeIcon={null}
                footer={null}
            >
                <div>
                    Month :{" "}
                    <DatePicker picker="month" onChange={(value) => {
                        handleSelectMonth(value)
                    }} />
                </div>
                <div style={{ display: (selectedMonth && modalRender === 'selection') ? 'block' : 'none' }}>
                    <DocumentSelection
                        selectedMonth={selectedMonth}
                        handleSelectType={handleSelectType}
                    />
                </div>
                <div style={{ display: (selectedMonth && modalRender === 'view-info') ? 'block' : 'none' }}>
                    <DocumentInfoView
                        selectedDoc={array}
                        selectedMonth={selectedMonth}
                    />
                </div>
                <div style={{ display: (selectedMonth && modalRender === 'unconfirmed-salary') ? 'block' : 'none' }}>
                    Unconfirmed
                </div>
                <div style={{ display: (selectedMonth && modalRender === 'create-result') ? 'block' : 'none' }}>
                    {
                        array.map((doc) => (<div key={doc}>{`${getDocName(doc)} is created.`}</div>))
                    }
                </div>

                <div className='footer'
                    style={{
                        display: 'flex',
                        gap: '8px',
                        justifyContent: 'flex-end',
                        marginTop: '16px'
                    }}
                >
                    {
                        modalRender !== 'create-result' && <Button onClick={onCancel}>Cancel</Button>
                    }
                    {
                        (selectedMonth && modalRender === 'selection') &&
                        <Button primary onClick={handleNext}>
                            Next
                        </Button>
                    }
                    {
                        (selectedMonth && modalRender === 'view-info') &&
                        <>
                            <Button onClick={() => setModalRender('selection')}>
                                Back
                            </Button>
                            <Button primary onClick={() => setModalRender('create-result')}>
                                Create
                            </Button>
                        </>
                    }
                    {
                        (selectedMonth && modalRender === 'create-result') &&
                        <>
                            <Button onClick={closeHandler}>
                                Close
                            </Button>
                        </>
                    }
                </div>
            </Modal>
            <FixConfirmSalaryModal selectedMonth={selectedMonth} isOpen={errorModal} closeHandler={() => setErrorModal(false)} />
        </>
    )
}

export default DocumentCreationModal