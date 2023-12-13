'use client';
import CustomSidebar from "../components/CustomSidebar";
import DeleteDosenModal from "../components/DeleteDosenModal";
import { Label, TextInput, Button, Modal, Table } from 'flowbite-react';
import { useState, useEffect } from "react";
import FieldRequirement from "../components/FieldRequirement";
import SuccessModal from "../components/SuccessModal";
import { GrSearch } from "react-icons/gr";
import TokenExpired from "../utils/TokenExpired";

const Dosen = () => {

    const [userData, setUserData] = useState([]);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [email, setEmail] = useState('');
    const [nip, setNip] = useState('');
    const [nama, setNama] = useState('');
    const [search, setSearch] = useState('')
    const [showSuccessModal, setShowSuccessModal] = useState(false)
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedId, setSelectedId] = useState(null);
    const [showTokenModal, setShowTokenModal] = useState(false)
    const [showFieldReqModal, setShowFieldReqModal] = useState(false)

    const onCloseAddModal = () => {
        setShowAddModal(false);
        setEmail('');
        setNip('');
        setNama('');
      }

    const onCloseEditModal = () => {
        setShowEditModal(false);
        setNip('');
        setEmail('');
        setNama('');
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = sessionStorage.getItem('token');
                const response = await fetch("http://127.0.0.1:3001/api/v1/dosen/", {
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
                    if (result.message == 'Invalid Token') {
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

    const dosenAddHandler = async () => {
        if (!nip || !nama || !email) {
            setShowFieldReqModal(true)
        }

        else {
            try {
                const token = sessionStorage.getItem('token');
                console.warn(email, nip, nama);
                const item = { nip, email, nama };
                const response = await fetch("http://127.0.0.1:3001/api/v1/dosen/", {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json",
                        "Authorization": token
                    },
                    body: JSON.stringify(item)
                });
    
                if (response.ok) {
                    const result = response.json()
                    if (result.message == 'Invalid Token') {
                        setShowTokenModal(true)
                    }
                    else {
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

    const dosenEditHandler = async () => {
        if (!nip || !nama || !email) {
            setShowFieldReqModal(true)
        }

        else {
            try {
                const token = sessionStorage.getItem('token');
                const item = { nip, email, nama };
                const response = await fetch(`http://127.0.0.1:3001/api/v1/dosen/${selectedId}`, {
                    method: 'PATCH',
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json",
                        "Authorization": token
                    },
                    body: JSON.stringify(item)
                });
        
                if (response.ok) {
                    const result = response.json()
                    if (result.message == 'Invalid Token') {
                        setShowTokenModal(true)
                    }
                    else {
                        setShowSuccessModal(true)
                    }
                } else {
                    throw new Error('Failed to update data');
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
                        <h3 className="text-xl text-center font-medium text-gray-900 dark:text-white">Add Dosen</h3>
                        <div>
                        <div className="mb-2 block">
                            <Label htmlFor="nip" value="NIP" />
                        </div>

                        <TextInput
                            id="nip"
                            placeholder="NIP"
                            type="text"
                            onChange={(event) => {
                                const re = /^[0-9\b]+$/; // Regex pattern to allow only numbers
                                if (event.target.value === '' || re.test(event.target.value)) {
                                    setNip(event.target.value);
                                }
                            }}
                            onKeyDown={(event) => {
                                const re = /^[0-9\b]+$/; // Regex pattern to allow only numbers
                                if (event.key !== 'Backspace' && !re.test(event.key)) {
                                    event.preventDefault();
                                }
                            }}
                            required
                        />


                        </div>
                        <div>
                        <div className="mb-2 block">
                            <Label htmlFor="email" value="Email" />
                        </div>

                        <TextInput
                            id="name"
                            placeholder="Nama"
                            onChange={(event) => setNama(event.target.value)}
                            required
                        />


                        </div>
                        <div>
                        <div className="mb-2 block">
                            <Label htmlFor="name" value="Name" />
                        </div>

                        <TextInput
                            id="email" type="email" placeholder="Email"
                            onChange={(event) => {
                                const enteredValue = event.target.value;
                                setEmail(enteredValue);
                            }}
                            pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
                            required
                        />

                        </div>
                        <Button disabled={!nip || !nama || !email} onClick={() => {
                            setShowAddModal(false);
                            dosenAddHandler();
                            }}>Add New Dosen</Button>
                    </div>
                    </Modal.Body>
                </Modal>

                <Modal show={showEditModal} size="md" onClose={onCloseEditModal} popup>
                    <Modal.Header />
                    <Modal.Body>
                        <div className="space-y-6">
                            <h3 className="text-xl text-center font-medium text-gray-900 dark:text-white">Edit Dosen</h3>
                            <div>
                                <div className="mb-2 block">
                                    <Label htmlFor="nip" value="NIP" />
                                </div>
                                <TextInput
                                    id="nip"
                                    placeholder="NIP"
                                    type="text"
                                    value={nip}
                                    onChange={(event) => {
                                        const re = /^[0-9\b]+$/;
                                        if (event.target.value === '' || re.test(event.target.value)) {
                                            setNip(event.target.value);
                                        }
                                    }}
                                    onKeyDown={(event) => {
                                        const re = /^[0-9\b]+$/;
                                        if (event.key !== 'Backspace' && !re.test(event.key)) {
                                            event.preventDefault();
                                        }
                                    }}
                                    required
                                />

                            </div>
                            <div>
                                <div className="mb-2 block">
                                    <Label htmlFor="nama" value="Nama" />
                                </div>
                                <TextInput
                                    id="nama"
                                    placeholder="Nama"
                                    onChange={(event) => setNama(event.target.value)}
                                    required
                                />
                            </div>
                            <div>
                                <div className="mb-2 block">
                                    <Label htmlFor="email" value="Email" />
                                </div>
                                <TextInput
                                    id="email"
                                    type="email"
                                    placeholder="Email"
                                    onChange={(event) => setEmail(event.target.value)}
                                    pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
                                    required
                                />
                            </div>
                            <Button disabled={!nip || !nama || !email} onClick={() => {
                                setShowEditModal(false);
                                dosenEditHandler();
                            }}>Edit Dosen</Button>
                        </div>
                    </Modal.Body>
                </Modal>

                <div className="flex max-w-md m-7 justify-between items-center relative">
                    <div className="mb-2 block flex-grow">
                        <Label className="text-xl" htmlFor="base" value="Search Dosen" />
                        <TextInput className="mt-2" placeholder="search" rightIcon={GrSearch} id="base" type="text" sizing="md" onChange={(e) => setSearch(e.target.value)} />
                    </div>
                    <div className="absolute right-0" style={{ left: '250%' }}>
                        <Button onClick={() => setShowAddModal(true)} className="p-3 rounded-full text-white">+</Button>
                    </div>
                </div>

                <div className="m-auto ml-7 overflow-x-auto overflow-y-auto" style={{ height: "80%", width: "95%"}}>
                    <Table className="" striped style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <Table.Head className="sticky top-0 z-10 bg-cyan-600">
                            <Table.HeadCell className="bg-cyan-600 text-white" style={{ width: '30%' }}>NIP</Table.HeadCell>
                            <Table.HeadCell className="bg-cyan-600 text-white" style={{ width: '30%' }}>Nama</Table.HeadCell>
                            <Table.HeadCell className="bg-cyan-600 text-white" style={{ width: '30%' }}>Email</Table.HeadCell>
                            <Table.HeadCell className="bg-cyan-600 text-white flex item-center" style={{ width: '10%' }}>
                                Action
                                
                            </Table.HeadCell>
                        </Table.Head>
                        <Table.Body className="divide-y">
                            {userData.filter((data) => {
                                return search.toLowerCase() === '' ? data : data.nama_dosen.toLowerCase().includes(search)
                            }).map((data) => (
                                <Table.Row key={data.id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white" style={{ width: '30%' }}>
                                        {data.nip}
                                    </Table.Cell>
                                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white" style={{ width: '30%' }}>
                                        {data.nama_dosen}
                                    </Table.Cell>
                                    <Table.Cell style={{ width: '30%' }}>{data.email}</Table.Cell>
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
                    <FieldRequirement showFieldReqModal={showFieldReqModal} setShowFieldReqModal={setShowFieldReqModal} />
                    <DeleteDosenModal showDeleteModal={showDeleteModal} setShowDeleteModal={setShowDeleteModal} id={selectedId} setUserData={setUserData} userData={userData}/>
                    <SuccessModal showSuccessModal={showSuccessModal} setShowSuccessModal={setShowSuccessModal} />
                    <TokenExpired showTokenModal={showTokenModal} setShowTokenModal={setShowTokenModal} />
                </>
        </div>
    );
};

export default Dosen;
