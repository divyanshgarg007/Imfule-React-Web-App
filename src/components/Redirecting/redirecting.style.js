import styled from 'styled-components'

const MyDiv = styled.div `
.redirection_box{
    width:100%;
    position:relative;
    height:100vh;
    background: #edf9f8;
}
.redirection_inner_box{
    position:absolute;
    left:50%;
    top:50%;
    width:auto;
    transform: translate(-50%, -50%);
    @media(max-width:767px){
      width:100%;
    }
}
.redirection_msg_green{
    justify-content: center;
    padding:30px;
    border: 1px solid green;
    @media(max-width:767px){
      margin:30px;
    }
}
.redirection_msg_yellow{
    justify-content: center;
    padding:30px;
    background: #fff3e4;
    border: 1px solid #ffa223;
    margin-bottom:1rem;
    @media(max-width:767px){
      margin:30px;
    }
}
.redirection_msg_yellow svg{
  color:#ffa223;
}

// Loader Css

.loader,
.loader:before,
.loader:after {
  border-radius: 50%;
  width: 2.5em;
  height: 2.5em;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
  -webkit-animation: load7 1.8s infinite ease-in-out;
  animation: load7 1.8s infinite ease-in-out;
}
.redirection_msg_green .loader {
  color: green;
  font-size: 10px;
  margin: 10px auto;
  position: relative;
  text-indent: -9999em;
  -webkit-transform: translateZ(0);
  -ms-transform: translateZ(0);
  transform: translateZ(0);
  -webkit-animation-delay: -0.16s;
  animation-delay: -0.16s;
}
.redirection_msg_yellow .loader {
    color: #ffa223;
    font-size: 10px;
    margin: 10px auto;
    position: relative;
    text-indent: -9999em;
    -webkit-transform: translateZ(0);
    -ms-transform: translateZ(0);
    transform: translateZ(0);
    -webkit-animation-delay: -0.16s;
    animation-delay: -0.16s;
  }
.loader:before,
.loader:after {
  content: '';
  position: absolute;
  top: 0;
}
.loader:before {
  left: -3.5em;
  -webkit-animation-delay: -0.32s;
  animation-delay: -0.32s;
}
.loader:after {
  left: 3.5em;
}
@-webkit-keyframes load7 {
  0%,
  80%,
  100% {
    box-shadow: 0 2.5em 0 -1.3em;
  }
  40% {
    box-shadow: 0 2.5em 0 0;
  }
}
@keyframes load7 {
  0%,
  80%,
  100% {
    box-shadow: 0 2.5em 0 -1.3em;
  }
  40% {
    box-shadow: 0 2.5em 0 0;
  }
}
`

export default MyDiv
