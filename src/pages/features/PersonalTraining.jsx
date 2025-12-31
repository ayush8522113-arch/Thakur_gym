import FeatureLayout from "../../components/FeatureLayout";

const PersonalTraining = () => {
  return (
    <FeatureLayout
      title="Personal Training"
      subtitle="One-on-one training designed to maximize your results."
      points={[
        {
          heading: "Expert Guidance",
          text: "Train under certified professionals who guide every movement."
        },
        {
          heading: "Customized Workouts",
          text: "Programs tailored to your body type and fitness goals."
        },
        {
          heading: "Faster Results",
          text: "Focused training ensures visible progress in less time."
        }
      ]}
    />
  );
};

export default PersonalTraining;

