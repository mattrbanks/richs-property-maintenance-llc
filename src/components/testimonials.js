import React from "react";
import ImageReusableFixed from "./imageReusableFixed";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const settings = {
  dots: false,
  infinite: true,
  autoplay: true,
  autoplaySpeed: 7000,
  speed: 2000,
  slidesToShow: 1,
  slidesToScroll: 1,
};

const Testimonials = () => {
  return (
    <Slider {...settings} className="overflow-hidden max-w-3xl">
      <ImageReusableFixed
        alt="picture of school site project"
        filename="image0.jpeg"
      />
      <ImageReusableFixed
        alt="picture of school site project"
        filename="image0.jpeg"
      />
      <ImageReusableFixed
        alt="picture of school site project"
        filename="image0.jpeg"
      />
      <ImageReusableFixed
        alt="picture of school site project"
        filename="image0.jpeg"
      />
      <ImageReusableFixed
        alt="picture of school site project"
        filename="image0.jpeg"
      />
      <ImageReusableFixed
        alt="picture of school site project"
        filename="image0.jpeg"
      />
    </Slider>
  );
};

export default Testimonials;
