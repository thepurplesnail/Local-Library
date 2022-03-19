import Btn from '../../icons/btn'
import {useState, useEffect} from 'react'
import axios from 'axios'
import '../forms.css'
import { useParams } from 'react-router-dom'

export default function UpdateGenre(){
    const[genreName, setGenreName] = useState('');
    const[loaded, setLoaded] = useState(false);
    const[prior, setPrior] = useState(null);

    const id = useParams().id;

    let handleChange = (e) => {
        setGenreName(e.target.value);
    }

    // GET prior genre info
    useEffect(() => {
        let isMounted = true;
        axios.get(`http://localhost:5000/catalog/genre/${id}`)
        .then(res => { 
            if (isMounted) setPrior(res.data) 
            if (prior && !loaded){
                setGenreName(prior.name);
                setLoaded(true);
            }
        })

        return () => isMounted = false
      }, [prior, id])

    // PUT updated genre
    let handleSubmit = async (e) => {
        e.preventDefault();
        axios.put(`http://localhost:5000/catalog/genre/${id}/update`, {name: genreName})
        .then(res => {
            if (res.data.errors) alert(res.data.errors[0].msg);
            else alert(res.data);
            console.log(res);
        }).catch(console.log);
    }

    return(
        <div className = 'btn-pg-container'>
            <div className = 'btn'><Btn url = '/catalog'/></div>
            <div>
                <h1>Update genre</h1>
                <form onSubmit = {handleSubmit}>
                    <div className = 'label'>
                        <label className = 'form-label'>
                            Genre:
                        </label>
                    </div>
                    <div className='input'>
                        <input className = 'form-text text-dark' onChange = {handleChange} placeholder='Enter genre here' value = {genreName}/>
                    </div>
                    <div className = 'submit-btn'>
                        <button type = 'Submit' className = 'btn' style = {{backgroundColor: 'mediumslateblue', color: 'white'}}>Submit</button>
                    </div>
                </form>
            </div>
        </div>
    );
}