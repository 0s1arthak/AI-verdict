import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Loader from './Loader';

function App() {

  const [name,setName]=useState('');
  const [uni,setUni]=useState('');
  const [loc,setLoc]=useState('');
  const [title,setTitle]=useState('');

  const [loader,setLoader]=useState(false);
  const [result,setResult]=useState(null);




  const onSubmitHandler=async(e)=>{
    e.preventDefault();
    if(name.trim()===''){
      alert("Enter the name first");
      return;
    }
    if(uni.trim()===''){
      alert("Enter the universe first");
      return;
    }
    if(loc.trim()===''){
      alert("Enter the list of charges first");
      return;
    }
    if(title.trim()===''){
      alert("Enter the trial title first");
      return;
    }
    setLoader(true);

    const promise=await fetch('http://localhost:5000/trial',{
      method:'POST',
      headers:{
        'Content-type':'application/json',
      },
      body:JSON.stringify({name,uni,loc,title})
    })

    const data=await promise.json();
    console.log(data.judgeResponse);
    setResult(data.judgeResponse);
    setLoader(false);
    

  }



  return (
    
    <div className='flex flex-col gap-8'>
      <h1 className='text-3xl font-bold text-center mt-8 text-amber-600 drop-shadow'>Character courtroom:AI trials of fictional icons</h1>
      {loader && <Loader/>}
      {!result && !loader &&       
      <form action="submit" className='w-full max-w-md p-6 border-2 border-amber-300 rounded-xl mx-auto shadow-xl flex flex-col gap-4 bg-white'
      
      onSubmit={onSubmitHandler}
      
      >
        <input type="text" placeholder='Enter your character name' className='p-3 text-lg rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-400 w-full shadow-md text-black'
        
        value={name}
        onChange={(e)=>setName(e.target.value)}
        
        />

        <input type="text" placeholder='Universe' className='p-3 text-lg rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-400 w-full shadow-md text-black'
        
        value={uni}
        onChange={(e)=>setUni(e.target.value)}

        />

        <input type="text" placeholder='List of charges' className='p-3 text-lg rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-400 w-full shadow-md text-black'
        value={loc}
        onChange={(e)=>setLoc(e.target.value)}
        
        />

        <input type="text" placeholder='Trial title' className='p-3 text-lg rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-400 w-full shadow-md text-black'
        value={title}
        onChange={(e)=>setTitle(e.target.value)}
        
        />


        <button>Begin Trial</button>



      </form>}

      {result && !loader && 
      /*


      
      
      */

      <div className="max-w-2xl mx-auto mt-6 p-6 rounded-2xl shadow-xl bg-gradient-to-br from-white to-amber-100 border-4 border-amber-400">
        <h2 className="text-2xl md:text-3xl font-extrabold text-center text-amber-800 mb-4 underline underline-offset-4">
          🏛️ Final Verdict
        </h2>
        <div className="space-y-3 text-gray-800 text-lg leading-relaxed font-medium">
          {result.split('\n').map((line, idx) => (
            <p key={idx}>{line.trim()}</p>
          ))}
        </div>

        <button onClick={()=>{
          setName('');
          setUni('');
          setLoc('');
          setTitle('');
          setResult(null);


        }}>Back</button>
  
      </div>
      
      }

    </div>
  )
}

export default App
