const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <h2 id="foot1">Thakur Gym</h2>
        <p id="foot2">Train hard. Stay fit. Live healthy.</p>

        <div className="footer-links">
          <a href="/">Home</a>
          <a href="/programs">Programs</a>
          <a href="/contact">Contact</a>

        </div>

      </div>

      <div className="footer-bottom">
        <p id="foot3">© {new Date().getFullYear()} Gym Website. All rights reserved.</p>
        <h4>Website developed  by - Ayush Saini</h4>
        <h4>Contact: sainiayush8338@gmail.com &</h4>
            <h4>Phone: +91 7015450323.</h4> 
                  
      </div>
      
    </footer>
  );
};

export default Footer;
