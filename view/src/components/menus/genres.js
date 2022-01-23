import axios from 'axios'
import {useState, useEffect} from 'react'
import Btn from '../icons/btn'
import {Link} from 'axios'

export default function Genres(){
    const [post, setPost] = useState(null)
    useEffect(() => {
        let isMounted = true;
        axios.get('http://localhost:5000/catalog/genres')
        .then(res => {if (isMounted) setPost(res.data)});
    })

    if (!post) return null

    return(
        <div className = 'btn-pg-container'>
            <div className = 'btn'><Btn url = '/catalog'/></div>
            <div className = 'pg'>
                <h1>Genres</h1>
                <ul className = 'total-list list-group'>
                    {post.map(genre =>
                        <li key = {genre.id} className = 'card total-card'>{genre.name}</li>
                        )}
                </ul>
            </div>
        </div>
    )
}