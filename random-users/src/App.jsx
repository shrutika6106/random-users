
import { useEffect, useState } from "react";

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dark, setDark] = useState(false);

  const getUsers = () => {
    setLoading(true);

    fetch("https://api.freeapi.app/api/v1/public/randomusers")
      .then(res => res.json())
      .then(data => {
        setUsers(data.data.data);
        setLoading(false);
      })
      .catch(() => {
        alert("Error fetching data");
        setLoading(false);
      });
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div style={{
      background: dark
        ? "linear-gradient(135deg, #1f1c2c, #928dab)"
        : "linear-gradient(135deg, #74ebd5, #acb6e5)",
      color: dark ? "white" : "black",
      minHeight: "100vh",
      padding: "20px"
    }}>

      <h1 style={{ textAlign: "center" }}>Random User Directory</h1>

      <div style={{ textAlign: "center", marginBottom: "10px" }}>
        <button onClick={() => setDark(!dark)} style={{
          padding: "8px 15px",
          borderRadius: "8px",
          border: "none",
          cursor: "pointer",
          marginRight: "10px"
        }}>
          {dark ? "Light Mode" : "Dark Mode"}
        </button>

        <button onClick={getUsers} style={{
          padding: "10px 20px",
          borderRadius: "8px",
          border: "none",
          backgroundColor: "black",
          color: "white",
          cursor: "pointer"
        }}>
          Load New Users
        </button>
      </div>

      {loading && <p style={{ textAlign: "center" }}>Loading...</p>}

      <div style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center"
      }}>
        {users.map((u, index) => (
          <div
            key={index}
            style={{
              backgroundColor: dark ? "#1e1e1e" : "white",
              color: dark ? "white" : "black",
              borderRadius: "12px",
              padding: "20px",
              margin: "12px",
              width: "240px",
              textAlign: "center",
              boxShadow: dark
                ? "0 4px 15px rgba(0,0,0,0.6)"
                : "0 4px 15px rgba(0,0,0,0.2)",
              transition: "transform 0.2s"
            }}
            onMouseOver={(e) => e.currentTarget.style.transform = "scale(1.05)"}
            onMouseOut={(e) => e.currentTarget.style.transform = "scale(1)"}
          >
            <img
              src={u.picture.large}
              style={{
                borderRadius: "50%",
                width: "100px",
                height: "100px"
              }}
            />

            <h3>{u.name.first} {u.name.last}</h3>

            <p>{u.email}</p>
            <p>{u.phone}</p>
            <p>{u.location.city}, {u.location.country}</p>
            <p>{u.gender}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
