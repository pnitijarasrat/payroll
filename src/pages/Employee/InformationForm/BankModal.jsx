import React, { useEffect, useState } from 'react'
import Modal from 'antd/es/modal/Modal'
import Button from '../../../components/Button/Button'
import './BankModal.css'

const bank = [
    {
        bankId: '0001',
        bankName: 'Kasikorn Bank',
        branch: [
            {
                branchId: '1001',
                branchName: 'Siam Paragon'
            },
            {
                branchId: '1002',
                branchName: 'Central World'
            },
            {
                branchId: '1003',
                branchName: 'Icon Siam'
            },
        ]
    },
    {
        bankId: '0002',
        bankName: 'SCB Bank',
        branch: [
            {
                branchId: '2001',
                branchName: 'Siam Paragon'
            },
            {
                branchId: '2002',
                branchName: 'Central World'
            },
            {
                branchId: '2003',
                branchName: 'Icon Siam'
            },
        ]
    },
]

const BankModal = ({ isOpen, getBankInfo, closeHandler }) => {
    const [selectedBank, setSelectedBank] = useState('')
    const [selectedBranch, setSelectedBranch] = useState([])
    const [branch, setBranch] = useState('')

    const handleBankSelection = (b) => {
        setSelectedBank({
            bankId: b.bankId,
            bankName: b.bankName
        })
    }
    const handleBranchSelection = (b) => {
        setBranch({
            branchId: b.branchId,
            branchName: b.branchName
        })
    }

    const handleSubmit = () => {
        getBankInfo({
            ...selectedBank,
            ...branch
        })
        closeHandler()
    }

    return (
        <Modal open={isOpen}
            title="Search Bank"
            footer={null}
            onCancel={closeHandler}
        >
            {selectedBranch.length !== 0 && <div style={{ marginBottom: '8px' }}>Selected Bank: {selectedBank.bankName}</div>}
            <table className='table'>
                <thead>
                    {
                        selectedBank === '' ?
                            <tr>
                                <th>Bank Id</th>
                                <th>Bank Name</th>
                            </tr> :
                            <tr>
                                <th>Branch Id</th>
                                <th>Branch Name</th>
                            </tr>
                    }

                </thead>
                <tbody>
                    {
                        selectedBranch.length === 0 ?
                            bank.map((b) => (
                                <tr key={b.bankId} className='bank-row' onClick={() => {
                                    handleBankSelection(b)
                                    setSelectedBranch(b.branch)
                                }}>
                                    <td>{b.bankId}</td>
                                    <td>{b.bankName}</td>
                                </tr>
                            )) :
                            selectedBranch.map((branch) => (
                                <tr key={branch.branchId} className='bank-row' onClick={() => {
                                    handleBranchSelection(branch)
                                }}>
                                    <td>{branch.branchId}</td>
                                    <td>{branch.branchName}</td>
                                </tr>
                            ))
                    }
                </tbody>
            </table>
            <div style={{ marginTop: '32px', display: 'flex', justifyContent: 'flex-end' }}>
                {selectedBranch.length !== 0 ?
                    <div style={{ display: 'flex', gap: '16px' }}>
                        <Button onClick={() => {
                            setSelectedBranch([])
                            setSelectedBank('')
                            setBranch('')
                        }}>
                            Back
                        </Button>
                        <Button primary onClick={handleSubmit} disabled={!branch}>
                            Save
                        </Button>
                    </div> :
                    null
                }
            </div>
        </Modal>
    )
}

export default BankModal