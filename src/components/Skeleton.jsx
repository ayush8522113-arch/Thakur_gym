

const Skeleton = ({ height = 18, width = "100%", style = {} }) => {
  return (
    <div
      className="skeleton"
      style={{
        height,
        width,
        marginBottom: "14px",
        ...style,
      }}
    />
  );
};

export default Skeleton;
