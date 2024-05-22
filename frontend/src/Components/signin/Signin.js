import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { userLoginThunk } from '../../Redux/slices/userLoginSlice';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function Signin() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const {currentuser, errorMessage, loginStatus } = useSelector(state => state.userLogin);

  function login_handle(userCred) {
    console.log(userCred);
    let actionObj = userLoginThunk(userCred);
    dispatch(actionObj);
  }

  // To know someone is logged in
  useEffect(() => {
    if (loginStatus === true) {
      if (currentuser.userType === 'user') {
        navigate('/user-profile');
      }
      if (currentuser.userType === 'author') {
        navigate('/author-profile');
      }

    }
  }, [loginStatus,currentuser.userType,navigate]);

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          {errorMessage && <div className="alert alert-danger" role="alert">
            {errorMessage}
          </div>}
          <div className="card shadow"> {/* Added shadow class here */}
            <div className="card-body">
              <h2 className="card-title text-center mb-4">Sign In</h2>
              <form onSubmit={handleSubmit(login_handle)}>
                {/*USER TYPE-------------------------------- */}
                <div className="mb-3">
                  <div className="form-check form-check-inline">
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
                  <div className="form-check form-check-inline">
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

                {/*User Name-------------------------------- */}
                <div className="mb-3">
                  <input type="text" placeholder="Username" className="form-control" {...register("username", { required: true })} />
                  {errors.username?.type === "required" && (
                    <p className="text-danger lead">Username is Required</p>
                  )}
                  {errors.username?.type === "maxLength" && (
                    <p className="text-danger lead">Max Length is 10</p>
                  )}
                  {errors.username?.type === "minLength" && (
                    <p className="text-danger lead">Min Length is 5</p>
                  )}
                </div>

                {/*Password-------------------------------- */}
                <div className="mb-3">
                  <input type="password" placeholder="Password" className="form-control" {...register("password", { required: true })} />
                  {errors.password?.type === "required" && (
                    <p className="text-danger lead">Password is Required</p>
                  )}
                  {errors.password?.type === "minLength" && (
                    <p className="text-danger lead">Enter at least 6 characters</p>
                  )}
                </div>

                {/*Login Button-------------------------------- */}
                <div className="text-center">
                  <button type="submit" className="btn btn-success w-50" >
                    Sign In
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signin;
