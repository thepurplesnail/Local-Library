import axios from "axios";
import {Link, useParams, useNavigate} from 'react-router-dom'
import {useState, useEffect} from "react";
import Btn from "../../icons/btn"

export default function DeleteGenre() {
    const [post, setPost] = useState(null);
    let navigate = useNavigate();
    let genreId = useParams();
    useEffect(() => {
        let isMounted = true;
        axios.get(`http://localhost:5000/catalog/genre/${genreId.id}`)
        .then(results => {if (isMounted) setPost(results.data)});
        return () => isMounted = false;
    })

    const handleClick = e => {
        e.preventDefault();
        axios.delete(`http://localhost:5000/catalog/genre/${genreId.id}/delete`)
        .then(res => alert(res.data));
        navigate('/catalog/genres');
    }

    if (!post) return (<div className = 'btn-pg-container'>nothing to see here :( (Give it a few seconds!)</div>)

    else if (post.books.length)
        return(
            <div className="btn-pg-container">
                <div className = 'btn'><Btn url = {`/catalog/author/${genreId.id}`}/></div>
                <div className = 'pg'>
                    <h1>Genre: {post.name}</h1>
                    <p className="text-secondary"><em>Delete the following books before attempting to delete this genre...</em></p>
                    <div style = {{width: '60vw'}}>
                        {post.books.map(book =>
                            <p>
                                <Link to = {`/catalog/book/${book.id}`}
                                    className = 'text-decoration-none'>
                                    <strong>{book.title}</strong>
                                </Link>
                            </p>
                        )}
                    </div>
                </div>
            </div>
        )
    return(
        <div className="btn-pg-container">
            <div className = 'btn'><Btn url = {`/catalog/genre/${genreId.id}`}/></div>
            <div className="pg">
                <h1>Genre: {post.name}</h1>
                <p>Do you really want to delete this genre?</p>
                <div className = 'submit-btn' onClick = {handleClick}>
                    <button type = 'Submit' className = 'btn' style = {{backgroundColor: 'mediumslateblue', color: 'white'}}>Delete</button>
                </div>
            </div>
        </div>
    );
}