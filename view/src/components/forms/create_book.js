import Btn from '../icons/btn'
import axios from 'axios'
import {useState, useEffect} from 'react'
import './forms.css'

export default function CreateBook(){
    //getting genres
    const [genres, setGenres] = useState(null);
    useEffect(() => {
        let isMounted = true;
        axios.get('http://localhost:5000/catalog/genres')
        .then(res => {if (isMounted) setGenres(res.data)});
        return () => isMounted = false;
    }, [genres])

    const [title, setTitle] = useState('');
    const [summary, setSummary] = useState('');
    const [author, setAuthor] = useState('');
    const [isbn, setIsbn] = useState('');
    const [genre, setGenre] = useState(null);
    const [genreList, setGenreList] = useState([]);

    let handleGenre = e => {
        if (e.currentTarget.checked){
            setGenre(e.target.value);
            if (genre){
                setGenreList(genreList.concat(genre));
                console.log('genre: ' + genre);
                console.log('genre[]: ' + genreList);
                console.log(e.currentTarget.checked);}
        } else {
            setGenreList(genreList.filter(genreObj => genreObj !== e.target.value));
            console.log('genre[]: ' + genreList);
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
                        <input className = 'form-text text-dark' onChange = {e => {setTitle(e.target.value); console.log(title);}} placeholder = 'Title goes here'/>
                    </div>

                    <label className = 'label'><strong>Author:</strong></label>
                    <div>
                        <input className = 'form-text text-dark' onChange = {e => setAuthor(e.target.value)} placeholder = 'Author name goes here'/>
                    </div>

                    <label className = 'label'><strong>Summary:</strong></label>
                    <div>
                        <input className = 'form-text text-dark' onChange = {e => setSummary(e.target.value)} placeholder = 'Summary goes here'/>
                    </div>

                    <label className = 'label'><strong>ISBN:</strong></label>
                    <div>
                        <input className = 'form-text text-dark' onChange = {e => setIsbn(e.target.value)} placeholder = 'ISBN goes here'/>
                    </div>

                    <label className = 'label'><strong>Genres:</strong></label>
                    <div className = 'checkboxes-ctnr'>
                        {genres.map(obj => 
                            <div className="form-check" key = {obj.id}>
                                <input className="form-check-input" type="checkbox" value = {obj.name} onChange = {handleGenre} id="flexCheckDefault"/>
                                <label className="form-check-label">
                                    {obj.name}
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