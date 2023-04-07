import styled from 'styled-components'

const MyDiv = styled.div`
.custom-avatar{
    height:25px;
    width:25px;
}

.sync_icon{
// padding:3px 0px;
color: #283c86;
}
.sync_txt{
    margin-bottom: 0;
    font-size: 1rem;
    font-weight: 500;
    color: #000;
}
#social_media_select{
    padding: 9px 14px!important;
    height:30px;
}
#social_media_page{
    padding: 9px 14px!important;
    height:30px;
}
.product_grid{
    display:flex;
    align-items:center;
    margin-bottom:15px;
}
.highlight_select {
    display:flex;
    align-items:center;
    margin-bottom:15px;
}
.images_grid{
    display: flex;
    column-gap: 10px;
    align-items: center;
}
.image_check{
    position:absolute;
    top:0;
    right:0;
    // background: #dc2f5d;
    color: #000;
}
.image_check svg{
    color: #000; 
}
.post_images{
    min-height:200px;
    height: 200px!important;
}
#items_page{
    padding: 9px 14px!important;
    height:30px;
}
.store_name{
    font-weight: 600;
    font-size: 0.80rem;
    color: #000;
    padding: 7px 15px;
    margin: 10px 0px 0px 0px;
    background: #d9dfd2;
    position: absolute;
    top: -42px;
    border-radius: 0 0 15px 0;
}
.products_image_list{
    max-height: 295px;
    @media(max-width:767px){
        max-height: 220px;
    }
}
.list_products{
    width:40px;
    height:40px;
    margin-right:20px;
}

`
export default MyDiv
