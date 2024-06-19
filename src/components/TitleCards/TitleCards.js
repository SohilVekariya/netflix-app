// TitleCards.js

import React, { useRef, useState, useEffect } from "react";
import "./TitleCards.css";

const TitleCards = ({
  title,
  onImageClick,
  onImageHover,
  clearHoverAction,
  filter_cards,
}) => {
  const cardsRef = useRef();

  const handleWheel = (event) => {
    event.preventDefault();
    cardsRef.current.scrollLeft += event.deltaY;
  };

  useEffect(() => {
    cardsRef.current.addEventListener("wheel", handleWheel, { passive: false });
  }, []);

  return (
    <div className="title-cards1">
      <h2>{title ? title : "Popular on Netflix"}</h2>
      <div className="card-list1" ref={cardsRef}>
        {filter_cards.map((card) => (
          <div className="card1" key={card.id}>
            <img
              src={card.image}
              alt=""
              onClick={() =>
                onImageClick(
                  card.id,
                  card.image,
                  card.title,
                  card.name,
                  card.video
                )
              }
              onMouseEnter={() => {
                onImageHover(
                  card.id,
                  card.image,
                  card.title,
                  card.name,
                  card.video
                );
                // handleRecentId(card.id);
              }}
              onMouseLeave={clearHoverAction}
            />
            <p>{card.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TitleCards;
