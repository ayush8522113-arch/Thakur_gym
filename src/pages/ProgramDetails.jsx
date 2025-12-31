import { useParams } from "react-router-dom";

const ProgramDetails = () => {
  const { programId } = useParams();

  const images = Array.from({ length: 4 }, (_, i) =>
    `/programs/weight-loss/${i + 1}.PNG`
  );

  return (
    <div className="program-details-page">
      <h1 className="page-title">
        {programId.replace("-", " ").toUpperCase()}
      </h1>

     {/* IMAGE COLLAGE */}
      <div className="image-collage">
        {images.map((img, index) => (
          <div className="collage-box" key={index}>
            <img src={img} alt={`program-${index}`} />
          </div>
        ))}
      </div>

      {/* PROGRAM DESCRIPTION */}
<div className="program-info-grid">
  <div className="info-box">
    <h3>Structured Training</h3>
    <p>
          This training program is designed to deliver long-term fitness results
          by combining structured workouts, discipline, and progressive overload.
          Each session is carefully planned to improve both physical strength
          and mental endurance.
    </p>
  </div>

  <div className="info-box">
    <h3>Progressive Growth</h3>
    <p>
          The program focuses on correct form, consistency, and gradual
          improvement. Whether you are a beginner or experienced trainee, the
          workouts are adjusted according to your fitness level and body
          capability to avoid injuries and maximize results.
    </p>
  </div>

  <div className="info-box">
    <h3>Expert Guidance</h3>
    <p>
          Along with training, guidance is provided on lifestyle habits,
          recovery, and basic nutrition principles. This ensures that your body
          adapts properly and you stay motivated throughout your fitness journey.
    </p>
  </div>

  <div className="info-box">
    <h3>Goal Oriented</h3>
    <p>
          With regular assessments and expert supervision, this program helps
          you stay accountable, track progress, and achieve your fitness goals
          efficiently and safely.
    </p>
  </div>
</div>



    </div>
  );
};

export default ProgramDetails;
