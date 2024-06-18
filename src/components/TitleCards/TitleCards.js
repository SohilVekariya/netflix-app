import React, { useEffect, useRef, useState } from "react";
import cards_data from "../../assets/cards/Cards_data";
import Modal from "react-bootstrap/Modal";
import { Button } from "react-bootstrap";
import "./TitleCards.css";
import { GoMute } from "react-icons/go";
import { GoUnmute } from "react-icons/go";
import { SlLike } from "react-icons/sl";
import { IoMdCheckmark } from "react-icons/io";
import { FaPause } from "react-icons/fa6";
import { FaPlay } from "react-icons/fa6";

const TitleCards = ({ title, category, onImageClick }) => {
  const cardsRef = useRef();
  const videoRef = useRef(null);

  const [selectedCard, setSelectedCard] = useState(null);
  const [show, setShow] = useState(false);
  const [hoverTimeout, setHoverTimeout] = useState(null);
  const [muted, setMuted] = useState(true);
  const [icon, setIcon] = useState(true);
  const [playing, setPlaying] = useState(true);
  const [recentlyWatched, setRecentlyWatched] = useState([]);

  const handleWheel = (event) => {
    event.preventDefault();
    cardsRef.current.scrollLeft += event.deltaY;
  };

  useEffect(() => {
    cardsRef.current.addEventListener("wheel", handleWheel,{passive :false});

    return () => {
      cardsRef.current.removeEventListener("wheel", handleWheel);
    };
  }, []);

  const handlePlay = (event) => {
    event.preventDefault();
    const videoData = {
      src: videoRef.current.src,
      title: selectedCard.name,
      currentTime: videoRef.current.currentTime,
    };
    setRecentlyWatched([videoData, ...recentlyWatched]);
  };

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.addEventListener('play', handlePlay);
    }

  }, [selectedCard]);

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

  const onImageHover = (image, title, name, video) => {
    if (hoverTimeout) {
      clearTimeout(hoverTimeout);
    }

    const timeout = setTimeout(() => {
      setSelectedCard({ image, title, name, video });
      setShow(true);
    }, 500);

    setHoverTimeout(timeout);
  };

  const closeModal = () => {
    setSelectedCard(null);
    setShow(false);

    if (hoverTimeout) {
      clearTimeout(hoverTimeout);
    }
  };

  const clearHoverAction = () => {
    if (hoverTimeout) {
      clearTimeout(hoverTimeout);
    }
  };

  return (
    <div className="title-cards1">
      <h2>{title ? title : "Popular on Netflix"}</h2>
      <div className="card-list1" ref={cardsRef}>
        {cards_data.map((card) => {
          return (
            <div className="card1" key={card.id}>
              <img
                src={card.image}
                alt=""
                onClick={() =>
                  onImageClick(
                    `${card.image}`,
                    card.title,
                    card.name,
                    card.video
                  )
                }
                onMouseEnter={() =>
                  onImageHover(card.image, card.title, card.name, card.video)
                }
                onMouseLeave={clearHoverAction}
              />
              <p>{card.name}</p>
            </div>
          );
        })}
      </div>
      {/* Modal/Popup for showing card details */}
      {selectedCard !== null ? (
        <Modal
          show={show}
          onHide={closeModal}
          backdrop="static"
          keyboard={false}
          aria-labelledby="contained-modal-title-vcenter"
          centered
          // className="custom-modal-content"
          dialogClassName="custom-modal-content"
          // contentClassName="custom-modal-content"
        >
          <Modal.Body className="p-0 position-relative popup-modal-body">
            <div className="">
              <Button
                onClick={closeModal}
                className="position-absolute end-0 btn-close btn-close-white z-1 mt-4 me-4"
              ></Button>
            </div>
            <div className="position-relative w-100 h-100 model-video-content">
              <video
              autoPlay
                ref={videoRef}
                loop
                className="w-100 h-50 object-fit-cover control"
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
                    <button className="rounded-pill fs-5 px-2 py-1 text-white bg-transparent border-white">
                      <SlLike />
                    </button>
                  </div>
                  <div>
                    <button className="rounded-pill fs-5 px-2 py-1 text-white bg-transparent border-white">
                      <IoMdCheckmark />
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
                      <span className="green-span-content">92 % Match</span>{" "}
                      2021 &nbsp;{" "}
                      <span className="btn text-white border-white py-0 px-1 bg-transparent rounded">
                        12+
                      </span>
                      &nbsp; 2 &nbsp;
                      <span className="btn text-white border-white py-0 px-1 bg-transparent rounded">
                        HD
                      </span>
                    </p>
                    <h5>{selectedCard.name}</h5>
                    <h4 className="mt-4">Teil 1:Fig. 1 , Kapitel 1 "</h4>
                    <p className="mt-4">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Quos dolorum sunt <br />
                      architecto molestiae adipisci quo culpa, facilis modi
                      dolorem. Labore maiores <br />
                      quia tempore quas esse rerum in excepturi, ullam enim,
                      eveniet quod accusamus <br />
                      vero incidunt. Ab dolor reprehenderit nemo delectus?
                    </p>
                  </div>
                  <div className="col-md-4">
                    <p>
                      <span className="moviedetails">Besetzung:</span> Omar
                      Sy,Ludivine Sagnier,Clotilde Hesme, mehr
                    </p>
                    <p>
                      <span className="moviedetails">Genres:</span> Krimiserien,
                      Franzosisch, Serien nach Buchvorlage
                    </p>
                    <p>
                      <span className="moviedetails">Diese Serie ist:</span>{" "}
                      Aufregend
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      ) : (
        <></>
      )}
    </div>
  );
};

export default TitleCards;
