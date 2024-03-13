import React, { useState, useCallback } from "react";
import axios from "axios";
import { url } from "./url";
import { message } from "antd";

export default function useEmployeeAPI() {
    const [employee, setEmployee] = useState([])
    const [isGetting, setIsGetting] = useState(false)
    const [isRegistering, setIsRegistering] = useState(false)
    const [oneEmployee, setOneEmployee] = useState({})
    const [isDeleting, setIsDeleting] = useState(false)
    const [isUpdating, setIsUpdating] = useState(false)

    const getEmployee = useCallback((keyword) => {
        setIsGetting(true)
        axios
            .get(`${url}employee`)
            .then((res) => {
                if (!keyword) {
                    setEmployee(res.data.data)
                }
                else {
                    setEmployee(res.data.data.filter((em) => (em.nameTh.includes(keyword))))
                }
                setIsGetting(false)
            }).catch((e) => {
                setIsGetting(false)
                message.error(e.message)
                console.log(e)
            })
    }, [])

    const registerEmployee = useCallback((newEmployee) => {
        setIsRegistering(true)
        axios
            .post(`${url}employee`, newEmployee)
            .then((res) => {
                setIsRegistering(false)
                if (res.status === 400) { message.error('Cannot Register Employee') }
                if (res.status === 201) {
                    message.success('Register Employee Successfully. Redirecting...')
                    setTimeout(() => {
                        window.location = '/employee'
                    }, 2000)
                }
                console.log(res)
            }).catch((e) => {
                setIsRegistering(false)
                message.error(e.message)
                console.log(e)
            })
    }, [])

    const getOneEmployee = useCallback((id, formArray) => {
        setIsGetting(true)
        axios.get(`${url}employee/${id}`)
            .then((res) => {
                setOneEmployee(res.data)
                for (let i = 0; i < formArray.length; i++) {
                    formArray[i].setFieldsValue(res.data)
                }
                setIsGetting(false)
            })
            .catch((e) => {
                setIsGetting(false)
                message.error(e.message)
                console.log(e)
            })
    }, [])

    const deleteEmployee = useCallback((id) => {
        setIsDeleting(true)
        axios
            .delete(`${url}employee/${id}`)
            .then((res) => {
                setIsDeleting(false)
                if (res.status === 201) {
                    message.success('Delete Successfully')
                    setTimeout(() => {
                        window.location = '/employee'
                    }, 2000)
                }
            })
            .catch((e) => {
                setIsDeleting(false)
                message.error(e.message)
            })
    }, [])

    const updateEmployee = useCallback((payload, id) => {
        setIsUpdating(true)
        axios
            .put(`${url}employee/${id}`, payload)
            .then((res) => {
                setIsUpdating(false)
                if (res.status === 201) {
                    message.success('Update Successfully')
                    setTimeout(() => {
                        window.location = `/employee/${id}`
                    }, 2000)
                }
            })
            .catch((e) => {
                setIsUpdating(false)
                message.error(e.message)
            })
    }, [])

    return {
        employee,
        isGetting,
        getEmployee,
        isRegistering,
        registerEmployee,
        getOneEmployee,
        oneEmployee,
        isDeleting,
        deleteEmployee,
        updateEmployee,
        isUpdating
    }
}