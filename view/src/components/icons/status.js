
export default function Status (props) {
    return(
        <div className = {props.stat === 'Available' ? 'bg-success' : props.stat === 'Maintenance' ? 'bg-danger' : 'bg-warning'} 
            style = {{width: 'fit-content', 
                    paddingLeft: '.5rem', paddingRight: '.5rem', 
                    borderRadius: '10px', textAlign: 'center'
                }}
        >
            <text style = {{color: 'white'}}>
                {props.stat}
            </text>
        </div>
    )
}