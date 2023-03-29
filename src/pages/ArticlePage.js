import { useState, useEffect } from "react";
import axios from 'axios';
import { useParams } from "react-router-dom";
import articles from './article-content';
import NotFoundPage from "./NotFoundPage";
import CommentsList from "./components/CommentsList";
import AddCommentForm from "./components/AddCommentForm";

const ArticlePage = () => {
  const [articleInfo, setArticleInfo] = useState({upvote:0, comments:[]});
 
useEffect(()=>{
  const loadArticleInfo = async()=>{
    const response = await axios.get(`/api/articles/${articleId}`)
    const newArticleInfo = response.data;
    setArticleInfo(newArticleInfo);
  } 
  loadArticleInfo();
},[]);
  const { articleId } = useParams();
  const article = articles.find(article => article.name === articleId);
  
  const addUpvote =async ()=>{
      const response = await axios.put(`/api/articles/${articleId}/upvote`);
      const updatedArticle = response.data;
      setArticleInfo(updatedArticle);
      
  }

  if (!article) {
    return <NotFoundPage />;
  } 
    return (
      <>
        <h1>{article.title}</h1>
        <div className="upvotes-section">
         <button onClick={addUpvote}>upvote</button>
         <p>This article has {articleInfo.upvote} upvote(s)</p>
        </div>
        
        {article.content.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
         <AddCommentForm articleName={articleId} 
            onArticleUpdated={updatedArticle=>setArticleInfo(updatedArticle)}/>
        <CommentsList comments={articleInfo.comments}/>
       
      </>  
    );

  }
  
  


export default ArticlePage;
