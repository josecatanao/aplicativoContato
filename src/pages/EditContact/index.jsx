import React, { useState } from "react";
import axios from 'axios';
import "./index.css"
import logo from '../logo.png'


var idA = window.localStorage.getItem("id")
var nomeA = window.localStorage.getItem("nome")
var contatoA = window.localStorage.getItem("contato")

function EditarContact() {
    const [name, setName] = useState(nomeA);
    const [contact, setContact] = useState(contatoA);


    const onSubmit = (e) => {
        e.preventDefault();
        let contactU = {
            name: name,
            contact: contact,
        }
        console.log(contactU)
        axios.put(`https://miniprojetoaapi.herokuapp.com/contact/edita/${idA}`, contactU)
            .then(response => {
                window.location.href = '/user';
            })
            .catch(error => console.error(error));

    }



    return (
        <div className="body-form">
            <div id="bloco-form"> 
            <img src={logo}/>
                <form onSubmit={onSubmit}>
                    <label>Name:</label>
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                 

                    <label>E-mail</label>
                    <input type="text" value={contact} onChange={(e) => setContact(e.target.value)} />

                    <button id="editarB" type="submit">Editar</button>
                </form>
            </div>
        </div>

    )
}

export default EditarContact;