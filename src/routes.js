import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Login from "./pages/Login/index";
import FormCadastro from "./pages/Cadastro";
import ValidaCodigo from "./pages/ValidaCodigo";
import Admin from "./pages/Admin";
import Editar from "./pages/Editar";
import User from "./pages/User";
import EditarContact from "./pages/EditContact";

function Rotas(){

    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" exact  element={<Login />} />
                <Route path="/cadastro"  element={<FormCadastro />} />
                <Route path="/validarcodigo"  element={<ValidaCodigo />} />
                <Route path="/admin"  element={<Admin />} />
                <Route path="/editar"  element={<Editar />} />
                <Route path="/user"  element={<User />} />
                <Route path="/editarContact"  element={<EditarContact />} />
            </Routes>
        </BrowserRouter>
    )

}

export default Rotas;