import { useNavigate, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

import Slideshow from "../components/Slideshow";
import Slideshow2 from "../components/Slideshow2";
import BMICalculator from "../components/BMICalculator";
import BodyFatCalculator from "../components/BodyFatCalculator";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home">

      {/* 🔹 SEO + STRUCTURED DATA */}
      <Helmet>
        <title>Thakur Gym | Personal Training & Modern Fitness Center</title>

        <meta
          name="description"
          content="Thakur Gym offers personal training, customized workout plans, certified trainers, and modern gym equipment to help you achieve your fitness goals."
        />

        <script type="application/ld+json">
          {`
          {
            "@context": "https://schema.org",
            "@type": "HealthClub",
            "name": "Thakur Gym",
            "url": "https://www.thakurgym.com",
            "logo": "https://www.thakurgym.com/logo.png",
            "image": "https://www.thakurgym.com/images/thakur-gym-interior.jpg",
            "description": "Thakur Gym is a modern fitness and training center offering personal training, customized workout plans, certified trainers, and high-quality gym equipment.",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Your City",
              "addressRegion": "Your State",
              "addressCountry": "IN"
            }
          }
          `}
        </script>
      </Helmet>

      {/* 🔹 HERO SLIDESHOW */}
      <Slideshow />

      {/* 🔹 HERO SECTION */}
      <section className="hero">
        <h1>Thakur Gym</h1>
        <h2>Strong Bodies. Strong Minds.</h2>
        <h2>Transform Your Body, Transform Your Life</h2>
        <h2>Your Fitness Journey Starts Here</h2>

        <p>
          Thakur Gym provides professional personal training, customized workout
          plans, certified trainers, and modern gym equipment to help you reach
          your fitness goals.
        </p>

        <Link to="/register" className="hero-btn">
          Join Now
        </Link>
      </section>

      {/* 🔹 EQUIPMENT SECTION */}
      <section className="hero2">
        <h1>Available Machines And Equipment</h1>
        <Slideshow2 />
      </section>

      {/* 🔹 FEATURES SECTION */}
      <section className="features">
        <div
          className="feature-card"
          onClick={() => navigate("/features/about-trainer")}
        >
          <h3>Certified Trainer</h3>
          <p>Get trained by certified and experienced fitness professionals.</p>
        </div>

        <div
          className="feature-card"
          onClick={() => navigate("/features/PersonalTraining")}
        >
          <h3>Personal Training</h3>
          <p>Customized workout plans based on your fitness goals.</p>
        </div>

        <div
          className="feature-card"
          onClick={() => navigate("/features/Equipments")}
        >
          <h3>Modern Equipment</h3>
          <p>Train with high-quality and modern gym equipment.</p>
        </div>

        <div
          className="feature-card"
          onClick={() => navigate("/features/FlexibleTimings")}
        >
          <h3>Flexible Timings</h3>
          <p>Workout at your convenience.</p>
        </div>
      </section>

      {/* 🔹 BMI CALCULATOR */}
      <section className="bmi-section">
        <BMICalculator />
      </section>

      {/* 🔹 BODY FAT CALCULATOR */}
      <section className="calorie-cal">
        <BodyFatCalculator />
      </section>

      {/* 🔹 DESIGN SECTION */}
      <section className="design_pic">
        <div className="design_box"></div>
      </section>
    </div>
  );
};

export default Home;
