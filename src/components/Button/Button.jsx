import React, { useEffect, useState } from 'react'
import './Button.css'

const Button = ({ onClick, children, primary, disabled, full, red }) => {

    return (
        <button
            className={`button${primary ? ' primary' : ''} ${red ? 'red' : ''} ${disabled ? 'disabled' : ''}`}
            onClick={onClick}
            disabled={disabled ? true : false}
            style={full ? { width: '100%', height: '100%' } : {}}
        >
            {children}
        </button>
    )
}

export default Button