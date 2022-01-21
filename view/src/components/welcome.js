import axios from 'axios';
import React, {useState, useEffect} from 'react';

export default function Welcome() {
  const [post, setPost] = useState(null);
  
  const baseURL = "http://localhost:5000/";

  useEffect(() => {
    let isMounted = true;

    axios.get(baseURL).then(res => {
      if (isMounted) setPost(res.data)
    })
    
    return () => isMounted = false
  }, [post]);

  if (!post) return null;
  
  return(
      <main style={{ padding: "1rem"}}>
        <div>
          <h1>Local Library Home</h1> 
          <p>Welome to <em>LocalLibrary,</em> a very simple website built from Express and React!</p>
        </div>
        <div style = {{marginTop: "1.5rem" }}>
          <h1>Dynamic Content</h1>
          <p>Here are all the records kept: </p>
          <ul>
            <li><strong>Books:</strong> {post.bookCount}</li>
            <li><strong>Copies:</strong> {post.copiesCount}</li>
            <li><strong>Copies Available:</strong> {post.availableCopiesCount}</li>
            <li><strong>Authors:</strong> {post.authorCount}</li>
            <li><strong>Genres:</strong> {post.genreCount}</li>
          </ul>
        </div>
      </main>
  );
}