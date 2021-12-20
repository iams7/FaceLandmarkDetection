import React, { useState, useEffect, useRef } from "react";
import * as faceapi from "face-api.js";
import "./App.css";
import { Button } from "react-bootstrap";
import LandMarkDetectorModal from "./modals/LandMarkDetectorModal";
import FaceLandmarkDetector from "./components/FaceLandmarkDetector";

function App() {
  const [initialized, setInitialized] = useState(false);

  const [title, setTitle] = useState("");
  const [modalShow, setModalShow] = useState(false);

  const showFaceDetectorModal = () => {
    setTitle("Face Landmark Detector");
    setTimeout(() => {
      setModalShow(true);
    }, 200);
  };

  return (
    <React.Fragment>
      <div className="App mt-5">
        <FaceLandmarkDetector showCanvas={false} />
        <br />
        <Button
          className="mt-5"
          disabled={initialized ? true : false}
          onClick={() => showFaceDetectorModal()}
        >
          Detect Face Landmark
        </Button>
      </div>
      <LandMarkDetectorModal
        title={title}
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </React.Fragment>
  );
}

export default App;
