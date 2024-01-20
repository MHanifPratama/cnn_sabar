const TakePictureButton = ({ onClick }) => {
    return (
        <div>
            <button
                className="font-medium text-2xl mt-10 px-6 py-3 text-white bg-cyan-600 rounded-lg focus:outline-none"
                onClick={onClick}
            >
                Take Picture
            </button>
        </div>
    );
};

export default TakePictureButton;
