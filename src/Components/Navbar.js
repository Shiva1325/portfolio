import React, { useEffect, useState } from 'react';
import {Link, useLocation} from 'react-router-dom';
import "../Styles/Navbar.css";
import ReorderIcon from '@material-ui/icons/Reorder';
import logo from '../Icons/SSPIconGIF.gif';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import PsychologyOutlinedIcon from '@mui/icons-material/PsychologyOutlined';
import EngineeringOutlinedIcon from '@mui/icons-material/EngineeringOutlined';
import ConnectWithoutContactOutlinedIcon from '@mui/icons-material/ConnectWithoutContactOutlined';
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined';
import Tooltip  from '@material-ui/core/Tooltip';

function Navbar() {
    const [expandNavbar, setExpandNavbar] = useState(false);
    const location = useLocation();
    useEffect(()=>{
        setExpandNavbar(false);
    },[location]);
  return (
    <div className='navbar' id = {expandNavbar ? "open":"close"}>
        <div className='logo'>
            <img src={logo} alt='logo' />
        </div>
        <div className='toggleButton'>
            <button onClick={() => {setExpandNavbar((prev) => !prev)}}> <ReorderIcon /> </button>
        </div>
        <div className='links'>
            <div className='Icons'>
                <Tooltip title="Home">
                    <Link to='/'><HomeOutlinedIcon className='NavIcons' fontSize="large" /></Link>
                </Tooltip>
            </div>
            <div className='Icons'>
                <Tooltip title="About Me">
                    <Link to='/About'><PermIdentityOutlinedIcon className='NavIcons' fontSize="large"  /></Link>
                </Tooltip>
            </div>
            <div className='Icons'>
                <Tooltip title="Projects">
                    <Link to='/projects'><EngineeringOutlinedIcon className='NavIcons' fontSize="large"  /></Link>
                </Tooltip>
                
            </div>
            <div className='Icons'>
                <Tooltip title="Skills and Experience">
                    <Link to='/skillsandexperience'><PsychologyOutlinedIcon className='NavIcons' fontSize="large"  /></Link>
                </Tooltip>
            </div>
            <div className='Icons'>
                <Tooltip title="Contact">
                    <Link to='/Contact'><ConnectWithoutContactOutlinedIcon className='NavIcons' fontSize="large"  /></Link>
                </Tooltip>
            </div>
        </div>
    </div>
  )
}

export default Navbar