import axios from 'axios';
import React, {useState, useEffect} from 'react';

export default function Books() {
  const [post, setPost] = useState(null);

  const baseURL = 'http://localhost:5000/catalog/books';

  useEffect(() => {
    axios.get(baseURL).then(res => {
      setPost(res.data);
    });
  }, [post]);

  if (!post) return null;
  //else console.log(post);
  //{post[0].title}
  return ( 
    <main style={{ padding: "1rem" }}>
      <h1>Books</h1>
      <ul style = {{marginTop: "1.5rem" }}>
        {post.map(book => <li>{book.title} ({book.author.family_name}, {book.author.first_name})</li>)}
      </ul>
    </main>
  );
  }