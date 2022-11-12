import { useFetch } from '../../hooks/useFetch';
import './Home.css';
import PoslasticeList from '../../components/PoslasticeList';
import SearchBar from '../../components/SearchBar';

export default function Home() {
  const { data, isPending, error } = useFetch('http://localhost:3000/poslastice');

  return (
    <div className='home'>
      <SearchBar />
      {error && <p className='error'>{error}</p>}
      {isPending && <p className='loading'>Loading...</p>}
      {data && <PoslasticeList poslastice={data} />}
    </div>
  )
}