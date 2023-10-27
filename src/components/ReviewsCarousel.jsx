import { useState } from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { Carousel } from 'react-responsive-carousel';

import { AiFillStar } from 'react-icons/ai';

const people = [
  {
    id: 1,
    name: 'susan smith',
    rating: 5,
    text: "I'm baby meggings twee health goth +1. Bicycle rights tumeric chartreuse before they sold out chambray pop-up. Shaman humblebrag pickled coloring book salvia hoodie, cold-pressed four dollar toast everyday carry",
  },
  {
    id: 2,
    name: 'anna johnson',
    rating: 4,
    text: 'Helvetica artisan kinfolk thundercats lumbersexual blue bottle. Disrupt glossier gastropub deep v vice franzen hell of brooklyn twee enamel pin fashion axe.photo booth jean shorts artisan narwhal.',
  },
  {
    id: 3,
    name: 'peter jones',
    rating: 5,
    text: 'Sriracha literally flexitarian irony, vape marfa unicorn. Glossier tattooed 8-bit, fixie waistcoat offal activated charcoal slow-carb marfa hell of pabst raclette post-ironic jianbing swag.',
  },
  {
    id: 4,
    name: 'bill anderson',
    rating: 4,
    text: 'Edison bulb put a bird on it humblebrag, marfa pok pok heirloom fashion axe cray stumptown venmo actually seitan. VHS farm-to-table schlitz, edison bulb pop-up 3 wolf moon tote bag street art shabby chic. ',
  },
];

const ReviewsCarousel = () => {
  const renderStars = (count) => {
    return [...Array(count)].map((e, i) => (
      <span className="pt-3" key={i}>
        <AiFillStar className="text-yellow-300 mr-1" />
      </span>
    ));
  };

  return (
    <Carousel
      autoPlay={true}
      infiniteLoop={true}
      interval={5000}
      showArrows={false}
      width={'95%'}
      height={'15vh'}
      style={{ textAlign: '-webkit-center' }}
      className="btn-twitter mt-5 title rounded-lg"
    >
      {people.map(({ id, text, name, rating }) => {
        return (
          <div
            key={id}
            style={{
              height: '10rem',
              paddingTop: '20px',
              paddingRight: '5rem',
              paddingLeft: '5rem',
            }}
          >
            <p> {text} </p>
            <p className="flex items-center justify-center">
              {' '}
              {renderStars(rating)}
            </p>
            <p className="font-bold capitalize pt-2"> -{name}</p>
          </div>
        );
      })}
    </Carousel>
  );
};

export default ReviewsCarousel;
