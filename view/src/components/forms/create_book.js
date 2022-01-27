import Btn from '../icons/btn'
import axios from 'axios'
import {useState, useEffect} from 'react'
import './forms.css'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'

export default function CreateBook(){
    //getting genres
    const [genres, setGenres] = useState(null);
    useEffect(() => {
        let isMounted = true;
        axios.get('http://localhost:5000/catalog/genres')
        .then(res => {if (isMounted) setGenres(res.data)});
        return () => isMounted = false;
    }, [genres])

    //getting authors
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
    const [genreId, setGenreId] = useState(null);
    const [genreIdList, setGenreIdList] = useState([]);

    let handleGenre = e => {
        if (e.currentTarget.checked){
            setGenreId(e.target.value);
            if (genreId){
                setGenreIdList(genreIdList.concat(genreId));
                //console.log('genre: ' + genreId);
                //console.log('genre[]: ' + genreIdList);
                //console.log(e.currentTarget.checked);
            }
        } else {
            setGenreIdList(genreIdList.filter(genreId => genreId !== e.target.value));
            //console.log('genre[]: ' + genreIdList);
        }
    }

    if (!genres) return <div className = 'btn-pg-container'>Nothing to see here :(</div>

    return(
        <div className = 'btn-pg-container'>
            <div className = 'btn'><Btn url = '/catalog'/></div>
            <div>
                <h1>Create book</h1>
                <form>
                    <label className = 'label'><strong>Title:</strong></label>
                    <div>
                        <input className = 'form-text text-dark' onChange = {e => {setTitle(e.target.value)}} placeholder = 'Title goes here'/>
                    </div>

                    <label className = 'label'><strong>Author:</strong></label>
                    <div>
                        <DropdownButton id="dropdown-item-button" title = {author ? author.full_name : '--Select author--'}>
                            {authors.map(author => 
                                <div onClick = {() => setAuthor(author)} key = {author.id}>
                                    <Dropdown.Item>{author.full_name}</Dropdown.Item>
                                </div>
                            )}
                        </DropdownButton>                        
                    </div>

                    <label className = 'label'><strong>Summary:</strong></label>
                    <div>
                        <textarea className = 'form-text text-dark' onChange = {e => setSummary(e.target.value)} style = {{height: '10vh', width: '60vw'}} placeholder = 'Summary goes here'/>
                    </div>

                    <label className = 'label'><strong>ISBN:</strong></label>
                    <div>
                        <input className = 'form-text text-dark' onChange = {e => setIsbn(e.target.value)} placeholder = 'ISBN goes here'/>
                    </div>

                    <label className = 'label'><strong>Genres:</strong></label>
                    <div className = 'checkboxes-ctnr'>
                        {genres.map(genre => 
                            <div className="form-check" key = {genre.id}>
                                <input className="form-check-input" type="checkbox" value = {genre.id} onChange = {handleGenre} id="flexCheckDefault"/>
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