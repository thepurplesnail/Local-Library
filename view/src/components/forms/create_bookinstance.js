import './forms.css'
import Btn from '../icons/btn'
import axios from 'axios'
import {useState, useEffect} from 'react'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'

export default function CreateBookInstance(){
    const [books, setBooks] = useState(null),
          [book, setBook] = useState(null),
          [status, setStatus] = useState(null),
          [imprint, setImprint] = useState(''),
          [due_back, setDue_Back] = useState(null);
    
    useEffect(()=> {
        let isMounted = true;
        axios.get('http://localhost:5000/catalog/books')
        .then(res => {if (isMounted) setBooks(res.data)});
        return () => isMounted = false;
    })

    let handleSubmit = e => {
        e.preventDefault();
        axios.post('http://localhost:5000/catalog/bookinstance/create', {
            bk: book,
            imprint: imprint,
            status: status,
            due_back: due_back
        }).then(res => {
            if (res.data.errors) alert(res.data.errors[0].msg);
            else alert(res.data);
            }
        );
        setBook(null);
        setStatus(null);
        setImprint('');
        setDue_Back('');
    }

    
    if (!books) return <div className = 'btn-pg-container'>nothing to see here :( Give it some time!</div>

    return(
        <div className = 'btn-pg-container'>
            <div className = 'btn'><Btn url = '/catalog'/></div>
            <div>
                <h1>Create book instance</h1>
                <form onSubmit = {handleSubmit}>
                    <label className = 'label'>Book *:</label>
                    <div>
                        <DropdownButton id="dropdown-item-button" title = {book ? book.title : '--select book--'}>
                            {books.map(book => 
                                <div onClick = {() => {setBook(book); console.log(book.title);}} key = {book.id}>
                                    <Dropdown.Item>{book.title}</Dropdown.Item>
                                </div>
                            )}
                        </DropdownButton>                        
                    </div>

                    
                    <label className = 'label'>Imprint *:</label>
                    <div>
                        <input className = 'form-text text-dark' placeholder = 'Imprint' onChange = {e => setImprint(e.target.value)} value = {imprint}/>
                    </div>


                    <label className = 'label'>Date when book available:</label>
                    <div>
                        <input className = 'form-text text-dark' placeholder = 'yyyy-mmm-dd' onChange = {e => setDue_Back(e.target.value)} value = {due_back}/>
                    </div>


                    <label className = 'label'>Status *:</label>
                    <div>
                        <DropdownButton id="dropdown-item-button" title = {status ? status : '--select status--'}>
                            <Dropdown.Item onClick = {() => setStatus('Available')}>Available</Dropdown.Item>
                            <Dropdown.Item onClick = {() => setStatus('Loaned')}>Loaned</Dropdown.Item>
                            <Dropdown.Item onClick = {() => setStatus('Maintenance')}>Maintenance</Dropdown.Item>
                        </DropdownButton>                        
                    </div>


                    <div className = 'submit-btn'>
                        <button type = 'Submit' className = 'btn' style = {{backgroundColor: 'mediumslateblue', color: 'white'}}>Submit</button>
                    </div>  

                </form>
            </div>
            
        </div>
    );
}