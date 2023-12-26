'use client';
import CustomSidebar from "../components/CustomSidebar";
import DeletePengampuModal from "../components/DeletePengampuModal";
import { Label, TextInput, Button, Modal, Table } from 'flowbite-react';
import { useState, useEffect } from "react";
import FieldRequirement from "../components/FieldRequirement";
import SuccessModal from "../components/SuccessModal";
import { GrSearch } from "react-icons/gr";
import TokenExpired from "../utils/TokenExpired";
import { Dropdown } from 'flowbite-react';

const Pengampu = () => {

    const [userData, setUserData] = useState([]);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [search, setSearch] = useState('');
    const [showSuccessModal, setShowSuccessModal] = useState(false)
    const [showFieldReqModal, setShowFieldReqModal] = useState(false)
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedId, setSelectedId] = useState(null);
    const [showTokenModal, setShowTokenModal] = useState(false)
    const [selectedDosen, setSelectedDosen] = useState('');
    const [selectedMataKuliah, setSelectedMataKuliah] = useState('');
    const [dosenData, setDosenData] = useState([]);
    const [mataKuliahData, setMataKuliahData] = useState([]);

    const onCloseAddModal = () => {
        setShowAddModal(false);
        setSelectedDosen('');
        setSelectedMataKuliah('');
    }

    const onCloseEditModal = () => {
        setShowEditModal(false);
        setSelectedDosen('');
        setSelectedMataKuliah('');
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = sessionStorage.getItem('token');
                const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/pengampu/`, {
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

    useEffect(() => {
        const fetchKelasData = async () => {
            try {
                const token = sessionStorage.getItem('token');
                const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/dosen`, {
                    method: 'GET',
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json",
                        "Authorization": token
                    }
                });

                if (response.ok) {
                    const result = await response.json();
                    setDosenData(result.data);
                    if (result.message === 'Invalid Token') {
                        setShowTokenModal(true)
                    }
                } else {
                    throw new Error('Failed to fetch dosen data');
                }
            } catch (error) {
                console.error(error);
            }
        };

        fetchKelasData();
    }, []);

    useEffect(() => {
        const fetchPeriodeData = async () => {
            try {
                const token = sessionStorage.getItem('token');
                const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/matakuliah`, {
                    method: 'GET',
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json",
                        "Authorization": token
                    }
                });

                if (response.ok) {
                    const result = await response.json();
                    setMataKuliahData(result.data);
                    if (result.message === 'Invalid Token') {
                        setShowTokenModal(true)
                    }
                } else {
                    throw new Error('Failed to fetch mataKuliah data');
                }
            } catch (error) {
                console.error(error);
            }
        };

        fetchPeriodeData();
    }, []);


    const pengampuAddHandler = async () => {
        if (!selectedDosen || !selectedMataKuliah) {
            setShowFieldReqModal(true)
        }
        else {
            try {
                const token = sessionStorage.getItem('token');
                const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/pengampu/`, {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json",
                        "Authorization": token
                    },
                    body: JSON.stringify({
                        "id_dosen": selectedDosen,
                        "id_mk": selectedMataKuliah
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

    const pengampuEditHandler = async () => {
        if (!selectedMataKuliah || !selectedDosen) {
            setShowFieldReqModal(true)
        } else {
            try {
                const token = sessionStorage.getItem('token');
                const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/pengampu/${selectedId}`, {
                    method: 'PATCH',
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json",
                        "Authorization": token
                    },
                    body: JSON.stringify({
                        "id_dosen": selectedDosen,
                        "id_mk": selectedMataKuliah
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

        <div className="flex dark:bg-gray-900">

            <CustomSidebar />

            <div className="w-full h-screen overflow-x-auto">

            <Modal show={showAddModal} size="md" onClose={onCloseAddModal} popup>
                <Modal.Header />
                <Modal.Body>
                    <div className="space-y-6">
                        <h3 className="text-xl text-center font-medium text-gray-900 dark:text-white">Add Pengampu</h3>
                        <div className="space-y-6">
                            <div>
                                <Label className="mb-2 block" htmlFor="dosen" value="Dosen" />
                                <Dropdown style={{ width: '100%' }} label={selectedDosen ? selectedDosen : "Dosen"}   selected={selectedDosen}>
                                    {dosenData.map((dosen) => (
                                        <Dropdown.Item onClick={() => setSelectedDosen(dosen.id)} key={dosen.id} value={dosen.id}>
                                            {dosen.nama_dosen}
                                        </Dropdown.Item>
                                    ))}
                                </Dropdown>
                            </div>
                            <div>
                                <Label className="mb-2 block" htmlFor="mataKuliah" value="Mata Kuliah" />
                                <Dropdown style={{ width: '100%' }} label={selectedMataKuliah ? selectedMataKuliah : "Mata Kuliah"} selected={selectedMataKuliah}>
                                    {mataKuliahData.map((mataKuliah) => (
                                        <Dropdown.Item key={mataKuliah.id} value={mataKuliah.id} onClick={() => setSelectedMataKuliah(mataKuliah.id)}>
                                            {mataKuliah.title}
                                        </Dropdown.Item>
                                    ))}
                                </Dropdown>
                            </div>
                            <Button disabled={!selectedMataKuliah || !selectedDosen} onClick={() => {
                                setShowAddModal(false);
                                pengampuAddHandler();
                            }}>Add Pengampu</Button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>

            <Modal show={showEditModal} size="md" onClose={onCloseEditModal} popup>
                <Modal.Header />
                <Modal.Body>
                    <div className="space-y-6">
                        <h3 className="text-xl text-center font-medium text-gray-900 dark:text-white">Edit Pengampu</h3>
                        <div className="space-y-4">
                            <div>
                                <Label className="mb-2 block" htmlFor="edit-dosen" value="Dosen" />
                                <Dropdown style={{ width: '100%' }} label={selectedDosen ? selectedDosen : "Dosen"} onSelect={(value) => setSelectedDosen(value)} selected={selectedDosen}>
                                    {dosenData.map((dosen) => (
                                        <Dropdown.Item key={dosen.id} value={dosen.id} onClick={() => setSelectedDosen(dosen.id)}>
                                            {dosen.nama_dosen}
                                        </Dropdown.Item>
                                    ))}
                                </Dropdown>
                            </div>
                            <div>
                                <Label className="mb-2 block" htmlFor="edit-mataKuliah" value="Mata Kuliah" />
                                <Dropdown style={{ width: '100%' }} label={selectedMataKuliah ? selectedMataKuliah : "Mata Kuliah"} onSelect={(value) => setSelectedMataKuliah(value)} selected={selectedMataKuliah}>
                                    {mataKuliahData.map((mataKuliah) => (
                                        <Dropdown.Item key={mataKuliah.id} value={mataKuliah.id} onClick={() => setSelectedMataKuliah(mataKuliah.id)}>
                                            {mataKuliah.title}
                                        </Dropdown.Item>
                                    ))}
                                </Dropdown>
                            </div>
                            <Button disabled={ !selectedMataKuliah || !selectedDosen } onClick={() => {
                                setShowEditModal(false);
                                pengampuEditHandler();
                            }}>Edit Pengampu</Button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>

                <div className="flex max-w-md m-7 justify-between items-center relative">
                    <div className="mb-2 block flex-grow">
                        <Label className="text-xl" htmlFor="base" value="Search Mata Kuliah" />
                        <TextInput placeholder="search" rightIcon={GrSearch} className="mt-2" id="base" type="text" sizing="md" onChange={(e) => setSearch(e.target.value)} />
                    </div>
                    <div className="absolute right-0" style={{ left: '250%' }}>
                        <Button onClick={() => setShowAddModal(true)} className="p-3 rounded-full text-white">+</Button>
                    </div>
                </div>

                <div className="m-auto ml-7 overflow-x-auto overflow-y-auto" style={{ height: "78%", width: "95%"}}>
                    <Table hoverable style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <Table.Head className="sticky top-0 z-10 bg-cyan-600">
                            <Table.HeadCell className="dark:bg-cyan-600 bg-cyan-600 text-white" style={{ width: '45%' }}>Dosen</Table.HeadCell>
                            <Table.HeadCell className="dark:bg-cyan-600 bg-cyan-600 text-white" style={{ width: '45%' }}>Mata Kuliah</Table.HeadCell>
                            <Table.HeadCell className="dark:bg-cyan-600 bg-cyan-600 text-white flex item-center" style={{ width: '10%' }}>
                                Action
                            </Table.HeadCell>
                        </Table.Head>
                        <Table.Body className="divide-y">
                        {userData && userData.filter((data) => {
                            return search.toLowerCase() === '' ? data : data.title.toLowerCase().includes(search);
                        }).map((data) => (
                                <Table.Row key={data.id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white" style={{ width: '45%' }}>
                                        {data.id_dosen}
                                    </Table.Cell>
                                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white" style={{ width: '45%' }}>
                                        {data.id_mk}
                                    </Table.Cell>
                                    <Table.Cell style={{ width: '10%' }}> 
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
                    <DeletePengampuModal showDeleteModal={showDeleteModal} setShowDeleteModal={setShowDeleteModal} id={selectedId} setUserData={setUserData} userData={userData}/>
                    <TokenExpired showTokenModal={showTokenModal} setShowTokenModal={setShowTokenModal} />
                </>
        </div>

    );
};

export default Pengampu;
