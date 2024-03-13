import React, { useState, useCallback } from "react";
import axios from "axios";
import { url } from './url'
import { message } from "antd";

export default function useAttendanceAPI() {
    const [attendance, setAttendance] = useState([])
    const [isGettingAttendance, setIsGetting] = useState(false)
    const [isUpdating, setIsUpdating] = useState(false)
    const [oneAttendance, setOneAttendance] = useState({})
    const [isUpdateSuccess, setIsUpdateSuccess] = useState(false)
    const [latestUpdate, setLatestUpdate] = useState()

    const getAttendance = useCallback((month) => {
        setIsGetting(true)
        axios
            .get(`${url}attendance`)
            .then((res) => {
                const filteredMonth = res.data.data.filter((at) => (at.month === month))
                if (!month) {
                    setAttendance([])
                }
                const employeeIdArray = []
                const attendanceArray = []
                for (let i = 0; i < res.data.data.length; i++) {
                    const id = res.data.data[i].employeeId
                    if (!employeeIdArray.includes(id)) {
                        employeeIdArray.push(id)
                    }
                }
                for (let i = 0; i < employeeIdArray.length; i++) {
                    const employeeAttendance = {
                        employeeId: employeeIdArray[i],
                        attendanceData: filteredMonth.filter(at => at.employeeId === employeeIdArray[i])
                    }
                    attendanceArray.push(employeeAttendance)
                }
                setAttendance(attendanceArray)
                setIsGetting(false)
            }).catch((e) => {
                setIsGetting(false)
                message.error(e.message)
                console.log(e)
            })
    }, [])

    const updateAttendance = useCallback((newAttendanceArray, get) => {
        setIsUpdating(true)
        axios
            .post(`${url}attendance`, newAttendanceArray)
            .then((res) => {
                setIsUpdating(false)

                if (res.status === 400) { message.error('Cannot Update Attendance') }
                if (res.status === 201) {
                    setIsUpdateSuccess(true)
                }
                get()
                console.log(res)
            }).catch((e) => {
                setIsUpdating(false)
                message.error(e.message)
                console.log(e)
            })
    }, [])

    const getOneAttendance = useCallback((id, formArray) => {
        setIsGetting(true)
        axios.get(`${url}attendance/${id}`)
            .then((res) => {
                setOneAttendance(res.data)
                for (let i = 0; i < formArray.length; i++) {
                    formArray[i].setFieldsValue(res.data)
                }
                console.log(res)
                setIsGetting(false)
            })
            .catch((e) => {
                setIsGetting(false)
                message.error(e.message)
                console.log(e)
            })
    }, [])

    const getLatestUpdate = useCallback(() => {
        setIsGetting(true)
        axios
            .get(`${url}attendance`)
            .then((res) => {
                setLatestUpdate(res.data.data[res.data.data.length - 1])
                setIsGetting(false)
            }).catch((e) => {
                setIsGetting(false)
                message.error(e.message)
                console.log(e)
            })
    }, [])

    return {
        attendance,
        getAttendance,
        isGettingAttendance,
        updateAttendance,
        isUpdating,
        isUpdateSuccess,
        getOneAttendance,
        oneAttendance,
        getLatestUpdate,
        latestUpdate
    }
}