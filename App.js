import React,{useState, useEffect} from 'react';
import Loading from './Loading';
import Tours from './Tours';
import './App.css';
const url ='https://course-api.com/react-tours-project';
function App() {
  const[loading, setLoading] = useState(true);
  const[tours, setTours] = useState([]);
   
   const removeTour=((id)=>{
     const newTours = tours.filter((tour)=>tour.id  !== id)
     setTours(newTours);
   })
  const fetchTours = async()=>{
    setLoading(true)

    try {
       const response = await fetch(url)
    const tours = await response.json()
    setLoading(false)
    setTours(tours)

    console.log(tours)
    } catch (error) {
      setLoading(false)
      console.log(error)
    }
   
  } 

  useEffect(()=>{
   fetchTours();
  },[])
  
  
  if(loading){
    return<main>
      <h2><Loading/></h2>
    </main>
  };
  if(tours.length ===0){
    return<main>
     <div className='title'>
     <h4>no  tour left</h4>
     </div>
      
      <button className='btn' onClick={()=>fetchTours()}>refresh</button>
    </main>
  }
  return <main>
    <h2><Tours tours={tours} removeTour={removeTour}/></h2>
  </main>
}
export default App;
