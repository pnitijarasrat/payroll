import React, { useState, useEffect } from "react"
import Card from '../../components/Card/Card'
import Header from '../../components/Header/Header'
import Button from '../../components/Button/Button'
import {
    SearchOutlined,
    FilterOutlined,
} from '@ant-design/icons';
import { DatePicker, ConfigProvider, message } from "antd";
import AttendanceTable from "./AttendanceTable";
import useEmployeeAPI from "../../API/useEmployeeAPI";
import useAttendanceAPI from "../../API/useAttendanceAPI";
import moment from "moment";
import UpdateAttendanceModal from "./UpdateAttendanceModal";
import './Attendance.css'
import { theme } from "../../components/theme/theme";

const Attendance = () => {
    const [selectedMonth, setSelectedMonth] = useState(null)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [updateArray, setUpdateArray] = useState([])
    const { isGetting, getEmployee, employee } = useEmployeeAPI()
    const [searchEmployee, setSearchEmployee] = useState('')

    const handleSelectMonth = (value) => {
        if (!value) return
        setSelectedMonth(moment(value.$d).format("MMM YYYY"))
    }

    const handleSelectEmployee = (em) => {
        const mockArray = updateArray
        if (mockArray.indexOf(em) > -1) {
            mockArray.splice(mockArray.indexOf(em), 1)
        } else {
            mockArray.push(em)
        }
        setUpdateArray(mockArray)
    }

    const handleClickUpdate = () => {
        if (updateArray.length === 0) {
            return message.info('Please select at least one employee.')
        } else {
            return setIsModalOpen(true)
        }

    }

    const handleFilter = () => {
        getEmployee(searchEmployee)
    }

    useEffect(() => {
        getEmployee()
        // console.log(attendance)
    }, [selectedMonth])

    return (
        <>

            <div className="page-container">
                <ConfigProvider
                    theme={theme}
                >
                    <Card>
                        <Header>Attendance</Header>
                        <div className="action-control">
                            <div>
                                Search : <input
                                    className="input"
                                    value={searchEmployee}
                                    onChange={(e) => { setSearchEmployee(e.target.value) }}
                                />
                                <Button><SearchOutlined onClick={handleFilter} /></Button>
                                <Button><FilterOutlined /></Button>
                            </div>
                        </div>
                        <div className="action-control">
                            <div>
                                Month :
                                <DatePicker picker="month" onChange={(value) => {
                                    handleSelectMonth(value)
                                }} />
                            </div>
                            <div>
                                <Button disabled>Link with Jobcan AT</Button>
                                <Button primary onClick={handleClickUpdate}>Update Attendance</Button>
                            </div>
                        </div>
                        {!selectedMonth ?
                            <div style={{ padding: '32px', textAlign: 'center' }}>
                                Please Select Month to View Attendance Data.
                            </div>
                            :
                            <>
                                <br />
                                <div className="attendance-header">
                                    Selected Month : {selectedMonth}
                                </div>
                                <AttendanceTable
                                    employee={employee}
                                    isLoading={isGetting}
                                    handleSelectEmployee={handleSelectEmployee}
                                    selectedMonth={selectedMonth}
                                    isModalOpen={isModalOpen}
                                    closeHandler={() => setIsModalOpen(false)}
                                    updateArray={updateArray}
                                />
                            </>
                        }
                    </Card>
                </ConfigProvider>
            </div>
        </>
    )
}

export default Attendance