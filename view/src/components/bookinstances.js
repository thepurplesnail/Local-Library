import axios from 'axios'
import {useState, useEffect} from 'react'
import Btn from './icons/btn'
import Status from './icons/status'

export default function BookInstances(){
    const [post, setPost] = useState(null)

    useEffect(() => {
        let isMounted = true;

        axios.get('http://localhost:5000/catalog/bookinstances')
        .then(res => {if (isMounted) setPost(res.data)});

        return () => isMounted = false
    }, [post])

    if (!post) return null
    else console.log(post)

    return(
        <div className = 'btn-pg-container'>
            <div style = {{padding: '1rem'}}><Btn url = '/catalog'/></div>
            <div style = {{padding: '.2rem'}}>
                <h1>Book Instances</h1>
                <ul className = 'total-list list-group' >
                    {post.map(instance => 
                        <li className = 'card total-card' key = {instance.id}>
                            <text>
                                {instance.book.title}: {instance.imprint} - <Status stat = {instance.status}/>
                                {instance.status !== 'Available' ? `(Due: ${instance.due_back})` : ''}
                            </text>
                        </li>
                    )}
                </ul>
            </div>
        </div>
    )
}