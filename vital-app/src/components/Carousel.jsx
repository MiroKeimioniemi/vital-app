import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../stylesheets/Carousel.css';

const Carousel = ({ avatars }) => {
    const settings = {
      dots: true,
      infinite: false,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      initialSlide: 2,
    };
  
    return (
      <div className="carousel">
        <Slider {...settings}>
          {avatars.map((avatar, index) => (
            <div key={index}>
              <h2>{avatar.name}</h2>
              <div className="carousel-image">
                <img src={avatar.image} alt={`Slide ${index + 1}`} />
              </div>
            </div>
          ))}
        </Slider>
      </div>
    );
  };
  
  export default Carousel;