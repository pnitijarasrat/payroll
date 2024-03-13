import React from 'react'
import { Spin } from 'antd'
import { useNavigate } from 'react-router-dom'

const EmployeeTable = ({ employee, isLoading }) => {

    const navigate = useNavigate()

    return (
        <Spin spinning={isLoading}>
            <table className='table'>
                <thead>
                    <tr>
                        <th>Note</th>
                        <th>Staff Code</th>
                        <th>Name</th>
                        <th>Office</th>
                        <th>Employment Type</th>
                        <th>Group</th>
                        <th>Position</th>
                        <th>First Day</th>
                        <th>Retire Date</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        employee.length === 0 ?
                            <div style={{ padding: '16px' }}>
                                No Employee Found
                            </div>
                            :
                            employee.map((em) => (
                                <tr className='bank-row' key={em._id} onClick={() => {
                                    navigate(`/employee/${em._id}`)
                                }}>
                                    <td>{em.note}</td>
                                    <td>{em.staffId}</td>
                                    <td>{em.nameTh} {em.lastNameTh}</td>
                                    <td>{em.office ? em.office : 'Headquarter'}</td>
                                    <td>{em.employType ? em.employType : 'Full Time'}</td>
                                    <td>{em.group ? em.group : 'Ungrouped'}</td>
                                    <td>{em.position ? em.position : 'Junior'}</td>
                                    <td>{em.startDate ? em.startDate : '1/1/2023'}</td>
                                    <td>{em.lastDate ? em.lastDate : 'Not Resigned'}</td>
                                </tr>
                            ))
                    }
                </tbody>
            </table>
        </Spin >
    )
}

export default EmployeeTable