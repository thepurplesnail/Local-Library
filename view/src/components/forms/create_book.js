import Btn from '../icons/btn'
import axios from 'axios'
import {useState, useEffect} from 'react'
import './forms.css'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'

export default function CreateBook(){
    //GET all genres
    const [genres, setGenres] = useState(null);
    useEffect(() => {
        let isMounted = true;
        axios.get('http://localhost:5000/catalog/genres')
        .then(res => {if (isMounted) setGenres(res.data)});
        return () => isMounted = false;
    }, [genres])

    //GET all authors
    const [authors, setAuthors] = useState(null);
    useEffect(() => {
        let isMounted = true;
        axios.get('http://localhost:5000/catalog/authors')
        .then(res => {if (isMounted) setAuthors(res.data)});
        return () => isMounted = false;
    }, [authors]);

    const [title, setTitle] = useState('');
    const [summary, setSummary] = useState('');
    const [author, setAuthor] = useState('');
    const [isbn, setIsbn] = useState('');
    const [genreIdList, setGenreIdList] = useState([]);
    const [checked, setChecked] = useState(genres ? new Array(genres.length).fill(false) : new Array(5).fill(false))

    // adds/removes genreId from genreIdList when box is checked/unchecked
    let handleGenre = (e, pos) => {
        const updatedCheckedState = checked.map((item, index) =>
            index === pos ? !item : item
        );
        setChecked(updatedCheckedState);

        if (e.currentTarget.checked){
            if (e.currentTarget.value){
                setGenreIdList(genreIdList.concat(e.currentTarget.value));
                console.log('genre: ' + e.currentTarget.value);
                console.log('genre[]: ' + genreIdList);
                console.log(e.currentTarget.checked);
            }
        } else {
            setGenreIdList(genreIdList.filter(genreId => genreId !== e.currentTarget.value));
            console.log('genre[]: ' + genreIdList);
        }
    }

    // make POST request
    let handleSubmit = e => {
        e.preventDefault();
        axios.post('http://localhost:5000/catalog/book/create', {
            title: title,
            summary: summary,
            author: author,
            isbn: isbn,
            genreIdList: genreIdList
        })
        .then(res => {
            if (res.data.errors) alert(res.data.errors[0].msg);
            else alert(res.data);
            }
        );
        setTitle('');
        setSummary('');
        setAuthor(null);
        setIsbn('');
        setGenreIdList([]);
        setChecked(new Array(genres.length).fill(false));
    }

    if (!genres || !authors) return <div className = 'btn-pg-container'>Nothing to see here :( Give it some time </div>

    return(
        <div className = 'btn-pg-container'>
            <div className = 'btn'><Btn url = '/catalog'/></div>
            <div>
                <h1>Create book</h1>
                <form onSubmit = {handleSubmit}>
                    <label className = 'label'>Title *</label>
                    <div>
                        <input className = 'form-text text-dark' onChange = {e => {setTitle(e.target.value)}} placeholder = 'Title goes here' value = {title}/>
                    </div>

                    <label className = 'label'>Author *</label>
                    <div>
                        <DropdownButton id="dropdown-item-button" title = {author ? author.full_name : '--Select author--'}>
                            {authors.map(author => 
                                <div onClick = {() => setAuthor(author)} key = {author.id}>
                                    <Dropdown.Item>{author.full_name}</Dropdown.Item>
                                </div>
                            )}
                        </DropdownButton>                        
                    </div>

                    <label className = 'label'>Summary *</label>
                    <div>
                        <textarea className = 'form-text text-dark' onChange = {e => setSummary(e.target.value)} style = {{height: '10vh', width: '60vw'}} value = {summary} placeholder = 'Summary goes here'/>
                    </div>

                    <label className = 'label'>ISBN *</label>
                    <div>
                        <input className = 'form-text text-dark' onChange = {e => setIsbn(e.target.value)} placeholder = 'ISBN goes here' value = {isbn}/>
                    </div>

                    <label className = 'label'>Genres</label>
                    <div className = 'checkboxes-ctnr'>
                        {genres.map((genre, index) => 
                            <div className="form-check" key = {genre.id}>
                                <input className="form-check-input" type="checkbox" value = {genre.id} onChange = {e => handleGenre(e, index)} checked = {checked[index]}/>
                                <label className="form-check-label">
                                    {genre.name}
                                </label>
                            </div>
                        )}
                    </div>

                    <div className = 'submit-btn'>
                            <button type = 'Submit' className = 'btn' style = {{backgroundColor: 'mediumslateblue', color: 'white'}}>Submit</button>
                    </div>                    
                </form>
                
            </div>
        </div>
    );
}