import {Link, useParams} from 'react-router-dom'
import React, {useState, useEffect} from 'react'
import axios from 'axios'

import Btn from '../icons/btn'
import Status from '../icons/status'

export default function BookDetails(){
    const [post, setPost] = useState(null);
    const bookId = useParams();

    useEffect(() => {
        let isMounted = true;

        axios.get(`http://localhost:5000/catalog/book/${bookId.id}`)
        .then(res => { if (isMounted) setPost(res.data) })

        return () => isMounted = false
      }, [post, bookId.id])
    
    if (!post) return (<div className = 'btn-pg-container'>nothing to see here :( (Give it a few seconds!)</div>)
    console.log(post);
    
    return(
        <div className = 'btn-pg-container'>
            <div className = 'btn'><Btn url = '/catalog/books'/></div>
            <div className = 'pg'>
               <h1>Title: {post.book.title}</h1>
                <div style = {{width: '30vw'}}>
                    <p><strong>Author:</strong> {post.book.author.family_name}, {post.book.author.first_name}</p>
                    
                    <p><strong>Summary:</strong> {post.book.summary}</p>
                    
                    <p><strong>ISBN:</strong> {post.book.isbn}</p>
                    
                    <p><strong>Genre:</strong> {post.book.genres ? post.book.genres.map(genre => genre.name + " | "): ''}</p>
                </div>
                <div>
                    <h3>Copies</h3>
                    <p style = {{height: '3px', width: '6vw', backgroundColor: 'mediumslateblue'}}></p>
                    <div className = 'overflow-auto' style = {{border: 'solid', borderColor: 'mediumslateblue', borderRadius: '15px'}}>
                        <ul className = 'list-group'>
                            {post.book_instances ? 
                                post.book_instances.map(instance => 
                                    <li className = 'card' key = {instance.id} style = {{padding: '1rem'}}>
                                        <Status stat = {instance.status}/>
                                        <span><strong>Imprint:</strong> {instance.imprint}</span>
                                        <span>
                                            <strong>Id: </strong>
                                            <Link to = {`/catalog/bookinstance/${instance.id}`} className = 'text-decoration-none'>{instance.id}</Link>
                                        </span>
                                    </li>) 
                                : ""}
                        </ul>
                    </div>
                    <hr/>
                    <p>
                        <Link to = 'delete' className='text-decoration-none'>Delete book</Link> | <Link to = 'update' className='text-decoration-none'>Update book</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}