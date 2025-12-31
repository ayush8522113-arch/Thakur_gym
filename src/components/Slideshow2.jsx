import { useState, useEffect } from "react";
import slide1 from "../assets/slider/leg_extension.PNG";
import slide2 from "../assets/slider/main_pose.PNG";
import slide3 from "../assets/slider/squat_m.PNG";
import slide4 from "../assets/slider/leg_press.PNG";
import slide5 from "../assets/slider/gym_outer.PNG";
const Slideshow = () => {
  const slides = [slide1, slide2, slide3,slide4,slide5];
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <div className="slideshow2">
      <img
       key={currentIndex} 
        src={slides[currentIndex]}
        alt="Gym Slide"
        className="slide-image2"     
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
