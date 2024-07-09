import React, { Component } from 'react';
import InstagramIcon from '@material-ui/icons/Instagram';
import FacebookIcon from '@material-ui/icons/Facebook';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import GitHubIcon from '@material-ui/icons/GitHub';
import '../Styles/Footer.css';

export class Footer extends Component {

  render() {
    return (
      <div className='footer'>
        <div className='socialMedia'>
            <InstagramIcon />
            <FacebookIcon />
            <LinkedInIcon />
            <GitHubIcon />
        </div>
        <p> &copy; 2024 Shiva</p>
      </div>
    )
  }
}

export default Footer