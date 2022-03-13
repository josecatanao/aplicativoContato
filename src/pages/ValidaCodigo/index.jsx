import React from "react";
import { useForm } from "react-hook-form";
import axios from 'axios';
import "./index.css"
import logo from '../logo.png'
var email = window.localStorage.getItem("emailValida")

function ValidaCodigo() {

  const { register, handleSubmit } = useForm();

  const onSubmit = (e) => {
    console.log(e)
    let valores = [e.codigo]
    if (valores.includes("")) {
      alert("possui campo vazio")
    } else {
      axios.post("https://miniprojetoaapi.herokuapp.com/validacodigo", e)
        .then(response => {
          alert(JSON.stringify(response.data.message))
          if (response.data.message !== "Esse codigo não existe") {
            window.location.href = '/';
          }else{
            window.location.href = '/validarcodigo';
          }
        })
        .catch(error => console.error(error));
    }
  }

  return (
    <div className="body-form">
      <div id="bloco-form-validar">
      <img src={logo} />
        <form onSubmit={handleSubmit(onSubmit)}>
          <label>Digite seu código</label>
          <input type="text" placeholder="Digite seu código" {...register("codigo")} />
          <button type="submit">Validar código</button>
          <span>O código foi enviado um código para o E-mail:{email}</span>
        </form>
      </div>
    </div>
  )
}

export default ValidaCodigo;