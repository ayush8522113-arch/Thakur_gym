import { useNavigate, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useEffect, useState } from "react";
import API from "../api/api";

import Slideshow from "../components/Slideshow";
import Slideshow2 from "../components/Slideshow2";
import BMICalculator from "../components/BMICalculator";
import BodyFatCalculator from "../components/BodyFatCalculator";
import useCountdown from "../utils/useCountdown";
 



const Home = () => {

   const [membership, setMembership] = useState(null);
   
  const navigate = useNavigate();
const countdown = useCountdown(membership?.endDate);
const downloadSlip = async (paymentId) => {
  try {
    const res = await API.get(
      `/payments/slip/${paymentId}`,
      { responseType: "blob" }
    );

    const url = window.URL.createObjectURL(
      new Blob([res.data], { type: "application/pdf" })
    );

    const link = document.createElement("a");
    link.href = url;
    link.download = `payment-slip-${paymentId}.pdf`;

    document.body.appendChild(link);
    link.click();
    link.remove();

    window.URL.revokeObjectURL(url);
  } catch (err) {
    console.error("Slip download failed", err);
    alert("Failed to download payment slip");
  }
};

 useEffect(() => {
  const fetchMembership = async () => {
    try {
      const res = await API.get("/memberships/my");
     
      setMembership(res.data);
    } catch (err) {
      console.error(
        "Membership fetch failed 👉",
        err.response?.status,
        err.response?.data
      );
    }
  };
  
  fetchMembership();
}, []);



  return (
    <div className="home">

      {/* 🔹 SEO + STRUCTURED DATA */}
      <Helmet>
        <title>Thakur Gym | Personal Training & Modern Fitness Center</title>

        <meta
          name="description"
          content="Professional training, workout plans, and expert guidance."
        />

        <script type="application/ld+json">
          {`
          {
            "@context": "https://schema.org",
            "@type": "HealthClub",
            "name": "Thakur Gym",
            "url": "https://www.thakurgym.com",
            "logo": "https://www.thakurgym.com/Thakur-gym-logo.PNG",
            "image": "https://www.thakurgym.com/Thakur-gym-logo.PNG",
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

{membership && countdown && (
  <div className={`membership-card premium ${membership.membershipType}`}>
    <h3>{membership.membershipType.toUpperCase()} MEMBER</h3>

    <p className="validity">
      Valid till {new Date(membership.endDate).toDateString()}
    </p>

    <div className="countdown">
      ⏳ {countdown.days}d {countdown.hours}h {countdown.minutes}m
    </div>
    
    <button
    
  className="download-slip"
  onClick={() => downloadSlip(membership.paymentId)}
>
  Download Payment Slip
</button>


  </div>
)}



      {/* 🔹 HERO SECTION */}
      <section className="hero">
        <h2>Thakur Gym, the Best Gym of Jagadhri and Yamunanagar</h2>
        <h4>Strong Bodies. Strong Minds.</h4>
        <h4>Transform Your Body, Transform Your Life</h4>
        <h4>Your Fitness Journey Starts Here</h4>

        <p>
         Thakur gym in jagadhri is best gym for Professional training, workout plans, and expert guidance.
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
