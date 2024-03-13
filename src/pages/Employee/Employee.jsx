import React, { useEffect, useState } from "react"
import Header from '../../components/Header/Header'
import Card from '../../components/Card/Card'
import Button from "../../components/Button/Button"
import EmployeeTable from "./EmployeeTable"
import useEmployeeAPI from "../../API/useEmployeeAPI"
import { message } from 'antd';
import {
    SearchOutlined,
    FilterOutlined
} from '@ant-design/icons';

const Employee = () => {
    const { employee, isGetting, getEmployee } = useEmployeeAPI()
    const [messageApi, contextHolder] = message.useMessage();
    const [searchEmployee, setSearchEmployee] = useState('')

    const downloadClick = () => {
        messageApi.open({
            type: 'error',
            content: 'Download Employee is not available.',
        });
    };

    const registerEmployeeClick = () => {
        window.location = "/employee/register"
    }

    const handleFilter = () => {
        getEmployee(searchEmployee)
    }

    useEffect(() => {
        getEmployee()
    }, [])

    return (
        <div className="page-container">
            {contextHolder}
            <Card>
                <Header>Employee</Header>
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
                    <div>
                        <Button onClick={downloadClick}>Download Employee</Button>
                        <Button primary onClick={registerEmployeeClick}>Register Employee</Button>
                    </div>
                </div>
                <EmployeeTable employee={employee} isLoading={isGetting} />
            </Card>
        </div>
    )
}

export default Employee