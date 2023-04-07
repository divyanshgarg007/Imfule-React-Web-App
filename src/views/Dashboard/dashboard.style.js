import styled from 'styled-components'

const MyDiv = styled.div`
.dashboard_box{
    margin: 48px 0 70px 0;
    @media(max-width:767px){
        margin: 40px 0 60px 0;
    }
}
.adjust_card{
    height:402px;
    overflow-y:auto;
    @media(max-width:767px){
        height:auto;
    }
}
`
export default MyDiv
