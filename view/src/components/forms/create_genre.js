import Btn from '../icons/btn'
import {useState} from 'react'
import axios from 'axios'

export default function CreateGenre(){
    const[post, setPost] = useState('');
    const[msg, setMsg] = useState(null);

    let handleChange = (e) => {
        setPost(e.target.value);
    }
    let handleSubmit = async (e) => {
        e.preventDefault();
        axios.post('http://localhost:5000/catalog/genre/create', {name: post})
        .then(res => {
            if (res.data.errors) alert(res.data.errors[0].msg);
            else alert(res.data);
        });
        setPost('');
    }

    return(
        <div className = 'btn-pg-container'>
            <div className = 'btn'><Btn url = '/catalog'/></div>
            <div>
                <h1>Create genre</h1>
                <form onSubmit = {handleSubmit}>
                    <div className = 'label'>
                        <label className = 'form-label'>
                            <strong>Genre:</strong>
                        </label>
                    </div>
                    <div className='input'>
                        <input className = 'form-text' onChange = {handleChange} placeholder='Enter genre here' value = {post}/>
                    </div>
                    <div className = 'submit-btn'>
                        <button type = 'Submit' className = 'btn' style = {{backgroundColor: 'mediumslateblue', color: 'white'}}>Submit</button>
                    </div>
                </form>
            </div>
        </div>
    );
}