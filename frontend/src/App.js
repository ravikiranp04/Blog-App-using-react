import logo from './logo.svg';
import './App.css';
import {createBrowserRouter,Navigate,RouterProvider} from 'react-router-dom'
import RootLayout from './Components/RootLayout';
import Signup from './Components/signup/Signup';
import Home from './Components/home/Home';
import Signin from './Components/signin/Signin'
import UserProfile from './Components/user-profile/UserProfile';
import AuthorProfile from './Components/author-profile/AuthorProfile';
import AddArticle from './Components/add - article/AddArticle';
import ArticlesByAuthor from './Components/articles-by-author/ArticlesByAuthor';
import Articles from './Components/Articles/Articles';
import Article from './Components/Article/Article';
function App() {
  
  //create Browser router
  let browserRouter=createBrowserRouter([{
    path:'',
    element:<RootLayout/>,
    children:[{
      path:'',
      element:<Home/>
    },
    {
      path:'/signup',
      element:<Signup/>
    },
    {
      path:'/signin',
      element:<Signin/>
    },
    {
      path:'/user-profile',
      element:<UserProfile/>,
      children:[
        {
          path:'articles',
          element:<Articles/>
        },
        {
          path:'article/:articleId',
          element:<Article/>
        },
        {
          path:'',
          element:<Navigate to='articles'/>
        }
      ]
    },
    {
      path:'/author-profile',
      element:<AuthorProfile/>,
      children:[
        {
          path:'new-article',
          element:<AddArticle/>
        },
        {  
          path:'articles-by-author/:author',
          element:<ArticlesByAuthor/>

        },
        {
          path:"article/:articleId",
          element:<Article/>
        },
        {
          path:'',
          element:<Navigate to='articles-by-author/:author'/> 
        }
      ]
    }
  ]
  }])
  return (
    <div className="App">
        {/*Provide browser router to app*/}
    <RouterProvider router={browserRouter}/>
    </div>
  );
}

export default App;
