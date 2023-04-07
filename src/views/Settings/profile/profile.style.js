import styled from 'styled-components'

const MyDiv = styled.div`
.tab_space{
    padding:0 24px 20px;
}
.tabs_card{
    background-color: #f7f7f7;
    border-radius: 5px;
    box-shadow: 0px 0 10px #d3d3d3;
}
.tab_color{
    font-size:1rem;
    color:#000;
    text-transform: capitalize!important;
}
.tabs_box{
    margin: 48px 0 70px 0;
    @media(max-width:767px){
        margin: 40px 0 60px 0;
    }
}
.box_tabs{
    margin:0px 20px;
}
.tab_btn .Mui-selected{
    color: #283c86;
    // background: linear-gradient(to right,#2a2653,#ef305e);
    border-radius: 4px;
    font-weight:600;
}
.tab_btn .MuiTabs-indicator{
    background-color: #283c86;
}
`
export default MyDiv
