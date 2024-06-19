import "./VideoModal.css";
import React, { useRef, useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import { FaPause, FaPlay } from "react-icons/fa";
import { GoMute, GoUnmute } from "react-icons/go";
import { SlLike } from "react-icons/sl";
import { BiSolidLike } from "react-icons/bi";
import { IoMdCheckmark } from "react-icons/io";

const VideoModal = ({
  show,
  handleClose,
  selectedCard,
  handleLikeId,
  likedMovieIds,
  handleWatchId,
  watchedMovieIds
}) => {
  const videoRef = useRef(null);
  const [muted, setMuted] = useState(true);
  const [icon, setIcon] = useState(true);
  const [playing, setPlaying] = useState(true);

  const handleToggleLike = () => {
    handleLikeId(selectedCard.id);
  };

  const handleToggleWatch = () => {
    handleWatchId(selectedCard.id);
  }

  const handleTogglePlay = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setPlaying(true);
      } else {
        videoRef.current.pause();
        setPlaying(false);
      }
    }
  };

  const handleToggleMute = () => {
    setMuted((current) => !current);
    setIcon((current) => !current);
  };

  return (
    <Modal
      show={show}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
      aria-labelledby="contained-modal-title-vcenter"
      centered
      dialogClassName="custom-modal-content"
    >
      <Modal.Body className="p-0 position-relative popup-modal-body">
        <div className="">
          <Button
            onClick={handleClose}
            className="position-absolute end-0 btn-close btn-close-white z-1 mt-4 me-4"
          ></Button>
        </div>
        <div className="position-relative w-100 h-100 model-video-content">
          <video
            autoPlay
            ref={videoRef}
            loop
            className="w-100 h-50 object-fit-cover control videotag"
            muted={muted}
          >
            <source src={selectedCard.video} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div className="d-sm-flex justify-content-between ms-5 mt-2">
            <div className="d-sm-flex gap-3">
              <div className="hero-btns">
                <button className="btn" onClick={handleTogglePlay}>
                  {playing ? (
                    <span>
                      <FaPause className="fs-5" /> pause
                    </span>
                  ) : (
                    <span>
                      <FaPlay className="fs-5" /> play
                    </span>
                  )}
                </button>
              </div>
              <div>
                <button
                  className="rounded-pill fs-5 px-2 py-1 text-white bg-transparent border-white"
                  onClick={handleToggleLike}
                >
                  {likedMovieIds.includes(selectedCard.id) ? (
                    <BiSolidLike />
                  ) : (
                    <SlLike />
                  )}
                </button>
              </div>
              <div>
                <button className="rounded-pill fs-5 px-2 py-1  bg-transparent border-white" onClick={handleToggleWatch}>
                  {watchedMovieIds.includes(selectedCard.id) ? (
                  <IoMdCheckmark className="text-white"/>
                  ) : (
                  <IoMdCheckmark className=""/>
                  )}
                </button>
              </div>
            </div>
            <div className="me-5">
              <button
                onClick={handleToggleMute}
                className="control rounded-pill fs-5 px-2 py-1 text-white  bg-transparent border-white  "
              >
                {icon ? (
                  <GoMute className="fs-5" />
                ) : (
                  <GoUnmute className="fs-5" />
                )}
              </button>
            </div>
          </div>
          <div className="ms-5 me-5">
            <div className="row">
              <div className="col-md-8">
                <p>
                  <span className="green-span-content">92 % Match</span> 2021
                  &nbsp;{" "}
                  <span className="btn cursor-text text-white border-white py-0 px-1 bg-transparent rounded">
                    12+
                  </span>{" "}
                  &nbsp; 2 &nbsp;
                  <span className="btn cursor-text text-white border-white py-0 px-1 bg-transparent rounded">
                    HD
                  </span>
                </p>
                <h5>{selectedCard.name}</h5>
                <h4 className="mt-4">Teil 1:Fig. 1 , Kapitel 1 "</h4>
                <p className="mt-4">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos
                  dolorum sunt <br />
                  architecto molestiae adipisci quo culpa, facilis modi dolorem.
                  Labore maiores <br />
                  quia tempore quas esse rerum in excepturi, ullam enim, eveniet
                  quod accusamus <br />
                  vero incidunt. Ab dolor reprehenderit nemo delectus?
                </p>
              </div>
              <div className="col-md-4">
                <p>
                  <span className="moviedetails">Besetzung:</span> Omar
                  Sy,Ludivine Sagnier,Clotilde Hesme, mehr
                </p>
                <p>
                  <span className="moviedetails">Genres:</span>Krimiserien,
                  Franzosisch, Serien nach Buchvorlage
                </p>
                <p>
                  <span className="moviedetails">Diese Serie ist: </span>
                  Aufregend
                </p>
              </div>
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default VideoModal;
