import axios from 'axios'
import React, {useState, useEffect} from 'react'
import { Route, Link } from 'react-router-dom'
import Btn from './icons/btn.js'

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
    <div className = 'btn-pg-container'>
      <div style = {{padding: '1rem'}}><Btn url = '/catalog'/></div>
      <div style = {{padding: '.2rem'}}>
          <h1>Books</h1>
          <ul style = {{marginTop: '1.5rem'}}>
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
      </div>
    </div>

  );
  }