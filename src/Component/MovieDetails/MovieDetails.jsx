import axios from 'axios'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { useParams } from 'react-router-dom'

export default function MovieDetails() {
  
    const [objectDetails, setObjectDetails] = useState(null)

    let {id , media} = useParams();
    


   async function getMovieDetails(){
    let {data} =  await   axios.get(`https://api.themoviedb.org/3/${media}/${id}?api_key=5b5db5e4503cc41851fbf8a0e20eca4b`)
     setObjectDetails(data)
}

 useEffect(() => {
    getMovieDetails()
 
   
 }, [])
 



  return <>


  {objectDetails? <div className='container'>
    <div className="row">
        <div className="col-md-3"> 
          <div className="poster">
            <img src={  "https://image.tmdb.org/t/p/w500/"+objectDetails.poster_path} className='w-100' alt="Movie poster" />
          </div>
         </div>
        <div className="col-md-9">
            <div className='MovieDetails'>
                <h4  className='py-2'> name: {  objectDetails.original_title} </h4>
                <p  className='py-2' > overview:{objectDetails.overview}</p>
                genres: {objectDetails.genres?.map((elem , idx)=>  <span key={idx} className='bg-info m-3 '>
                  {elem.name}
                 </span>)}
                  <p className='py-2'>Release Date:{objectDetails.release_date}</p>
                <h6 className='py-2'>voting : {objectDetails.vote_average}</h6>
                <h6></h6>
            </div>
        </div>
    </div>
  </div> : <div className="vh-100 d-flex justify-content-center align-items-center">
 <i className="fa-solid fa-spinner fa-spin fa-9x text-white"></i>
 </div>}
  
  </>
}
