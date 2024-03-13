import React, { useEffect } from 'react'
import Modal from 'antd/es/modal/Modal'
import useEmployeeAPI from '../../API/useEmployeeAPI'
import useAttendanceAPI from '../../API/useAttendanceAPI'
import { Col, Form, Input, Space, Row, ConfigProvider } from 'antd'
import { disableFormTheme } from '../../components/theme/theme'
import Button from '../../components/Button/Button'

const headerStyle = {
    padding: '8px',
    borderBottom: '2px solid #3498DB',
    marginBottom: '8px',
    textAlign: 'center',
    fontWeight: 'bold'
}

const SalaryAttendanceView = ({ id, attendanceId, isOpen, closeHandler }) => {
    const { isGetting, getOneEmployee, oneEmployee } = useEmployeeAPI()
    const { isGettingAttendance, getOneAttendance, oneAttendance } = useAttendanceAPI()

    const [attendanceForm] = Form.useForm()


    useEffect(() => {
        getOneEmployee(id, [])
        getOneAttendance(attendanceId, [attendanceForm])
    }, [id, attendanceId])


    return (
        <Modal
            open={isOpen}
            title={`${oneEmployee.nameTh} ${oneEmployee.lastNameTh}'s Attendance Data`}
            footer={null}
            closeIcon={false}
        >
            <ConfigProvider theme={disableFormTheme}>
                <Form layout='vertical' form={attendanceForm} disabled>
                    <Row gutter={32}>
                        <Col>
                            <div style={headerStyle}>Day</div>
                            <Space direction='vertical'>
                                <Form.Item label="Work Day" name="workDay">
                                    <Input suffix="Day" />
                                </Form.Item>
                                <Form.Item label="Absence Day" name="absenceDay">
                                    <Input suffix="Day" />
                                </Form.Item>
                                <Form.Item label="Sick Day" name="sickDay">
                                    <Input suffix="Day" />
                                </Form.Item>
                                <Form.Item label="Vacation Day" name="vacationDay">
                                    <Input suffix="Day" />
                                </Form.Item>
                                <Form.Item label="Business Leave Day" name="businessLeaveDay">
                                    <Input suffix="Day" />
                                </Form.Item>
                            </Space>
                        </Col>
                        <Col>
                            <div style={headerStyle}>Hour</div>
                            <Space direction='vertical'>
                                <Form.Item label="Work Hour" name="workHour">
                                    <Input suffix="Hour" />
                                </Form.Item>
                                <Form.Item label="Vacation Hour" name="vacationHour">
                                    <Input suffix="Hour" />
                                </Form.Item>
                                <Form.Item label="OT Hour" name="otHour">
                                    <Input suffix="Hour" />
                                </Form.Item>
                                <Form.Item label="OT Holiday Hour" name="otHolidayHour">
                                    <Input suffix="Hour" />
                                </Form.Item>
                            </Space>
                        </Col>
                    </Row>
                </Form>
                <div className='footer'
                    style={{
                        display: 'flex',
                        gap: '8px',
                        justifyContent: 'flex-end',
                        marginTop: '16px'
                    }}>
                    <Button onClick={closeHandler}>Close</Button>
                </div>
            </ConfigProvider>
        </Modal>
    )
}

export default SalaryAttendanceView