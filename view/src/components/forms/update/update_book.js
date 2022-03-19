import Btn from '../../icons/btn'
import axios from 'axios'
import {useState, useEffect} from 'react'
import '../forms.css'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'
import { useParams } from 'react-router-dom'

export default function UpdateBook(){
    //GET all genres
    const [genres, setGenres] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const [checked, setChecked] = useState(new Map());

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
    
    //GET book detail info
    const infoId = useParams().id;
    const [info, setInfo] = useState(null);
    useEffect(() => {
        let isMounted = true;
        axios.get(`http://localhost:5000/catalog/book/${infoId}`)
        .then(res => {
            if (isMounted) setInfo(res.data);
            if (info && !loaded) {
                setTitle(info.book.title);
                setSummary(info.book.summary);
                setAuthor(info.book.author);
                setIsbn(info.book.isbn);
                setGenreIdList(info.book.genres.map(g => g.id));
                for (let g of info.book.genres){
                    let firstChecked = checked.set(g.id, true);
                    setChecked(firstChecked);
                } 
                setLoaded(true);
            }
        });
        return () => isMounted = false;
    }, [info, checked, loaded]);

    // adds/removes genreId from genreIdList when box is checked/unchecked
    let handleGenre = (e, id) => {
        const updatedCheckedState = checked.set(id,checked.get(id) ? false : true);
        setChecked(updatedCheckedState);
        
        if (e.currentTarget.checked){
            setGenreIdList(genreIdList.concat(e.currentTarget.value));
            console.log('genre: ' + e.currentTarget.value);
            console.log('genre[]: ' + genreIdList);
        } else {
            console.log('VAL: ' + e.currentTarget.value);
            setGenreIdList(genreIdList.filter(genreId => genreId != e.currentTarget.value));
            console.log('genre[]: ' + genreIdList);
        } 
    }

    // make PUT request
    let handleSubmit = e => {
        e.preventDefault();
        axios.put(`http://localhost:5000/catalog/book/${infoId}/update`, {
            title: String(title),
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
    }

    if (!genres || !authors || !info) return <div className = 'btn-pg-container'>Nothing to see here :( Give it some time </div>

    return(
        <div className = 'btn-pg-container'>
            <div className = 'btn'><Btn url = {`/catalog/book/${infoId}`}/></div>
            <div>
                <h1>Update book</h1>
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
                        {genres.map(genre => 
                            <div className="form-check" key = {genre.id}>
                                <input className="form-check-input" type="checkbox" value = {genre.id} onChange = {e => handleGenre(e, genre.id)} checked = {checked.get(genre.id)}/>
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