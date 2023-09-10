import React, { useState } from 'react'
import Joi from 'joi'
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
export default function Login({ logVer }) {

  const navigate = useNavigate();

  const [joiErrors, setJoiErrors] = useState(null)

  const [apiMessage, setApiMessage] = useState("")

  const [user, setUser] = useState({

    email: '',
    password: '',


  })

  function getUser(e) {
    let inputValue = e.target.value;

    let newUser = { ...user }
    let propertyName = e.target.id


    newUser[propertyName] = inputValue;
    setUser(newUser)
  }

  function submitUser(e) {

    e.preventDefault()
    const schema = Joi.object({

      email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),

      password: Joi.string().required(),

    })
    let JoiRespons = schema.validate(user, { abortEarly: false })

    if (JoiRespons.error === undefined) {
      sendUser()

    } else {

      setJoiErrors(JoiRespons.error.details)
    }
  }

  async function sendUser() {
    let { data } = await axios.post('http://localhost:5000/api/v1/users/signIn', user)
    console.log(data);
    if (data.message === "success") {

      localStorage.setItem('tkn', data.token)
      logVer()

      navigate('/Home')
    } else {
      setApiMessage(data.message)
    }

  }


  return <>
   <div className='w-50 m-auto py-3'>

{joiErrors == null ? "" : joiErrors.map((err) => <div className='alert alert-danger'>{err.message}</div>)}
{apiMessage.length === 0 ? "" : <div className='alert alert-danger'> {apiMessage} </div>}
<form onSubmit={submitUser} >
  <h2 className='mb-4'> Login  </h2>

  <label htmlFor="email">email</label>
  <input onChange={getUser} type="email" id='email' className='form-control mb-3' placeholder='email' />

  <label htmlFor="password">password</label>
  <input onChange={getUser} type="password" id='password' className='form-control mb-3' placeholder='password' />

  <button onChange={getUser} className='btn btn-outline-info  mt-3 d-grid gap-2 col-6 mx-auto my-3 '> login </button>
</form>
 
 <div className=' py-3'>
  <h3 className='text-center '>
    If you dont have an account please? <button className='btn btn-outline-info'>
      <Link to ='/Registration' className='text-outlin-danger'> Registration</Link></button>
  </h3>
 </div>
 
</div>
  </>
}
