import styled from 'styled-components'

const MyDiv = styled.div`
.custom-form-control{
    width:96%;
    margin-left:8px;
    @media(max-width:767px){
        width:96%;
        margin-left:4px;
    }
}
.product_listing_box{
    margin-top:48px;
}
.product-heading{
    color: #000;
    font-weight: 600;
    font-size: 1.3rem;
}
.product-box{
    display:flex;
    justify-content:center;
    align-items:center;
}
#categories{
    padding: 9px 14px!important;
    font-size: 0.9rem;
    color: #000;
}
#sorting{
    padding: 9px 14px!important;
    font-size: 0.9rem;
    color: #000;
}
.empty_box_inner{
    width:30%;
    position:absolute;
    left:50%;
    top:50%;
    transform: translate(-50%, -50%);
    @media(max-width:767px){
        width:100%;
    }
}
.empty_box{
    height:60vh;
    @media(max-width:767px){
        height:40vh;
    }
}
.product_listing_cal{
    margin-left:0;
    @media(max-width:767px){
        margin-left:-4px;
    }
}
.load_btn{
    display: flex;
  justify-content: center;
  align-items: center;
}
.load_btn button{
   padding:5px 15px;
}

`
export default MyDiv
