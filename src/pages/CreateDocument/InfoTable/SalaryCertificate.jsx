import React from 'react'
import Button from '../../../components/Button/Button'
import { Checkbox } from 'antd'

const SalaryCertificate = ({ employee }) => {
    return (
        <><br />
            <div style={{ fontSize: '1.2em', fontWeight: 'bold' }}>Salary Certificate Document Information</div>
            <table className='table'>
                <thead>
                    <tr>
                        <th>Staff Code</th>
                        <th>Name</th>
                        <th>Office</th>
                        <th>TH</th>
                        <th>EN</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        employee.map((em) => (
                            <tr key={em.staffId}>
                                <td>{em.staffId}</td>
                                <td>{em.nameTh} {em.lastNameTh}</td>
                                <td>Headquarter</td>
                                <td><Checkbox /></td>
                                <td><Checkbox /></td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </>
    )
}

export default SalaryCertificate