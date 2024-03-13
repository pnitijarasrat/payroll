import React from 'react'
import Card from '../../components/Card/Card'
import Header from '../../components/Header/Header'
import { Result } from 'antd'

export const NotAvailable = () => {
    return (
        <div className='page-container'>
            <Card>
                <Header>Oops...</Header>
                <Result
                    status="warning"
                    title="Sorry, this is not available at the moment."
                />
            </Card>
        </div>
    )
}


