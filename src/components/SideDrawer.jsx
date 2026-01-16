const SideDrawer = ({ open, onClose, children }) => {
  if (!open) return null;

  return (
    <div className="side-drawer-overlay" onClick={onClose}>
      <div
        className="side-drawer"
        onClick={(e) => e.stopPropagation()}
      >
        <span className="side-drawer-close" onClick={onClose}>
          ✕
        </span>

        {/* LINKS / CONTENT AREA */}
        <div className="side-drawer-content">
            {children}
        </div>
      </div>
    </div>
  );
};

export default SideDrawer;
