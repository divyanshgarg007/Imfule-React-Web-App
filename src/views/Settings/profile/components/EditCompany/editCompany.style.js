import styled from 'styled-components'

const MyDiv = styled.div`
.sidebar-inner{
    width:650px;
    @media(max-width:767px){
            width:100%;
    }
}
.user-img .MuiAvatar-circular{
    width: 100px;
    height:100px;
    // border-radius: 10px;
}
.user-img{
    position:relative;
    height: 100px;
}
.upload-photo{
    background: rgb(255, 255, 255);
    width: 40px;
    height: 40px;
    position: absolute;
    color: #283c86;
    bottom: 0;
    border-radius: 50%;
    box-shadow: rgb(0 0 0 / 10%) 1px 2px 12px 2px;
    right: 82%;
    @media(max-width:767px){
        position: absolute;
        bottom: 0%;
        left: 19%;
        right: 0;
}
}

.upload-photo:hover{
    background: rgb(255, 255, 255);
}
.set-right {
    float: right;
    padding: 0;
    @media(max-width:767px){
        padding: 24px 0;
    }
}
.edit_grid{
    padding-bottom:16px;
}
#demo-simple-select{
    padding: 9px 14px!important;
}
.mobile_icon{
    float: right;
    padding: 0;
    @media(max-width:767px){
        padding: 0px 0;
    }
}
.mobile_icon button{
    @media(max-width:767px){
    color: #283c86;
    }
}
`
export default MyDiv
