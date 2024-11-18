const ProductDescription = ({ description }) => {
  const lines = description.split("\n").filter((line) => line.trim() !== ""); // Split text by newline character and filter out empty lines

  return (
    <div style={{ width: "95%" }}>
      {lines.map((line, index) => (
        <div className="each-bullet-point" key={index}>
          <span style={{ marginRight: "8px" }}>•</span>
          <span>{line}</span>
        </div>
      ))}
    </div>
  );
};

export default ProductDescription;
