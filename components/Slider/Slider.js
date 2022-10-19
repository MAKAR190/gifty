import React from "react";
import Buttons from "../Buttons/Buttons";
import styles from "./Slider.module.css";
import Image from "next/image";
import arrowLeft from "../../public/arrowLeft.png";
import arrowRight from "../../public/arrowRight.png";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 3,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 600 },
    items: 3,
  },
  mobile: {
    breakpoint: { max: 600, min: 320 },
    items: 1,
  },
};
const responsiveImages = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 2,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 2,
  },
  tablet: {
    breakpoint: { max: 1024, min: 600 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 600, min: 320 },
    items: 2,
  },
};
const responsiveModal = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 1,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1,
  },
  tablet: {
    breakpoint: { max: 1024, min: 600 },
    items: 1,
  },
  mobile: {
    breakpoint: { max: 600, min: 320 },
    items: 1,
  },
};

const Slider = ({ children }) => {
  const ButtonGroup = ({ next, previous, goToSlide, ...rest }) => {
    const {
      carouselState: { currentSlide },
    } = rest;
    return (
      <div className={styles.actionsContainer}>
        <div className={styles.actionBtn}>
          <Image
            style={{
              cursor: "pointer",
            }}
            src={arrowLeft}
            className={currentSlide === 0 ? "disable" : ""}
            onClick={() => {
              previous();
            }}
          />
        </div>
        <div>
          <Buttons.Blue text="all products" to="/products" />
        </div>
        <div className={styles.actionBtn}>
          <Image
            style={{
              cursor: "pointer",
            }}
            src={arrowRight}
            onClick={() => {
              next();
            }}
          />
        </div>
      </div>
    );
  };

  const clones = React.Children.map(children, (child, i) => {
    return React.cloneElement(child, { className: styles.child });
  });

  return (
    <div style={{ position: "relative" }}>
      <Carousel
        ssr={true}
        customButtonGroup={<ButtonGroup />}
        transitionDuration={500}
        arrows={false}
        renderButtonGroupOutside={true}
        responsive={responsive}
        showDots
        infinite={true}
        autoPlay
        autoPlaySpeed={10000}
        className={styles.carousel}
      >
        {clones}
      </Carousel>
    </div>
  );
};
const ImageSlider = ({ children, modal }) => {
  const ButtonGroup = ({ next, previous, goToSlide, ...rest }) => {
    const {
      carouselState: { currentSlide },
    } = rest;
    return (
      <div className={styles.imagesActionsContainer}>
        <div className={styles.imagesActionsLeft}>
          <Image
            style={{
              cursor: "pointer",
            }}
            src={arrowLeft}
            className={currentSlide === 0 ? "disable" : ""}
            onClick={() => {
              previous();
            }}
          />
        </div>
        <div className={styles.imagesActionsRight}>
          <Image
            style={{
              cursor: "pointer",
            }}
            src={arrowRight}
            onClick={() => {
              next();
            }}
          />
        </div>
      </div>
    );
  };

  const clones = React.Children.map(children, (child, i) => {
    return React.cloneElement(child, { className: styles.imageChild });
  });

  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      <Carousel
        ssr={true}
        customButtonGroup={<ButtonGroup />}
        transitionDuration={500}
        arrows={false}
        renderButtonGroupOutside={true}
        responsive={modal ? responsiveModal : responsiveImages}
        infinite={true}
        className={styles.imageCarousel}
      >
        {clones}
      </Carousel>
    </div>
  );
};

module.exports = {
  LandingSlider: Slider,
  ImageSlider: ImageSlider,
};
