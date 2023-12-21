'use client';
import CustomSidebar from "../components/CustomSidebar";
import DeleteMataKuliahModal from "../components/DeleteMataKuliahModal";
import { Label, TextInput, Button, Modal, Table } from 'flowbite-react';
import { useState, useEffect } from "react";
import FieldRequirement from "../components/FieldRequirement";
import SuccessModal from "../components/SuccessModal";
import { GrSearch } from "react-icons/gr";
import TokenExpired from "../utils/TokenExpired";
import { Dropdown } from 'flowbite-react';
import { Datepicker } from 'flowbite-react';

const MataKuliah = () => {

    const [userData, setUserData] = useState([]);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [title, setTitle] = useState('');
    const [sks, setSks] = useState('');
    const [jadwal, setJadwal] = useState('');
    const [search, setSearch] = useState('');
    const [showSuccessModal, setShowSuccessModal] = useState(false)
    const [showFieldReqModal, setShowFieldReqModal] = useState(false)
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedId, setSelectedId] = useState(null);
    const [showTokenModal, setShowTokenModal] = useState(false)
    const [selectedKelas, setSelectedKelas] = useState('');
    const [selectedPeriode, setSelectedPeriode] = useState('');
    const [selectedRuangan, setSelectedRuangan] = useState('');
    const [kelasData, setKelasData] = useState([]);
    const [periodeData, setPeriodeData] = useState([]);
    const [ruanganData, setRuanganData] = useState([]);

    const onCloseAddModal = () => {
        setShowAddModal(false);
        setTitle('');
        setSks('');
        setJadwal('');
        setSelectedKelas('');
        setSelectedPeriode('');
        setSelectedRuangan('');
    }

    const onCloseEditModal = () => {
        setShowEditModal(false);
        setTitle('');
        setSks('');
        setJadwal('');
        setSelectedKelas('');
        setSelectedPeriode('');
        setSelectedRuangan('');
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = sessionStorage.getItem('token');
                const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/matakuliah/`, {
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
                const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/kelas`, {
                    method: 'GET',
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json",
                        "Authorization": token
                    }
                });

                if (response.ok) {
                    const result = await response.json();
                    setKelasData(result.data);
                } else {
                    throw new Error('Failed to fetch kelas data');
                }
            } catch (error) {
                console.error(error);
            }
        };

        fetchKelasData();
    }, []);

    // Fetch data for id_periode
    useEffect(() => {
        const fetchPeriodeData = async () => {
            try {
                const token = sessionStorage.getItem('token');
                const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/periode`, {
                    method: 'GET',
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json",
                        "Authorization": token
                    }
                });

                if (response.ok) {
                    const result = await response.json();
                    setPeriodeData(result.data);
                } else {
                    throw new Error('Failed to fetch periode data');
                }
            } catch (error) {
                console.error(error);
            }
        };

        fetchPeriodeData();
    }, []);

    // Fetch data for id_ruangan
    useEffect(() => {
        const fetchRuanganData = async () => {
            try {
                const token = sessionStorage.getItem('token');
                const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/ruangan`, {
                    method: 'GET',
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json",
                        "Authorization": token
                    }
                });

                if (response.ok) {
                    const result = await response.json();
                    setRuanganData(result.data);
                } else {
                    throw new Error('Failed to fetch ruangan data');
                }
            } catch (error) {
                console.error(error);
            }
        };

        fetchRuanganData();
    }, []);


    const mataKuliahAddHandler = async () => {
        if (!title || !sks || !jadwal || !selectedKelas || !selectedPeriode || !selectedRuangan) {
            setShowFieldReqModal(true)
        }
        else {
            try {
                const token = sessionStorage.getItem('token');
                const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/matakuliah/`, {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json",
                        "Authorization": token
                    },
                    body: JSON.stringify({
                        "title": title,
                        "sks": sks,
                        "id_kelas": selectedKelas,
                        "id_periode": selectedPeriode,
                        "id_ruangan": selectedRuangan,
                        "jadwal": jadwal
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

    const mataKuliahEditHandler = async () => {
        if (!title || !sks || !jadwal || !selectedPeriode || !selectedKelas || !selectedRuangan ) {
            setShowFieldReqModal(true)
        } else {
            try {
                const token = sessionStorage.getItem('token');
                const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/matakuliah/${selectedId}`, {
                    method: 'PATCH',
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json",
                        "Authorization": token
                    },
                    body: JSON.stringify({
                        "title": title,
                        "sks": sks,
                        "id_kelas": selectedKelas,
                        "id_periode": selectedPeriode,
                        "id_ruangan": selectedRuangan,
                        "jadwal": jadwal
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
                        <h3 className="text-xl text-center font-medium text-gray-900 dark:text-white">Add Mata Kuliah</h3>
                        <div className="space-y-6">
                            <div>
                                <Label className="mb-2 block" htmlFor="title" value="Subjek" />
                                <TextInput
                                    id="title"
                                    placeholder="Subjek"
                                    type="text"
                                    onChange={(event) => {
                                        setTitle(event.target.value);
                                    }}
                                    required
                                />
                            </div>
                            <div>
                                <Label className="mb-2 block" htmlFor="sks" value="SKS" />
                                <TextInput
                                    id="sks"
                                    type="number"
                                    placeholder="SKS"
                                    onChange={(event) => {
                                        const re = /^[0-9]+$/; // Regex pattern to allow only numbers
                                        if (event.target.value === '' || re.test(event.target.value)) {
                                            setSks(event.target.value);
                                        }
                                    }}
                                    onKeyDown={(event) => {
                                        const re = /^[0-9]+$/; // Regex pattern to allow only numbers
                                        if (event.key !== 'Backspace' && !re.test(event.key)) {
                                            event.preventDefault();
                                        }
                                    }}
                                    pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
                                    required
                                />
                            </div>
                            <div>
                                <Label className="mb-2 block" htmlFor="jadwal" value="Jadwal" />
                                <TextInput
                                    id="jadwal"
                                    placeholder="Jadwal"
                                    onChange={(event) => setJadwal(event.target.value)}
                                    required
                                />
                            </div>
                            <div>
                                <Label className="mb-2 block" htmlFor="kelas" value="Kelas" />
                                <Dropdown style={{ width: '100%' }} label={selectedKelas ? selectedKelas : "Kelas"}   selected={selectedKelas}>
                                    {kelasData.map((kelas) => (
                                        <Dropdown.Item onClick={() => setSelectedKelas(kelas.id)} key={kelas.id} value={kelas.id}>
                                            {kelas.nama_kelas}
                                        </Dropdown.Item>
                                    ))}
                                </Dropdown>
                            </div>
                            <div>
                                <Label className="mb-2 block" htmlFor="periode" value="Periode" />
                                <Dropdown style={{ width: '100%' }} label={selectedPeriode ? selectedPeriode : "Periode"} selected={selectedPeriode}>
                                    {periodeData.map((periode) => (
                                        <Dropdown.Item key={periode.id} value={periode.id} onClick={() => setSelectedPeriode(periode.id)}>
                                            {periode.nama_periode}
                                        </Dropdown.Item>
                                    ))}
                                </Dropdown>
                            </div>
                            <div>
                                <Label className="mb-2 block" htmlFor="ruangan" value="Ruangan" />
                                <Dropdown style={{ width: '100%' }} label={selectedRuangan ? selectedRuangan : "Ruangan"} onSelect={(value) => setSelectedRuangan(value)} selected={selectedRuangan}>
                                    {ruanganData.map((ruangan) => (
                                        <Dropdown.Item key={ruangan.id} value={ruangan.id} onClick={() => setSelectedRuangan(ruangan.id)}>
                                            {ruangan.nama_ruangan}
                                        </Dropdown.Item>
                                    ))}
                                </Dropdown>
                            </div>
                            <Button disabled={ !title || !sks || !jadwal || !selectedPeriode || !selectedKelas || !selectedRuangan } onClick={() => {
                                setShowAddModal(false);
                                mataKuliahAddHandler();
                            }}>Add Mata Kuliah</Button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>

            <Modal show={showEditModal} size="md" onClose={onCloseEditModal} popup>
                <Modal.Header />
                <Modal.Body>
                    <div className="space-y-6">
                        <h3 className="text-xl text-center font-medium text-gray-900 dark:text-white">Edit Mata Kuliah</h3>
                        <div className="space-y-4">
                            <div>
                                <Label className="mb-2 block" htmlFor="edit-title" value="Subjek" />
                                <TextInput
                                    id="edit-title"
                                    placeholder="Subjek"
                                    type="text"
                                    onChange={(event) => {
                                        setTitle(event.target.value);
                                    }}
                                    required
                                />
                            </div>
                            <div>
                                <Label className="mb-2 block" htmlFor="edit-sks" value="SKS" />
                                <TextInput
                                    type="number"
                                    id="edit-sks"
                                    placeholder="SKS"
                                    onChange={(event) => {
                                        const re = /^[0-9]+$/; // Regex pattern to allow only numbers
                                        if (event.target.value === '' || re.test(event.target.value)) {
                                            setSks(event.target.value);
                                        }
                                    }}
                                    onKeyDown={(event) => {
                                        const re = /^[0-9]+$/; // Regex pattern to allow only numbers
                                        if (event.key !== 'Backspace' && !re.test(event.key)) {
                                            event.preventDefault();
                                        }
                                    }}
                                    required
                                />
                            </div>
                            <div>
                                <Label className="mb-2 block" htmlFor="edit-jadwal" value="Jadwal" />
                                <TextInput
                                    id="edit-jadwal"
                                    placeholder="Jadwal"
                                    onChange={(event) => setJadwal(event.target.value)}
                                    required
                                />
                            </div>
                            <div>
                                <Label className="mb-2 block" htmlFor="edit-kelas" value="Kelas" />
                                <Dropdown style={{ width: '100%' }} label={selectedKelas ? selectedKelas : "Kelas"} onSelect={(value) => setSelectedKelas(value)} selected={selectedKelas}>
                                    {kelasData.map((kelas) => (
                                        <Dropdown.Item key={kelas.id} value={kelas.id} onClick={() => setSelectedKelas(kelas.id)}>
                                            {kelas.nama_kelas}
                                        </Dropdown.Item>
                                    ))}
                                </Dropdown>
                            </div>
                            <div>
                                <Label className="mb-2 block" htmlFor="edit-periode" value="Periode" />
                                <Dropdown style={{ width: '100%' }} label={selectedPeriode ? selectedPeriode : "Periode"} onSelect={(value) => setSelectedPeriode(value)} selected={selectedPeriode}>
                                    {periodeData.map((periode) => (
                                        <Dropdown.Item key={periode.id} value={periode.id} onClick={() => setSelectedPeriode(periode.id)}>
                                            {periode.nama_periode}
                                        </Dropdown.Item>
                                    ))}
                                </Dropdown>
                            </div>
                            <div>
                                <Label className="mb-2 block" htmlFor="edit-ruangan" value="Ruangan" />
                                <Dropdown style={{ width: '100%' }} label={selectedRuangan ? selectedRuangan : "Ruangan"} onSelect={(value) => setSelectedRuangan(value)} selected={selectedRuangan}>
                                    {ruanganData.map((ruangan) => (
                                        <Dropdown.Item key={ruangan.id} value={ruangan.id} onClick={() => setSelectedRuangan(ruangan.id)}>
                                            {ruangan.nama_ruangan}
                                        </Dropdown.Item>
                                    ))}
                                </Dropdown>
                            </div>
                            <Button disabled={ !title || !sks || !jadwal || !selectedPeriode || !selectedKelas || !selectedRuangan } onClick={() => {
                                setShowEditModal(false);
                                mataKuliahEditHandler();
                            }}>Edit Mata Kuliah</Button>
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
                            <Table.HeadCell className="dark:bg-cyan-600 bg-cyan-600 text-white" style={{ width: '15%' }}>Subjek</Table.HeadCell>
                            <Table.HeadCell className="dark:bg-cyan-600 bg-cyan-600 text-white" style={{ width: '15%' }}>SKS</Table.HeadCell>
                            <Table.HeadCell className="dark:bg-cyan-600 bg-cyan-600 text-white" style={{ width: '15%' }}>Kelas</Table.HeadCell>
                            <Table.HeadCell className="dark:bg-cyan-600 bg-cyan-600 text-white" style={{ width: '15%' }}>Periode</Table.HeadCell>
                            <Table.HeadCell className="dark:bg-cyan-600 bg-cyan-600 text-white" style={{ width: '15%' }}>Ruangan</Table.HeadCell>
                            <Table.HeadCell className="dark:bg-cyan-600 bg-cyan-600 text-white" style={{ width: '15%' }}>Jadwal</Table.HeadCell>
                            <Table.HeadCell className="dark:bg-cyan-600 bg-cyan-600 text-white flex item-center" style={{ width: '10%' }}>
                                Action
                            </Table.HeadCell>
                        </Table.Head>
                        <Table.Body className="divide-y">
                        {userData && userData.filter((data) => {
                            return search.toLowerCase() === '' ? data : data.title.toLowerCase().includes(search);
                        }).map((data) => (
                                <Table.Row key={data.id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white" style={{ width: '15%' }}>
                                        {data.title}
                                    </Table.Cell>
                                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white" style={{ width: '15%' }}>
                                        {data.sks}
                                    </Table.Cell>
                                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white" style={{ width: '15%' }}>
                                        {data.id_kelas}
                                    </Table.Cell>
                                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white" style={{ width: '15%' }}>
                                        {data.id_periode}
                                    </Table.Cell>
                                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white" style={{ width: '15%' }}>
                                        {data.id_ruangan}
                                    </Table.Cell>
                                    <Table.Cell style={{ width: '15%' }}>{data.jadwal}</Table.Cell>
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
                    <DeleteMataKuliahModal showDeleteModal={showDeleteModal} setShowDeleteModal={setShowDeleteModal} id={selectedId} setUserData={setUserData} userData={userData}/>
                    <TokenExpired showTokenModal={showTokenModal} setShowTokenModal={setShowTokenModal} />
                </>
        </div>

    );
};

export default MataKuliah;
