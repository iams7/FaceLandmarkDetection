import React, { useState, useEffect, useRef } from "react";
import * as faceapi from "face-api.js";

const FaceLandmarkDetector = ({ showCanvas }) => {
  const videoWidth = 640;
  const videoHeight = 480;

  const [initialized, setInitialized] = useState(false);
  const videoRef = useRef();
  const canvasRef = useRef();

  useEffect(() => {
    const loadModels = async () => {
      const MODEL_URL = process.env.PUBLIC_URL + "models";
      setInitialized(true);
      Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
        faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
        faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
        faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
      ]).then(startVideo);
    };
    loadModels();
  }, []);

  const startVideo = () => {
    navigator.getUserMedia(
      {
        video: {},
      },
      (stream) => (videoRef.current.srcObject = stream),
      (error) => console.log(error)
    );
  };

  const handleVideoOnPlay = () => {
    setInterval(async () => {
      if (initialized) {
        setInitialized(false);
      }
      canvasRef.current.innerHTML = faceapi.createCanvasFromMedia(
        videoRef.current
      );
      const displaySize = {
        width: videoWidth,
        height: videoHeight,
      };
      faceapi.matchDimensions(canvasRef.current, displaySize);
      const detections = await faceapi
        .detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions())
        .withFaceLandmarks()
        .withFaceExpressions();

      const resizedDetections = faceapi.resizeResults(detections, displaySize);
      canvasRef.current
        .getContext("2d")
        .clearRect(0, 0, videoWidth, videoHeight);
      faceapi.draw.drawDetections(canvasRef.current, resizedDetections);
      faceapi.draw.drawFaceLandmarks(canvasRef.current, resizedDetections);
      faceapi.draw.drawFaceExpressions(canvasRef.current, resizedDetections);
      console.log(detections);
    }, 2000);
  };
  return (
    <React.Fragment>
      {showCanvas ? (
        <span className="mx-auto">
          {initialized ? "Initializing..." : "Initialized"}
        </span>
      ) : null}
      <div className="d-flex justify-content-center">
        <video
          ref={videoRef}
          width={videoWidth}
          height={videoHeight}
          autoPlay
          muted
          onPlay={handleVideoOnPlay}
        />
        {showCanvas ? (
          <canvas ref={canvasRef} className="position-absolute" />
        ) : null}
      </div>
    </React.Fragment>
  );
};

export default FaceLandmarkDetector;
