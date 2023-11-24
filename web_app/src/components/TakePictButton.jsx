import '../css/TakePictButton.css'

const TakePictButton = ({ onClick }) => {
    return (
        <div>
            <button className="TakePictButton" onClick={onClick}>Take Picture</button>
        </div>
    )
}

export default TakePictButton;