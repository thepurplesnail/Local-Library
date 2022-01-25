import Btn from '../icons/btn'
import {useState} from 'react'
import axios from 'axios'


export default function CreateAuthor(){
    const[first, setFirst] = useState('');
    const[last, setLast] = useState('');
    const[DoB, setDoB] = useState('');
    const[DoD, setDoD] = useState('');

    const handleChangeFirst = e => setFirst(e.target.value);
    const handleChangeLast = e => setLast(e.target.value);
    const handleChangeDoB = e => setDoB(e.target.value);
    const handleChangeDoD = e => setDoD(e.target.value);
    
    const handleSubmit = e => {
        e.preventDefault();
        axios.post('http://localhost:5000/catalog/author/create', 
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
        setFirst('');
        setLast('');
        setDoB('');
        setDoD('');
    }

    return(
        <div className="btn-pg-container">
            <div className = 'btn'><Btn url = '/catalog'/></div>
            <div>
                <h1>Create author</h1>
                <form onSubmit={handleSubmit}>
                    <div className = 'label'>
                        <label><strong>First name:</strong></label>
                    </div>
                    <div>
                        <input className = 'form-text text-dark' onChange = {handleChangeFirst} placeholder = 'First name goes here' value = {first}/>
                    </div>


                    <div className = 'label'>
                        <label><strong>Family name:</strong></label>
                    </div>
                    <div>
                        <input className = 'form-text text-dark' onChange = {handleChangeLast} placeholder = 'Last name goes here' value = {last}/>
                    </div>


                    <div className = 'label'>
                        <label><strong>Date of birth:</strong></label>
                    </div>
                    <div>
                        <input className = 'form-text text-dark' onChange = {handleChangeDoB} placeholder = 'yyyy-mm-dd' value = {DoB}/>
                    </div>


                    <div className = 'label'>
                        <label><strong>Date of death:</strong></label>
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