import articles from "./article-content";

 const ArticleListPage = () => {
  return (
    <>
    <h1>Article List Page</h1>
  {articles.map((article)=>(
    <>
       <h2>{article.name}</h2>
       <p>{article.title}</p>
       <p>{article.content}</p>
    </>
   
    
 ))}
    </>
    
  )
}

export default ArticleListPage;
