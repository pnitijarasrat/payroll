import React, { useState } from 'react'
import Card from '../../../components/Card/Card'
import Header from '../../../components/Header/Header'
import "./EmployeeRegister.css"
import InformationForm from '../InformationForm/InformationForm'
import { Spin } from 'antd'
import useEmployeeAPI from '../../../API/useEmployeeAPI'

const EmployeeRegister = () => {
    const [type, setType] = useState('info')
    const infoClick = () => { setType('info') }
    const additionalClick = () => { setType('additional') }
    const { isRegistering } = useEmployeeAPI()

    return (
        <div className='page-container'>
            <Card>
                <Header>Register New Employee</Header>
                <Spin spinning={isRegistering}>
                    <div className='form-container'>
                        <div className='form-type'>
                            <div className={type === 'info' ? 'selected' : ''} onClick={infoClick}>Information</div>
                            <div className={type === 'additional' ? 'selected' : ''} onClick={additionalClick}>Additional</div>
                        </div>
                        <div>
                            <div style={{ display: type === 'info' ? 'block' : 'none' }}>
                                <InformationForm />
                            </div>
                            <div style={{
                                display: type === 'additional' ? 'block' : 'none', textAlign: 'center', padding: '32px 0',
                                border: '1px solid #333', borderTop: 'none'
                            }}>
                                Additional Form is not available.
                            </div>
                        </div>
                    </div>
                </Spin>
            </Card>
        </div>
    )
}

export default EmployeeRegister
