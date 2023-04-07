import styled from 'styled-components'

const MyDiv = styled.div`
.content-body{
    padding:0px;
}
.edit_grid{
    padding: 10px 0px;
    align-items: center;
}
.detail_heading{
    margin-bottom: 0;
    font-size: 1.3rem;
    font-weight: 600;
    color: #000;
    @media(max-width:767px){
        font-size: 1.1rem;
    }
}
.detail_title{
    font-size:0.9rem;
    font-weight:500;
    color:#444;
}
.detail_subtitle{
    font-size:0.9rem;
    font-weight:500;
    color:#000;
    @media(max-width:767px){
        word-break: break-all;
    }
}
.profile_actions{
    float:right;
    padding: 8px 0 8px 8px;
    @media(max-width:767px){
        padding:0;
        margin: 1rem 0rem 1rem 0;
    }
}
`
export default MyDiv
