import '../css/NpmCard.css'

const NpmCard = ({ npm }) => {
    return (
        <div>
            <button className="NpmCard">{npm}</button>
        </div>
    )
}

export default NpmCard;