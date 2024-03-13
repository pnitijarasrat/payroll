import React, { useState } from 'react'
import { Checkbox } from 'antd'
import Button from '../../components/Button/Button'

const DocumentSelection = ({ selectedMonth, handleSelectType }) => {

    const options = [
        {
            label: 'Provision and Deduction List',
            value: 'prov'
        },
        {
            label: 'Salary Transfer',
            value: 'salaryTransfer'
        },
        {
            label: 'PND1',
            value: 'pnd1'
        },
        {
            label: 'Social Security',
            value: 'socialSecurity'
        },
        {
            label: 'Salary Certificate',
            value: 'salaryCertificate'
        },
        {
            label: 'Employee Certificate',
            value: 'employeeCertificate'
        },
    ]

    return (
        <div>
            <br />
            <div>Please select Documents of {selectedMonth}</div>
            <Checkbox.Group style={{ width: '100%', flexDirection: 'column' }}>
                {options.map((opt) => (
                    <Checkbox
                        key={opt.value}
                        value={opt.value}
                        onChange={() => { handleSelectType(opt.value) }}
                    >
                        {opt.label}
                    </Checkbox>
                ))}
            </Checkbox.Group>
        </div>
    )
}

export default DocumentSelection