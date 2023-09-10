import React from 'react'
import axios from 'axios'
import { useEffect } from 'react'
import { useState } from 'react'
import home from './Home.module.css'
import { Link } from 'react-router-dom'
import MovieDetails from './../MovieDetails/MovieDetails';


export default function Home() {
  const [allMovies, setAllMovies] = useState(null)
  const [allTv, setAllTV] = useState(null)

  async function getTredingMovies(){
  let {data}  =   await   axios.get('https://api.themoviedb.org/3/trending/movie/week?api_key=5b5db5e4503cc41851fbf8a0e20eca4b')
  setAllMovies(data.results)
}


async function getTredingTV(){
  let {data}  =   await   axios.get('https://api.themoviedb.org/3/trending/tv/week?api_key=5b5db5e4503cc41851fbf8a0e20eca4b')
  setAllTV(data.results)
}


useEffect(function(){


  
  getTredingMovies()

  getTredingTV()

} , [])
   
  return <>
   {allMovies != null && allTv != null ?   <div className='container'>
      <div className='row align-items-center'>
        <div className='col-md-4 py-5'>
          <div className={home.title}>
            <h3> Trending Movies to watch </h3>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
          </div>
        </div>
         
      {allMovies.slice(0 ,10).map((movie , idx)=> 
       <div key={idx} className='col-md-2 py-3'>
         <Link to={`/MovieDetails/movie/${movie.id}`}>
         <div className="movie">
         <img src={"https://image.tmdb.org/t/p/w500/" +movie.poster_path} className='w-100' alt="movie" />
          <h6>{movie.title }</h6>
         </div>
         </Link>
        </div>)}
      </div>

      <div className="row align-items-center">
      <div className='col-md-4 py-5'>
          <div className={home.title}>
            <h3> Trending TV to watch </h3>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
          </div>
        </div>
        {allTv.slice(0 ,10).map((tv , idx )=> <div key={idx} className='col-md-2'>
          <div className="tv">
           <Link to={`/MovieDetails/tv/${tv.id}`}>
           <img src={"https://image.tmdb.org/t/p/w500/"+ tv.poster_path} className='w-100' alt="" />
            <h6>{tv.name}</h6>
           </Link>
          </div>
        </div> ) }
      </div>
     </div> : 
 <div className="vh-100 d-flex justify-content-center align-items-center">
 <i className="fa-solid fa-spinner fa-spin fa-9x text-white"></i>
 </div> }


  
  </>
}
