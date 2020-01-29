import React from 'react'
import './CSS/InfoBar.css'
import onlineIcon from '../Icons/onlineIcon.png'
import closeIcon from '../Icons/closeIcon.png'

const InfoBar = ({ room }) => (
    <div className="infoBar">
        <div className="leftInnerContainer">
            <img src={onlineIcon} alt="online Icon" className="onlineIcon" />
            <h3>{room}</h3>
        </div>
        <div className="rightInnerContainer">
            <a href="/" ><img src={closeIcon} alt="close Icon" /></a>
        </div>
    </div>
);

export default InfoBar;