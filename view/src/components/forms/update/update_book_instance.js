import '../forms.css'
import Btn from '../../icons/btn'
import axios from 'axios'
import {useState, useEffect} from 'react'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'
import {useParams} from 'react-router-dom'
import formatTime from '../formatTime'

export default function UpdateBookInstance(){
    const [books, setBooks] = useState(null),
          [book, setBook] = useState(null),
          [prior, setPrior] = useState(null),
          [status, setStatus] = useState(null),
          [imprint, setImprint] = useState(''),
          [due_back, setDue_Back] = useState(undefined),
          [loaded, setLoaded] = useState(false);
    
    const bkInstId = useParams().id;

    // GET all books that are in database
    useEffect(()=> {
        let isMounted = true;
        axios.get('http://localhost:5000/catalog/books')
        .then(res => {if (isMounted) setBooks(res.data)});
        return () => isMounted = false;
    }, [books])

    // GET prior info of bookinstance to be updated
    useEffect(() =>{
        let isMounted = true;
        axios.get(`http://localhost:5000/catalog/bookinstance/${bkInstId}`)
        .then(res => {
            if (isMounted) setPrior(res.data);
            if (!loaded && prior){
                setBook(prior.book);
                setStatus(prior.status);
                setImprint(prior.imprint);
                setDue_Back(formatTime(prior.due_back));
                setLoaded(true);
            }
        });
        return () => isMounted = false;
    }, [prior, bkInstId])

    // PUT updated book instance 
    let handleSubmit = e => {
        e.preventDefault();
        axios.put(`http://localhost:5000/catalog/bookinstance/${bkInstId}/update`, {
            bk: book,
            imprint: imprint,
            status: status,
            due_back: due_back
        }).then(res => {
            if (res.data.errors) alert(res.data.errors[0].msg);
            else alert(res.data);
            }
        );
    }

    
    if (!books) return <div className = 'btn-pg-container'>nothing to see here :( Give it some time!</div>

    return(
        <div className = 'btn-pg-container'>
            <div className = 'btn'><Btn url = {`/catalog/bookinstance/${bkInstId}`}/></div>
            <div>
                <h1>Update book instance</h1>
                <form onSubmit = {handleSubmit}>
                    <label className = 'label'>Book *</label>
                    <div>
                        <DropdownButton id="dropdown-item-button" title = {book ? book.title : '--select book--'}>
                            {books.map(book => 
                                <div onClick = {() => {setBook(book); console.log(book.title);}} key = {book.id}>
                                    <Dropdown.Item>{book.title}</Dropdown.Item>
                                </div>
                            )}
                        </DropdownButton>                        
                    </div>

                    
                    <label className = 'label'>Imprint *</label>
                    <div>
                        <input className = 'form-text text-dark' placeholder = 'Imprint' onChange = {e => setImprint(e.target.value)} value = {imprint}/>
                    </div>


                    <label className = 'label'>Date when book available</label>
                    <div>
                        <input className = 'form-text text-dark' placeholder = 'yyyy-mm-dd' onChange = {e => setDue_Back(e.target.value)} value = {due_back}/>
                    </div>


                    <label className = 'label'>Status *</label>
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