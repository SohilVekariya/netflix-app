import React from "react";
import "./Home.css";
import Navbar from "../../components/Navbar/Navbar";
import hero_banner from "../../assets/hero_banner.jpg";
import hero_title from "../../assets/hero_title.png";
import play_icon from "../../assets/play_icon.png";
import info_icon from "../../assets/info_icon.png";
import TitleCards from "../../components/TitleCards/TitleCards";
import Footer from "../../components/Footer/Footer";
import { useState, useEffect } from "react";
import VideoModal from "../../components/VideoModal/VideoModal";
import cards_data from "../../assets/cards/Cards_data";

function Home() {
  const [selectedCard, setSelectedCard] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState([
    0,
    hero_banner,
    hero_title,
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa, officiis?",
    cards_data.video

  ]);
  const [hoverTimeout, setHoverTimeout] = useState(null);
  const [movieIds, SetMovieIds] = useState([]); //hande add to watchlist
  const [likedMovieIds, SetLikedMovieIds] = useState([]);
  const [watchedMovieIds, SetWatchedMovieIds] = useState([]); //hande add to liked Playlist
  
  const handleImageClick = (id, image, title_img, title_name,video) => {
    setSelectedImage([id, image, title_img, title_name,video]);
    setSelectedCard({ id, image, title_img, title_name, video });
  };

  const onPlayClick = () => {
      setShowModal(true);
  };
 

  const onImageHover = (id, image, title, name, video) => {
    if (hoverTimeout) {
      clearTimeout(hoverTimeout);
    }

    const timeout = setTimeout(() => {
      SetMovieIds([...movieIds, id]);

      setSelectedCard({ id, image, title, name, video });
      setShowModal(true);
    }, 1000);

    setHoverTimeout(timeout);
  };

  //filter off recenly watched playlist
  const filterCardsData = () => {
    return cards_data.filter((card) => movieIds.includes(card.id));
  };

  //filter of Liked playlist
  const handleLikeId = (id) => {
    if (!likedMovieIds.includes(id)) {
      SetLikedMovieIds([...likedMovieIds, id]);
    } else {
      const updatedIds = likedMovieIds.filter((movieId) => movieId !== id);
      SetLikedMovieIds(updatedIds);
    }
  };
  const filterLikedCardsData = () => {
    return cards_data.filter((card) => likedMovieIds.includes(card.id));
  };

  //add to watchlist or remove to watchlist
  const handleWatchId = (id) => {
    if (!watchedMovieIds.includes(id)) {
      SetWatchedMovieIds([...watchedMovieIds, id]);
    } else {
      const updatedIds = watchedMovieIds.filter((movieId) => movieId !== id);
      SetWatchedMovieIds(updatedIds);
    }
  };
  const filterWatchedCardsData = () => {
    return cards_data.filter((card) => watchedMovieIds.includes(card.id));
  };


  const clearHoverAction = () => {
    if (hoverTimeout) {
      clearTimeout(hoverTimeout);
    }
  };

  const closeModal = () => {
    if (hoverTimeout) {
      clearTimeout(hoverTimeout);
    }
    setSelectedCard(null);
    setShowModal(false);
  };

  return (
    <div className="home">
      <Navbar />
      <div className="hero">
        <img src={selectedImage[1]} alt="" className="banner-img" />
        <div className="hero-caption">
          <img src={selectedImage[2]} alt="" className="caption-img" />
          <p>{selectedImage[3]}</p>
          <div className="hero-btns">
            <button className="btn" onClick={onPlayClick}>
              <img src={play_icon} alt="play" />
              Play
            </button>
            <button className="btn dark-btn">
              <img src={info_icon} alt="info" />
              More Info
            </button>
          </div>
          {movieIds.length > 0 && (
            <TitleCards
              title={"Recently Watched"}
              onImageClick={handleImageClick}
              onImageHover={onImageHover}
              clearHoverAction={clearHoverAction}
              filter_cards={filterCardsData()}
            />
          )}
          <TitleCards
            onImageClick={handleImageClick}
            onImageHover={onImageHover}
            clearHoverAction={clearHoverAction}
            filter_cards={cards_data}
          />
        </div>
      </div>
      <div className="more-cards">
        <TitleCards
          title={"Blockbuster Movies"}
          category={"top_rated"}
          onImageClick={handleImageClick}
          onImageHover={onImageHover}
          clearHoverAction={clearHoverAction}
          filter_cards={cards_data}
        />
        <TitleCards
          title={"Only on Netflix"}
          category={"popular"}
          onImageClick={handleImageClick}
          onImageHover={onImageHover}
          clearHoverAction={clearHoverAction}
          filter_cards={cards_data}
        />
        <TitleCards
          title={"Upcoming"}
          category={"upcoming"}
          onImageClick={handleImageClick}
          onImageHover={onImageHover}
          clearHoverAction={clearHoverAction}
          filter_cards={cards_data}
        />
        <TitleCards
          title={"Top Pics for You"}
          category={"now_playing"}
          onImageClick={handleImageClick}
          onImageHover={onImageHover}
          clearHoverAction={clearHoverAction}
          filter_cards={cards_data}
        />
        {likedMovieIds.length > 0 && (
          <TitleCards
            title={"Liked VideoList"}
            category={"liked_playList"}
            onImageClick={handleImageClick}
            onImageHover={onImageHover}
            clearHoverAction={clearHoverAction}
            filter_cards={filterLikedCardsData()}
          />
        )}
        {watchedMovieIds.length > 0 && (
          <TitleCards
            title={"Add to PlayList"}
            category={"watched_playList"}
            onImageClick={handleImageClick}
            onImageHover={onImageHover}
            clearHoverAction={clearHoverAction}
            filter_cards={filterWatchedCardsData()}
          />
        )}
      </div>
      <Footer />
      {selectedCard && (
        <VideoModal
          show={showModal}
          handleClose={closeModal}
          selectedCard={selectedCard}
          handleLikeId={handleLikeId}
          likedMovieIds={likedMovieIds}
          handleWatchId = {handleWatchId}
          watchedMovieIds = {watchedMovieIds}
        />
      )}
    </div>
  );
}

export default Home;
