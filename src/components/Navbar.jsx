import { Link } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

const closeMenu = () => {
  setMenuOpen(false);
  document.body.style.overflow = "auto";
};

useEffect(() => {
  if (menuOpen) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "auto";
  }
}, [menuOpen]);


  return (
    <nav className="navbar">

      {/* LEFT SECTION: Logo + Titles */}
      <div className="nav-left">
        <div className="nav-logo">
          <img src="/Thakur-gym-logo.PNG" alt="Thakur gym Logo" />
        </div>

        <div className="nav-title">
          <h1>THAKUR GYM</h1>
          <h3>~ Mr. Deepak Thakur</h3>
        </div>
      </div>

      {/* DESKTOP LINKS */}
      <ul className="nav-links desktop-only">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/programs">Programs</Link></li>
        <li><Link to="/booking">Booking</Link></li>
        <li><Link to="/login">Login</Link></li>
         <li><Link to="/notices">Notices</Link></li>
        <li> <Link to="/admin/notices">Admin Section</Link></li> 
        <li><Link to="/register" className="btn">Join Now</Link></li>
      </ul>

      {/* MOBILE 3-DOT ICON */}
      <div
        className="menu-icon mobile-only"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        ⋮⋮⋮
      </div>

{/* LEFT SLIDE MOBILE MENU */}
{menuOpen && (
  <div
    className="mobile-menu-overlay"
    onClick={closeMenu}
  >
    <div
      className="mobile-menu-left"
      onClick={(e) => e.stopPropagation()}
    >
      <span
        className="close-menu"
        onClick={closeMenu}
      >
        ✕
      </span>

      <nav className="mobile-menu-links">
        <Link to="/" onClick={closeMenu}>GuruJi's Home</Link>
        <Link to="/programs" onClick={closeMenu}>GuruJi's Programs</Link>
        <Link to="/booking" onClick={closeMenu}>Booking</Link>
        <Link to="/login" onClick={closeMenu}>Login</Link>
        <Link to="/notices" onClick={closeMenu}>Notices</Link>
        <Link to="/register" onClick={closeMenu}>Join Now</Link>
        
      </nav>
    </div>
  </div>
)}

    </nav>
  );
};

export default Navbar;
