import { useState, useEffect } from "react";
import slide1 from "../assets/slider/us2.PNG";
import slide2 from "../assets/slider/trainer.PNG";
import slide3 from "../assets/slider/gym.PNG";

const Slideshow = () => {
  const slides = [slide1, slide2, slide3];
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <div className="slideshow">
      <img
      key={currentIndex} 
        src={slides[currentIndex]}
        alt="Gym Slide"
        className="slide-image"
       

      />

      <button className="prev" onClick={() =>
        setCurrentIndex(
          currentIndex === 0 ? slides.length - 1 : currentIndex - 1
        )
      }>
        ❮
      </button>

      <button className="next" onClick={() =>
        setCurrentIndex((currentIndex + 1) % slides.length)
      }>
        ❯
      </button>
    </div>
  );
};

export default Slideshow;
