import styled from 'styled-components'

const MyDiv = styled.div`
.card_header{
    padding: 16px 16px 0px 16px;
    align-items: center;
    @media(max-width:767px){
       // padding:16px 5px;
    }
}

.page_title{
    margin-bottom: 0;
    font-size: 0.9rem;
    font-weight: 600;
    color: #000;
    padding-left:15px;
    @media(max-width:767px){
        padding-left:25px;
     }
}
.page_date{
    margin-bottom: 0;
    font-size: 0.8rem;
    font-weight: 500;
    color: #65676b;
    padding-left:15px;
}
.page_icon{
   background-color:#283c86;
}
.preview_box .page_title{
    color: #000;
}
.mobile .page_title{
    padding-left: 20px;
    @media(max-width:767px){
        padding-left:25px;
     }
}
.mobile .page_date{
    padding-left: 20px;
}
.preview_box{
    box-shadow:none;
    border-radius:4px;
    border:1px solid #eee;
    width: 475px;
    max-width: 100%;
    margin: 0 auto;
    overflow: inherit;
    position:relative;
    &.mobile{
        box-shadow:none;
        border-radius:4px;
        border:1px solid #eee;
        width: 340px;
        max-width: 100%;
        margin: 0 auto;
    }
}
.product_description{
    font-weight:400;
    font-size: 0.80rem;
    padding-top:5px;
}
.product_title{
    font-weight: 500;
    font-size: 0.9rem;
}
.preview_box .product_description{
    color:#000;
}
.product_images {
    margin-top: 15px;
    margin-bottom: 15px;
    pointer-events: none;
}
.card_middle{
    padding: 16px 16px 0px 16px;
}
.left_icons{
    padding-left: 8px;
}
.icons_color svg{
    color:#65676b;
    fill:#65676b;
    cursor:pointer;
}
.share_icon svg{
    transform: scaleX(-1);
}
.mobile .more_icon{
    padding-left:0!important;
}
.card_bottom{
    border-top: 1px solid #efefef;
}
.comment_box{
    color: #8e8e8e;
    padding: 10px 15px;
    background: #eeee;
    border-radius: 18px;
}

.icon_box{
    display: flex;
    column-gap: 10px;
    justify-content: center;
    align-items:center;
}
.icon_name{
    color:#65676b;
    font-size:0.9rem;
}
.actions_box{
    padding: 5px 0px 10px 0px;
}
.networks{
    float: right;
    padding: 5px 0px;
    position: absolute;
    right: 0px;
    top: -40px;
}
#p_wrap {
    white-space: pre-line;
    padding: 0;
    margin:0;
  }
`
export default MyDiv
