import Btn from '../icons/btn'
import axios from 'axios'
import {useState, useEffect} from 'react'
import './forms.css'

export default function CreateBook(){
    const [genres, setGenres] = useState(null);
    useEffect(() => {
        let isMounted = true;
        axios.get('http://localhost:5000/catalog/genres')
        .then(res => {if (isMounted) setGenres(res.data)});
        return () => isMounted = false;
    }, [genres])

    if (!genres) return <div className = 'btn-pg-container'>Nothing to see here :(</div>

    return(
        <div className = 'btn-pg-container'>
            <div className = 'btn'><Btn/></div>
            <div>
                <h1>Create book</h1>
                <form>
                    <label className = 'label'><strong>Title:</strong></label>
                    <div>
                        <input className = 'form-text text-dark' placeholder = 'Title goes here'/>
                    </div>

                    <label className = 'label'><strong>Author:</strong></label>
                    <div>
                        <input className = 'form-text text-dark' placeholder = 'Author name goes here'/>
                    </div>

                    <label className = 'label'><strong>Summary:</strong></label>
                    <div>
                        <input className = 'form-text text-dark' placeholder = 'Summary goes here'/>
                    </div>

                    <label className = 'label'><strong>ISBN:</strong></label>
                    <div>
                        <input className = 'form-text text-dark' placeholder = 'ISBN goes here'/>
                    </div>
            
                    <div className = 'checkboxes-ctnr'>
                        {genres.map(genre => 
                            <div className="form-check" >
                                <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault"/>
                                <label className="form-check-label" for="flexCheckDefault">
                                    {genre.name}
                                </label>
                            </div>
                        )}
                    </div>

                </form>
            </div>
        </div>
    );
}