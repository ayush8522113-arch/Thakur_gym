import { useNavigate } from "react-router-dom";

const ProgramCard = ({ program }) => {
  const navigate = useNavigate();

  return (
    <div
      className="program-card"
      onClick={() => navigate(`/programs/${program.id}`)}
      style={{ cursor: "pointer" }}
    >
      <h3>{program.title}</h3>
      <p>{program.shortDesc}</p>
      <span className="program-btn">View Details</span>
    </div>
  );
};

export default ProgramCard;
