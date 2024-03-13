import React, { useState, useCallback } from "react";
import axios from "axios";
import { url } from "./url";
import { message } from "antd";

export default function useSalaryAPI() {
    const [salary, setSalary] = useState([])
    const [isGettingSalary, setIsGettingSalary] = useState(false)
    const [isConfirming, setIsConfirming] = useState(false)
    const [latestSalary, setLatestSalary] = useState()

    const getSalary = useCallback((month) => {
        setIsGettingSalary(true)
        axios
            .get(`${url}salary`)
            .then((res) => {
                if (!month) setSalary([])
                else {
                    setSalary(res.data.data.filter((salary) => (salary.employeePaymentMonth === month)))
                }
                setIsGettingSalary(false)
            }).catch((e) => {
                setIsGettingSalary(false)
                message.error(e.message)
                console.log(e)
            })
    }, [])

    const confirmSalary = useCallback((newConfirmation, get) => {
        setIsConfirming(true)
        axios
            .post(`${url}salary`, newConfirmation)
            .then((res) => {
                setIsConfirming(false)
                if (res.status === 400) { message.error('Cannot Confirm Salary') }
                if (res.status === 201) {
                    message.success('Confirm Salary Successfully.')
                    get()
                }
                console.log(res)
            }).catch((e) => {
                setIsConfirming(false)
                message.error(e.message)
                console.log(e)
            })
    }, [])

    const unConfirmSalary = useCallback((id, payload) => {
        setIsConfirming(true)
        axios
            .put(`${url}salary/${id}`, payload)
            .then((res) => {
                setIsConfirming(false)
                if (res.status === 404) { message.error('Cannot Unconfirm Salary') }
                if (res.status === 201) {
                    message.success('Unconfirm Salary Successfully.')
                }
                console.log(res)
            }).catch((e) => {
                setIsConfirming(false)
                message.error(e.message)
                console.log(e)
            })
    }, [])

    const getLatestSalary = useCallback(() => {
        setIsGettingSalary(true)
        axios
            .get(`${url}salary`)
            .then((res) => {
                setLatestSalary(res.data.data)
                setIsGettingSalary(false)
            }).catch((e) => {
                setIsGettingSalary(false)
                message.error(e.message)
                console.log(e)
            })
    }, [])

    return {
        getSalary,
        salary,
        isGettingSalary,
        confirmSalary,
        isConfirming,
        unConfirmSalary,
        getLatestSalary,
        latestSalary
    }
}