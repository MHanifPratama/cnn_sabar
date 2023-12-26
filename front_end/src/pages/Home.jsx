'use client';
import { useState, useEffect } from "react";
import CustomSidebar from "../components/CustomSidebar";
import TokenExpired from "../utils/TokenExpired";
import CustomCard from "../components/CustomCard";
import PieChart from "../components/PieChart";
import LineChart from "../components/LineChart";

const Home = () => {

    const [showTokenModal, setShowTokenModal] = useState(false)
    const [sumDosen, setSumDosen] = useState("")
    const [sumMahasiswa, setSumMahasiswa] = useState("")
    const [sumMataKuliah, setSumMataKuliah] = useState("")
    const [sumRuangan, setSumRuangan] = useState("")


    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = sessionStorage.getItem('token');
                const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/dosen/count`, {
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
                const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/mahasiswa/count`, {
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
                const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/ruangan/count`, {
                    method: 'GET',
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json",
                        "Authorization": token
                    }
                });

                if (response.ok) {
                    const result = await response.json();
                    setSumRuangan(result.data);
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
                const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/matakuliah/count`, {
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
        <div className="flex dark:bg-gray-900 h-screen max-w-screen">
      <div className="sticky top-0 flex">
        <CustomSidebar />
      </div>

      <div className="flex flex-col w-full">
        <div className="m-8">
          <h1 className='text-6xl font-bold tracking-tight text-gray-900 dark:text-white'>
            Hi, {sessionStorage.getItem('username')}
          </h1>
        </div>

        <hr className="border-gray-300 dark:border-gray-700 w-full" />

        <div className="bg-gray-100 dark:bg-gray-700 m-6 p-5 rounded-lg">
          <div className="flex justify-center space-x-10">
            <CustomCard subject="Mahasiswa" total={sumMahasiswa} />
            <CustomCard subject="Dosen" total={sumDosen} />
            <CustomCard subject="Mata Kuliah" total={sumMataKuliah} />
            <CustomCard subject="Ruangan" total={sumRuangan} />
          </div>

          <div className="flex">
            <div className="ml-6 mt-6 mr-0 p-2 flex-grow">
              <PieChart op1={sumMahasiswa} op2={sumDosen} op3={sumMataKuliah} op4={sumRuangan} />
              
            </div>

            <div className="mt-6 ml-0 p-2 flex-grow">
                <LineChart />
            </div>
          </div>
        </div>

        <div className="my-6">
          <TokenExpired showTokenModal={showTokenModal} setShowTokenModal={setShowTokenModal} />
        </div>
      </div>
    </div>

    );
}

export default Home;
