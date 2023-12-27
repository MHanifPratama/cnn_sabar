const ConfirmButton = ({ onClick, predictedNpm, classProbabilities, onConfirm }) => {
  return (
    <div className="grid grid-cols-1 gap-4">
      <div>
        <button className="bg-gray-700 w-full border-0 mt-4 text-lg rounded-md py-2 px-4 font-medium text-white">
          {predictedNpm}
        </button>
      </div>

      <div>
        <button className="bg-gray-700 w-full border-0 mt-4 text-lg rounded-md py-2 px-4 font-medium text-white">
          {classProbabilities}
        </button>
      </div>

      <div className="flex justify-center items-center space-x-4 mt-4">
        <button
          className="bg-green-600 border-0 rounded-md py-2 px-8 font-medium text-white hover:bg-green-700 focus:outline-none focus:ring focus:border-green-700"
          onClick={onConfirm}
        >
          Benar
        </button>
        <button
          className="bg-red-600 border-0 rounded-md py-2 px-8 font-medium text-white hover:bg-red-700 focus:outline-none focus:ring focus:border-red-700"
          onClick={onClick}
        >
          Salah
        </button>
      </div>
    </div>
  );
};

export default ConfirmButton;
