import React from "react";
import { useHistory } from "react-router-dom";


import { FiArrowLeft } from "react-icons/fi";

import "../styles/components/sidebar.css"

import mapMarkerImg from '../images/mapMarker.svg';


export default function SideBar(){
    const { goBack } = useHistory();

    return(
        <aside className="app-sidebar">
        <img src={mapMarkerImg} alt="Happy" />

        <footer>
          <button type="button" onClick={goBack}>
            <FiArrowLeft size={24} color="#FFF" />
          </button>
        </footer>
      </aside>
    )
}