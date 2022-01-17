export default function Welcome() {
    return(
        <main style={{ padding: "1rem"}}>
          <div>
            <h1>Local Library Home</h1> 
            <p>Welome to <em>LocalLibrary,</em> a very simple website built from Express and React!</p>
          </div>
          <div style = {{marginTop: "1.5rem" }}>
            <h1>Dynamic Content</h1>
            <p>Here are all the records kept: </p>
            <ul>
              <li><strong>Books:</strong></li>
              <li><strong>Copies:</strong></li>
              <li><strong>Copies Available:</strong></li>
              <li><strong>Authors:</strong></li>
              <li><strong>Genres:</strong></li>
            </ul>
          </div>
        </main>
    );
}