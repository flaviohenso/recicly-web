import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react'
import { Link,useHistory } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'
import { Map, TileLayer, Marker } from 'react-leaflet'
import api from '../../services/api'
import axios from 'axios'

import "./styles.css"
import logo from "../../assets/logo.svg"
import { LeafletMouseEvent } from 'leaflet'

interface Iten {
    id: number,
    title: string,
    imagen_url: string
}

interface IbgeUfResponse {
    sigla: string
}

interface IbgeCityResponse {
    nome: string
}

const CreatePoint = () => {

    const [itens, setItens] = useState<Iten[]>([])
    const [ufs, setUfs] = useState<string[]>([])
    const [cities, setCities] = useState<string[]>([])
    const [selectedItens, setSelectedItens] = useState<number[]>([])

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        whatsapp: ''
    })

    const [selectedInitialPosition, setSelectedInitialPosition] = useState<[number, number]>([0, 0])
    const [selectedUf, setSelectedUf] = useState('0')
    const [selectedCity, setSelectedCity] = useState('0')
    const [selectedPosition, setSelectedPosition] = useState<[number, number]>([0, 0])

    const history = useHistory()

    useEffect(() => {
        api.get('itens').then(response => setItens(response.data))
    }, [])

    useEffect(() => {

        axios.get<IbgeUfResponse[]>('https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome').then(response => {
            let ufInitials = response.data.map(uf => uf.sigla)
            setUfs(ufInitials)
        })
    })

    //carrega as cidades sempre que a uf muda
    useEffect(() => {
        if (selectedUf === '0')
            return

        axios.get<IbgeCityResponse[]>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios?orderBy=nome`).then(response => {
            let cityNomes = response.data.map(city => city.nome)
            setCities(cityNomes)
        })
    }, [selectedUf])

    useEffect(() => {
        navigator.geolocation
            .getCurrentPosition(position => {
                const { latitude, longitude } = position.coords
                setSelectedInitialPosition([latitude, longitude])
            })
    }, [])

    const handleSelectUf = (event: ChangeEvent<HTMLSelectElement>) => {
        const uf = event.target.value
        setSelectedUf(uf)
    }

    const handleSelectCity = (event: ChangeEvent<HTMLSelectElement>) => {
        const city = event.target.value
        setSelectedCity(city)
    }

    const handleMapClick = (event: LeafletMouseEvent) => {
        setSelectedPosition([event.latlng.lat, event.latlng.lng])
    }

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const {name,value} = event.target

        setFormData({...formData, [name]:value})
    }

    const handleSelectIten = (id: number) => {
        const alreadySelected = selectedItens.findIndex(iten => iten === id)

        if (alreadySelected >= 0) {
            const filteredItens = selectedItens.filter(iten => iten !== id)
            setSelectedItens(filteredItens)
        } else {
            setSelectedItens([...selectedItens,id])
        }
    }

     const handleSubmit = async (event: FormEvent) => {
        event.preventDefault()

        const { name, email, whatsapp} = formData
        const uf = selectedUf
        const city = selectedCity
        const [latitude, longitude] = selectedPosition
        const itens = selectedItens

        const data = {
            name,
            email,
            whatsapp,
            uf,
            city,
            latitude,
            longitude,
            itens
        }

        await api.post('points', data)

        alert('Ponto de coleta criado!')

        history.push('/')
    }

    return (
        <div id="page-create-point">
            <header>
                <img src={logo} alt="Recicly"></img>

                <Link to="/">
                    <FiArrowLeft />
                   Back to Home
               </Link>
            </header>
            <form onSubmit={handleSubmit}>
                <h1>Cadastro do <br />ponto de Coleta</h1>
                <fieldset>
                    <legend><h2>Dados</h2></legend>
                    <div className="field">
                        <label htmlFor="name">Nome Entidade</label>
                        <input
                            type="text"
                            name="name"
                            id="id"
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="field-group">
                        <div className="field">
                            <label htmlFor="email">E-mail</label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="field">
                            <label htmlFor="whatsapp">Whatsapp</label>
                            <input
                                type="text"
                                name="whatsapp"
                                id="whatsapp"
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>
                </fieldset>
                <fieldset>
                    <legend>
                        <h2>Endereço</h2>
                        <span>Selecione o endereço no mapa</span>
                    </legend>

                    <Map center={selectedInitialPosition} zoom={15} onClick={handleMapClick}>
                        <TileLayer
                            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png">
                        </TileLayer>
                        <Marker position={selectedPosition} />
                    </Map>

                    <div className="field-group">
                        <div className="field">
                            <label htmlFor="uf">Estado(uf)</label>
                            <select name="uf" id="uf" value={selectedUf} onChange={handleSelectUf}>
                                <option value="0">selecione um uf...</option>
                                {ufs.map(uf => (
                                    <option key={uf} value={uf}>{uf}</option>
                                ))}
                            </select>
                        </div>
                        <div className="field">
                            <label htmlFor="city">Cidade</label>
                            <select name="city" id="city" value={selectedCity} onChange={handleSelectCity}>
                                <option value="0">selecione uma citidade...</option>
                                {cities.map(city => (
                                    <option key={city} value={city}>{city}</option>
                                ))}
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
                        {itens.map(iten => (
                            <li key={iten.id} onClick={() => handleSelectIten(iten.id)} className={selectedItens.includes(iten.id) ? 'selected' : ''}>
                                <img src={iten.imagen_url} alt={iten.title} />
                                <span>{iten.title}</span>
                            </li>
                        ))}

                    </ul>
                </fieldset>

                <button type="submit" >Cadastrar ponto de coletar</button>
            </form>
        </div>
    )
}

export default CreatePoint