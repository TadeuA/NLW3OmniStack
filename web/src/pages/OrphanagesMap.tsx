import React,{useEffect, useState} from 'react';
import {Link} from 'react-router-dom'
import {Map, TileLayer, Marker, Popup} from 'react-leaflet'

import '../styles/pages/orphanagesMap.css'
import {FiPlus,FiArrowRight} from 'react-icons/fi'
import mapMarkerImg from '../images/mapMarker.svg'


import happyMapIcon from '../utils/happyMapIcon'
import api from '../services/api';

interface Orphanage{
    id:number;
    name:string;
    longitude:number;
    latitude:number;
}

function OrphanagesMap(){
    const [orphanages, setOrphanages] = useState<Orphanage[]>([])

    useEffect(()=>{
        api.get('orphanages').then(response =>{
            setOrphanages(response.data)
        })
    },[])


    return (
        <div id="page-map">
            <aside>
                <header>
                    <img src={mapMarkerImg} alt="Happy"/>
                    <h2>Escolha um orfanato no mapa</h2>
                    <p>Muitas crianças estão esperando a sua visita :)</p>  
                </header>
                <footer>
                    <strong>Correia Pinto</strong>
                    <span>Santa Catarina</span>
                </footer>

                


            </aside>
            <Map 
                center={[-27.5873471,-50.3596075]}
                zoom={15}
                style={{width:'100%',height:'100%'}}
            >
                {/*<TileLayer url="http://a.tile.openstreetmap.org/{z}/{x}/{y}.png"/>*/}
                <TileLayer 
                    url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}/>
               {orphanages.map(orphanage =>{
                   return(
                    <Marker
                    key={orphanage.id}
                    icon={happyMapIcon}
                    position={[orphanage.latitude,orphanage.longitude]}
                >
                    <Popup 
                        closeButton={false} 
                        minWidth={240} 
                        maxWidth={240}
                        className="map-popup"
                    >
                        {orphanage.name}
                        <Link to={`orphanages/${orphanage.id}`} >
                            <FiArrowRight size={20} color="#FFF" />
                        </Link>
                    </Popup>
                </Marker>
                   )
               })}
               
            </Map>

            <Link to="/orphanages/create" className="create-orphanage">
                <FiPlus size={32} color="#FFF"/>
            </Link>
        </div>
    )
}

export default OrphanagesMap;