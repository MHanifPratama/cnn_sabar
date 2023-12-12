'use client';
import { Sidebar } from 'flowbite-react';
import { useState } from 'react';
import { HiArrowSmRight, HiChartPie, HiUser, HiViewBoards } from 'react-icons/hi';
import { SiGoogleclassroom } from "react-icons/si";
import { useNavigate } from "react-router-dom"
import { MdMapsHomeWork } from "react-icons/md";
import { DarkThemeToggle } from 'flowbite-react';
import { BsPersonFill } from "react-icons/bs";
import { RiContactsFill } from "react-icons/ri";
import { BsPersonLinesFill } from "react-icons/bs";
import { MdDateRange } from "react-icons/md";
import ConfirmLogoutModal from './ConfirmLogoutModal';

const CustomSidebar = () => {

    const navigate = useNavigate()
    const [showModal, setShowModal] = useState(false);

    return (
        <div className='min-h-screen'>  
            <Sidebar aria-label="Default sidebar example" className="border-r border-gray-300">
                <div className='flex item-center justify-center'>
                    <h1 className='font-bold m-3 text-xl'>
                        CNN Sabar
                    </h1>
                </div>
                <Sidebar.Items>
                    <Sidebar.ItemGroup>
                        <Sidebar.Item icon={HiChartPie} className="hover:cursor-pointer" onClick={() => navigate('/')}>
                            Dashboard
                        </Sidebar.Item>
                        <Sidebar.Item icon={HiViewBoards} className="hover:cursor-pointer" onClick={() => navigate('/absensi')}>
                            Absensi
                        </Sidebar.Item>
                        <Sidebar.Item icon={BsPersonLinesFill} className="hover:cursor-pointer" onClick={() => navigate('/dosen')}>
                            Dosen
                        </Sidebar.Item>
                        <Sidebar.Item icon={BsPersonFill} className="hover:cursor-pointer" onClick={() => navigate('/mahasiswa')}>
                            Mahasiswa
                        </Sidebar.Item>
                        <Sidebar.Item icon={SiGoogleclassroom} className="hover:cursor-pointer" onClick={() => navigate('/kelas')}>
                            Kelas
                        </Sidebar.Item>
                        <Sidebar.Item icon={MdDateRange} className="hover:cursor-pointer" onClick={() => navigate('/periode')}>
                            Periode
                        </Sidebar.Item>
                        <Sidebar.Item icon={MdMapsHomeWork} className="hover:cursor-pointer" onClick={() => navigate('/ruangan')}>
                            Ruangan
                        </Sidebar.Item>
                        <Sidebar.Item icon={HiArrowSmRight} className="hover:cursor-pointer" onClick={() => {
                            setShowModal(true);
                        }}>
                            Logout
                        </Sidebar.Item>
                    </Sidebar.ItemGroup>
                </Sidebar.Items>
            </Sidebar>
            <ConfirmLogoutModal showModal={showModal} setShowModal={setShowModal} />
        </div>
    )
}

export default CustomSidebar