
export default function Status (props) {
    return(
        <text className = {props.stat === 'Available' ? 'bg-success' : props.stat === 'Maintenance' ? 'bg-danger' : 'bg-warning'} 
            style = {{width: 'fit-content', 
                    paddingLeft: '.5rem', paddingRight: '.5rem', 
                    borderRadius: '10px', textAlign: 'center', color: 'white'
                }}
        >
                {props.stat}
        </text>
    )
}