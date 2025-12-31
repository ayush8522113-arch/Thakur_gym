import FeatureLayout from "../../components/FeatureLayout";

const FlexibleTimings = () => {
  return (
    <FeatureLayout
      title="Flexible Timings"
      subtitle="Workout at your convenience without compromising consistency."
      points={[
        {
          heading: "Morning & Evening Slots",
          text: "Choose a schedule that suits your lifestyle."
        },
        {
          heading: "Busy-Friendly",
          text: "Perfect for students and working professionals."
        },
        {
          heading: "Consistent Progress",
          text: "Flexible timing ensures you never miss workouts."
        }
      ]}
    />
  );
};

export default FlexibleTimings;
