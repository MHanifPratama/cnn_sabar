import './App.css';
import React, {useState} from 'react';
import ConfirmButton from './components/ConfirmButton';
import CustomWebcam from './components/CustomWebCam';
import NpmCard from './components/NpmCard';
import DaftarHadir from './components/DaftarHadir';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  const [showCapture, setShowCapture] = useState(true);
  const [showConfirm, setShowConfirm] = useState(false);
  const [receivedNPMs, setReceivedNPMs] = useState([]);

  const handleCapture = (npm) => {
    setShowCapture(false);
    setShowConfirm(true);
    if (!receivedNPMs.includes(npm)) {
      setReceivedNPMs([...receivedNPMs, npm]);
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
    <div className="App overflow-hidden">

      <div className='row'>

        <div className='col'>
          <br/>
          {showCapture ? (<CustomWebcam onCapture={handleCapture} onRetake={handleRetake} onConfirm={handleConfirm} />) : null}
          {showConfirm ? (<ConfirmButton onRetake={handleRetake} />) : null}
        </div>

        <div className='col'>
          <div className='row'>
            <DaftarHadir />
            {receivedNPMs.map((npm, index) => (
              <NpmCard key={index} npm={npm} />
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

export default App;
