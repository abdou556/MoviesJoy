import React from 'react'
import { Link } from 'react-router-dom';

export default function Notfound() {
  return <>
   <div className="d-flex align-items-center justify-content-center vh-100">
  <div className="text-center row">
    <div className=" col-md-6">
      <img
        src="error.jpg"
        alt="error"
        className="img-fluid"
      />
    </div>
    <div className=" col-md-6 mt-5">
      <p className="fs-3">
        {" "}
        <span className="text-danger">Opps!</span> Page not found.
      </p>
      <p className="lead">The page you’re looking for doesn’t exist.</p>
      <Link to="/Home" className="btn btn-primary">
        Go Home
      </Link>
    </div>
  </div>
</div>
  </>
}
