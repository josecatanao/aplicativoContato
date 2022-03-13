import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from 'axios';
import "./index.css"
import logo from '../logo.png'

var IdA = window.localStorage.getItem("idParan")
var nomeA = window.localStorage.getItem("nomeParan")

const getItems = () => axios.get(`https://miniprojetoaapi.herokuapp.com/contact/listaUm/${IdA}`).then(response => response.data)

function User() {
  const [contacts, setContacts] = useState();
  const [atualizou, setAtualizou] = useState(true);
  const { register, handleSubmit } = useForm();


  useEffect(() => {
    getItems().then(data => setContacts(data));
  }, [atualizou]);

  const onSubmit = (e) => {
    let form = [e.name, e.contact]
    let valores = {
      idUser: IdA,
      name: e.name,
      contact: e.contact
    };
    if (form.includes("")) {
      alert("possui campo vazio")
    } else {

      axios.post(`https://miniprojetoaapi.herokuapp.com/contact/cadastro`, valores)
        .then(response => {
          alert(JSON.stringify(response.data))
          if (atualizou) setAtualizou(false)
          if (atualizou === false) setAtualizou(true)
        })
        .catch(error => console.error(error));
      console.log(atualizou)
    }

  }

  function deleteUser(id) {
    axios.delete(`https://miniprojetoaapi.herokuapp.com/contact/apaga/${id}`)
      .then(response => {
        if (atualizou) setAtualizou(false)
        if (atualizou === false) setAtualizou(true)
      })
  }

  function editar(id, nome, contato) {
    window.localStorage.setItem("id", id);
    window.localStorage.setItem("nome", nome);
    window.localStorage.setItem("contato", contato);
    window.location.href = '/editarContact';
  }


  let itemsToRender;
  if (contacts) {
    itemsToRender = contacts.map((item, key) => {
      return (
        <tr key={key}>
          <td>{item.name}</td>
          <td>{item.contact}</td>
          <td>
            <button className="editar" onClick={() => { editar(item.id, item.name, item.contact) }}>editar</button>
            <button className="apagar" onClick={() => { deleteUser(item.id) }}>excluir</button>
          </td>
        </tr>
      )
    });
  }

  return (
    <div className="body-form">
     <div className="bloco-cria-contato">
     <img src={logo}/>
        <h1>Olá {nomeA}</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input type="text" placeholder="Nome do contato" {...register("name")} />
          <input type="text"  placeholder="Número do contato" {...register("contact")} />
          <button className="salvar"  type="submit">Salvar</button>
        </form>
      </div>

      <div className="bloco-tabela">
        <table className="tabela-dados">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Contato</th>
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

export default User;
