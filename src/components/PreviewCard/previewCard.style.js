import styled from 'styled-components'

const MyDiv = styled.div`
// .device_btn{
//     color: #283c86;
// }
// .preview_badge{
//     text-align:center;
// }
// .preview_badge .MuiBadge-badge{
//     background-color:#283c86;
//     text-align:center;
//     color:#fff;
//     // border-radius:0!important;
//     padding:12px 15px;
//     font-family: 'Poppins',sans-serif;
//     text-transform: capitalize;
//     font-weight:400;
//     margin-top:12px;
// }
.device_btn{
    color:#283c86;
    background:#ddd;
    &.active{
        color:#fff;
        background:#283c86;
        // opacity: .8; 
    }
}
.device_btn:hover{
    color:#fff;
    background:#283c86;
    opacity: .8;
}
.toggle_icons{
    display: flex;
    justify-content: center;
    align-items: center;
    column-gap: 25px;
    padding: 0px 24px!important;
    position: absolute;
    left: 50%;
    transform: translate(-40%, -50%);
    @media(max-width:767px){
        top: 0;
        transform: translate(-40%,25%);
        padding: 0px!important;
    }
    @media(min-width:768px) and (max-width:1023px){
        top: 0;
        transform: translate(-40%,25%);
    }
}
.tab_color {
    justify-content: flex-end;
    color:transparent!important;
    padding:0;
    min-width: auto;
}
.tab_btn .MuiTabs-flexContainer{
    justify-content: flex-end;
    padding: 8px 24px;
    column-gap: 25px;
    @media(max-width:767px){
        padding: 20px 0px 10px 0px!important;
    }
    @media(min-width:768px) and (max-width:1023px){
    padding: 25px 24px 20px;
    }
}
.tab_btn .MuiTabs-flexContainer span{
    justify-content: flex-end;
    // padding: 12px 0px!important;
    align-items: center;
    display: flex;
    cursor:pointer;
}
.tab_color span{
    display:none;
}
.tab_space{
    padding:0px 24px!important;
}
.toggle_icons_header{
    position:relative;
}
.preview_demo_box{
    padding-top:25px;
}
.tab_btn .MuiTabs-fixed .Mui-selected{
    border:2px solid #ef305e;
    min-height: auto;
    padding: 5px;
    border-radius: 50%;
    transition: 0.3s;
}
.tab_btn .tab_color{
    border:2px solid transparent;
    min-height: auto;
    padding: 5px;
    border-radius: 50%;
}
`
export default MyDiv
