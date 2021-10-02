import axios from "axios";
import React from "react";

const baseURL = "https://newsapi.org/v2/top-headlines?country=us&apiKey=8c63e5b631f3491aa7a9db8d04c969c3";

function App() {
  const [post, setPost] = React.useState(null);

  React.useEffect(() => {
    const data = axios.get(baseURL).then((response) => {
      setPost(response.data);
    });
  }, []);
  const {articles} = post;
  const testingImg ="hello"
  console.log(articles[1]);
  return (
    <>
  <h1> I am testing</h1>
  <img src={articles[1].urlToImage}></img>
  
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
