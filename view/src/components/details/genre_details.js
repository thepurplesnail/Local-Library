import {useParams, Link} from 'react-router-dom'
import Btn from '../icons/btn'
import axios from 'axios'
import {useEffect, useState} from 'react'

export default function GenreDetails (){
    const [post, setPost] = useState(null);
    const genreId = useParams();

    useEffect(() => {
        let isMounted = true;

        axios.get(`http://localhost:5000/catalog/genre/${genreId.id}`)
        .then(res => { if (isMounted) setPost(res.data) })

        return () => isMounted = false
      }, [post, genreId.id])
    
    if (!post) return null;
    
    return(
        <div className = 'btn-pg-container'>
            <div className = 'btn'><Btn url = '/catalog/genres'/></div>
            <div className = 'pg'>
               <h1>Genre: {post.name}</h1>
                <div style = {{width: '60vw'}}>
                    <h3>Books</h3>
                    {post.books.map(book =>
                        <text>
                            <Link to = {`/catalog/book/${book.id}`}
                                className = 'text-decoration-none'>
                                <strong>{book.title}</strong>
                            </Link>
                            <p>{book.summary}</p>
                        </text>
                    )}
                </div>
                <hr/>
                <Link to = 'delete' className = "text-decoration-none">Delete genre</Link>
            </div>
        </div>
    );
}