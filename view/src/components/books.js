import axios from 'axios'
import React, {useState, useEffect} from 'react'
import { Route, Link } from 'react-router-dom'

export default function Books() {
  const [post, setPost] = useState(null);

  useEffect(() => {
    let isMounted = true;
    axios.get('http://localhost:5000/catalog/books')
    .then(res => {if (isMounted) setPost(res.data) })
    return () => (isMounted = false) 
  }, [post]);

  if (!post) return null;
  
  return ( 
    <div className = 'mainContainer'>
      <main style={{ padding: "1rem" }}>
        <h1>Books</h1>
        <ul style = {{marginTop: "1.5rem" }}>
          {post.map(
            book => 
            <li key={book.id}>
              <Link to = {`/catalog/book/${book.id}`} className = "text-decoration-none">
                {book.title}
              </Link> ({book.author.family_name}, {book.author.first_name})
            </li>
            )
          } 
        </ul>
      </main>
    </div>

  );
  }