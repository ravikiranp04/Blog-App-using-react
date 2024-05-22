import React, { useState, useEffect } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import axios from 'axios';

function Articles() {
  const [articlesList, setArticlesList] = useState([]);
  const [err, setErr] = useState('');
  let navigate = useNavigate();
  let token = sessionStorage.getItem('token');

  const axiosWithToken = axios.create({
    headers: { Authorization: `Bearer ${token}` }
  });

  const getArticlesofcurrentAuthor = async () => {
    try {
      let res = await axiosWithToken.get(`${process.env.BASE_URL}/user-api/articles`);
      if (res.data.message === 'All articles') {
        setArticlesList(res.data.payload);
      } else {
        setErr(res.data.message);
        console.log(err)
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
  },[getArticlesofcurrentAuthor]);

  return (
    <div className="container mt-5">
      {articlesList.length === 0 ? (
        <p className="display-1 text-danger text-center">No Articles Found</p>
      ) : (
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4">
          {articlesList.map((article) => (
            <div className="col" key={article.articleId}>
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title">{article.title}</h5>
                  <p className="card-text">{article.content.substring(0, 80)}.....</p>
                  <button className="btn btn-primary" onClick={() => readArticleByArticleId(article)}>
                    Read More
                  </button>
                </div>
                <div className="card-footer">
                  <small className="text-muted">
                    Last updated on {article.dateofModification}
                  </small>
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

export default Articles;
