import { NavLink } from "react-router-dom";
const enableDarkMode = () => {
    document.body.classList.add("dark-mode");
  };

  const disableDarkMode = () => {
    document.body.classList.remove("dark-mode");
  };


const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <h2 id="foot1">Thakur Gym</h2>
        <p id="foot2">Train hard. Stay fit. Live healthy.</p>

        <div className="footer-links">
          <a href="/">Home</a>
          <a href="/programs">Programs</a>
          <a href="/contact">Contact</a><br></br>
<NavLink to="/add-review">Add Reviews</NavLink><br></br>
    <button onClick={enableDarkMode}>🌚</button>
      <button onClick={disableDarkMode}>☀️</button>
        </div>

      </div>

      <div className="footer-bottom">
        <p id="foot3">© {new Date().getFullYear()} Gym Website. All rights reserved.</p>
        <h4></h4>
        <h4></h4>                                       
            <h4></h4> 
              
      </div>
      
    </footer>
  );
};

export default Footer;
