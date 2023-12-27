const NpmCard = ({ npm }) => {
    return (
      <div className="mt-5">
        <button className="font-medium text-xl mt-4 px-6 py-3 text-white bg-gray-700 rounded-lg focus:outline-none">
          {npm}
        </button>
      </div>
    );
  };
  
  export default NpmCard;
  