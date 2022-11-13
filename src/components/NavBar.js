import { Link } from 'react-router-dom';
import './NavBar.css';

export default function NavBar() {
    return (
        <div className='navbar'>
            <nav>
                
               <Link to="/" className='brand'>
                    <img src={require('../img/bg3.png')} alt= "logo"></img>
               </Link> 
            
               <Link to = "/home">Pocetna</Link>
               <Link to="/create">Dodaj poslasticu</Link>
            </nav>
        </div>
  )
}