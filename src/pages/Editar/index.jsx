import React, { useState } from "react";
import axios from 'axios';
import "./index.css"
import logo from '../logo.png'


var idA = window.localStorage.getItem("id")
var nomeA = window.localStorage.getItem("nome")
var emailA = window.localStorage.getItem("email")
var senhaA = window.localStorage.getItem("senha")

function Editar() {
    const [name, setName] = useState(nomeA);
    const [email, setEmail] = useState(emailA);
    const [password, setPassword] = useState(senhaA);


    const onSubmit = (e) => {
        e.preventDefault();
        let user = {
            name: name,
            email: email,
            password: password
        }
        console.log(user)
        axios.put(`https://miniprojetoaapi.herokuapp.com/${idA}`, user)
            .then(response => {
                window.location.href = '/admin';
            })
            .catch(error => console.error(error));

    }



    return (
        <div className="body-form">
            <div id="bloco-form">
                <img src={logo} />
                <form onSubmit={onSubmit}>
                    <label>Name</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} />

                    <label>E-mail</label>
                    <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />

                    <label>Password:</label>
                    <input type="text" value={password} onChange={(e) => setPassword(e.target.value)} />

                    <button type="submit">Editar</button>
                </form>
            </div>
        </div>

    )
}

export default Editar;
