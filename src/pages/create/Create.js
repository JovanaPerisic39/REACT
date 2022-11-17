import './Create.css';
import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFetch } from '../../hooks/useFetch';


export default function Create() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [photo, setPhoto] = useState('');
  const [newKeyword, setNewKeyword] = useState('');
  const [keywords, setKeywords] = useState([]);

  const keywordsInput = useRef(null);
  const navigate = useNavigate();

  const { postData, data } = useFetch('http://localhost:3000/poslastice', 'POST');

  const handleSubmit = async (e) => {
    e.preventDefault();
    postData({ title, photo , keywords, ingredients, description});
  };

  const handleAdd = (e) => {
    e.preventDefault();
    const kw = newKeyword.trim();

    if(kw && !keywords.includes(kw)) {
      setKeywords(prevKeywords=> [...prevKeywords, newKeyword]);
    }

    setNewKeyword('');
    keywordsInput.current.focus(); 
  };

 
  useEffect(() => {
    if(data) {
      navigate('/'); 
    }
  }, [data, navigate])

  return (
    <div className='create'>
        <h2 className='page-title'>Dodaj poslasticu</h2>

        <form onSubmit={handleSubmit}>

          <label>
            <span>Naziv poslastice:</span>
            <input 
              type="text"
              onChange={(e) => setTitle(e.target.value)} 
              value={title}
              required
            />
          </label>
          <label>
            <span>Slika:</span>
            <input 
              type='url'
              onChange={(e) => setPhoto(e.target.value)} 
              value={photo}
              required
            />
          </label>

          <label>
            <span>Opis:</span>
            <textarea 
              onChange={(e) => setDescription(e.target.value)} 
              value={description}
              required
            />
          </label>

          <label>
            <span>Kljucne reci za pretragu:</span>
            <div className='keywords'> 
              <input 
                type="text" 
                onChange={(e) => setNewKeyword(e.target.value)}
                value={newKeyword}
                ref={keywordsInput}
              />
              <button onClick={handleAdd} className='btn'>Dodaj</button>
            </div>
          </label>
          <p>Trenutne kljucne reci: {keywords.map(kw => <em>{kw}, </em>)}</p>
          <label>
                    <span>Sastojci:</span>
                    <textarea 
                      onChange={(e) => setIngredients(e.target.value)} 
                      value={ingredients}
                      required
                    />
          </label>
          <button className='btn'>Dodaj</button>

        </form>

    </div>
  )
}
