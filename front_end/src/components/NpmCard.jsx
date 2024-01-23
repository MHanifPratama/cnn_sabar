const NpmCard = ({ npm, border }) => {

  return (
    <div className="lg:mt-5 mt-3">
      <button className={`font-medium text-xl px-6 py-3 border-4 text-white border-${border}-500 bg-cyan-600 rounded-lg hover:cursor-default`}>
        {npm}
      </button>
    </div>
  );
};

export default NpmCard;
