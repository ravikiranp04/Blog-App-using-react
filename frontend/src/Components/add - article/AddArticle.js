import React from 'react'
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

//import { axiosWithToken } from '../../axiosWithToken';
function AddArticle() {
  let {register,handleSubmit}=useForm();
  let {currentuser}=useSelector((state)=>state.userLogin)
  let [err,setErr]=useState("");
  let navigate=useNavigate();
  let token=sessionStorage.getItem('token');

const axiosWithToken=axios.create({
    headers:{Authorization: `Bearer ${token}`}
})

  const addNewArticle=async(newArticle)=>{
      newArticle.articleId = Date.now() //date in terms of timestamp
      newArticle.dateofCreation= new Date();
      newArticle.dateofModification= new Date();
      newArticle.username= currentuser.username;
      newArticle.comments=[];
      newArticle.status=true;
      console.log(newArticle)

      //make HTTP Post request to author api(protected-route)
      let res=await axiosWithToken.post (`${process.env.BASE_URL}/author-api/new-article`,newArticle)
      console.log("res ",res)
      if(res.data.mesaage==='New Article added'){
        //navigate gor articlesByauthoe Component
        navigate(`/author-profile/articles-by-author/${currentuser.username}`)
      }
      else{
        console.log(err)
        setErr(res.data.mesaage)
      }
  }
  return (

    <div>
      <div className='row justify-content-center mt-5'>
        <div className='col-lg-8 col-md-8 col-sm-10'>
          <div className='card shadow  ' >
              <div className='card-title text-center border-bottom'>
                <h2 className='p-3'>Write an Article</h2>
              </div>
              <div className='card-body bg-light'>
                <form onSubmit={handleSubmit(addNewArticle)}>
                  <div className='mb-4'>
                    <label htmlFor="title" className='form-label'>Title</label>
                    <input type='text' className='form-control' id='title' {...register("title")}/>
                  </div>

                  <div className='mb-4'> 
                    <label htmlFor="category" className='form-label'>Select a Category</label>
                    <select {...register("category")} id="category" className='form-select'>
                      <option value="programming">Programming</option>
                      <option value="AI&ML">AI&ML</option>
                      <option value="database">Database</option>
                    </select>
                  </div>
                  <div className='mb-4'>
                    <label htmlFor='content' className='form-label'>
                      Content
                    </label>
                    <textarea {...register("content")} className='form-control' id="content" rows="10"></textarea>
                  </div>
                  <div className='text-end'>
                      <button type='submit' className='text-light bg-success'>
                        Post
                      </button>
                  </div>
                </form>

              </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddArticle