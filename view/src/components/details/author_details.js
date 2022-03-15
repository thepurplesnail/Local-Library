import {useState, useEffect} from 'react'
import axios from 'axios'
import {Link, useParams} from 'react-router-dom'
import Btn from '../icons/btn'

export default function AuthorDetails (){
    const [post, setPost] = useState(null)
    let authorId = useParams();
    useEffect(() => {
        let isMounted = true;
        axios.get(`http://localhost:5000/catalog/author/${authorId.id}`)
        .then(results => {if (isMounted) setPost(results.data)})
        return () => isMounted = false;
    })

    if (!post) return (<div className = 'btn-pg-container'>nothing to see here :( (Give it a few seconds!)</div>)

    return(
        <div className = 'btn-pg-container'>
            <div className='btn'><Btn url = '/catalog/authors'/></div>
            <div className = 'pg'>
                <h1>Author: {post.family_name}, {post.first_name}</h1>
                <p>{post.date_of_birth_formatted} - {post.date_of_death_formatted}</p>
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
                <Link to = {`/catalog/author/${authorId.id}/delete`} className = "text-decoration-none">Delete author</Link>
            </div>
        </div>
    );
}