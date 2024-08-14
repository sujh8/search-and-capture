import React, { useState } from 'react';
import './UploadScreenshot.css';
import exampleImage1 from './ss.png';
import exampleImage2 from './s.png';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';

function UploadScreenshot() {
  const [currentStage, setCurrentStage] = useState(1);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    if (selectedImage) {
      toast.success('Upload successful!', {
        position: "top-center",
        autoClose: 3000
      });
      setSelectedImage(null);
      if (currentStage < 2) {
        setCurrentStage(currentStage + 1);
      } else {
        toast.success('All images uploaded!', {
          position: "top-center",
          autoClose: 3000
        });
      }
    } else {
      toast.error('No image uploaded.', {
        position: "top-center",
        autoClose: 3000
      });
    }
  };

  const handleScroll = (direction) => {
    if (direction === 'up' && currentStage > 1) {
      setCurrentStage(currentStage - 1);
    } else if (direction === 'down' && currentStage < 2) {
      setCurrentStage(currentStage + 1);
    }
  };

  const getExampleImage = () => {
    return currentStage === 1 ? exampleImage1 : exampleImage2;
  };

  const getStageInstructions = () => {
    return currentStage === 1 ? (
      <div className="instructions">
        <h3>1. Please upload a screenshot from Google Search.</h3>
        <ul>
          <li>Search in Google using the keyword "Smallcap.ai".</li>
          <li>Locate the website titled: "Smallcap.ai: AI-Driven Insights for Small-cap Crypto Tokens".</li>
          <li>Take a screenshot once you find it in Google Search and upload it.</li>
        </ul>
      </div>
    ) : (
      <div className="instructions">
        <h3>2. Upload a screenshot of the footer of Smallcap.ai Website.</h3>
        <ul>
          <li>Access the website and scroll down to the bottom.</li>
          <li>Take a screenshot of the footer and upload it.</li>
        </ul>
      </div>
    );
  };

  return (
    <div className="page-container">
      <h1 className="page-title">Easy Money: Search & Capture!</h1>

      <div className="upload-screenshot-container">
        <main className={`content ${currentStage === 1 ? 'stage-1' : 'stage-2'}`}>
          {getStageInstructions()}

          <div className="example-text">Example</div>

          <div className="example-image">
            <img src={getExampleImage()} alt="Example Screenshot" />
          </div>

          <div className="upload-section">
            {selectedImage ? (
              <div className="uploaded-image">
                <img src={selectedImage} alt="Uploaded Screenshot" />
              </div>
            ) : (
              <label htmlFor="file-upload" className="upload-label">
                <input
                  type="file"
                  id="file-upload"
                  className="file-input"
                  accept="image/*"
                  onChange={handleImageUpload}
                />
                <div className="upload-placeholder">
                  <p>Choose file or drag here</p>
                  <p>Size limit: 10MB</p>
                </div>
              </label>
            )}
          </div>

          <button className="submit-button" onClick={handleSubmit}>OK</button>

          {/* Arrow Buttons */}
          <div className="arrow-buttons">
            <button
              className="arrow-button up"
              onClick={() => handleScroll('up')}
              disabled={currentStage === 1}
            >
              <FaArrowUp />
            </button>
            <button
              className="arrow-button down"
              onClick={() => handleScroll('down')}
              disabled={currentStage === 2}
            >
              <FaArrowDown />
            </button>
          </div>

          <ToastContainer />
        </main>
      </div>
    </div>
  );
}

export default UploadScreenshot;
