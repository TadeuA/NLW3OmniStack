import React,{useState, FormEvent, ChangeEvent} from "react";
import { Map, Marker, TileLayer } from 'react-leaflet';
import {LeafletMouseEvent} from "leaflet"
import {  FiPlus } from "react-icons/fi";
import { useHistory } from "react-router-dom";


import '../styles/pages/create-orphanage.css';

import SideBar from "../components/SideBar"

import happyMapIcon from '../utils/happyMapIcon'
import api from "../services/api";

export default function CreateOrphanage() {
  const history = useHistory()
  const [position, setPosition] = useState({latitude:0,longitude:0})

  const [name, setName] = useState("")
  const [about, setAbout] = useState("")
  const [instructions, setInstructions] = useState("")
  const [opening_hours, setOpeningHours] = useState("")
  const [open_on_weekends, setOpeningOnWeekends] = useState(true)

  const [images, setImages] = useState<File[]>([])
  const [previewImages, setPreviewImages] = useState<string[]>([])

 

  function handleSelectImages(event:ChangeEvent<HTMLInputElement>){
    if(!event.target.files){
      return;
    }
    const selectedImages = Array.from(event.target.files)
    setImages(selectedImages)

    const selectedImagesPreview = selectedImages.map(image =>{
      return URL.createObjectURL(image);
    })

    setPreviewImages(selectedImagesPreview)
  }


  async function handleSubmit(event:FormEvent){
    event.preventDefault();

    const {latitude, longitude} = position

    const data = new FormData()

    data.append("name",name)
    data.append("about",about)
    data.append("latitude",String(latitude))
    data.append("longitude",String(longitude))
    data.append("instructions",instructions)
    data.append("opening_hours",opening_hours)
    data.append("open_on_weekends",String(open_on_weekends))

    images.forEach(image => {
      data.append("images",image)
    })
    await api.post('orphanages', data);

    alert('Cadastro Realizado com Sucesso!')

    history.push('/app')
  }

  function handleMapClick(event:LeafletMouseEvent) {
    const {lat, lng} = event.latlng

    setPosition({
      latitude:lat,
      longitude:lng
    })
  }


  return (
    <div id="page-create-orphanage">
      <SideBar/>  

      <main>
        <form className="create-orphanage-form" onSubmit={handleSubmit}>
          <fieldset>
            <legend>Dados</legend>

            <Map 
              center={[-27.2092052,-49.6401092]} 
              style={{ width: '100%', height: 280 }}
              zoom={15}
              onClick={handleMapClick}
            >
              <TileLayer 
                url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
              />
              {position.latitude !== 0 &&(
                <Marker 
                  interactive={false} 
                  icon={happyMapIcon} 
                  position={[position.latitude,position.longitude]} 
                />
              )   
              }
            </Map>

            <div className="input-block">
              <label htmlFor="name">Nome</label>
              <input 
                id="name" 
                onChange={event => setName(event.target.value)} 
              />
            </div>

            <div className="input-block">
              <label htmlFor="about">Sobre <span>Máximo de 300 caracteres</span></label>
              <textarea 
                id="about" 
                maxLength={300} 
                onChange={event =>setAbout(event.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="images">Fotos</label>

              <div className="uploaded-image">

              </div>
              <div className="images-container">
                {previewImages.map((image, index) =>{
                  return(
                    <img key={index} src={image} alt={name}/>
                  )
                })}
                <label htmlFor="image[]" className="new-image">
                  <FiPlus size={24} color="#15b6d6" />
                </label>

              </div>
              <input 
                type="file" 
                multiple
                id="image[]"
                onChange={handleSelectImages}  
              />
            </div>
          </fieldset>

          <fieldset>
            <legend>Visitação</legend>

            <div className="input-block">
              <label htmlFor="instructions">Instruções</label>
              <textarea id="instructions" onChange={event => setInstructions(event.target.value)}/>
            </div>

            <div className="input-block">
              <label htmlFor="opening_hours">Horário de visitação</label>
              <input 
                id="opening_hours" 
                onChange={event => setOpeningHours(event.target.value)}/>
            </div>

            <div className="input-block">
              <label htmlFor="open_on_weekends">Atende fim de semana</label>

              <div className="button-select">
                <button 
                  type="button" 
                  className={open_on_weekends ?"active":""} 
                  onClick={()=>setOpeningOnWeekends(true)}
                >
                  Sim
                </button>
                <button 
                  type="button" 
                  className={!open_on_weekends ?"active dont":""}
                  onClick={()=>setOpeningOnWeekends(false)}
                >
                  Não
                </button>
              </div>
            </div>
          </fieldset>

          <button className="confirm-button" type="submit">
            Confirmar
          </button>
        </form>
      </main>
    </div>
  );
}

// return `https://a.tile.openstreetmap.org/${z}/${x}/${y}.png`;
