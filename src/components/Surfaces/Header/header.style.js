import styled from 'styled-components'

const MyDiv = styled.div`
.custom-header{
    background-color:#fff;
    padding:10px;
    color:#000;
    box-shadow: 0px 0 25px #e7e7e7;
    @media(max-width:767px){
        padding: 4px;
    }
}
.menuitem {
    display: inline-flex;
    padding: 0px;
    margin:0px 20px 0px 20px;
    @media(min-width:768px) and (max-width:1023px){
        margin: 0px 10px 0 10px;
        }
        @media only screen 
  and (min-device-width: 1024px) 
  and (max-device-width: 1366px) 
  and (-webkit-min-device-pixel-ratio: 2){
    margin:0px 10px;
  }
}
.menuitem:hover{
    background:transparent;
}
.logo-web{
    @media(max-width:767px){
        width:100%;
    }
}
.custom-menu-mobile hr{
    @media(max-width:767px){
       margin:0;
    }
}
.logo-web img{
    @media(max-width:767px){
        max-width:200px;
        margin: auto;
        align-items: center;
        justify-content: center;
        display: flex;
    }
}
.custom-menu{
    padding-left:30px;
    -webkit-box-flex: 1;
    flex-grow: 1;
    @media(min-width:768px) and (max-width:1023px){
        display:none;
        }
        @media only screen 
  and (min-device-width: 1024px) 
  and (max-device-width: 1366px) 
  and (-webkit-min-device-pixel-ratio: 2){
    padding-left: 12px;
  }
}
.custom-menu-mobile{
    @media(max-width:767px){
        display:block;
        padding-left:0px;
        padding-top: 30px;
    }
    @media(min-width:768px) and (max-width:1023px){
        padding-top: 30px;
        }
}
.drawer-icon{
    display:none;
    @media(max-width:767px){
        display:block;
    }
    @media(min-width:768px) and (max-width:1023px){
        display:block;
        }
}
.center_align{
    @media(min-width:768px) and (max-width:1023px){
        justify-content: space-between;
        }
}
.drawer-list{
    @media(max-width:767px){
    padding: 8px 16px!important;
    }
    @media(min-width:768px) and (max-width:1023px){
        padding: 8px 16px!important;
    }
}

  .store_button{
    background: transparent;
    font-size: 1rem!important;
    color:#283c86;
    border:none;
  }
  .store_button:hover{
    background: transparent;
    color:#000;
    border:none;
  }
  .custom_avatar{
      background-color:#000;
      cursor:pointer;
  }
  .menuitem a{
      font-weight:500;
      font-size:1rem;
      color:#000!important;
     border-bottom: 2px solid #fff;
  }
.menuitem:hover a{
    color:#283c86!important;
    border-bottom: 2px solid #283c86;
    
}
.store_items{
    margin-top: -2px;
    @media (max-width: 767px){
        margin-top: 0px;
        padding: 12px 20px!important;
    }
    @media(min-width:768px) and (max-width:1023px){
        margin-top: 0px;
        padding: 2px 10px!important;
    }
}
.store_items p{
    font-weight: 500;
    font-size: 1rem;
    color: #000;
    padding: 0;
    margin: 0px 16px;
    @media (max-width: 767px){
        margin: 0px;
        color:#283c86;
    }
    @media(min-width:768px) and (max-width:1023px){
        margin: 0px;
        color:#283c86;
    }
}
.store_items svg{
    position:absolute;
    @media (max-width: 767px){
        float:right;
        position:relative;
    }
    @media(min-width:768px) and (max-width:1023px){
        float:right;
        position:relative;
    }
}
.menuitem span{
    display:none;
}
.drawer-list span{
    @media (max-width: 767px){
        font-weight: 500;
    font-size: 1rem;
    color: #283c86;
    font-family: 'Poppins',sans-serif;
    text-transform: capitalize;
    }
    @media(min-width:768px) and (max-width:1023px){
        font-weight: 500;
        font-size: 1rem;
        color: #283c86;
        font-family: 'Poppins',sans-serif;
        text-transform: capitalize;
    }
}
.drawer-list:active{
    @media (max-width: 767px){
    background-color:#283c86;
    }
}
.drawer-list:active span{
    @media (max-width: 767px){
    color: #fff;
    }
}
.mobile_icon{
    @media(max-width:767px){
        padding: 0px 0;
        float: right;
        color: #283c86;
        position: relative;
    top: 5px;
    right: 5px;
    margin-bottom:10px;
    }
    @media(min-width:768px) and (max-width:1023px){
        padding: 0px 0;
        float: right;
        color: #283c86;
        position: relative;
    top: 5px;
    right: 5px;
    margin-bottom:10px;
        }
}
.mobile_items_list{
    @media(max-width:767px){
        clear:both;
    }
    @media(min-width:768px) and (max-width:1023px){
        clear:both;
    }
}
.store_list{
    padding:0px 16px 0 0;
}
.store_list:hover{
    background-color:transparent;
}
.store_list span{
    display:none;
}
.active_menu{
    padding:0;
    margin: 0px 20px 0 20px;
    font-family: 'Poppins',sans-serif!important;
    text-transform: capitalize!important;
    @media(min-width:768px) and (max-width:1023px){
        margin: 0px 10px 0 10px;
        }
}
.active_menu a{
    font-weight:500;
    border-bottom: 2px solid #283c86;
}
.active_menu:hover{
    background:transparent;
}


`
export default MyDiv
