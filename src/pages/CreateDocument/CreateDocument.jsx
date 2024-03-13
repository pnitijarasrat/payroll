import React, { useState } from "react"
import Card from "../../components/Card/Card"
import Button from '../../components/Button/Button'
import Header from "../../components/Header/Header"
import DocumentTable from "./DocumentTable"
import DocumentCreationModal from "./DocumentCreationModal"

const CreateDocument = () => {
    const [isModalOpen, setIsModalOpen] = useState(false)

    return (
        <>
            {
                isModalOpen &&
                <DocumentCreationModal
                    isOpen={isModalOpen}
                    closeHandler={() => { setIsModalOpen(false) }}
                />
            }
            <div className="page-container">
                <Card>
                    <Header>Create Documents</Header>
                    <div className="action-control">
                        <div style={{ fontWeight: 'bold' }}>Document Details</div>
                        <Button primary onClick={() => { setIsModalOpen(true) }}>Create Document</Button>
                    </div>
                    <DocumentTable />
                </Card>
            </div>
        </>
    )
}

export default CreateDocument