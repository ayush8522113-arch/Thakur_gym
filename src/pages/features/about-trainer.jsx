import FeatureLayout from "../../components/FeatureLayout";

const DietPlans = () => {
  return (
    <FeatureLayout
      title="Thakur Deepak Mohan ji (trainer)"
      subtitle="Our certified trainer brings years of hands-on experience and professional expertise to every training session. With recognized fitness certifications and deep knowledge of exercise science, each workout is designed to be safe, effective, and result-oriented."
      points={[
        {
          heading: "Physical Educator",
          text: "Strong understanding of anatomy, posture, and injury prevention"
        },
        {
          heading: "Mentor",
          text: "Guiding you through your fitness journey with personalized advice."
        },
        {
          heading: "Nutrition Coach",
          text: "Providing guidance on nutrition for optimal performance and recovery."
        }
      ]}
    />
  );
};

export default DietPlans;
