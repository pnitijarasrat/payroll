import React from 'react'

const DocumentTable = () => {
    return (
        <table className='table document'>
            <thead>
                <tr>
                    <th>Category</th>
                    <th>Document Name</th>
                    <th>Submission Period</th>
                    <th className='des-header'>Description</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td rowSpan={2}>Data Management</td>
                    <td>Provision and Deduction List</td>
                    <td>Not required</td>
                    <td>You can create a list by selecting items such as attendance items, provision items, deduction items. It is useful as a reference material for payroll calculation. Also useful for accounting process since the total can be exported by group.</td>
                </tr>
                <tr>
                    <td>Salary Transfer List</td>
                    <td>Not required</td>
                    <td>You can check the salary transfer amount and the transfer destination account before salary transfer.</td>
                </tr>
                <tr>
                    <td>Revenue Department</td>
                    <td>PND1</td>
                    <td>Every month</td>
                    <td>You can check employee income, withholding tax, and totals for each office.</td>
                </tr>
                <tr>
                    <td>Social Security Office</td>
                    <td>Social Security</td>
                    <td>Every month</td>
                    <td>You can check employee social security contribution and totals for office.</td>
                </tr>
                <tr>
                    <td>Salary Certificate</td>
                    <td>Salary Certificate</td>
                    <td>Not Required</td>
                    <td />
                </tr>
                <tr>
                    <td>Employee Certificate</td>
                    <td>Employee Certificate</td>
                    <td>Not Required</td>
                    <td />
                </tr>
            </tbody>
        </table>
    )
}

export default DocumentTable