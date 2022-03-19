import Btn from '../../icons/btn'
import {useEffect, useState} from 'react'
import axios from 'axios'
import '../forms.css'
import { useParams } from 'react-router-dom'
import formatTime from '../formatTime'

export default function UpdateAuthor(){
    const[first, setFirst] = useState('');
    const[last, setLast] = useState('');
    const[DoB, setDoB] = useState('');
    const[DoD, setDoD] = useState('');
    const[prior, setPrior] = useState(null);
    const[loaded, setLoaded] = useState(false);

    const handleChangeFirst = e => setFirst(e.target.value);
    const handleChangeLast = e => setLast(e.target.value);
    const handleChangeDoB = e => setDoB(e.target.value);
    const handleChangeDoD = e => setDoD(e.target.value);
    
    const id = useParams().id;

    //GET prior author info
    useEffect(() => {
        let isMounted = true;
        axios.get(`http://localhost:5000/catalog/author/${id}`)
        .then(res => {
            if (isMounted) setPrior(res.data);
            if (prior && !loaded) {
                // set fields initially to prior author data fields
                setFirst(prior.first_name);
                setLast(prior.family_name);
                if(prior.date_of_birth) setDoB(formatTime(prior.date_of_birth));
                if(prior.date_of_death) setDoD(formatTime(prior.date_of_death));

                setLoaded(true);
            }
        });
        return () => isMounted = false;
    }, [prior]);

    // PUT updated author on submit
    const handleSubmit = e => {
        e.preventDefault();
        console.log('AUTHOR FIRST NAME: ' + first);
        console.log('DOB: ' + DoB);
        axios.put(`http://localhost:5000/catalog/author/${id}/update`, 
        {
            first_name : first,
            family_name: last,
            date_of_birth: DoB, 
            date_of_death: DoD
        })
        .then(res => {
            if (res.data.errors) alert(res.data.errors[0].msg);
            else alert(res.data);
        });
        
    }

    return(
        <div className="btn-pg-container">
            <div className = 'btn'><Btn url = {`/catalog/author/${id}`}/></div>
            <div>
                <h1>Update author</h1>
                <form onSubmit={handleSubmit}>
                    <div className = 'label'>
                        <label>First name *</label>
                    </div>
                    <div>
                        <input className = 'form-text text-dark' onChange = {handleChangeFirst} placeholder = 'First name goes here' value = {first}/>
                    </div>


                    <div className = 'label'>
                        <label>Family name *</label>
                    </div>
                    <div>
                        <input className = 'form-text text-dark' onChange = {handleChangeLast} placeholder = 'Last name goes here' value = {last}/>
                    </div>


                    <div className = 'label'>
                        <label>Date of birth:</label>
                    </div>
                    <div>
                        <input className = 'form-text text-dark' onChange = {handleChangeDoB} placeholder = 'yyyy-mm-dd' value = {DoB}/>
                    </div>


                    <div className = 'label'>
                        <label>Date of death:</label>
                    </div>
                    <div>
                        <input className = 'form-text text-dark' onChange = {handleChangeDoD} placeholder = 'yyyy-mm-dd' value = {DoD}/>
                    </div>


                    <div className = 'submit-btn'>
                        <button type = 'Submit' className = 'btn' style = {{backgroundColor: 'mediumslateblue', color: 'white'}}>Submit</button>
                    </div>
                </form>
            </div>
        </div>
        
    );
}