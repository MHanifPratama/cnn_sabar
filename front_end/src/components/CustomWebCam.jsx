import React, { useState, useRef } from 'react';
import Webcam from 'react-webcam';
import TakePictureButton from './TakePictureButton';
import ConfirmButton from './ConfirmButton';
import PostImgFile from '../utils/PostImgFile';
import SelectRuanganModal from './SelectRuanganModal';

const CustomWebcam = ({ onConfirm, onRetake }) => {
  const webcamRef = useRef(null);
  const [imgSrc, setImgSrc] = useState(null);
  const [predictedNpm, setPredictedNpm] = useState(null);
  const [classProbabilities, setClassProbabilities] = useState(null);
  const [showModal, setShowModal] = useState(true)

  const capture = async () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImgSrc(imageSrc);
    const data = await PostImgFile(imageSrc);
    if (data && data.predicted_npm) {
      setPredictedNpm(data.predicted_npm);
      setClassProbabilities(data.class_probabilities);
      sessionStorage.setItem('predictedNpm', data.predicted_npm)
    }
    
  };

  const retake = () => {
    setImgSrc(null);
    setPredictedNpm(null);
    setClassProbabilities(null);
    onRetake();
  };

  const addNpm = (predictedNpm) => {
    onConfirm(predictedNpm);
    retake();
  };

  return (
    <div className="container mx-auto min-h-screen">
      {imgSrc ? (
        <img src={imgSrc} alt="webcam" className="w-100 mx-auto justify-center" />
      ) : (
        <Webcam
          ref={webcamRef}
          className="w-100 mx-auto flex justify-center"
        />
      )}
      <div className="flex justify-center mt-4">
        {imgSrc ? (
          <ConfirmButton
            onClick={retake}
            onConfirm={() => addNpm(predictedNpm)}
            predictedNpm={predictedNpm}
          />
        ) : (
          <TakePictureButton onClick={capture} />
        )}
      </div>

      <SelectRuanganModal showModal={showModal} setShowModal={setShowModal} />
    </div>
  );
};

export default CustomWebcam;
