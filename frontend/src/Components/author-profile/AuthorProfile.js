import React from 'react'
import {NavLink,Outlet} from 'react-router-dom'
function AuthorProfile() {
  return (
    <div>
      <ul className='nav justify-content-around fs-3'>
        <li>
          <NavLink to='articles-by-author/:author' className="nav-link">
                Articles By Author
          </NavLink>
        </li>
        <li>
          <NavLink to="new-article" className="nav-link">
                Add New
          </NavLink>
        </li>
      </ul>
      <Outlet/>
    </div>
  )
}

export default AuthorProfile