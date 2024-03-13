import React, { useEffect } from 'react'
import Card from '../../components/Card/Card'
import Header from '../../components/Header/Header'
import { Form, Input, Row, Col, ConfigProvider, Spin } from 'antd'
import { FormHeader } from '../Employee/InformationForm/InformationForm'
import Button from '../../components/Button/Button'
import { useParams } from 'react-router-dom'
import useEmployeeAPI from '../../API/useEmployeeAPI'
import useAttendanceAPI from '../../API/useAttendanceAPI'
import { disableFormTheme } from '../../components/theme/theme'
import { useNavigate } from 'react-router-dom'

const EmployeeAttendanceInfo = () => {
    const [attendanceInfoForm] = Form.useForm()
    const { employeeId, attendanceId } = useParams()

    const { getOneEmployee, oneEmployee, isGetting } = useEmployeeAPI()
    const { getOneAttendance, oneAttendance, isGettingAttendance, getAttendance } = useAttendanceAPI()

    const navigate = useNavigate()

    useEffect(() => {
        getAttendance()
        getOneEmployee(employeeId, [attendanceInfoForm])
        getOneAttendance(attendanceId, [attendanceInfoForm])
    }, [])

    return (
        <div className='page-container'>
            <Spin spinning={isGetting || isGettingAttendance}>
                <Card>
                    <Header>{oneEmployee.nameTh} {oneEmployee.lastNameTh}{"'"}s Attendance Data</Header>
                    <div style={{ fontSize: '1.5em', fontWeight: 'bold' }}>
                        Month: {oneAttendance.month}
                    </div>
                    <ConfigProvider
                        theme={disableFormTheme}
                    >
                        <Form
                            form={attendanceInfoForm}
                            layout='vertical'
                            disabled
                        >
                            <FormHeader>Day</FormHeader>
                            <Row gutter={32}>
                                <Col span={4}>
                                    <Form.Item label="Work Day" name="workDay">
                                        <Input suffix="Day" />
                                    </Form.Item>
                                </Col>
                                <Col span={4}>
                                    <Form.Item label="Absence Day" name="absenceDay">
                                        <Input suffix="Day" />
                                    </Form.Item>
                                </Col>
                                <Col span={4}>
                                    <Form.Item label="Sick Day" name="sickDay">
                                        <Input suffix="Day" />
                                    </Form.Item>
                                </Col>
                                <Col span={4}>
                                    <Form.Item label="Vacation Day" name="vacationDay">
                                        <Input suffix="Day" />
                                    </Form.Item>
                                </Col>
                                <Col span={4}>
                                    <Form.Item label="Business Leave Day" name="businessLeaveDay">
                                        <Input suffix="Day" />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <FormHeader>Hour</FormHeader>
                            <Row gutter={32}>
                                <Col span={4}>
                                    <Form.Item label="Work Hour" name="workHour">
                                        <Input suffix="Hour" />
                                    </Form.Item>
                                </Col>
                                <Col span={4}>
                                    <Form.Item label="Vacation Hour" name="vacationHour">
                                        <Input suffix="Hour" />
                                    </Form.Item>
                                </Col>
                                <Col span={4}>
                                    <Form.Item label="OT Hour" name="otHour">
                                        <Input suffix="Hour" />
                                    </Form.Item>
                                </Col>
                                <Col span={4}>
                                    <Form.Item label="OT Holiday Hour" name="otHolidayHour">
                                        <Input suffix="Hour" />
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Form>
                    </ConfigProvider>
                    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '16px' }}>
                        <Button onClick={() => { navigate(-1) }}>Back</Button>
                    </div>
                </Card>
            </Spin>
        </div>
    )
}

export default EmployeeAttendanceInfo