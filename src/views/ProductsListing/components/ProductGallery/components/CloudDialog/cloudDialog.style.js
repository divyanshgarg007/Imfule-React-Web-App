import styled from 'styled-components'

const MyDiv = styled.div`
.close_cloud{
    position: absolute;
    right: 15px;
    top: 26px; 
}
.close_cloud svg{
    color: #283c86;
    cursor:pointer;
}

.tab_color{
    font-size:1rem;
    color:#000;
}
.tabs_box{
    margin: 20px 0 30px 0;
    @media(max-width:767px){
        margin: 20px 0 20px 0;
    }
}
.tab_btn{
    align-items:flex-start;
}
.tab_color{
    padding:0!important;
    align-items: flex-start;
    text-transform: capitalize;
}
.tab_btn .Mui-selected{
    color: #283c86;
    border-radius: 4px;
    font-weight:600;
}
.tab_btn .MuiTabs-indicator{
    background-color: transparent;
}
.tab_color  span{
    display:none;
}
.dialog_height .MuiPaper-root-MuiDialog-paper{
    height:80%;
}
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
.post_images{
    height: 200px!important;
    object-fit:cover;
    width: 100%;
}
.products_image_list{
    display: grid;
    overflow-y: auto;
    list-style: none;
    margin:0;
    padding: 0;
    grid-template-columns: repeat(3, 1fr)!important;
    gap: 30px!important;
    @media(max-width:767px){
        grid-template-columns: repeat(2, 1fr)!important;
    }
}
.delete_image{
    position: absolute;
    top: 25%;
    right: 3px;
    width: 25px;
    height: 25px;
    background: #ffffff;
    box-shadow: 1px 1px 7px #979797;
    color: #000;
}
.delete_image svg{
    font-size:1rem;
}
.delete_image:hover{
    background: #fff;
    box-shadow: 1px 1px 7px #979797;
}
.percent_box{
    position: relative;
    display:block;
}
.loading_image img{
    width:100%;
    height:200px;
}
.percent_box .percent_body{
    display: flex;
    align-items: center;
    justify-content: center;
    column-gap:5px;
}
.percent_box .percent_body progress {
    width:70%;
}

.cloud_border{
    border-right: 1px solid rgba(0,0,0,0.12);
    @media(max-width:767px){
        border-right: none;
    }
}
.data_border{
    padding:0px 10px;
    @media(max-width:767px){
        padding:0px;
    }
}
.empty_box{
    position: absolute;
    right: 50%;
    left: 50%;
    width: 50%;
    transform: translate(-27%, 0%);
    @media(max-width:767px){
        width: 75%;
        transform: translate(-50%,0%);
        margin-top: 30px;
    }
}
// .products_image_list{
//     display: grid;
//     overflow-y: auto;
//     list-style: none;
//     margin:0;
//     padding: 0;
//     grid-template-columns: repeat(3, 1fr)!important;
//     gap: 30px!important;
//     @media(max-width:767px){
//         grid-template-columns: repeat(2, 1fr)!important;
//     }
// }
`
export default MyDiv
