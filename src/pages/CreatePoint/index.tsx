import React from 'react'
import { Link } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'

import "./styles.css"
import logo from "../../assets/logo.svg"

const CreatePoint = () => {
    return (
        <div id="page-create-point">
            <header>
                <img src={logo} alt="Recicly"></img>

                <Link to="/">
                    <FiArrowLeft />
                   Back to Home
               </Link>
            </header>
            <form>
                <h1>Cadastro do <br />ponto de Coleta</h1>
                <fieldset>
                    <legend><h2>Dados</h2></legend>
                    <div className="field">
                        <label htmlFor="name">Nome Entidade</label>
                        <input
                            type="text"
                            name="name"
                            id="id"
                        />
                    </div>
                    <div className="field-group">
                        <div className="field">
                            <label htmlFor="email">E-mail</label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                            />
                        </div>
                        <div className="field">
                            <label htmlFor="whatsapp">Whatsapp</label>
                            <input
                                type="text"
                                name="whatsapp"
                                id="whatsapp"
                            />
                        </div>
                    </div>
                </fieldset>
                <fieldset>
                    <legend>
                        <h2>Endereço</h2>
                        <span>Selecione o endereço no mapa</span>
                    </legend>

                    <div className="field-group">
                        <div className="field">
                            <label htmlFor="uf">Estado(uf)</label>
                            <select name="uf">
                                <option>selecione um uf...</option>
                            </select>
                        </div>
                        <div className="field">
                        <label htmlFor="city">Cidade</label>
                            <select name="city">
                                <option>selecione uma citidade...</option>
                            </select>
                        </div>
                    </div>
                </fieldset>
                <fieldset>
                    <legend>
                        <h2>Ítens de Coleta</h2>
                        <span>Selecione o endereço no mapa</span>
                    </legend>
                    <ul className="items-grid">
                        <li>
                            <img src="http://localhost:3333/uploads/lampadas.svg" alt="Teste"/>
                            <span>Oleo de cozinha</span>
                        </li>
                        
                        <li className="selected">
                            <img src="http://localhost:3333/uploads/lampadas.svg" alt="Teste"/>
                            <span>Oleo de cozinha</span>
                        </li>
                        <li>
                            <img src="http://localhost:3333/uploads/lampadas.svg" alt="Teste"/>
                            <span>Oleo de cozinha</span>
                        </li>
                        <li>
                            <img src="http://localhost:3333/uploads/lampadas.svg" alt="Teste"/>
                            <span>Oleo de cozinha</span>
                        </li>
                        <li>
                            <img src="http://localhost:3333/uploads/lampadas.svg" alt="Teste"/>
                            <span>Oleo de cozinha</span>
                        </li>
                        <li>
                            <img src="http://localhost:3333/uploads/lampadas.svg" alt="Teste"/>
                            <span>Oleo de cozinha</span>
                        </li>
                    </ul>   
                </fieldset>

                <button type="submit" >Cadastrar ponto de coletar</button>
            </form>
        </div>
    )
}

export default CreatePoint