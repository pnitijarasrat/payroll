import React from 'react'
import {
    CloseCircleOutlined,
    CheckCircleOutlined
} from '@ant-design/icons';

const SocialSecurityTable = ({ employee, salary }) => {

    return (
        <>
            <br />
            <div style={{ fontSize: '1.2em', fontWeight: 'bold' }}>Social Security Document Information</div>
            <table className='table'>
                <thead>
                    <tr>
                        <th>Office</th>
                        <th>Name</th>
                        <th>Salary Confirmation</th>
                        <th>Social Security Contribution</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        employee.map((em) => (
                            <tr key={em.staffId}>
                                <td>Headquarter</td>
                                <td>{em.nameTh} {em.lastNameTh}</td>
                                <td>{salary[salary.length - 1]?.isConfirmed ? <CheckCircleOutlined /> : <CloseCircleOutlined />}</td>
                                <td>{Math.round(em.salary * 0.005, 2)}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </>
    )
}

export default SocialSecurityTable