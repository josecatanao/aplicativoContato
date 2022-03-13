import React from "react";
import axios from 'axios';
import { useForm } from "react-hook-form";
import "./index.css"
import logo from '../logo.png'

function FormCadastro() {
    const { register, handleSubmit } = useForm();

    const onSubmit = (e) => {
        console.log()
        let valores = [e.name, e.email, e.password]
        if (valores.includes("")) {
            alert("possui campo vazio")
        } else {

            axios.post("https://miniprojetoaapi.herokuapp.com/cadastro", e)
                .then(response => {
                    alert(JSON.stringify(response.data.message))
                    window.localStorage.setItem("emailValida",e.email);
                    window.location.href = '/validarcodigo';
                })
                .catch(error => console.error(error));


        }

    }

    return (
        <div className="body-form">
            <div id="bloco-form-cadastro">
                <img src={logo} />
                <form onSubmit={handleSubmit(onSubmit)}>
                    <label>Name:</label>
                    <input type="text" placeholder="Digite seu nome" {...register("name")} />


                    <label>E-mail:</label>
                    <input type="email" placeholder="Digite seu e-mail" {...register("email")} />


                    <label>Password:</label>
                    <input type="password" placeholder="Digite sua senha" {...register("password")} />

                    <button type="submit">Cadastrar-se</button>
                    <a href="/">Já possuo conta</a>
                </form>
            </div>
        </div>
    )
}

export default FormCadastro;

