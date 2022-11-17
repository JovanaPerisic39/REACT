import { useLocation } from 'react-router-dom';
import { useFetch } from '../../hooks/useFetch';
import PoslasticeList from '../../components/PoslasticeList';

export default function Search() {
  const queryString = useLocation().search; 
  const queryParams = new URLSearchParams(queryString);
  const query = queryParams.get('q');

  const url = 'http://localhost:3000/poslastice?q=' + query;
  const { error, isPending, data } = useFetch(url);

  return (
    <div>
      <h2 className='page-title'>Pretraga poslastica "{query}"</h2>
      {error && <p className='error'>{error}</p>}
      {isPending && <p className='loading'>Loading...</p>}
      {data && <PoslasticeList poslastice={data}/>}
    </div>
  )
}