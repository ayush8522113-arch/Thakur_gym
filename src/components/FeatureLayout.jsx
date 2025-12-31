const FeatureLayout = ({ title, subtitle, points }) => {
  return (
    <div className="feature-page">

      {/* HERO */}
      <section className="feature-hero">
        <h1>{title}</h1>
        <p>{subtitle}</p>
      </section>

      {/* CONTENT */}
     <section className="feature-content">
  {points.map((item, index) => (
    <div
      className={`feature-box ${item.onClick ? "clickable" : ""}`}
      key={index}
      onClick={item.onClick}
    >
      <h3>{item.heading}</h3>
      <p>{item.text}</p>
    </div>
  ))}
</section>

      {/* CTA */}
      <section className="feature-cta">
        <h2>Ready to Start?</h2>
        <a href="/register" className="feature-btn">Join Now</a>
      </section>

    </div>
  );
};

export default FeatureLayout;
//