import React from 'react';
import { FcClock, FcCalendar } from 'react-icons/fc';
import { CiEdit } from 'react-icons/ci';
import { MdDelete, MdRestore } from 'react-icons/md';
import { BiCommentAdd } from 'react-icons/bi';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';

function Article() {
  let { register, handleSubmit } = useForm();
  const { currentuser } = useSelector((state) => state.userLogin);
  const { state } = useLocation();
  const [commentStatus, setCommentStatus] = useState('');
  const [articleEditStatus, setArticleEditStatus] = useState(false);
  const [editedArticle, setEditedArticle] = useState(state);
  const [articleViewStatus, setArticleViewStatus] = useState(state.status);
  const token = sessionStorage.getItem('token');
  const axiosWithToken = axios.create({
    headers: { Authorization: `Bearer ${token}` }
  });
  const navigate = useNavigate();

  const postComment = async (commentObj) => {
    commentObj.username = currentuser.username;
    const res = await axiosWithToken.post(`${process.env.BASE_URL}/user-api/comment/${state.articleId}`, commentObj);
    if (res.data.message === 'User Comment added') {
      setCommentStatus(res.data.message);
    } else {
      setCommentStatus('Error: Unable to add comment');
    }
  };

  const editArticle = () => {
    setArticleEditStatus(true);
  };

  const saveArticle = async (editedArticle) => {
    const modifyArticle = { ...state, ...editedArticle };
    delete modifyArticle._id;
    modifyArticle.dateofModification = new Date();
    const res = await axiosWithToken.put(`${process.env.BASE_URL}/author-api/article`, modifyArticle);
    if (res.data.message === 'Article modified') {
      setArticleEditStatus(false);
      setEditedArticle(res.data.payload);
      navigate(`/author-profile/article/${state.articleId}`, { state: res.data.payload });
    }
  };

  const deleteArticleById = async () => {
    let copy = { ...editedArticle };
    delete copy._id;
    let res = await axiosWithToken.put(`${process.env.BASE_URL}/author-api/article/${copy.articleId}`, copy);
    if (res.data.message === 'article deleted') {
      setArticleViewStatus(false);
    }
  };

  const restoreArticleById = async () => {
    let copy = { ...editedArticle };
    delete copy._id;
    let res = await axiosWithToken.put(`${process.env.BASE_URL}/author-api/article/${copy.articleId}`, copy);
    if (res.data.message === 'article restored') {
      setArticleViewStatus(true);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-lg-8">
          <div className="card shadow p-4">
            {articleEditStatus ? (
              <form onSubmit={handleSubmit(saveArticle)}>
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">Title</label>
                  <input type="text" className="form-control" id="title" {...register("title")} defaultValue={editedArticle.title} />
                </div>

                <div className="mb-3">
                  <label htmlFor="category" className="form-label">Select a Category</label>
                  <select {...register("category")} id="category" className="form-select" defaultValue={editedArticle.category}>
                    <option value="programming">Programming</option>
                    <option value="AI&ML">AI&ML</option>
                    <option value="database">Database</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label htmlFor="content" className="form-label">Content</label>
                  <textarea {...register("content")} className="form-control" id="content" rows="10" defaultValue={editedArticle.content}></textarea>
                </div>
                <div className="text-end">
                  <button type="submit" className="btn btn-primary">Save</button>
                </div>
              </form>
            ) : (
              <>
                <h1 className="display-4 mb-4">{state.title}</h1>
                <div className="mb-4 d-flex justify-content-between align-items-center">
                  <div>
                    <p className="text-secondary">
                      <FcCalendar className="me-1" />Created on: {state.dateofCreation}
                    </p>
                    <p className="text-secondary">
                      <FcClock className="me-1" />Modified on: {state.dateofModification}
                    </p>
                  </div>
                  <div>
                    {currentuser.userType === "author" && (
                      <>
                        <button className="btn btn-warning me-2" onClick={editArticle}>
                          <CiEdit />
                        </button>
                        {articleViewStatus ? (
                          <button className="btn btn-danger" onClick={deleteArticleById}>
                            <MdDelete />
                          </button>
                        ) : (
                          <button className="btn btn-success" onClick={restoreArticleById}>
                            <MdRestore />
                          </button>
                        )}
                      </>
                    )}
                  </div>
                </div>
                <p className="lead mb-4">{state.content}</p>
              </>
            )}
          </div>
        </div>
        <div className="col-lg-4">
          <div className="card shadow p-4">
            <h2 className="mb-4">Comments</h2>
            <div className="mb-4">
              {state.comments.length === 0 ? (
                <p className="text-muted">No comments yet.</p>
              ) : (
                state.comments.map((comment, index) => (
                  <div className="mb-3" key={index}>
                    <h5 className="fw-bold">{comment.username}</h5>
                    <p className="text-muted">{comment.comment}</p>
                  </div>
                ))
              )}
            </div>
            {currentuser.userType === "user" && (
              <form onSubmit={handleSubmit(postComment)}>
                <div className="mb-3">
                  <label htmlFor="comment" className="form-label">Your Comment</label>
                  <textarea {...register("comment")} className="form-control" id="comment" rows="3" required></textarea>
                </div>
                <button type="submit" className="btn btn-primary"><BiCommentAdd className="me-2" />Add Comment</button>
              </form>
            )}
            {commentStatus && <p className="mt-3 text-success">{commentStatus}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Article;
