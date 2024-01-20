const NpmCard = ({ npm, border }) => {

  return (
    <div className="mt-5">
      <button className={`font-medium text-xl mt-4 px-6 py-3 border-4 text-white border-${border}-500 bg-cyan-600 rounded-lg hover:cursor-default`}>
        {npm}
      </button>
    </div>
  );
};

export default NpmCard;
