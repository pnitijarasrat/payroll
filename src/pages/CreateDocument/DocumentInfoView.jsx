import React, { useState, useEffect } from 'react'
import useSalaryAPI from '../../API/useSalaryAPI'
import useEmployeeAPI from '../../API/useEmployeeAPI'
import SalaryTransferTable from './InfoTable/SalaryTransfer'
import PND1Table from './InfoTable/PND1Table'
import SocialSecurityTable from './InfoTable/SocialSecurityTable'
import SalaryCertificate from './InfoTable/SalaryCertificate'
import EmployeeCertificate from './InfoTable/EmployeeCertificate'

const DocumentInfoView = ({ selectedDoc, selectedMonth }) => {

    const { getSalary, isGettingSalary, salary } = useSalaryAPI()
    const { getEmployee, isGetting, employee } = useEmployeeAPI()

    useEffect(() => {
        getSalary(selectedMonth)
        getEmployee()
    }, [selectedMonth])

    return (
        <div>
            <br />
            <div>Please check the information of each document below.</div>
            {selectedDoc.includes('salaryTransfer') && (!isGetting ? <SalaryTransferTable employee={employee} /> : 'Loading...')}
            {selectedDoc.includes('pnd1') && (!(isGetting && isGettingSalary) ? <PND1Table employee={employee} salary={salary} /> : 'Loading...')}
            {selectedDoc.includes('socialSecurity') && (!(isGetting && isGettingSalary) ? <SocialSecurityTable employee={employee} salary={salary} /> : 'Loading...')}
            {selectedDoc.includes('salaryCertificate') && (!(isGetting) ? <SalaryCertificate employee={employee} /> : 'Loading...')}
            {selectedDoc.includes('employeeCertificate') && (!(isGetting) ? <EmployeeCertificate employee={employee} /> : 'Loading...')}
        </div>
    )
}

export default DocumentInfoView


