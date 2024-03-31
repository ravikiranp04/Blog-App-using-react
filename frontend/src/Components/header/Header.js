import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux';
import {resetState} from '../../Redux/slices/userLoginSlice'
function Header() {
    let dispatch=useDispatch();
    const {isPending,currentuser,errorStatus,errorMessage,loginStatus}=useSelector(state=>state.userLogin);

    function logout(){
        //remove token from browser storage
        sessionStorage.removeItem('token')
        //reset state
        let actionobj=resetState();
        dispatch(actionobj)
    }
  return (
    <ul className='nav bg-dark d-flex justify-content-end pt-3 fs-4' style={{height:80}}>
        {
            loginStatus==false?<>
            <li className='nav-item'>
            <Link className='nav-link text-white' to="">
                Home
            </Link>
        </li>
        <li className='nav-item'>
            <Link className='nav-link text-white' to="/signup">
                Sign Up
            </Link>
        </li>
        <li className='nav-item'>
            <Link className='nav-link text-white' to="/signin">
                Sign In
            </Link>
        </li></>:<li className='nav-item'>
            <Link className='nav-link text-white' to="/signin" onClick={logout}>
                <span className='lead fs-3 text-warning m-4'>{currentuser.username}<sup className='text-white fs-2'>({currentuser.userType})</sup></span>
                Sign Out
            </Link>
        </li>
        }
        
        
    </ul>
  )
}

export default Header