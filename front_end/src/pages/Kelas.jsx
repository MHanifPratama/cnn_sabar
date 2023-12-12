'use client';
import CustomSidebar from "../components/CustomSidebar";
import DeleteKelasModal from "../components/DeleteKelasModal";
import { Label, TextInput, Button, Modal, Table } from 'flowbite-react';
import { useState, useEffect } from "react";
import FieldRequirement from "../components/FieldRequirement";
import SuccessModal from "../components/SuccessModal";
import TokenExpired from "../utils/TokenExpired";

const Kelas = () => {

    const [userData, setUserData] = useState([]);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [nama, setNama] = useState('');
    const [search, setSearch] = useState('');
    const [showSuccessModal, setShowSuccessModal] = useState(false)
    const [showFieldReqModal, setShowFieldReqModal] = useState(false)
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedId, setSelectedId] = useState(null);
    const [showTokenModal, setShowTokenModal] = useState(false)

    const onCloseAddModal = () => {
        setShowAddModal(false);
        setNama('');
    }

    const onCloseEditModal = () => {
        setShowEditModal(false);
        setNama('');
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = sessionStorage.getItem('token');
                const response = await fetch("http://127.0.0.1:3001/api/v1/kelas/", {
                    method: 'GET',
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json",
                        "Authorization": token
                    }
                });

                if (response.ok) {
                    const result = await response.json();
                    setUserData(result.data);
                    if (result.message === 'Invalid Token') {
                        setShowTokenModal(true)
                    }
                } else {
                    throw new Error('Failed to fetch data');
                }
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []);

    const kelasAddHandler = async () => {
        if (!nama) {
            setShowFieldReqModal(true)
        }
        else {
            try {
                const token = sessionStorage.getItem('token');
                const response = await fetch("http://127.0.0.1:3001/api/v1/kelas/", {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json",
                        "Authorization": token
                    },
                    body: JSON.stringify({
                        "nama_kelas": nama
                    })
                });
    
                if (response.ok) {
                    const result = response.json()
                    if (result.message === 'Invalid Token') {
                        setShowTokenModal(true)
                    } else {
                        setShowSuccessModal(true)
                    }
                } else {
                    throw new Error('Failed to fetch data');
                }
            } catch (error) {
                alert(error);
            }
        }
        
    }

    const kelasEditHandler = async () => {
        if (!nama) {
            setShowFieldReqModal(true)
        } else {
            try {
                const token = sessionStorage.getItem('token');
                const response = await fetch(`http://127.0.0.1:3001/api/v1/kelas/${selectedId}`, {
                    method: 'PATCH',
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json",
                        "Authorization": token
                    },
                    body: JSON.stringify({
                        "nama_kelas": nama
                    })
                });

                if (response.ok) {
                    const result = response.json()
                    if (result.message === 'Invalid Token') {
                        setShowTokenModal(true)
                    } else {
                        setShowSuccessModal(true)
                    }
                } else {
                    throw new Error('Failed to fetch data');
                }
            } catch (error) {
                alert(error);
            }
        }
    }

    return (

        <div className="flex">

            <CustomSidebar />

            <div className="w-full h-screen overflow-x-auto">

                <Modal show={showAddModal} size="md" onClose={onCloseAddModal} popup>
                    <Modal.Header />
                    <Modal.Body>
                    <div className="space-y-6">
                        <h3 className="text-xl text-center font-medium text-gray-900 dark:text-white">Add Kelas</h3>
                        <div className="mb-2 block">
                            <Label htmlFor="nama" value="Kelas" />
                        </div>
                        
                        <TextInput
                            id="nama" type="text" placeholder="Kelas"
                            onChange={(event) => {
                                const enteredValue = event.target.value;
                                setNama(enteredValue);
                            }}
                            pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
                            required
                        />
                        <Button onClick={() => {
                            setShowAddModal(false);
                            kelasAddHandler();
                            }}>Add Kelas</Button>
                    </div>
                    </Modal.Body>
                </Modal>

                <Modal show={showEditModal} size="md" onClose={onCloseEditModal} popup>
                    <Modal.Header />
                    <Modal.Body>
                        <div className="space-y-6">
                            <h3 className="text-xl text-center font-medium text-gray-900 dark:text-white">Edit Kelas</h3>
                                <div className="mb-2 block">
                                    <Label htmlFor="nama" value="Kelas" />
                                </div>
                                
                                <TextInput
                                    id="nama"
                                    placeholder="Kelas"
                                    onChange={(event) => setNama(event.target.value)}
                                    required
                                />

                            <Button onClick={() => {
                                setShowEditModal(false);
                                kelasEditHandler();
                            }}>Edit Kelas
                            </Button>

                        </div>
                    </Modal.Body>
                </Modal>

                <div className="flex max-w-md m-7 justify-between items-center relative">
                    <div className="mb-2 block flex-grow">
                        <Label className="text-xl" htmlFor="base" value="Search Kelas" />
                        <TextInput className="mt-2" id="base" type="text" sizing="md" onChange={(e) => setSearch(e.target.value)} />
                    </div>
                    <div className="absolute right-0" style={{ left: '250%' }}>
                        <Button onClick={() => setShowAddModal(true)} className="p-3 rounded-full text-white">+</Button>
                    </div>
                </div>

                <div className="w-full overflow-x-auto h-96 overflow-y-auto" style={{ height: "80%" }}>
                    <Table striped style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <Table.Head className="sticky top-0 z-10 bg-cyan-600">
                            <Table.HeadCell className="bg-cyan-600 text-white" style={{ width: '80%' }}>Nama</Table.HeadCell>
                            <Table.HeadCell className="bg-cyan-600 text-white flex item-center" style={{ width: '20%' }}>
                                Action
                            </Table.HeadCell>
                        </Table.Head>
                        <Table.Body className="divide-y">
                        {userData && userData.filter((data) => {
                            return search.toLowerCase() === '' ? data : data.nama_kelas.toLowerCase().includes(search);
                        }).map((data) => (
                                <Table.Row key={data.id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white" style={{ width: '80%' }}>
                                        {data.nama_kelas}
                                    </Table.Cell>
                                    <Table.Cell style={{ width: '20%' }}> 
                                        <a onClick={() => {
                                            setShowEditModal(true)
                                            setSelectedId(data.id);
                                        }}
                                        className="font-medium text-cyan-600 hover:cursor-pointer dark:text-cyan-500">
                                            Edit
                                        </a>
                                        <a
                                            onClick={() => {
                                                setShowDeleteModal(true)
                                                setSelectedId(data.id);
                                            }}
                                            className="ml-5 font-medium text-cyan-600 hover:cursor-pointer dark:text-cyan-500">
                                            Delete
                                        </a>
                                    </Table.Cell>
                                </Table.Row>
                            ))}
                        </Table.Body>
                    </Table>
                </div>

            </div>
            
                <>
                    <SuccessModal showSuccessModal={showSuccessModal} setShowSuccessModal={setShowSuccessModal} />
                    <FieldRequirement showFieldReqModal={showFieldReqModal} setShowFieldReqModal={setShowFieldReqModal} />
                    <DeleteKelasModal showDeleteModal={showDeleteModal} setShowDeleteModal={setShowDeleteModal} id={selectedId} setUserData={setUserData} userData={userData}/>
                    <TokenExpired showTokenModal={showTokenModal} setShowTokenModal={setShowTokenModal} />
                </>
        </div>

    );
};

export default Kelas;
