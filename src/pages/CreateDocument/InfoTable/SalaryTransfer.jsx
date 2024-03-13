import React from 'react'

const SalaryTransferTable = ({ employee }) => {

    return (
        <>
            <br />
            <div style={{ fontSize: '1.2em', fontWeight: 'bold' }}>Salary Transfer Document Information</div>
            <table className='table'>
                <thead>
                    <tr>
                        <th>Staff Code</th>
                        <th>Name</th>
                        <th>Bank</th>
                        <th>Branch</th>
                        <th>Account Number</th>
                        <th>Transfer Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        employee.map((em) => (
                            <tr key={em.staffId}>
                                <td>{em.staffId}</td>
                                <td>{em.nameTh} {em.lastNameTh}</td>
                                <td>{em.bankName}</td>
                                <td>{em.branchName}</td>
                                <td>{em.accountNumber}</td>
                                <td>{em.salary}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </>
    )
}

export default SalaryTransferTable