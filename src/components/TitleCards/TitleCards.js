// TitleCards.js

import React, { useRef, useState, useEffect } from "react";
import cards_data from "../../assets/cards/Cards_data";
import "./TitleCards.css";
import VideoModal from "../VideoModal/VideoModal"; // Import your new component

const TitleCards = ({ title, category, onImageClick }) => {
  const cardsRef = useRef();
  const [selectedCard, setSelectedCard] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [hoverTimeout, setHoverTimeout] = useState(null);
  const [recent, setRecent] = useState(null);

  const handleRecent = (recentlyWatched) => {
    console.log(recentlyWatched);
    setRecent(recentlyWatched);
    console.log(recent);
  };

  const handleWheel = (event) => {
    event.preventDefault();
    cardsRef.current.scrollLeft += event.deltaY;
  };

  useEffect(() => {
    cardsRef.current.addEventListener("wheel", handleWheel, { passive: false });
  }, []);

  const onImageHover = (image, title, name, video) => {
    if (hoverTimeout) {
      clearTimeout(hoverTimeout);
    }

    const timeout = setTimeout(() => {
      setSelectedCard({ image, title, name, video });
      setShowModal(true);
    }, 1000);

    setHoverTimeout(timeout);
  };

  const closeModal = () => {
    setSelectedCard(null);
    setShowModal(false);

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
        {cards_data.map((card) => (
          <div className="card1" key={card.id}>
            <img
              src={card.image}
              alt=""
              onClick={() =>
                onImageClick(card.image, card.title, card.name, card.video)
              }
              onMouseEnter={() =>
                onImageHover(card.image, card.title, card.name, card.video)
              }
              onMouseLeave={clearHoverAction}
            />
            <p>{card.name}</p>
          </div>
        ))}
      </div>
      {selectedCard && (
        <VideoModal
          show={showModal}
          handleClose={closeModal}
          selectedCard={selectedCard}
          onRecent={handleRecent}
        />
      )}
      {recent && (
        <div className="recently-watched text-black">
          <h3>Recently Watched</h3>
          <ul>
            {recent.map((video, index) => (
              <li key={index}>
                {video.title} (at {video.currentTime.toFixed(2)}s)
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default TitleCards;
