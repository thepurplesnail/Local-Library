import {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import Btn from '../icons/btn'
export default function Authors(){
    const [post, setPost] = useState(null)

    useEffect(() => {
        let isMounted = true;
        axios.get('http://localhost:5000/catalog/authors')
        .then( res => {if (isMounted) setPost(res.data)} );
        return () => (isMounted = false);
    }, [post])

    if (!post) return null;
    else console.log(post);

    return(
        <div className = 'btn-pg-container'>
            <div className = 'btn'><Btn url = '/catalog'/></div>
            <div className = 'pg'>
                <h1>Authors</h1>
                <ul className = 'total-list list-group'>
                    {post.map(author => 
                        <li key={author.id} className = 'card total-card'>
                            <text>
                                <Link to = {`/catalog/author/${author.id}`} className = 'text-decoration-none'>
                                    {author.family_name}, {author.first_name}
                                </Link> ({author.date_of_birth_formatted} - {author.date_of_death_formatted})
                            </text>
                        </li>
                        )}
                </ul>
            </div>
        </div>
    )
}