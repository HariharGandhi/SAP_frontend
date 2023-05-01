import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import React from 'react';
const carouselItems = [
    {
      image: '../../../../Photo/Carousel_1.png',
      caption: 'First slide',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    },
    {
      image: '../../../../Photo/Carousel_1.png',
      caption: 'Second slide',
      description: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    },
    {
      image: '../../../../Photo/Carousel_1.png',
      caption: 'Third slide',
      description: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    },
  ];
  
  const MyCarousel = () => {
    return (
      <Carousel style={{height:'520px',marginTop:'50px'}}>
        {carouselItems.map((item, index) => (
          <div key={index} >
            <img src={item.image} alt={item.caption} />
            <div>
              <h3>{item.caption}</h3>
              <p>{item.description}</p>
            </div>
          </div>
        ))}
      </Carousel>
    );
  };

  export default MyCarousel