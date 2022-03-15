import axios from "axios";
import {Link, useParams, useNavigate} from 'react-router-dom'
import {useState, useEffect} from "react";
import Btn from "../../icons/btn"

export default function DeleteBookInstance() {
    const [post, setPost] = useState(null);
    let navigate = useNavigate();
    let bookInstanceId = useParams();
    useEffect(() => {
        let isMounted = true;
        axios.get(`http://localhost:5000/catalog/bookInstance/${bookInstanceId.id}`)
        .then(results => {if (isMounted) setPost(results.data)})
        return () => isMounted = false;
    })

    const handleClick = e => {
        e.preventDefault();
        axios.delete(`http://localhost:5000/catalog/bookinstance/${bookInstanceId.id}/delete`)
        .then(res => alert(res.data));
        navigate('/catalog/bookinstances');
    }

    if (!post) return (<div className = 'btn-pg-container'>nothing to see here :( (Give it a few seconds!)</div>)

    return(
        <div className="btn-pg-container">
            <div className = 'btn'><Btn url = {`/catalog/bookinstance/${bookInstanceId.id}`}/></div>
            <div className="pg">
                <h1>Book Copy: {post.book.title} | ID: {post.id}</h1>
                <p>Do you really want to delete this copy?</p>
                <div className = 'submit-btn' onClick = {handleClick}>
                    <button type = 'Submit' className = 'btn' style = {{backgroundColor: 'mediumslateblue', color: 'white'}}>Delete</button>
                </div>
            </div>
        </div>
    );
}