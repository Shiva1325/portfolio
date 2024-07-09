import React from 'react';
import "../Styles/Home.css";
import developerIcon from "../Icons/developerIcon.png";
import hiIcon from "../Icons/Hi_Icon.png";
import eyeIcon from "../Icons/eye.png";

function Home() {
  return (
    <div className='HomeDiv'>
      <div className='MyImage'>
        <div className='HiImageDiv'>
          <img className='HiImage' src={hiIcon} />
          {/* <img className='MyEyes' src={eyeIcon}/> */}
          {/* <div class="eyes">
            <div class="lefteye">
                <img src={eyeIcon} />
            </div>
            <div class="righteye">
            <img src={eyeIcon} />
            </div>
        </div> */}
        </div>
      </div>
      <div className='Home'>
        <div className='bounce'>
            <p className='hitext'> 
              <span>H</span><span>I</span> <span>T</span><span>H</span><span>E</span><span>R</span><span>E</span><span>...</span><span> </span><span>I</span><span>'</span><span>M</span></p>
            <p className='HelloText'><span> </span><span className='highlight'>S</span><span>H</span><span>I</span><span>V</span><span>A</span><span></span> </p>
            <p className='professionText'> 
              {/* <span>F</span><span>u</span><span>l</span><span>l</span>  */}
              {/* <span> </span> <span className='highlight'>S</span><span>t</span><span>a</span><span>c</span><span>k</span> */}
              <span> </span><span>D</span><span>e</span><span>v</span><span>e</span><span>l</span><span>o</span><span className=''>p</span><span>e</span><span>r</span><span> </span>
              <img className='developerIcon' src={developerIcon} /> <span></span></p>
            <p className='description'>I'm Full stack web developer based in Pittsburgh, Pennsylvania</p>
        </div>
      </div>
    </div>
    
  )
}

export default Home