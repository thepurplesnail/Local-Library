import './forms.css'
import Btn from '../icons/btn'
import axios from 'axios'
import {useState, useEffect} from 'react'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'

export default function CreateBookInstance(){
    const [books, setBooks] = useState(null),
          [book, setBook] = useState(null);
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
                        <DropdownButton id="dropdown-item-button" title = {book ? book.title : '--Select book--'}>
                            {books.map(book => 
                                <div onClick = {() => setBook(book)} key = {book.id}>
                                    <Dropdown.Item>{book.title}</Dropdown.Item>
                                </div>
                            )}
                        </DropdownButton>                        
                    </div>
                    <label className = 'label'>Imprint:</label>

                </form>
            </div>
            
        </div>
    );
}