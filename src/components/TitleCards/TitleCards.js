import React, { useEffect, useRef, useState } from "react";
import "./TitleCards.css";
import cards_data from "../../assets/cards/Cards_data";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

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

  const onImageHover = (image, title, name) => {
    setSelectedCard({ image, title, name });
    setShow(true)
  };

  const closeModal = () => {
    setSelectedCard(null);
    setShow(false);
  };


  return (
    <div className="title-cards" >
      <h2>{title ? title : "Popular on Netflix"}</h2>
      <div className="card-list" ref={cardsRef} >
       
        {cards_data.map((card, index) => {
          return (
            <div className="card" key={index} >
              
              <img
                src={card.image}
                alt=""
                onClick={() =>
                  onImageClick(`${card.image}`, card.title, card.name)
                }
                onMouseEnter={() => onImageHover(card.image, card.title, card.name)}
              />
              <p>{card.name}</p>
            </div>
          );
        })}
      </div>
      {/* Modal/Popup for showing card details */}
      {selectedCard && (
        <Modal
        show={show}
        onHide={closeModal}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Modal title</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          I will not close if you click outside me. Do not even try to press
          escape key.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Close
          </Button>
          <Button variant="primary">Understood</Button>
        </Modal.Footer>
      </Modal>
        
      )}
    </div>
  );
};

export default TitleCards;
