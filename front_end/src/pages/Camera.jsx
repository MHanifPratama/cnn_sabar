import React, { useState, useEffect } from 'react';
import ConfirmButton from '../components/ConfirmButton';
import CustomWebcam from '../components/CustomWebCam';
import NpmCard from '../components/NpmCard';
import SelectRuanganModal from '../components/SelectRuanganModal';

const Camera = () => {
  const [showCapture, setShowCapture] = useState(true);
  const [showModal, setShowModal] = useState(true);
  const [showConfirm, setShowConfirm] = useState(false);
  const [receivedNPMs, setReceivedNPMs] = useState([]);
  const [predictedNpm, setPredictedNpm] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/absensi/jadwal`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          body: JSON.stringify({ id_ruangan: 1 })
        });
  
        if (response.ok) {
          const data = await response.json();
          console.log(data)
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
    const intervalId = setInterval(fetchData, 1000);
    return () => clearInterval(intervalId);
  }, []);
  
  const handleCapture = (npm) => {
    setPredictedNpm(npm);
    setShowCapture(false);
    setShowConfirm(true);
  };    

  const handleRetake = () => {
    setShowCapture(true);
    setShowConfirm(false);
    setPredictedNpm(null);
  };

  const handleConfirm = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/absensi/set`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({ "npm": sessionStorage.getItem('predictedNpm') }),
      });

      if (response.ok) {
        console.log('Data updated successfully');
      } else {
        console.error('Failed to update data:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Error updating data:', error);
    }
    handleRetake();
  };

  return (
    <div className="overflow-hidden min-h-screen bg-white dark:bg-gray-700">
      <div className="lg:grid lg:grid-cols-2">
        <div className="lg:col-span-1">
          <br />
          {showCapture ? (
            <CustomWebcam
              onCapture={handleCapture}
              onRetake={handleRetake}
              onConfirm={handleConfirm}
              predictedNpm={predictedNpm}
              className="w-screen max-w-full"
            />
          ) : null}
          {showConfirm ? <ConfirmButton onRetake={handleRetake} /> : null}
        </div>

        <div className="lg:col-span-1">
          <h1 className="text-black text-xl text-center mx-auto dark:text-white mt-5 mb-5 lg:mb-0">Daftar Hadir</h1>
          <div className={`lg:grid lg:grid-cols-4 mx-auto ${receivedNPMs.length < 4 ? 'justify-center' : ''}`}>
            {receivedNPMs.map((npmData, index) => (
              <div key={index} className='mx-auto justify-center'>
                <center><NpmCard npm={npmData.npm} border={npmData.border} /></center>
              </div>
            ))}
          </div>
        </div>
      </div>

      <SelectRuanganModal showModal={showModal} setShowModal={setShowModal} />
    </div>
  );
};

export default Camera;
