import './PoslasticeList.css';
import { Link } from 'react-router-dom';

export default function PoslasticeList({ poslastice }) {
  

  if(poslastice.length === 0) {
    return <div className='error'>Nema poslastica za prikaz...</div>
  }

  return ( 
    <div className='poslastica-list'>
        {poslastice.map(poslastica => (
            <div key={poslastica.id} className='card'>
                <h3>{poslastica.title}</h3>
                <div className='card-img-center'>
                <img
                className="card-img"
                src={poslastica.photo}
                alt="Neka slika"
                />
                </div>
                {/* <p>Sastojci: {poslastica.ingredients}</p> */}
                <div>{poslastica.description.substring(0, 70)}...</div>
                <Link to={`/poslastice/${poslastica.id}`}>Detalji</Link>
            </div>
        ))}
    </div>
  )
}
