import React from 'react'
import axios from 'axios'
import { useEffect } from 'react'
import { useState } from 'react'
import Movie from './Movies.module.css'
import { Link } from 'react-router-dom';
export default function Movies() {

  const [allMovies, setAllMovies] = useState(null)
 

  async function getTredingMovies(){
  let {data}  =   await   axios.get('https://api.themoviedb.org/3/trending/movie/week?api_key=5b5db5e4503cc41851fbf8a0e20eca4b')
  setAllMovies(data.results)
}





useEffect(function(){
  getTredingMovies()

  

} , [])
   
  return <>
   {allMovies != null  ?   <div className='container'>
      <div className='row align-items-center'>
        <div className='col-md-4 py-5'>
          <div className={Movie.title}>
            <h3> Trending Movies to watch </h3>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
          </div>
        </div>
         
      {allMovies.map((movie , idx)=>  <div key={idx} className='col-md-2 py-3'>
      <Link to={`/MovieDetails/movie/${movie.id}`}>
         <div className="movie">
         <img src={"https://image.tmdb.org/t/p/w500/" +movie.poster_path} className='w-100' alt="movie" />
          <h6>{movie.title }</h6>
         </div>
         </Link>
        </div>)}
      </div>

     </div> : 
 <div className="vh-100 d-flex justify-content-center align-items-center">
 <i className="fa-solid fa-spinner fa-spin fa-9x text-white"></i>
 </div> }
 </>
}
