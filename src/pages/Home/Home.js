import React from "react";
import "./Home.css";
import Navbar from "../../components/Navbar/Navbar";
import hero_banner from "../../assets/hero_banner.jpg";
import hero_title from "../../assets/hero_title.png";
import play_icon from "../../assets/play_icon.png";
import info_icon from "../../assets/info_icon.png";
import TitleCards from "../../components/TitleCards/TitleCards";
import Footer from "../../components/Footer/Footer";
import { useState } from "react";

function Home() {
  const [selectedImage, setSelectedImage] = useState(hero_banner); // Initially set to hero_banner

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  
  return (
    <div className="home">
      <Navbar />
      <div className="hero">
        <img src={selectedImage} alt="" className="banner-img" />
        <div className="hero-caption">
          <img src={hero_title} alt="" className="caption-img" />
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem,
            assumenda ab atque perferendis quaerat ipsa minus dolore deserunt
            fugiat. Placeat ea consequatur hic illo voluptates facere recusandae
            illum reiciendis similique?
          </p>
          <div className="hero-btns">
            <button className="btn">
              <img src={play_icon} alt="play" />
              Play
            </button>
            <button className="btn dark-btn">
              <img src={info_icon} alt="info" />
              More Info
            </button>
          </div>
          <TitleCards onImageClick={handleImageClick}/>
        </div>
      </div>
      <div className="more-cards">
        <TitleCards title={"Blockbuster Movies"} category={"top_rated"} onImageClick={handleImageClick}/>
        <TitleCards title={"Only on Netflix"} category={"popular"} onImageClick={handleImageClick}/>
        <TitleCards title={"Upcoming"} category={"upcoming"} onImageClick={handleImageClick}/>
        <TitleCards title={"Top Pics for You"} category={"now_playing"} onImageClick={handleImageClick}/>
      </div>
      <Footer />
    </div>
  );
}

export default Home;
