import { useState } from "react";
import FeatureLayout from "../../components/FeatureLayout";
import SideDrawer from "../../components/SideDrawer";
import { Link } from "react-router-dom";

const Equipment = () => {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const closeMenu = () => {
  setDrawerOpen(false);
  document.body.style.overflow = "auto";
};
  return (
    <><FeatureLayout
          title="Modern Equipment"
          subtitle="Train using the latest machines and tools."
          points={[
              {
                  heading: "Advanced Machines",
                  text: "High-quality equipment for safe and effective workouts.",
                  onClick: () => setDrawerOpen(true)
              },
              {
                  heading: "Full Muscle Coverage",
                  text: "Machines targeting every muscle group."
              },
              {
                  heading: "Safe Training",
                  text: "Reduced injury risk with ergonomic designs."
              }
          ]} />
          
          <SideDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)}>
            <nav className="mobile-menu-links">
              <h2>Machines</h2>
              <Link to="/login" onClick={closeMenu}>Cardio Section</Link>
        <Link to="/notices" onClick={closeMenu}>Back section</Link>
        <Link to="/register" onClick={closeMenu}>Thighs section</Link>
         <Link to="/" onClick={closeMenu}>Chest section</Link>
        <Link to="/programs" onClick={closeMenu}>Dumbell section</Link>
        <Link to="/booking" onClick={closeMenu}>Arms and Triceps section</Link>
        </nav>
          </SideDrawer></>
  );
};

export default Equipment;
