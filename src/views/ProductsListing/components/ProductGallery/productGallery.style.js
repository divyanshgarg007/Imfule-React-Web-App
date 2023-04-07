import styled from 'styled-components'

const MyDiv = styled.div`
.image_check{
    position:absolute;
    top:3px;
    right:3px;
    width: 25px;
    height: 25px;
    background: #ffffff;
    box-shadow: 1px 1px 7px #979797;
}
.image_check svg{
    color: #000; 
    font-size:1rem;
}
.image_check:hover{
    background: #fff;
    box-shadow: 1px 1px 7px #979797;
}
`
export default MyDiv
