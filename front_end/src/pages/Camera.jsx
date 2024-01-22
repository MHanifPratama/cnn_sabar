import React, { useState, useEffect } from 'react';
import ConfirmButton from '../components/ConfirmButton';
import CustomWebcam from '../components/CustomWebCam';
import NpmCard from '../components/NpmCard';
import SelectRuanganModal from '../components/SelectRuanganModal';

const Camera = () => {
    const [showCapture, setShowCapture] = useState(true);
    const [showModal, setShowModal] = useState(true)
    const [showConfirm, setShowConfirm] = useState(false);
    const [receivedNPMs, setReceivedNPMs] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/absensi/jadwal`, {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json",
                        'Access-Control-Allow-Origin' : '*',
                    },
                    body: JSON.stringify({ id_ruangan: 1 })
                });

                if (response.ok) {
                    const data = await response.json();
                    const transformedData = data.data.map(item => ({
                      npm: item.npm,
                      border: item.kehadiran ? 'green' : 'red'
                    }));
                  
                    setReceivedNPMs(transformedData);
                  } else {
                    throw new Error('Failed to fetch data');
                }
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []);



    const handleCapture = async (npm) => {
        setShowCapture(false);
        setShowConfirm(true);
        if (!receivedNPMs.find((item) => item.npm === npm)) {
            try {
                const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/absensi/set`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'Access-Control-Allow-Origin' : '*',
                    },
                    body: JSON.stringify({ "npm": "2017051001" }),
                });
                console.log(response.data)
            } catch (error) {
                console.error('Error updating data:', error);
            }
        }
    };    

    const handleRetake = () => {
        setShowCapture(true);
        setShowConfirm(false);
    };

    const handleConfirm = (predictedNpm) => {
        handleCapture(predictedNpm);
        handleRetake();
    };

    return (
        <div className="overflow-hidden h-screen bg-white dark:bg-gray-700">
            <div className='grid grid-cols-2 gap-4'>
                <div>
                    <br />
                    {showCapture ? <CustomWebcam onCapture={handleCapture} onRetake={handleRetake} onConfirm={handleConfirm} /> : null}
                    {showConfirm ? <ConfirmButton onRetake={handleRetake} /> : null}
                </div>
                <div className='grid grid-cols-1 gap-4'>
                    <h1 className='text-black text-xl mx-auto mt-5 dark:text-white mt-2'>Daftar Hadir</h1>
                    <div className="card mx-auto">
                        {receivedNPMs.map((npmData, index) => (
                            <NpmCard key={index} npm={npmData.npm} border={npmData.border} />
                        ))}
                    </div>
                </div>
            </div>

            <SelectRuanganModal showModal={showModal} setShowModal={setShowModal} />
        </div>

        
    );
};

export default Camera;
