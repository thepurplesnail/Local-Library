import { Navigate, Link, useNavigate } from 'react-router-dom'

export default function Btn(){
    const navigate = useNavigate();
    return(
        <div className = "backArrow" onClick={() => navigate('/catalog/books')} style = {{maxWidth:"1em"}}>
            <svg xmlns="http://www.w3.org/2000/svg" width = "20" height = "20" fill="currentColor" class="bi bi-arrow-left-square-fill" viewBox="0 0 16 16" style = {{display: 'flex', marginLeft: 'auto', marginRight: 'auto'}}>
                <path d="M16 14a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12zm-4.5-6.5H5.707l2.147-2.146a.5.5 0 1 0-.708-.708l-3 3a.5.5 0 0 0 0 .708l3 3a.5.5 0 0 0 .708-.708L5.707 8.5H11.5a.5.5 0 0 0 0-1z"/>
            </svg>
        </div>
    );
}