import axios from 'axios'
import {useState, useEffect} from 'react'
import Btn from '../icons/btn'
import Status from '../icons/status'

export default function BookInstances(){
    const [post, setPost] = useState(null)

    useEffect(() => {
        let isMounted = true;

        axios.get('http://localhost:5000/catalog/bookinstances')
        .then(res => {if (isMounted) setPost(res.data)});

        return () => isMounted = false
    }, [post])

    if (!post) return null

    return(
        <div className = 'btn-pg-container'>
            <div className = 'btn'><Btn url = '/catalog'/></div>
            <div className = 'pg'>
                <h1>Book Instances</h1>
                <ul className = 'total-list list-group' >
                    {post.map(instance => 
                        <li className = 'card total-card' key = {instance.id}>
                            <span>
                                {instance.book.title}: {instance.imprint} - 
                            </span>
                            <span>
                                <Status stat = {instance.status}/>
                            </span>
                            <span>
                                {instance.status !== 'Available' ? `(Due: ${instance.due_back_formatted})` : ''}
                            </span>
                        </li>
                    )}
                </ul>
            </div>
        </div>
    )
}