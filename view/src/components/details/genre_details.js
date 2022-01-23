import {useParams, Link} from 'react-router-dom'
import Btn from '../icons/btn'
import axios from 'axios'
import {useEffect, useState} from 'react'

export default function GenreDetails (){
    const [post, setPost] = useState(null);
    const genreId = useParams();
    
    useEffect(()=>{
        let isMounted = true;

        axios.get(`http://localhost:5000/catalog/genre/${genreId.id}`)
        .then(res => {if (isMounted) setPost(res.data)});

        return () => isMounted = false;
    }, [post, genreId.id])

    console.log(post);
    
    return(
        <div className = 'btn-pg-container'>
            <div className = 'btn'><Btn url = '/catalog/genres'/></div>
            <div className = 'pg'>
                <h1>Genre: </h1>
                
                <div style = {{padding: '1rem'}}>
                    <h2>Books</h2>
                    
                </div>
            </div>
        </div>
    )
}