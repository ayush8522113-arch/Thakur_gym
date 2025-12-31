import ProgramCard from "../components/ProgramCard";

const Programs = () => {
  const programsData = [
    {
      id: "weight-loss",
      title: "Weight Loss",
      shortDesc: "Fat burning & endurance focused training.",
    },
    {
      id: "muscle-gain",
      title: "Muscle Gain",
      shortDesc: "Build lean muscle with strength workouts.",
    },
    {
      id: "personal-training",
      title: "Personal Training",
      shortDesc: "One-on-one customized coaching.",
    },
    {
      id: "strength-training",
      title: "Strength Training",
      shortDesc: "Increase power, stamina & core strength.",
    },
  ];

  return (
    <div className="programs-page">
      <h1 className="page-title">Our Programs</h1>

      <div className="programs-grid">
        {programsData.map((program) => (
          <ProgramCard key={program.id} program={program} />
        ))}
      </div>
    </div>
  );
};

export default Programs;

