import React, { useState, useRef } from 'react';
import Webcam from 'react-webcam';
import TakePictureButton from './TakePictureButton';
import ConfirmButton from './ConfirmButton';
import PostImgFile from '../utils/PostImgFile';

const CustomWebcam = ({ onConfirm, onRetake }) => {
  const webcamRef = useRef(null);
  const [imgSrc, setImgSrc] = useState(null);
  const [predictedNpm, setPredictedNpm] = useState(null);
  const [classProbabilities, setClassProbabilities] = useState(null);

  const capture = async () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImgSrc(imageSrc);
    const data = await PostImgFile(imageSrc);
    if (data && data.predicted_npm) {
      setPredictedNpm(data.predicted_npm);
      setClassProbabilities(data.class_probabilities);
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
    <div className="container mx-auto">
      {imgSrc ? (
        <img src={imgSrc} alt="webcam" className="w-full" />
      ) : (
        <Webcam
          ref={webcamRef}
          className="w-full"
        />
      )}
      <div className="flex justify-center mt-4">
        {imgSrc ? (
          <ConfirmButton
            onClick={retake}
            onConfirm={() => addNpm(predictedNpm)}
            predictedNpm={predictedNpm}
            classProbabilities={classProbabilities}
          />
        ) : (
          <TakePictureButton onClick={capture} />
        )}
      </div>
    </div>
  );
};

export default CustomWebcam;
