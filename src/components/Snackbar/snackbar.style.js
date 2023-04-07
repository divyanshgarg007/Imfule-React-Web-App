import styled from 'styled-components'

const MyDiv = styled.div `
.custom_snack{
    width: 50%;
    display: block;
    text-align: center;
    @media(max-width:767px){
        width: 100%;
    }
}
.custom_snack_alert{
    justify-content:center;
    color:#000;
    font-weight:600;
    font-size:1rem;
    text-transform:capitalize;
}
`

export default MyDiv
