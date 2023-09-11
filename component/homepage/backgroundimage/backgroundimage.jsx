import {useEffect, useState} from 'react'
export default function Backgroundimage(){
  const [img,setImg] = useState("");
 useEffect(()=>{
  setImg(require("../../../public/img/bg/bgimage.webp").default.src);
 },[])
 
  return(<>
    <style jsx>{`
#backgroundImage{
  position:relative;
  left:0;
  width: 100%;
  height: 100%;
  display: table;
  margin: 0;
  max-width: none;
  background-color:black;
  background-image: url('${img}');
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  transition: background-image linear 1s,visibility 0s 2s;
}


#overlayer{
  width: 100%;
  position:relative;
  background-color: transparent !important;
  background-image: linear-gradient(to bottom,rgba(0,0,0,0.3),rgba(0,0,0,0.8)) ;
  left: 0;
  top:0;
}
.fullpage{
  height:740px;
}
.container {
  max-width: 960px;
  margin: 0 auto;
}
.startBtnDiv{
  position: absolute;
  bottom:0;
  left:50%;
  transform: translate(-50%,0);
  margin:10vw 0px;
  height:auto;
  width:auto;
}
.getstartbtn{
  background-color: var(--main-theme-color);
  color: white;
  font-weight: bold;
  font-family: 'fairplay', Fallback, sans-serif;
  font-size: 20px;
  padding:5px 10px;
  border-radius: 8px;
  border:0;
  font-size: calc(1.5vh + 1vw) !important;
}
.getstartbtn:hover{
  background-color: var(--sub-theme-color);
}
.getstartbtn:focus{
  background-color: var(--light-type-color);
  color:black;
}
.sloganTitle{
  color: white;
  position: absolute;
  top:calc(1.5vh + 8vw);
  left:calc(1.5vh + 5vw);
  transform translate(-50%,-50%);
  width:calc(20vh + 20vw);
  font-weight: bold;
  margin: auto;
  font-size: calc(3vh + 3vw) !important;
  font-family:Arial, Helvetica, sans-serif;
}
@media only screen and (max-width: 767px) {
  .fullpage {
    height: 50vh;
  }
  .sloganTitle{
    top:calc(10vh + 10vw);
  left:calc(1vh + 4vw);
  }
}
    `}</style>
    <div className="backgroundImage" id="backgroundImage">
    <div className="overlayer" id="overlayer">
      <div className="fullpage">
        <div className="sloganTitle container d-flex align-items-center">
          <p>JOIN AND ENJOY LIFE INSURANCE</p>
        </div>
        <div className='startBtnDiv'>
          <button className='getstartbtn'>Get Started</button>
        </div>
      </div>
      </div>
      </div>
  </>)
}