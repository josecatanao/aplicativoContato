import React from "react";
import { useForm } from "react-hook-form";
import axios from 'axios';
import "./index.css";
import logo from '../logo.png'




function Login() {

  const { register, handleSubmit } = useForm();

  const onSubmit = (e) => {
    console.log(e)
    let valores = [e.name, e.email, e.password]
    if (valores.includes("")) {
      alert("possui campo vazio")
    } else {

      axios.post("https://miniprojetoaapi.herokuapp.com/login", e)
        .then(response => {

          if (response.data.Warning === "Usuario não validado") {
            alert(JSON.stringify(response.data.Warning))
          }

          if (response.data.message === "user ou password não existe."){
            alert(JSON.stringify(response.data.message))
          }

          if (response.data.message !== "user ou password não existe." && response.data.Warning !== "Usuario não validado") {
            window.localStorage.setItem("idParan", response.data.id);
            window.localStorage.setItem("nomeParan", response.data.name);
            if (e.name === "admin") {
              window.location.href = '/admin';
            } else {
              window.location.href = '/user';
            }

          }
        })
        .catch(error => console.error(error));

    }

  }

  return (
    <div className="body-form">
      <div id="bloco-form">
      <img src={logo}/>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label>Name:</label>
          <input type="text" placeholder="Digite seu nome" {...register("name")} />


          <label>Password:</label>
          <input type="password" placeholder="Digite sua senha" {...register("password")} />

          <button type="submit">Entrar</button>
          <a href="/Cadastro"><span>Não tenho conta:</span> Cadastrar-se</a>
        </form>
      </div>
    </div>

  )
}

export default Login;
