'use client';
import { useState, useEffect } from "react";
import CustomSidebar from "../components/CustomSidebar";
import TokenExpired from "../utils/TokenExpired";
import CustomCard from "../components/CustomCard";

const Home = () => {

    const [showTokenModal, setShowTokenModal] = useState(false)
    const [sumDosen, setSumDosen] = useState("")
    const [sumMahasiswa, setSumMahasiswa] = useState("")
    const [sumMataKuliah, setSumMataKuliah] = useState("")

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = sessionStorage.getItem('token');
                const response = await fetch("http://127.0.0.1:3001/api/v1/dosen/count", {
                    method: 'GET',
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json",
                        "Authorization": token
                    }
                });

                if (response.ok) {
                    const result = await response.json();
                    setSumDosen(result.data);
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
        const fetchData = async () => {
            try {
                const token = sessionStorage.getItem('token');
                const response = await fetch("http://127.0.0.1:3001/api/v1/mahasiswa/count", {
                    method: 'GET',
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json",
                        "Authorization": token
                    }
                });

                if (response.ok) {
                    const result = await response.json();
                    setSumMahasiswa(result.data);
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
        const fetchData = async () => {
            try {
                const token = sessionStorage.getItem('token');
                const response = await fetch("http://127.0.0.1:3001/api/v1/matakuliah/count", {
                    method: 'GET',
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json",
                        "Authorization": token
                    }
                });

                if (response.ok) {
                    const result = await response.json();
                    setSumMataKuliah(result.data);
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

    return (
      <div className="flex dark:bg-gray-900">
                <CustomSidebar />
                <div className="max-h-[20vh] overflow-x-auto flex flex-row space-x-3">
                    <CustomCard subject="Mahasiswa" total={sumMahasiswa} />
                    <CustomCard subject="Dosen" total={sumDosen} />
                    <CustomCard subject="Mata Kuliah" total={sumMataKuliah} />
                </div>
                <>
                    <TokenExpired showTokenModal={showTokenModal} setShowTokenModal={setShowTokenModal} />
                </>
            </div>
    );
}

export default Home;
