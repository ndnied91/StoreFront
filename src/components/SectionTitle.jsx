const SectionTitle = ({ text }) => {
  return (
    <div className="border-b border-base-300 pb-5">
      <div>
        <h2 className="text-3xl font-medium tracking-wider capitalize">
          {text}
        </h2>
      </div>
    </div>
  );
};

export default SectionTitle;
