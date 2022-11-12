import { useState, useEffect } from 'react';

//custom hook koji na vraca poslove iz baze
export const useFetch = (url, method = 'GET') => {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);
  //upit iz pretrage
  const [options, setOptions] = useState(null);


  //ovo pozivamo kad cuvamo posao u jsonu
  const postData = (postData) => {
    setOptions({
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(postData)
    })
  }

  useEffect(() => {
    //kontroler koristimo za prekid daljeg ucitavanja kad jednom ucitamo potrebne podatke
    const controller = new AbortController()

    //asinhrone fja koja vraca poslove
    const fetchData = async (fetchOptions) => {
      setIsPending(true)
      
      try {
        //odgovor na pokusaj servera da vrati podatke
        const response = await fetch(url, { ...fetchOptions, signal: controller.signal })
        if(!response.ok) {//ukoliko je doslo do greske prilikom povezivanja na server
          throw new Error(response.statusText)
        }
        //unosimo json deo odgovora od servera u varijablu data
        const jsonData = await response.json()
        //prekidamo ucitavanje
        setIsPending(false)
        setData(jsonData)//postavljamo podatke na ono sto je vraceno
        setError(null)
      } catch (err) {
        if (err.name === "AbortError") {
          console.log("the fetch was aborted")
        } else {
          setIsPending(false)
          setError('Could not fetch the data')
        }
      }
    }

    //ako samo vracamo poslove nemamo dodatne parametre
    //to radimo koriscenjem get metode
    if(method === "GET") {
      fetchData();
    } 
    //ako postavljamo nov oglas 
    //potrebno je da imamo prosledjene parametre (options) i njih prosledjujemo fji fetchData
    if(method === "POST" && options) {
      fetchData(options);
    }

    return () => {
      controller.abort()
    }

  }, [url, options, method])

  return { data, isPending, error, postData}
}