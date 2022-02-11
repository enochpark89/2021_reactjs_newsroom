import axios from "axios";
import React from "react";
import { hasOnlyExpressionInitializer } from "typescript";
import styled from "styled-components";
import GlobalStyle from './theme/globalStyles';

const baseURL = "https://newsapi.org/v2/top-headlines?country=us&apiKey=8c63e5b631f3491aa7a9db8d04c969c3";

// Styled components



const Title = styled.div`
  font-size: 3em;
  text-align: center;
  border-bottom: 2px solid black;
  padding-bottom: 10px;
  margin-bottom: 20px;
  font-weight: bold;
`;

const ArticleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: left;
  border: 2px solid black;
  padding: 10px;
  margin-bottom: 15px;
  border-radius: 15px;
  &:hover {
    background-color: #f5f5f5;
  }
  &: active {
    background-color:black;
    color: white;
  }
  `;

const PictureContainer = styled.div`
  margin-left: 20px;
  margin-right: 20px;
`;

const TextContainer = styled.div`
`;

function App() {
  const [post, setPost] = React.useState(null);
  const calculateDays = (publishedAt) => {
    const regex = /\d\d\d\d-\d\d-\d\d/g;
    const match = publishedAt.match(regex);
    const date = match[0].replaceAll('-', '/');
    const date1 = new Date(date);
    const timeElapsed = Date.now();
    const today = new Date(timeElapsed);
    const date2 = new Date(today.toLocaleDateString());
    var difference= Math.abs(date1-date2);
    var days = difference/(1000 * 3600 * 24)
    return days;
  }
  React.useEffect(() => {
    const data = axios.get(baseURL).then((response) => {
      setPost(response.data);
    });
  }, []);
  console.log(post);
  
  return (
    <>
      <GlobalStyle />
      <Title>NewsRoom.com</Title>
      
      {post && post.articles.map((article) => (
        <ArticleContainer>
          <PictureContainer>
            { article.urlToImage ? (
              <img src={article.urlToImage} alt="article" height="150" width="150"/>
            ) : (
              <img src="https://via.placeholder.com/150" alt="article" />
            )}

          </PictureContainer>
          <TextContainer>
          <h2>{article.title}</h2>
          <p>{article.description}</p>
          <p>{calculateDays(article.publishedAt)} days ago</p>
          <a href={article.url}>Read more</a>
          </TextContainer>
        </ArticleContainer>
      ))}
    </>
  );
}



// var url = 'https://newsapi.org/v2/top-headlines?' +
//           'country=us&' +
//           'apiKey=8c63e5b631f3491aa7a9db8d04c969c3';
// var req = new Request(url);
// fetch(req)
//     .then(function(response) {
//         console.log(response.json());
//     })
export default App;
