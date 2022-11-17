import './Poslastica.css';
import { useParams } from 'react-router-dom';
import { useFetch } from '../../hooks/useFetch';

export default function Poslastica() {
  const { id } = useParams();
  const url = 'http://localhost:3000/poslastice/' + id;
  const { error, isPending, data: poslastica } = useFetch(url);
  

  return (
    <div className='poslastica'>
      {error && <p className='error'>{error}</p>}
      {isPending && <p className='loading'>Loading...</p>}
      {poslastica && (
        <div>
          <h2 className='page-title'>{poslastica.title}</h2> 
          <ul>
            {poslastica.keywords.map(keyword => <li key={keyword}> {keyword} </li>)}
          </ul> 
          <div className='card-img-center'>
                <img
                className="card-img"
                src={poslastica.photo}
                alt="Neka slika"
                />
                </div>
          <br></br>  
          <p className='ingredients'>Sastojci: {poslastica.ingredients}</p>     
          <br></br>  
          <p className='description'>{poslastica.description}</p>
        </div>
      )}
    </div>
  )
}