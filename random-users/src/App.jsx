import { useEffect, useState } from "react";

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("https://api.freeapi.app/api/v1/public/randomusers")
      .then(res => res.json())
      .then(data => {
        setUsers(data.data.data);
      });
  }, []);

 return (
  <>
    <h1>Random Users</h1>

    <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
      {users.map((u, index) => (
        <div key={index} style={{
          border: "1px solid gray",
          borderRadius: "10px",
          padding: "15px",
          margin: "10px",
          width: "220px",
          textAlign: "center",
          boxShadow: "0 2px 5px lightgray"
        }}>
          <img src={u.picture.large} style={{ borderRadius: "50%" }} />
          <h3>{u.name.first} {u.name.last}</h3>
          <p>{u.email}</p>
          <p>{u.location.city}</p>
        </div>
      ))}
    </div>
  </>
);
}
export default App;