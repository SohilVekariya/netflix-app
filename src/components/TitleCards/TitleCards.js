import React, { useEffect, useRef, useState } from "react";
import "./TitleCards.css";
import cards_data from "../../assets/cards/Cards_data";

const TitleCards = ({ title, category, onImageClick }) => {
  // const [apiData, setApiData] = useState([]);
  const cardsRef = useRef();

  // const options = {
  //   method: "GET",
  //   headers: {
  //     accept: "application/json",
  //     Authorization:
  //       "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjZjg2NWM4YjE0MjE2ZTZiY2NiMTMzN2E2ZTM3NjZiZCIsInN1YiI6IjY0ZDhiM2E5MDAxYmJkMDEwMDVjZTQyMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Adba-ZfThjFlRcGdtsyjY_6m6dzLeJuMRFY-PzVj5nc",
  //   },
  // };

  const handleWheel = (event) => {
    event.preventDefault();
    cardsRef.current.scrollLeft += event.deltaY;
  };

  useEffect(() => {
    // fetch(
    //   `https://api.themoviedb.org/3/movie/${category?category:"now_playing"}?language=en-US&page=1`,
    //   options
    // )
    //   .then((response) => response.json())
    //   .then((response) => setApiData(response.results))
    //   .catch((err) => console.error(err));

    cardsRef.current.addEventListener("wheel", handleWheel);
  }, []);

  return (
    <div className="title-cards">
      <h2>{title ? title : "Popular on Netflix"}</h2>
      <div className="card-list" ref={cardsRef}>
        {/* {apiData.map((card, index) => { */}
        {cards_data.map((card, index) => {
          return (
            <div className="card" key={index}>
              {/* <img src={'https://image.tmdb.org/t/p/w500/'+card.backdrop_path} alt="" onClick={() => onImageClick(`https://image.tmdb.org/t/p/w500/${card.backdrop_path}`)}/>
              <p>{card.original_title}</p> */}
              <img src={card.image} alt="" onClick={() => onImageClick(`${card.image}`)}/>
              <p>{card.name}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TitleCards;
