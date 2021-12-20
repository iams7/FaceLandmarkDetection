import React, { useState, useEffect, useContext } from "react";
import { Button } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import FaceLandmarkDetector from "../components/FaceLandmarkDetector";

const LandMarkDetectorModal = (props) => {
  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      className="upload-modal-section account-deactivation-and-deletion"
      centered
    >
      <Modal.Title
        id="contained-modal-title-vcenter"
        className="upload-modal-title pl-3 pt-3"
      >
        {props.title}
        <Button
          className="float-right mr-1"
          variant="white"
          onClick={props.onHide}
        >
          Close
        </Button>
      </Modal.Title>
      <hr className="mb-4 mx-3" />
      <Modal.Body
      // style={{
      //   maxHeight: "calc(55vh - 95px)",
      //   overflowY: "auto",
      // }}
      >
        <div className="mx-3">
          <FaceLandmarkDetector showCanvas={true} />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <div className="mx-auto text-center">
          <>
            <Button className="mr-2" onClick={props.onHide}>
              <span className="modal-remove-btn"> Close</span>
            </Button>
            <br />
            {/* <UploadFileCloseButton className="mt-2" onClick={props.onHide}>
              <span className="modal-close-btn">{t("cancel")}</span>
            </UploadFileCloseButton> */}
          </>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default LandMarkDetectorModal;
