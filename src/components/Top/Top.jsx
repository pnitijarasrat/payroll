import React from 'react'
import logo from '../../assets/img/jobcanlogo.png'
import './Top.css'
import { Link } from 'react-router-dom'

const Top = () => {
    return (
        <div className='top' style={{ paddingLeft: '25px' }}>
            <Link to="/dashboard">
                <img src={logo} width="150px" />
            </Link>
        </div>
    )
}

export default Top