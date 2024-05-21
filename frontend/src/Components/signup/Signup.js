import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Signup() {
  let { register, handleSubmit, formState: { errors } } = useForm();
  let [err, setError] = useState('');
  let navigate = useNavigate();

  async function onSignUpFormSubmit(userobj) {
    if (userobj.userType === 'user') {
      const res = await axios.post('http://localhost:4000/user-api/user', userobj);
      if (res.data.message === 'User Created') {
        navigate('/signin');
      } else {
        setError(res.data.message);
      }
    }
    if (userobj.userType === 'author') {
      const res = await axios.post('http://localhost:4000/author-api/user', userobj);
      if (res.data.message === 'Author Created') {
        navigate('/signin');
      } else {
        setError(res.data.message);
      }
    }
  }

  return (
    <div className="container mt-5 w-25 p-2 bg-dark ">
      {err.length !== 0 && <p className="text-danger text-center">{err}</p>}

      <form className="bg-light p-4 rounded shadow-lg" onSubmit={handleSubmit(onSignUpFormSubmit)}>
        <h2 className="m-auto mb-5">Register Here!!</h2>
        
        {/* User type */}
        <div className="row">
          <div className="col-md-6">
            <input
              type="radio"
              className="form-check-input"
              id="user"
              {...register("userType", { required: true })}
              value="user"
            />
            <label htmlFor="user" className="form-check-label">
              User
            </label>
          </div>
          <div className="col-md-6">
            <input
              type="radio"
              className="form-check-input"
              id="author"
              {...register("userType", { required: true })}
              value="author"
            />
            <label htmlFor="author" className="form-check-label">
              Author
            </label>
          </div>
        </div>
        {errors.userType?.type === "required" && (
          <p className="text-danger lead">Choose a UserType</p>
        )}

        {/* User Name */}
        <div className="row mt-3">
          <input type="text" placeholder="Username" className="form-control w-75 m-auto" {...register("username", { required: true, minLength: 5, maxLength: 15 })} />
        </div>
        {errors.username?.type === "required" && (
          <p className="text-danger lead">Username is Required</p>
        )}
        {errors.username?.type === "maxLength" && (
          <p className="text-danger lead">Max Length is 15</p>
        )}
        {errors.username?.type === "minLength" && (
          <p className="text-danger lead">Min Length is 5</p>
        )}

        {/* Password */}
        <div className="row mt-3">
          <input type="password" placeholder="Password" className="form-control w-75 m-auto" {...register("password", { required: true, minLength: 6 })} />
        </div>
        {errors.password?.type === "required" && (
          <p className="text-danger lead">Password is Required</p>
        )}
        {errors.password?.type === "minLength" && (
          <p className="text-danger lead">Enter at least 6 characters</p>
        )}

        {/* Email */}
        <div className="row mt-3">
          <input type="email" placeholder="Email" className="form-control w-75 m-auto" {...register("email", { required: true })} />
        </div>
        {errors.email?.type === "required" && (
          <p className="text-danger lead">E-mail is Required</p>
        )}

        {/* Submit Button */}
        <div className="text-center mt-4">
          <button type="submit" className="form-control w-50 m-auto btn btn-success">
            Register
          </button>
        </div>
      </form>
    </div>
  );
}

export default Signup;
