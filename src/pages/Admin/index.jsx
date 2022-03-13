import React, { useState, useEffect } from "react";
import axios from 'axios';
import "./index.css"
import logo from '../logo.png'

const getItems = () => axios.get("https://miniprojetoaapi.herokuapp.com/").then(response => response.data)

function Admin() {
  const [user, setUser] = useState();
  const [atualizou, setAtualizou] = useState(true);

  function deleteUser(id) {
    axios.delete(`https://miniprojetoaapi.herokuapp.com/${id}`)
      .then(response => {
         if (atualizou) setAtualizou(false)
         if (atualizou === false) setAtualizou(true)
      })
  }

  function editar(id,nome,email,senha){
    window.localStorage.setItem("id",id);
    window.localStorage.setItem("nome",nome);
    window.localStorage.setItem("email",email);
    window.localStorage.setItem("senha",senha);
    window.location.href ='/editar';
  }


  useEffect(() => {
    getItems().then(data => setUser(data));
  }, [atualizou]);

  let itemsToRender;
  if (user) {
    itemsToRender = user.map((item, key) => {
      return (
        <tr key={key}>
          <td>{item.name}</td>
          <td>{item.email}</td>
          <td>{item.password}</td>
          <td>
            <button className="editar" onClick={() => { editar(item.id,item.name,item.email,item.password ) }} >editar</button>
            <button className="apagar" onClick={() => { deleteUser(item.id) }}>excluir</button>
          </td>
        </tr>
      )
    });
  }

  



  return (
    <div className="body-form">
       <div className="bloco-tabela">
       <img src={logo}/>
       <h1>Olá Admin</h1>
       <table className="tabela-dados">
        <thead>
          <tr>
            <th>User</th>
            <th>Email</th>
            <th>Password</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {itemsToRender}
        </tbody>
      </table>
    </div>
    </div>
  )
}

export default Admin;
