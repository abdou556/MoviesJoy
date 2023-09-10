import React from 'react'
import Joi from 'joi'
import './Registration.css'
import axios from 'axios';
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
export default function Registration() {

  let navigate = useNavigate();
  const [joiErrors, setJoiErrors] = useState(null)
 const [error, setError] = useState('');
 const [isloading, setIsloading] = useState(false)

const [user, setUser] = useState({

    firstName: '',
    lastName: '',
    userName: '',
    email: '',
    age: 0,
    password: '',
    phone: '',
})


function getUserData (e) {

  let myUser = {...user}
 
  myUser[e.target.name]= e.target.value;
  setUser(myUser);
}

function submitRegisterForm (e) {
  setIsloading(true)
  e.preventDefault();
  const schema = Joi.object({
    userName: Joi.string().alphanum().min(3).max(25).required(),
    firstName: Joi.string().alphanum().min(3).max(25).required(),
    lastName: Joi.string().alphanum().min(3).max(25).required(),
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
    age: Joi.number().min(18).max(80).required(),
    password: Joi.string().required(),
   
    phone: Joi.number().required()
  })
  let JoiRespons = schema.validate(user, { abortEarly: false })

  if (JoiRespons.error === undefined) {
    sendData()

  } else {

    setJoiErrors(JoiRespons.error.details)
  }
}

async function sendData () {

  let {data} = await axios.post(`http://localhost:5000/api/v1/users/signUp`, user);

  if (data.message == 'success') {
    navigate('/Login')

   setIsloading(false)
   
    
  }else{

   setIsloading(false)
    setError(data.message)
  }
  console.log(data)
 }


  return <>

<div className='w-50 m-auto py-3'>
    {joiErrors == null ? "" : joiErrors.map((err) => <div className='alert alert-danger'>{err.message}</div>)}
    {error.length > 0 ? <div className='alert alert-danger my-2'>{error}</div> : ''}
     
      <form onSubmit={submitRegisterForm} >
        <h2 className='mb-4'> Registration  </h2>
        <label htmlFor="userName">userName</label>
        <input  onChange={getUserData} type="text" name='userName' id='userName' className='form-control mb-3' placeholder='userName' />

        <label htmlFor="firstName">firstName</label>
        <input  onChange={getUserData} type="text" name='firstName' id='firstName' className='form-control mb-3' placeholder='firstName' />

        <label htmlFor="lastName">lastName</label>
        <input  onChange={getUserData}  type="text" name='lastName' id='lastName' className='form-control mb-3' placeholder='lastName' />

        <label htmlFor="age">age</label>
        <input onChange={getUserData} type="number" name='age' id='age' className='form-control mb-3' placeholder='age' />

        <label htmlFor="email">email</label>
        <input onChange={getUserData} type="email" name='email' id='email' className='form-control mb-3' placeholder='email' />

        <label htmlFor="password">password</label>
        <input  onChange={getUserData} type="password" name='password' id='password' className='form-control mb-3' placeholder='password' />
        
        

       
        <label htmlFor="phone">phone</label>
        <input onChange={getUserData} type="number" name='phone' id='phone' className='form-control mb-3' placeholder='phone' />
       

        <button type='submit' className='btn btn-outline-info mt-3 d-grid gap-2 col-6 mx-auto my-3 '>
          {isloading == true ? <i className="fa-solid fa-spinner fa-spin"></i> : "Registration" }
           </button>
      </form>
         
    </div>

  </>
}
