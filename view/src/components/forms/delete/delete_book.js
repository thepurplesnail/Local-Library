import axios from "axios";
import {Link, useParams, useNavigate} from 'react-router-dom'
import {useState, useEffect} from "react";
import Btn from "../../icons/btn"
import Status from "../../icons/status"

export default function DeleteAuthor(){
    const [post, setPost] = useState(null);
    let navigate = useNavigate();
    let bookId = useParams();
    useEffect(() => {
        let isMounted = true;
        axios.get(`http://localhost:5000/catalog/book/${bookId.id}`)
        .then(results => {if (isMounted) setPost(results.data)})
        return () => isMounted = false;
    })

    const handleClick = e => {
        e.preventDefault();
        axios.delete(`http://localhost:5000/catalog/book/${bookId.id}/delete`)
        .then(res => alert(res.data));
        navigate('/catalog/books');
    }

    if (!post) return (<div className = 'btn-pg-container'>nothing to see here :( (Give it a few seconds!)</div>)

    else if (post.book_instances.length)
        return(
            <div className="btn-pg-container">
                <div className = 'btn'><Btn url = {`/catalog/book/${bookId.id}`}/></div>
                <div className = 'pg'>
                    <h1>Book: {post.book.title}</h1>
                    <p className="text-secondary"><em>Delete the following copies before attempting to delete this book...</em></p>
                    <div style = {{width: '60vw'}}>
                        <ul className = 'list-group'>
                            {post.book_instances ? 
                                post.book_instances.map(instance => 
                                    <li className = 'card' key = {instance.id} style = {{padding: '1rem'}}>
                                        <Status stat = {instance.status}/>
                                        <text><strong>Imprint:</strong> {instance.imprint}</text>
                                        <text>
                                            <strong>Id: </strong>
                                            <Link to = {`/catalog/bookinstance/${instance.id}`} className = 'text-decoration-none'>{instance.id}</Link>
                                        </text>
                                    </li>) 
                                : ""}
                        </ul>
                    </div>
                </div>
            </div>
        )
    return(
        <div className="btn-pg-container">
            <div className = 'btn'><Btn url = {`/catalog/book/${bookId.id}`}/></div>
            <div className="pg">
                <h1>Book: {post.book.title}</h1>
                <p>Do you really want to delete this book?</p>
                <div className = 'submit-btn' onClick = {handleClick}>
                    <button type = 'Submit' className = 'btn' style = {{backgroundColor: 'mediumslateblue', color: 'white'}}>Delete</button>
                </div>
            </div>
        </div>
    );
}