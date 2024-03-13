import React, { useState } from 'react'
import { Form, Row, Col, Steps, Input, Select, DatePicker, Radio, InputNumber } from 'antd'
import './InformationForm.css'
import { ConfigProvider } from 'antd';
import Button from '../../../components/Button/Button'
import BankModal from './BankModal';
import moment from 'moment';
import useEmployeeAPI from '../../../API/useEmployeeAPI';
import { useNavigate } from 'react-router-dom';

const InformationForm = () => {
    const [personalDone, setPersonalDone] = useState(false)
    const [salaryDone, setSalaryDone] = useState(false)
    const [bankDone, setBankDone] = useState(false)

    const [searchBankModal, setSearchBankModel] = useState(false)

    const { isRegistering, registerEmployee } = useEmployeeAPI()

    const navigate = useNavigate()

    const [personalForm] = Form.useForm()
    const [salaryForm] = Form.useForm()
    const [bankForm] = Form.useForm()

    const handleBankSelection = (bankInfo) => {
        bankForm.setFieldsValue(bankInfo)
    }

    const handleOpenModal = (e) => {
        e.preventDefault()
        setSearchBankModel(true)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const payload = {
            ...personalForm.getFieldsValue(),
            ...salaryForm.getFieldsValue(),
            ...bankForm.getFieldsValue(),
            birthDate: moment(personalForm.getFieldValue('birthDate').$d).format("D MMM YYYY"),
            startDate: moment(personalForm.getFieldValue('startDate').$d).format("D MMM YYYY"),
        }
        registerEmployee(payload)
    }

    const items = [
        {
            title: 'Personal Information',
            status: personalDone ? 'finish' : 'process',
        },
        {
            title: 'Salary Information',
            status: salaryDone ? 'finish' : personalDone ? 'process' : 'wait',
        },
        {
            title: 'Bank Account Information',
            status: bankDone ? 'finish' : salaryDone ? 'process' : 'wait',
        },
    ]

    const onPersonalFormChange = () => {
        setPersonalDone(hasOneUndefinedKey(personalForm.getFieldsValue()))
    }
    const onSalaryFormChange = () => {
        setSalaryDone(hasOneUndefinedKey(salaryForm.getFieldsValue()))
    }
    const onBankFormChange = () => {
        setBankDone(hasOneUndefinedKey(bankForm.getFieldsValue()))
    }

    return (
        <ConfigProvider
            theme={{
                components: {
                    Select: {
                        selectorBg: "##FCFFd4",
                    },
                    Input: {
                        activeBg: "#FCFFd4",
                        colorBgContainerDisabled: '#F2F5CC',
                        hoverBg: "#FCFFd4",
                    },
                    InputNumber: {
                        activeBg: "#FCFFd4",
                        colorBgContainerDisabled: '#F2F5CC',
                        hoverBg: "#FCFFd4",
                    }
                },
            }}
        >
            <BankModal getBankInfo={handleBankSelection} isOpen={searchBankModal}
                closeHandler={() => setSearchBankModel(false)} />
            <Form className='info-form' layout="vertical" requiredMark={false}
                onFieldsChange={onPersonalFormChange}
                form={personalForm}
            >
                <Steps items={items} />
                <br />
                <FormHeader>Personal Information</FormHeader>
                {/* First Row */}
                <Row gutter={32}>
                    <Col span={4}>
                        <Form.Item label="Title TH" name="titleTh" rules={[{ required: true, message: 'Please Enter this Field' }]}>
                            <Select
                                className='required'
                                options={[
                                    { label: 'นาย', value: 'นาย' },
                                    { label: 'นาง', value: 'นาง' },
                                    { label: 'นางสาว', value: 'นางสาว' },
                                ]}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={10}>
                        <Form.Item name="nameTh" label="Name (TH)" rules={[{ required: true, message: 'Please Enter this Field' }]} >
                            <Input className='required' />
                        </Form.Item>
                    </Col>
                    <Col span={10}>
                        <Form.Item name="lastNameTh" label="Lastname (TH)" rules={[{ required: true, message: 'Please Enter this Field' }]}>
                            <Input className='required' />
                        </Form.Item>
                    </Col>
                </Row>

                {/* Second Row */}
                <Row gutter={32}>
                    <Col span={4}>
                        <Form.Item label="Title Eng" name="titleEng" rules={[{ required: true, message: 'Please Enter this Field' }]}>
                            <Select
                                className='required'
                                options={[
                                    { label: 'Mr', value: 'mr' },
                                    { label: 'Ms', value: 'ms' },
                                    { label: 'Mrs', value: 'mrs' },
                                ]}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={10}>
                        <Form.Item name="nameEng" label="Name (Eng)" rules={[{ required: true, message: 'Please Enter this Field' }]}>
                            <Input className='required' />
                        </Form.Item>
                    </Col>
                    <Col span={10}>
                        <Form.Item name="lastNameEng" label="Lastname (Eng)" rules={[{ required: true, message: 'Please Enter this Field' }]}>
                            <Input className='required' />
                        </Form.Item>
                    </Col>
                </Row>

                {/* Third Row */}
                <Row gutter={32}>
                    <Col>
                        <Form.Item name="startDate" label="Start Working Date" rules={[{ required: true, message: 'Please Enter this Field' }]}>
                            <DatePicker className='required' />
                        </Form.Item>
                    </Col>
                    <Col >
                        <Form.Item name="birthDate" label="Birth Date" rules={[{ required: true, message: 'Please Enter this Field' }]}>
                            <DatePicker className='required' />
                        </Form.Item>
                    </Col>
                </Row>

                {/* Forth Row */}
                <Row gutter={32}>
                    <Col span={8}>
                        <Form.Item name="citizenId" label="Citizen Id" rules={[{ required: true, message: 'Please Enter this Field' }]}>
                            <InputNumber className='required' controls={false} style={{ width: '100%' }} />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item name="socialId" label="Social Security Id" rules={[{ required: true, message: 'Please Enter this Field' }]}>
                            <InputNumber className='required' controls={false} style={{ width: '100%' }} />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item name="staffId" label="Staff Code" rules={[{ required: true, message: 'Please Enter this Field' }]}>
                            <Input className='required' />
                        </Form.Item>
                    </Col>
                </Row>
            </Form >

            <Form className='info-form' layout="vertical" requiredMark={false}
                onFieldsChange={onSalaryFormChange}
                form={salaryForm}
                disabled={!personalDone}
            >
                <FormHeader>Salary Information</FormHeader>
                <Row gutter={32}>
                    <Col span={8}>
                        <Form.Item name="salary" label="Base Salary" rules={[{ required: true, message: 'Please Enter this Field' }]}>
                            <InputNumber className='required' controls={false} style={{ width: '100%' }} />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item label="Salary Rule" name="salaryRule" rules={[{ required: true, message: 'Please Enter this Field' }]}>
                            <Select
                                className='required'
                                options={[
                                    { label: 'Monthly', value: 'monthly' },
                                    { label: 'Daily', value: 'daily' },
                                ]}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={4} style={{ display: 'flex', alignItems: 'center' }}>
                        <Button disabled full>Add Salary Rule</Button>
                    </Col>
                </Row>
            </Form>

            <Form className='info-form' layout="vertical" requiredMark={false}
                onFieldsChange={onBankFormChange}
                form={bankForm}
                disabled={!salaryDone}
            >
                <FormHeader>Bank Account Information</FormHeader>
                <Row gutter={32}>
                    <Col span={8}>
                        <Button
                            disabled={!salaryDone}
                            full
                            onClick={handleOpenModal}
                        >
                            Search Bank
                        </Button>
                    </Col>
                    <Col>
                        <Row>
                            <Col>
                                <Form.Item name="bankId" label="Bank Id" rules={[{ required: true, message: 'Please Enter this Field' }]} disabled>
                                    <Input className='required' disabled={true} />
                                </Form.Item>
                                <Form.Item name="branchId" label="Branch Id" rules={[{ required: true, message: 'Please Enter this Field' }]} disabled>
                                    <Input className='required' disabled={true} />
                                </Form.Item>
                            </Col>
                        </Row>
                    </Col>
                    <Col>
                        <Row>
                            <Col>
                                <Form.Item name="bankName" label="Bank Name" rules={[{ required: true, message: 'Please Enter this Field' }]}>
                                    <Input className='required' disabled={true} />
                                </Form.Item>
                                <Form.Item name="branchName" label="Branch Name" rules={[{ required: true, message: 'Please Enter this Field' }]} disabled>
                                    <Input className='required' disabled={true} />
                                </Form.Item>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <br />
                <Row>
                    <Form.Item name="accountType" label="Account Type" rules={[{ required: true, message: 'Please Enter this Field' }]} >
                        <Radio.Group>
                            <Radio value="saving">Saving Account</Radio>
                            <Radio value="current">Current Account</Radio>
                        </Radio.Group>
                    </Form.Item>
                </Row>
                <Row gutter={32}>
                    <Col span={8}>
                        <Form.Item name="accountName" label="Account Name" rules={[{ required: true, message: 'Please Enter this Field' }]} >
                            <Input className='required' />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item name="accountNumber" label="Account Number" rules={[{ required: true, message: 'Please Enter this Field' }]} >
                            <Input className='required' />
                        </Form.Item>
                    </Col>
                </Row>

                <div className='submit-control'>
                    <Button primary disabled={!bankDone} onClick={handleSubmit}>
                        {
                            isRegistering ?
                                'Registering...' :
                                'Register Employee'
                        }
                    </Button>
                    <Button onClick={(e) => {
                        e.preventDefault()
                        navigate('/employee')
                    }}>Cancel</Button>
                </div>
            </Form>

        </ConfigProvider >
    )
}

export default InformationForm

export const FormHeader = ({ children }) => {
    return (
        <h1 className='form-header'>
            {children}
        </h1>
    )
}

function hasOneUndefinedKey(obj) {

    for (let key in obj) {
        if (obj.hasOwnProperty(key) && !obj[key]) {
            return false
        }
    }

    return true;
}