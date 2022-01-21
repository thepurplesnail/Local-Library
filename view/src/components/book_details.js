import {Link, useParams, Navigate} from 'react-router-dom'
import React, {useState, useEffect} from 'react'
import axios from 'axios'

import Btn from './icons/btn'

export default function BookDetails(){
    const [post, setPost] = useState(null);
    const bookId = useParams();

    useEffect(() => {
        let isMounted = true;

        axios.get(`http://localhost:5000/catalog/book/${bookId.id}`)
        .then(res => { if (isMounted) setPost(res.data) })

        return () => isMounted = false
      }, [post, bookId.id])
    
    if (!post) return null;
    

    return(
        <div className = 'row' style = {{marginTop: "-37vh", width: "80vw"}}>
            <Btn/>
            <main>
                <h1>Title: {post.book.title}</h1>
                <p>
                    <strong>Author:</strong> {post.book.author.family_name}, {post.book.author.first_name}
                </p>
                <p style = {{width: "20vw"}}>
                    <strong>Summary:</strong> {post.book.summary}
                </p>
            </main>
        </div>
    );
}