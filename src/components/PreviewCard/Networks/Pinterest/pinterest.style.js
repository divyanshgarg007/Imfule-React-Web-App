import styled from 'styled-components'

const MyDiv = styled.div`
.card_header{
    padding: 0px;
    align-items: center;
    @media(max-width:767px){
       // padding:16px 5px;
    }
}

.mobile .page_date{
    padding-left: 20px;
}
.preview_box{
    box-shadow:none;
    border-radius:15px;
    box-shadow: rgb(0 0 0 / 10%) 0px 1px 20px 0px;
    width: 475px;
    max-width: 100%;
    margin: 0 auto;
    overflow: inherit;
    position:relative;
    padding: 15px;
    &.mobile{
        box-shadow:none;
        border-radius:15px;
        box-shadow: rgb(0 0 0 / 10%) 0px 1px 20px 0px;
        width: 340px;
        max-width: 100%;
        margin: 0 auto;
        padding: 15px;
    }
}
.product_description{
    font-weight:400;
    font-size: 0.80rem;
    padding-top:5px;
    color:#000;
    word-break: break-all;
}
.product_title{
    font-weight: 600;
    font-size: 0.9rem;
}
.product_images {
    line-height: 0;
}
.product_images img{
    width: 100%;
    border-radius: 10px;
}
.card_middle{
    padding: 0px!important;
}
#p_wrap {
    white-space: pre-line;
    padding: 0;
    margin:0;
  }
`
export default MyDiv
