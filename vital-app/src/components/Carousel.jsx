import React, { useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../stylesheets/Carousel.css';

const Carousel = ({ avatars, selected, onCarouselChange }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: selected,
    afterChange: (index) => {
      // Call the callback function to update the selected item in the parent
      onCarouselChange(index);
    },
  };

  useEffect(() => {
    console.log("Selected prop:", selected);
  }, [selected]);

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