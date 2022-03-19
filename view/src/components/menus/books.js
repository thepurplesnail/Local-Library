import axios from 'axios'
import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import Btn from '../icons/btn.js'

export default function Books() {
  const [post, setPost] = useState(null)

  useEffect(() => {
    let isMounted = true;

    axios.get('http://localhost:5000/catalog/books')
    .then(res => {if (isMounted) setPost(res.data) })

    return () => (isMounted = false) 
  }, [post]);

  if (!post) return (<div className = 'btn-pg-container'>nothing to see here :( (Give it a few seconds!)</div>)

  return ( 
    <div className = 'btn-pg-container'>
      <div className = 'btn'><Btn url = '/catalog'/></div>
      <div className = 'pg'>
          <h1>Books</h1>
          <ul className = 'total-list list-group'>
            {post.map(
              book => 
              <li key={book.id} className = 'card total-card'>
                <span>
                  <Link to = {`/catalog/book/${book.id}`} className = "text-decoration-none">
                    {book.title}
                  </Link> ({book.author.family_name}, {book.author.first_name})
                </span>
              </li>
              )
            } 
          </ul>
      </div>
    </div>

  );
  }