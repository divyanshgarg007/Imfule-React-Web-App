import styled from 'styled-components'

const MyDiv = styled.div`
.tab_color_promote{
    font-size:1rem;
    color:#000;
}
.tabs_box_promote{
    margin: 20px 0 30px 0;
    @media(max-width:767px){
        margin: 20px 0 20px 0;
    }
}
.tab_btn_promote{
    align-items:flex-start;
}
.tab_color_promote{
    padding:0!important;
    align-items: flex-start;
    font-weight:600;
    text-transform: capitalize;
}
.tab_btn_promote .Mui-selected{
    color: #283c86;
    border-radius: 4px;
    font-weight:600;
}
.tab_btn_promote .MuiTabs-indicator{
    background-color: transparent;
}
.tab_color_promote  span{
    display:none;
}

.image_checkList{
    position:absolute;
    top:3px;
    right:3px;
    width: 25px;
    height: 25px;
    background: #ffffff;
    box-shadow: 1px 1px 7px #979797;
}
.image_checkList svg{
    color: #000; 
    font-size:1rem;
}
.image_checkList:hover{
    background: #fff;
    box-shadow: 1px 1px 7px #979797;
}
.post_images{
    height: 200px!important;
    object-fit:cover;
    width: 100%;
}

.products_image_list {
    margin-bottom:15px;
    display: grid;
    overflow-y: auto;
    list-style: none;
    padding: 0;
    grid-template-columns: repeat(6, 1fr)!important;
    gap: 30px!important;
    @media(max-width:767px){
        grid-template-columns: repeat(2, 1fr)!important;
    }
  }
.promotion_heading{
    color: #000;
    font-weight: 600;
    font-size: 1.3rem;
    text-align:center;
}
.promotion_subheading{
    color: #000;
    font-weight: 500;
    font-size: 1rem;
    text-align:center;
}
.select_images{
    color: #000;
    font-weight: 600;
    font-size: 1.1rem;
    text-align:left;
    margin-bottom:10px; 
}
.select_images_subhead{
    color: #ef305e;
    font-weight: 500;
    font-size: 0.9rem;
    text-align:left;
    margin-bottom:20px; 
}
.left_select{
    height: 3px;
    border-radius: 0;
    width: 100px;
    background-color: #ef305e;
    position: relative;
    border-color: transparent;
    margin-top:10px;
}
.collage_btn{
    display: flex;
    align-items: center;
    justify-content: end;
    margin-top:30px;
    column-gap:30px;
}
.selected_images{
    margin-top:60px;
    padding-right: 20px;
    @media(max-width:767px){
        margin-top:30px;
        margin-bottom:30px;
    }
}
.post_images_selected{
    height:80px!important;
    object-fit: contain!important;
    border: 1px solid #eee;
    @media(max-width:767px){
        width:70px!important;
        height:70px!important;
    }
}
.products_imageListSelected{
    display: grid;
    overflow-y: auto;
    list-style: none;
    margin:0;
    padding: 0 20px 0 0;
    grid-template-columns: repeat(5, 1fr)!important;
    gap: 15px!important;
    @media(max-width:767px){
        grid-template-columns: repeat(4, 1fr)!important;
        gap: 10px!important;
    }
}
.products_imageListSelected li{
    margin-top:1rem;
}
.list_grid{
    border-left:1px solid rgba(0, 0, 0, 0.12);
    padding-left:20px;
    @media(max-width:767px){
        border-left:none;
        padding-left:0px;
    }
}
.left_sidebar{
    position:sticky;
    top:2rem;
}
.clear_image{
    position: absolute;
    top: -5px;
    right: -5px;
    width: 20px;
    height: 20px;
    background: #ffffff;
    box-shadow: 1px 1px 7px #979797;
    border-radius: 50%;
    cursor: pointer;
}
.redirection_msg_yellow{
    width:100%;
    background-color: #283c86;
    color:#fff;
    box-shadow:none;
    @media(max-width:767px){
      margin:10px;
    }
}
.empty_box {
    width: 50%;
    position: relative;
    margin: auto;
}
.load_btn{
    display: flex;
  justify-content: center;
  align-items: center;
  grid-column-end: span 6;
}
.load_btn button{
   padding:5px 15px;
}
.percent_box {
    position: relative;
    display: block;
}
.loading_image img{
    width:100%;
    height:175px;
    object-fit:cover;
}
.percent_box .percent_body{
    display: flex;
    align-items: center;
    justify-content: center;
    column-gap:5px;
}
.percent_box .percent_body progress {
    width:50%;
}
`
export default MyDiv
