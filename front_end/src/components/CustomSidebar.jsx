'use client';
import { Sidebar } from 'flowbite-react';
import { useState } from 'react';
import { HiArrowSmRight, HiChartPie, HiViewBoards } from 'react-icons/hi';
import { SiGoogleclassroom } from "react-icons/si";
import { useNavigate, useLocation } from "react-router-dom"
import { BsPersonFill } from "react-icons/bs";
import { MdMeetingRoom } from "react-icons/md";
import { BsPersonLinesFill } from "react-icons/bs";
import { MdDateRange } from "react-icons/md";
import { MdMenuBook } from "react-icons/md";
import ConfirmLogoutModal from './ConfirmLogoutModal';
import { DarkThemeToggle } from 'flowbite-react';
import { FaMagnifyingGlass } from "react-icons/fa6";
import { FaChalkboardTeacher } from "react-icons/fa";

const CustomSidebar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [showModal, setShowModal] = useState(false);
    const [activeMenuItem, setActiveMenuItem] = useState('Dashboard');

    const handleItemClick = (itemName) => {
        setActiveMenuItem(itemName);
    };

    return (
        <div className='min-h-screen'>  
            <Sidebar aria-label="Default sidebar example" className="border-r border-gray-300 dark:border-gray-900">
                <div className='flex item-center justify-center'>
                <DarkThemeToggle className=''/>
                    <h1 className="text-xl m-5 ml-0 font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                        CNN Sabar
                    </h1>
                </div>
                <Sidebar.Items>
                    <Sidebar.ItemGroup>
                        <Sidebar.Item
                            icon={HiChartPie}
                            className={`hover:cursor-pointer ${location.pathname === '/' ? 'bg-gray-200 dark:bg-gray-700' : ''}`}
                            onClick={() => {
                                navigate('/');
                                handleItemClick('Dashboard');
                            }}
                        >
                            Dashboard
                        </Sidebar.Item>
                        <Sidebar.Item
                            icon={HiViewBoards}
                            className={`hover:cursor-pointer ${location.pathname === '/absensi' ? 'bg-gray-200 dark:bg-gray-700' : ''}`}
                            onClick={() => {
                                navigate('/absensi');
                                handleItemClick('Absensi');
                            }}
                        >
                            Absensi
                        </Sidebar.Item>
                        <Sidebar.Item
                            icon={BsPersonLinesFill}
                            className={`hover:cursor-pointer ${location.pathname === '/dosen' ? 'bg-gray-200 dark:bg-gray-700' : ''}`}
                            onClick={() => {
                                navigate('/dosen');
                                handleItemClick('Dosen');
                            }}
                        >
                            Dosen
                        </Sidebar.Item>
                        <Sidebar.Item
                            icon={BsPersonFill}
                            className={`hover:cursor-pointer ${location.pathname === '/mahasiswa' ? 'bg-gray-200 dark:bg-gray-700' : ''}`}
                            onClick={() => {
                                navigate('/mahasiswa');
                                handleItemClick('Mahasiswa');
                            }}
                        >
                            Mahasiswa
                        </Sidebar.Item>
                        <Sidebar.Item
                            icon={MdMenuBook}
                            className={`hover:cursor-pointer ${location.pathname === '/matakuliah' ? 'bg-gray-200 dark:bg-gray-700' : ''}`}
                            onClick={() => {
                                navigate('/matakuliah');
                                handleItemClick('Mata Kuliah');
                            }}
                        >
                            Mata Kuliah
                        </Sidebar.Item>
                        <Sidebar.Item
                            icon={FaMagnifyingGlass}
                            className={`hover:cursor-pointer ${location.pathname === '/peminat' ? 'bg-gray-200 dark:bg-gray-700' : ''}`}
                            onClick={() => {
                                navigate('/peminat');
                                handleItemClick('Peminat');
                            }}
                        >
                            Peminat
                        </Sidebar.Item>
                        <Sidebar.Item
                            icon={FaChalkboardTeacher}
                            className={`hover:cursor-pointer ${location.pathname === '/pengampu' ? 'bg-gray-200 dark:bg-gray-700' : ''}`}
                            onClick={() => {
                                navigate('/pengampu');
                                handleItemClick('Pengampu');
                            }}
                        >
                            Pengampu
                        </Sidebar.Item>
                        <Sidebar.Item
                            icon={SiGoogleclassroom}
                            className={`hover:cursor-pointer ${location.pathname === '/kelas' ? 'bg-gray-200 dark:bg-gray-700' : ''}`}
                            onClick={() => {
                                navigate('/kelas');
                                handleItemClick('Kelas');
                            }}
                        >
                            Kelas
                        </Sidebar.Item>
                        <Sidebar.Item
                            icon={MdDateRange}
                            className={`hover:cursor-pointer ${location.pathname === '/periode' ? 'bg-gray-200 dark:bg-gray-700' : ''}`}
                            onClick={() => {
                                navigate('/periode');
                                handleItemClick('Periode');
                            }}
                        >
                            Periode
                        </Sidebar.Item>
                        <Sidebar.Item
                            icon={MdMeetingRoom}
                            className={`hover:cursor-pointer ${location.pathname === '/ruangan' ? 'bg-gray-200 dark:bg-gray-700' : ''}`}
                            onClick={() => {
                                navigate('/ruangan');
                                handleItemClick('Ruangan');
                            }}
                        >
                            Ruangan
                        </Sidebar.Item>
                        <Sidebar.Item
                            icon={HiArrowSmRight}
                            className={`hover:cursor-pointer`}
                            onClick={() => {
                                setShowModal(true);
                            }}
                        >
                            Logout
                        </Sidebar.Item>
                    </Sidebar.ItemGroup>
                </Sidebar.Items>
            </Sidebar>
            <ConfirmLogoutModal showModal={showModal} setShowModal={setShowModal} />
        </div>
    )
}

export default CustomSidebar;
