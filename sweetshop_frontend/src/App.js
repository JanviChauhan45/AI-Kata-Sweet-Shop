import logo from './logo.svg';
import './App.css';
import {useState,useEffect} from 'react';
import axios from "axios";

function App() {

  const[users,setUsers] = useState([])

   useEffect(() => {
    async function getAllUser() {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/user/");
        console.log(response.data);
        setUsers(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    getAllUser();
  }, []);

  return (
    <div className="App">
      <h1>Connect React JS to Django</h1>
      {
        users.map((user, i) => (
          <h2 key={i}>
            {user.name} | {user.email} | {user.role} | {user.created_at}
          </h2>
        ))
      }
    </div>
  );
}

export default App;
