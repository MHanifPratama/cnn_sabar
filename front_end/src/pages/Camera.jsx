import React, { useState, useEffect } from 'react';
import ConfirmButton from '../components/ConfirmButton';
import CustomWebcam from '../components/CustomWebCam';
import NpmCard from '../components/NpmCard';

const Camera = () => {
    const [showCapture, setShowCapture] = useState(true);
    const [showConfirm, setShowConfirm] = useState(false);
    const [receivedNPMs, setReceivedNPMs] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/absensi/`);
            const data = await response.json();

            if (data && data.kehadiran === false) {
                // Data received with kehadiran: false, populate with red border cards
                setReceivedNPMs(data.npmData.map((npm) => ({ npm, border: 'red' })));
            } else if (data && data.kehadiran === true) {
                // Data received with kehadiran: true, populate with green border cards
                setReceivedNPMs(data.npmData.map((npm) => ({ npm, border: 'green' })));
            }
        } catch (error) {
            console.error('Error fetching data:', error);
            // Handle errors, set default state or show error message if needed
        }
    };

    const handleCapture = async (npm) => {
        setShowCapture(false);
        setShowConfirm(true);
        if (!receivedNPMs.find((item) => item.npm === npm)) {
            // Make an API call to update the backend with the predictedNpm and datetime now
            try {
                const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/absensi/update`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ npm, datetime: new Date().toISOString() }),
                });

                const updatedData = await response.json();
                // Update state if the backend update was successful
                if (updatedData.success) {
                    setReceivedNPMs((prevNPMs) =>
                        prevNPMs.map((item) =>
                            item.npm === npm ? { ...item, border: 'green' } : item
                        )
                    );
                }
            } catch (error) {
                console.error('Error updating data:', error);
                // Handle errors, show error message if needed
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
        <div className="overflow-hidden">
            <div className='grid grid-cols-2 gap-4'>
                <div>
                    <br />
                    {showCapture ? <CustomWebcam onCapture={handleCapture} onRetake={handleRetake} onConfirm={handleConfirm} /> : null}
                    {showConfirm ? <ConfirmButton onRetake={handleRetake} /> : null}
                </div>
                <div className='grid grid-cols-1 gap-4'>
                    <h1 className='text-white mt-2'>Daftar Hadir</h1>
                    {receivedNPMs.map((npmData, index) => (
                        <NpmCard key={index} npm={npmData.npm} border={npmData.border} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Camera;
