import React from "react";
import { AutoRotatingCarousel, Slide } from "material-auto-rotating-carousel";

const ImageRotator = ({ onClose, open, images }) => (
  <AutoRotatingCarousel
    open={open}
    onClose={onClose}
    onStart={onClose}
    containerStyle={{
      background: "transparent",
    }}
  >
    {images.map((item, key) => (
      <Slide
        key={key}
        media={
          <img
            alt="cover slide"
            src={item}
            style={{ borderRadius: 10, width: "100%", height: "100%" }}
          />
        }
      />
    ))}
  </AutoRotatingCarousel>
);
export default ImageRotator;
