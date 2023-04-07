import styled from 'styled-components'

const MyDiv = styled.div`
.preloader {
  position: fixed;
  z-index: 99999;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  text-align: center;
  background: rgba(0,0,0,0.5);
  //background: rgba(40,60,134,0.5);
}
.lds-circle {
  display: inline-block;
  transform: translateZ(1px);
  position: absolute;
    top: 50%;
    left: 50%;
    z-index:1000;
    
}
.lds-circle > div {
  display: inline-block;
  width: 40px;
  height: 40px;
  background:#fff;
  background-image: url('../../../imfule-favicon.png');
  animation: sk-rotateplane 1.2s infinite ease-in-out;
  background-position: center;
    background-repeat: no-repeat; 
    padding:5px;
    border-radius: 2px;
    // box-shadow: 0px 0 25px #ccc;
}
@-webkit-keyframes sk-rotateplane {
  0% {
    -webkit-transform: perspective(120px) rotateX(0deg) rotateY(0deg);
            transform: perspective(120px) rotateX(0deg) rotateY(0deg);
  }
  50% {
    -webkit-transform: perspective(120px) rotateX(-180.1deg) rotateY(0deg);
            transform: perspective(120px) rotateX(-180.1deg) rotateY(0deg);
  }
  100% {
    -webkit-transform: perspective(120px) rotateX(-180deg) rotateY(-179.9deg);
            transform: perspective(120px) rotateX(-180deg) rotateY(-179.9deg);
  }
}

@keyframes sk-rotateplane {
  0% {
    -webkit-transform: perspective(120px) rotateX(0deg) rotateY(0deg);
            transform: perspective(120px) rotateX(0deg) rotateY(0deg);
  }
  50% {
    -webkit-transform: perspective(120px) rotateX(-180.1deg) rotateY(0deg);
            transform: perspective(120px) rotateX(-180.1deg) rotateY(0deg);
  }
  100% {
    -webkit-transform: perspective(120px) rotateX(-180deg) rotateY(-179.9deg);
            transform: perspective(120px) rotateX(-180deg) rotateY(-179.9deg);
  }
}
`
export default MyDiv
