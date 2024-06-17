import React, { useEffect, useRef, useState } from "react";
import cards_data from "../../assets/cards/Cards_data";
import Modal from "react-bootstrap/Modal";
import { Button } from "react-bootstrap";
import "./TitleCards.css";

const TitleCards = ({ title, category, onImageClick }) => {
  const cardsRef = useRef();

  const handleWheel = (event) => {
    event.preventDefault();
    cardsRef.current.scrollLeft += event.deltaY;
  };

  useEffect(() => {
    cardsRef.current.addEventListener("wheel", handleWheel);
  }, []);

  const [selectedCard, setSelectedCard] = useState(null);
  const [show, setShow] = useState(false);

  const onImageHover = (image, title, name, video) => {
    setSelectedCard({ image, title, name, video });
    setShow(true);
  };

  const closeModal = () => {
    setSelectedCard(null);
    setShow(false);
  };

  return (
    <div className="title-cards1">
      <h2>{title ? title : "Popular on Netflix"}</h2>
      <div className="card-list1" ref={cardsRef}>
        {cards_data.map((card, index) => {
          return (
            <div className="card1" key={index}>
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
          className="modal-content1"
          contentClassName="custom-modal-content"
        >
          <Modal.Body className="p-0 position-relative popup-modal-body">
            <div className="">
              <Button
                variant="secondary"
                onClick={closeModal}
                className="position-absolute end-0 btn-close btn-close-white z-1"
              ></Button>
            </div>
            <div className="position-relative w-100 h-100 bg-secondary">
              {/* <img
                src={selectedCard.image}
                alt=""
                className="w-100 h-100 object-fit-cover popup-banner rounded object-fit-cover"
              /> */}
              <video
                controls
                className="position-absolute top-0 start-0 w-100 h-50 object-fit-cover"
              >
                <source src={selectedCard.video} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
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
