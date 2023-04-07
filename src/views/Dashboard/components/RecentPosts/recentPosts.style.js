import styled from 'styled-components'

const MyDiv = styled.div`
.latest_products_card{
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0px 0 25px #d3d3d3;
    padding-bottom: 10px;
}
.latest_card_header{
    padding:16px 16px 0px 16px;
}
.latest_card_title{
    color: #000;
    font-weight: 600;
    font-size: 1.1rem;
    margin-bottom: 0.15rem;
}
.latest_card_subtitle{
    font-size: 0.9rem;
    font-weight: 400;
    color: #65676b;
    margin-bottom: 10px;
}
.latest_card_list{
    padding-top: 10px;
}
.pending{
    color: #ffc700;
    background-color: #fff8dd;
    font-family: Poppins,sans-serif;
}
.reject{
    color: #cb1111;
    background-color: #fff5f8;
    font-family: Poppins,sans-serif;
}
.success{
    color: #50cd89;
    background-color: #e8fff3;
    font-family: Poppins,sans-serif;
}
.error_post{
    color: #f1416c;
    background-color: #fff5f8;
    font-family: Poppins,sans-serif;
}
.latest_card_list button{
    color: #283c86;
    margin:0;
}
.product_list_info a{
    text-decoration: none;
}
.product_list_info h5{
    color: #000;
    font-weight: 600;
    font-size: 0.9rem;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    line-clamp: 1;
    -webkit-box-orient: vertical
}
.product_list_info p{
    font-size: 0.8rem;
    font-weight: 400;
    color: #65676b;
    font-family: 'Poppins',sans-serif;
    text-transform: capitalize;
}
.empty_box_inner{
    width:60%;
    position: absolute;
    left: 20%;
    top: 29%;
}
.empty_box{
    height:300px;
}
`
export default MyDiv
