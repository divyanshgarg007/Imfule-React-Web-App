import styled from 'styled-components'

const MyDiv = styled.div`
.product-card{
    background-color: #f7f7f7;
    border-radius: 17px;
    box-shadow: 0px 0 25px #d3d3d3;
}
.product-img img{
    width:100%;
    height: 150px;
    object-fit: contain;
}
.add_post{
    position:relative;
    padding:0;
}
.add_post button{
    position:absolute;
    right:0;
    top:0;
    width:35px;
    height:35px;
    background: #283c86;
    color:#fff;
}
.product_content{
    padding:0 0 0 0;
}
.product_content:last-child{
    padding-bottom:0px;
}
.product-title{
    overflow: hidden;
    font-size: 0.90rem;
    font-weight:700;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
            line-clamp: 2; 
    -webkit-box-orient: vertical;
    margin: 5px 10px 10px 10px;
}
.product-category{
    font-weight:500;
    font-size: 0.80rem;
    padding: 5px 10px 0 10px;
    @media(max-width:767px){
   
    }
}
.product-date{
    font-weight: 500;
    font-size: 0.80rem;
    padding: 10px 5px 10px 5px;
    margin: 10px 0px 0px 0px;
    background: #d9dfd2;
    @media(max-width:767px){
        padding: 5px 10px;
    }
}

`
export default MyDiv
