import '../css/ConfirmButton.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const ConfirmButton = ({ onClick, predictedNpm, classProbabilities, onConfirm }) => {
  return (
    <div>
      <div className='row r'>
        <div>
          <button className='cn'>{predictedNpm}</button>
        </div>
      </div>

      <div className='row r'>
        <div>
          <button className='cn'>{classProbabilities}</button>
        </div>
      </div>

      <div className='row r'>
        <div className='container'>
          <button className='Benar' onClick={onConfirm}>Benar</button>
          <button className='Salah' onClick={onClick}>Salah</button>
        </div>
      </div>
    </div>
  )
}

export default ConfirmButton;
