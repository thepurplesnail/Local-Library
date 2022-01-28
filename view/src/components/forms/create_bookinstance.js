import './forms.css'
import Btn from '../icons/btn'
import axios from 'axios'
import {useState, useEffect} from 'react'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'

export default function CreateBookInstance(){
    const [books, setBooks] = useState(null),
          [book, setBook] = useState(null),
          [status, setStatus] = useState('');
    useEffect(()=> {
        let isMounted = true;
        axios.get('http://localhost:5000/catalog/books')
        .then(res => {if (isMounted) setBooks(res.data)});
        return () => isMounted = false;
    })

    if (!books) return <div className = 'btn-pg-container'>nothing to see here :( Give it some time!</div>

    return(
        <div className = 'btn-pg-container'>
            <div className = 'btn'><Btn url = '/catalog'/></div>
            <div>
                <h1>Create book instance</h1>
                <form>
                    <label className = 'label'>Book:</label>
                    <div>
                        <DropdownButton id="dropdown-item-button" title = {book ? book.title : '--select book--'}>
                            {books.map(book => 
                                <div onClick = {() => setBook(book)} key = {book.id}>
                                    <Dropdown.Item>{book.title}</Dropdown.Item>
                                </div>
                            )}
                        </DropdownButton>                        
                    </div>

                    
                    <label className = 'label'>Imprint:</label>
                    <div>
                        <input className = 'form-text text-dark' placeholder = 'Imprint'/>
                    </div>


                    <label className = 'label'>Date when book available:</label>
                    <div>
                        <input className = 'form-text text-dark' placeholder = 'Soonest available date'/>
                    </div>


                    <label className = 'label'>Status:</label>
                    <div>
                        <DropdownButton id="dropdown-item-button" title = {status ? status : '--select status--'}>
                            <Dropdown.Item onClick = {e => setStatus('Available')}>Available</Dropdown.Item>
                            <Dropdown.Item onClick = {e => setStatus('Loaned')}>Loaned</Dropdown.Item>
                            <Dropdown.Item onClick = {e => setStatus('Maintenance')}>Maintenance</Dropdown.Item>
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