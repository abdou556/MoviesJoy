import React, { useEffect } from 'react'
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import Main from './Component/Main/Main.jsx'
import Home from './Component/Home/Home';

import jwtDecode from 'jwt-decode'
import { useState } from 'react';
import Login from './Component/Login/Login';
import Registration from './Component/Registration/Registration';
import Movies from './Component/Movies/Movies';
import Tv from './Component/TV/Tv';
import MovieDetails from './Component/MovieDetails/MovieDetails';
import Notfound from './Component/Notfound/Notfound';

export default function App() {

  const [loggedInUser, setLoggedInUser] = useState(null)



  // function ProtectedRoute( props ){

  //   if( loggedInUser == null){

  //  return <Navigate to ="/Login"/>
  //   }
  //   else{
  //     return<> {props.children}</>
  //   }
   
  // }

  function getLoggedInUser() {

    if (localStorage.getItem('tkn') != null) {

      let tkn = localStorage.getItem('tkn')
      let userData = jwtDecode(tkn);
      setLoggedInUser(userData)
    }
  }

  function removeUserData() {
    localStorage.removeItem('tkn');
    setLoggedInUser(null)
  }
  function checkReload() {
    if (localStorage.getItem('tkn') != null && loggedInUser == null) {
      getLoggedInUser()
    }
  }

  useEffect(function () {

    checkReload()
  }, [])
  

  




    const router = createBrowserRouter([
        {path : '' ,element:<Main remove={removeUserData} crrUser={loggedInUser}/> , children:[

          {path: '' , element:<Home/>},
          {path: 'Home' , element:<Home/>},
          {path : 'Login' , element:<Login logVer={getLoggedInUser}/>},
          {path : 'Registration' , element:<Registration/>},
          {path : 'Movies' , element: <Movies/>},
          {path : 'MovieDetails' , element: <MovieDetails/> , children:[{
            path: ':media' , children:[{path:':id'}]  }] },
         
          {path : 'Tv' , element:<Tv/>},
          {path:'*' , element:<Notfound/>}
        ]}


    ])
  return <>
     <RouterProvider router={router} />
  </>
}