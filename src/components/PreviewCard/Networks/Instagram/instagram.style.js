import styled from 'styled-components'

const MyDiv = styled.div`
.card_header{
    padding: 16px 16px 0px 16px;
    align-items: center;
    @media(max-width:767px){
       // padding:16px 5px;
    }
}
.custom-avatar{
    color: #fff;
    background-color: #000;
}
.mobile .custom-avatar{
    color: #000;
    background-color: #fff;
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
    color: #fff;
    padding-left: 20px;
    font-size: 0.9rem;
    @media(max-width:767px){
        padding-left:25px;
     }
}
.mobile .page_date{
    color: #b7b7b7;
    padding-left: 20px;
    font-size: 0.8rem;
}
.mobile .product_title{
    color:#fff;
    // font-size: 0.9rem;
}
.preview_box{
    box-shadow:none;
    border-radius:4px;
    border:1px solid #eee;
    width: 475px;
    max-width: 100%;
    margin: 0 auto;
    overflow: inherit;
    position: relative;
    &.mobile{
        box-shadow:none;
        border-radius:4px;
        border:1px solid #eee;
        width: 340px;
        max-width: 100%;
        margin: 0 auto;
        background-color: #000;
    }
}
.networks{
    float: right;
    padding: 5px 0px;
    position: absolute;
    right: 0px;
    top: -40px;
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
.mobile .product_description{
    color:#fff;
    // font-size: 0.8rem;
}
.product_images img{
    padding:1px;
    width:100%;
    margin-top:15px;
}
.card_middle{
    padding: 8px 16px;
    padding-bottom:12px!important;
}
.left_icons{
    display: flex;
    justify-content: start;
    align-items: center;
    column-gap: 15px;
    padding-left: 7px;
}
.right_icons{
    display: flex;
    justify-content: end;
    padding-right: 9px;
}
.icons_color svg{
    color:#262626;
    fill:#262626;
    cursor:pointer;
}
.mobile .icons_color svg{
    color:#fff;
    fill:#fff;
}
.mobile .more_icon{
    padding-left:0!important;
}
.mobile .more_icon svg{
    color:#fff;
}
.card_bottom{
    border-top: 1px solid #efefef;
}
.comment_box{
    color: #8e8e8e;
}
.mobile .right_icons a{
    color:#fff!important;
    font-size:0.9rem;
}
#p_wrap {
    white-space: pre-line;
    padding: 0;
    margin:0;
  }
`
export default MyDiv
