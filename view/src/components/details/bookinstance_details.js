import {useEffect, useState} from 'react'
import axios from 'axios'
import {useParams, Link} from 'react-router-dom'
import Btn from '../icons/btn'
import Status from '../icons/status'

export default function BookInstanceDetails(){
    const [post, setPost] = useState(null)
    let bookinstanceId = useParams().id

    useEffect(() =>{
        let isMounted = true;
        axios.get(`http://localhost:5000/catalog/bookinstance/${bookinstanceId}`)
        .then(res => {if (isMounted) setPost(res.data)})
    }, [post, bookinstanceId])

    if (!post) return(<div className = 'btn-pg-container'>nothing to see here :( (Give it a few seconds!)</div>)

    return(
        <div className = 'btn-pg-container'>
            <div className = 'btn'><Btn url = '/catalog/bookinstances'/></div>
            <div className = 'pg'>
                <h1>ID: {post.id}</h1> 
                <p><strong>Title:</strong> <Link to = {`/catalog/book/${post.book.id}`} className = 'text-decoration-none'>{post.book.title}</Link></p>
                <p><strong>Imprint:</strong> {post.imprint}</p>
                <p><strong>Status:</strong> <Status stat = {post.status} /></p>
                <p><strong>Due Back:</strong> {post.due_back_formatted}</p>
            </div>
        </div>
    );
}