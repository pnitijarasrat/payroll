import React, { useState, useEffect } from 'react'
import Card from '../../../components/Card/Card'
import Header from '../../../components/Header/Header'
import useEmployeeAPI from '../../../API/useEmployeeAPI'
import { useParams, useNavigate } from 'react-router-dom'
import { FormHeader } from '../InformationForm/InformationForm'
import { Row, Col, Spin, Form, Input } from 'antd'
import { ConfigProvider } from 'antd';
import Button from '../../../components/Button/Button'
import BankModal from '../InformationForm/BankModal'
import moment from 'moment'

const EmployeeInfo = () => {
    const { id } = useParams()
    const { isGetting, getOneEmployee, oneEmployee, deleteEmployee, isDeleting, updateEmployee, isUpdating } = useEmployeeAPI()

    const [isEditing, setIsEditing] = useState(false)
    const [searchBankModal, setSearchBankModel] = useState(false)

    const [personalForm] = Form.useForm()
    const [salaryForm] = Form.useForm()
    const [bankForm] = Form.useForm()

    const navigate = useNavigate()

    const handleEdit = () => {
        setIsEditing(!isEditing)
    }

    const handleOpenModal = (e) => {
        e.preventDefault()
        setSearchBankModel(true)
    }

    const handleBankSelection = (bankInfo) => {
        bankForm.setFieldsValue(bankInfo)
    }

    const handleUpdate = (e) => {
        e.preventDefault()
        const payload = {
            ...personalForm.getFieldsValue(),
            ...salaryForm.getFieldsValue(),
            ...bankForm.getFieldsValue(),
            birthDate: moment(personalForm.getFieldValue('birthDate').$d).format("D MMM YYYY"),
            startDate: moment(personalForm.getFieldValue('startDate').$d).format("D MMM YYYY"),
        }
        updateEmployee(payload, id)
    }

    useEffect(() => {
        getOneEmployee(id, [personalForm, salaryForm, bankForm])

    }, [])

    return (
        <>
            <BankModal getBankInfo={handleBankSelection} isOpen={searchBankModal}
                closeHandler={() => setSearchBankModel(false)} />
            <div className='page-container'>
                <Card>
                    <Spin spinning={isGetting}>
                        <Header>Employee : {oneEmployee.titleTh}. {oneEmployee.nameTh} {oneEmployee.lastNameTh}</Header>
                        <div className='action-control'>
                            <div>
                                {
                                    isEditing ?
                                        <>
                                            <Button primary onClick={handleUpdate}>Save</Button>
                                            <Button onClick={handleEdit}>Cancel</Button>
                                        </> :
                                        <Button onClick={handleEdit}>Edit</Button>
                                }
                                <Button red onClick={() => { deleteEmployee(id) }}>{
                                    isDeleting ? 'Deleting...' : 'Delete'
                                }</Button>
                            </div>
                        </div>
                        <ConfigProvider
                            theme={{
                                components: {
                                    Input: {
                                        activeBg: "#fff",
                                        colorBgContainerDisabled: '#ddd',
                                        hoverBg: "#fff",
                                        colorTextDisabled: '#111',
                                        colorBorder: '#ddd',
                                    }
                                },
                            }}
                        >
                            <Form layout="vertical" requiredMark={false}
                                form={personalForm}
                                disabled={!isEditing}
                            >
                                <br />
                                <FormHeader>Personal Information</FormHeader>
                                {/* First Row */}
                                <Row gutter={32}>
                                    <Col span={4}>
                                        <Form.Item label="Title TH" name="titleTh" rules={[{ required: true, message: 'Please Enter this Field' }]}>
                                            <Input />
                                        </Form.Item>
                                    </Col>
                                    <Col span={10}>
                                        <Form.Item name="nameTh" label="Name (TH)" rules={[{ required: true, message: 'Please Enter this Field' }]} >
                                            <Input />
                                        </Form.Item>
                                    </Col>
                                    <Col span={10}>
                                        <Form.Item name="lastNameTh" label="Lastname (TH)" rules={[{ required: true, message: 'Please Enter this Field' }]}>
                                            <Input />
                                        </Form.Item>
                                    </Col>
                                </Row>

                                {/* Second Row */}
                                <Row gutter={32}>
                                    <Col span={4}>
                                        <Form.Item label="Title Eng" name="titleEng" rules={[{ required: true, message: 'Please Enter this Field' }]}>
                                            <Input />
                                        </Form.Item>
                                    </Col>
                                    <Col span={10}>
                                        <Form.Item name="nameEng" label="Name (Eng)" rules={[{ required: true, message: 'Please Enter this Field' }]}>
                                            <Input />
                                        </Form.Item>
                                    </Col>
                                    <Col span={10}>
                                        <Form.Item name="lastNameEng" label="Lastname (Eng)" rules={[{ required: true, message: 'Please Enter this Field' }]}>
                                            <Input />
                                        </Form.Item>
                                    </Col>
                                </Row>

                                {/* Third Row */}
                                <Row gutter={32}>
                                    <Col>
                                        <Form.Item name="startDate" label="Start Working Date" rules={[{ required: true, message: 'Please Enter this Field' }]}>
                                            <Input />
                                        </Form.Item>
                                    </Col>
                                    <Col >
                                        <Form.Item name="birthDate" label="Birth Date" rules={[{ required: true, message: 'Please Enter this Field' }]}>
                                            <Input />
                                        </Form.Item>
                                    </Col>
                                </Row>

                                {/* Forth Row */}
                                <Row gutter={32}>
                                    <Col span={8}>
                                        <Form.Item name="citizenId" label="Citizen Id" rules={[{ required: true, message: 'Please Enter this Field' }]}>
                                            <Input />
                                        </Form.Item>
                                    </Col>
                                    <Col span={8}>
                                        <Form.Item name="socialId" label="Social Security Id" rules={[{ required: true, message: 'Please Enter this Field' }]}>
                                            <Input />
                                        </Form.Item>
                                    </Col>
                                    <Col span={8}>
                                        <Form.Item name="staffId" label="Staff Code" rules={[{ required: true, message: 'Please Enter this Field' }]}>
                                            <Input />
                                        </Form.Item>
                                    </Col>
                                </Row>
                            </Form >
                            <Form layout="vertical" requiredMark={false}
                                form={salaryForm}
                                disabled={!isEditing}
                            >
                                <FormHeader>Salary Information</FormHeader>
                                <Row gutter={32}>
                                    <Col span={10}>
                                        <Form.Item name="salary" label="Base Salary" rules={[{ required: true, message: 'Please Enter this Field' }]} >
                                            <Input />
                                        </Form.Item>
                                    </Col>
                                    <Col span={8}>
                                        <Form.Item label="Salary Rule" name="salaryRule" rules={[{ required: true, message: 'Please Enter this Field' }]}>
                                            <Input />
                                        </Form.Item>
                                    </Col>
                                </Row>
                            </Form>
                            <Form layout="vertical" requiredMark={false}
                                form={bankForm}
                                disabled={!isEditing}
                            >
                                <FormHeader>Bank Account Information</FormHeader>
                                <Row gutter={32}>
                                    {
                                        isEditing &&
                                        <Col span={8}>
                                            <Button
                                                full
                                                onClick={handleOpenModal}
                                            >
                                                Search Bank
                                            </Button>
                                        </Col>
                                    }
                                    <Col>
                                        <Row>
                                            <Col>
                                                <Form.Item name="bankId" label="Bank Id" rules={[{ required: true, message: 'Please Enter this Field' }]} disabled>
                                                    <Input disabled={true} />
                                                </Form.Item>
                                                <Form.Item name="branchId" label="Branch Id" rules={[{ required: true, message: 'Please Enter this Field' }]} disabled>
                                                    <Input disabled={true} />
                                                </Form.Item>
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col>
                                        <Row>
                                            <Col>
                                                <Form.Item name="bankName" label="Bank Name" rules={[{ required: true, message: 'Please Enter this Field' }]}>
                                                    <Input disabled={true} />
                                                </Form.Item>
                                                <Form.Item name="branchName" label="Branch Name" rules={[{ required: true, message: 'Please Enter this Field' }]} disabled>
                                                    <Input disabled={true} />
                                                </Form.Item>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                                <Row>
                                    <Form.Item name="accountType" label="Account Type" rules={[{ required: true, message: 'Please Enter this Field' }]} >
                                        <Input />
                                    </Form.Item>
                                </Row>
                                <Row gutter={32}>
                                    <Col span={8}>
                                        <Form.Item name="accountName" label="Account Name" rules={[{ required: true, message: 'Please Enter this Field' }]} >
                                            <Input />
                                        </Form.Item>
                                    </Col>
                                    <Col span={8}>
                                        <Form.Item name="accountNumber" label="Account Number" rules={[{ required: true, message: 'Please Enter this Field' }]} >
                                            <Input />
                                        </Form.Item>
                                    </Col>
                                </Row>
                            </Form>
                        </ConfigProvider>
                    </Spin>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '16px' }}>
                        <Button primary disabled={!isEditing} onClick={handleUpdate}>
                            {isUpdating ? 'Saving...' : 'Save'}
                        </Button>
                        <Button onClick={() => { navigate(-1) }}>Back</Button>
                    </div>
                </Card>
            </div >
        </>
    )
}

export default EmployeeInfo

const Title = ({ children }) => {
    return (
        <div style={{ paddingBottom: '8px', borderBottom: '1px solid #333' }}>
            {children}
        </div>
    )
}