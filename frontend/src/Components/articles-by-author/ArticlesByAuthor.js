import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


function ArticlesByAuthor() {
  const [articlesList, setArticlesList] = useState([]);
  const [err, setErr] = useState('');
  const navigate = useNavigate();
  const { currentuser } = useSelector((state) => state.userLogin);
  const token = sessionStorage.getItem('token');

  const axiosWithToken = axios.create({
    headers: { Authorization: `Bearer ${token}` }
  });

  const getArticlesofcurrentAuthor = async () => {
    try {
      const res = await axiosWithToken.get(`${process.env.BASE_URL}/author-api/articles/${currentuser.username}`);
      if (res.data.message === 'Articles found') {
        setArticlesList(res.data.payload);
      } else {
        setErr(res.data.message);
      }
    } catch (error) {
      console.error('Error fetching articles:', error);
    }
  };

  const readArticleByArticleId = (articleobj) => {
    navigate(`../Article/${articleobj.articleId}`, { state: articleobj });
  };

  useEffect(() => {
    getArticlesofcurrentAuthor();
  }, [articlesList]);

  return (
    <div className="container mt-5">
      {articlesList.length === 0 ? (
        <p className="display-4 text-danger text-center">No Articles Found</p>
      ) : (
        <div className="row row-cols-1 row-cols-md-3 g-4">
          {articlesList.map((article) => (
            <div className="col" key={article.articleId}>
              <div className="card h-100 shadow">
                <div className="card-body">
                  <h5 className="card-title">{article.title}</h5>
                  <p className="card-text">{article.content.substring(0, 80)}.....</p>
                  <button className="btn btn-primary" onClick={() => readArticleByArticleId(article)}>
                    Read More
                  </button>
                </div>
                <div className="card-footer bg-transparent border-top-0">
                  <small className="text-muted">Last updated on {article.dateofModification}</small>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      <Outlet />
    </div>
  );
}

export default ArticlesByAuthor;
