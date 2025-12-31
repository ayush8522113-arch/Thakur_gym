import { useNavigate } from "react-router-dom";
import Slideshow from "../components/Slideshow";
import Slideshow2 from "../components/Slideshow2";
import { Link } from "react-router-dom";
import BMICalculator from "../components/BMICalculator";
import BodyFatCalculator from "../components/BodyFatCalculator";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="home">
         <Slideshow />
      {/* Hero Section */}
      <section className="hero">
        <h1>Thakur Gym</h1>
        <h2> Strong Bodies Strong Minds</h2>
        <h2>Transform Your Body, Transform Your Life</h2>
        <h2>Your Fitness Journey Starts Here</h2>
        
        <p>
          Professional training, workout plans, and expert guidance.
        </p>
        <Link to="/register" className="hero-btn">
  Join Now
</Link>
      </section>
      <section className="hero2">
        <h1>Available Machines And Equipments</h1>
      
       <Slideshow2 />
      </section>
      {/* Features Section */}
      <section className="features">
        <div className="feature-card"
         onClick={() => navigate("/features/about-trainer")}
        >
          <h3>Certified Trainer</h3>
          <p>Get trained by certified and experienced fitness professionals.</p>
        </div>

        <div className="feature-card"
         onClick={() => navigate("/features/PersonalTraining")}
        >
          <h3>Personal Training</h3>
          <p>Customized workout plans based on your fitness goals.</p>
        </div>

        <div className="feature-card"
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
          <p>Workout at your convenience</p>
        </div>
      </section>
      
  <section className="bmi-section">
        <BMICalculator />
      </section>

      <section className="calorie-cal">
        <BodyFatCalculator/>
      </section>

      <section className="design_pic">
        <div className="design_box">
      </div>
      </section>

    </div>
  );
};

export default Home;

