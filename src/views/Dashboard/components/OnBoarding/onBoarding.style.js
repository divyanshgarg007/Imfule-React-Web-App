import styled from 'styled-components'

const MyDiv = styled.div`
.onboarding_card{
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0px 0 25px #d3d3d3;
    padding-bottom: 10px;
}
.onboarding_card_header{
    padding:16px 16px 0px 16px;
}
.onboarding_card_title{
    color: #000;
    font-weight: 600;
    font-size: 1.1rem;
    margin-bottom: 0.15rem;
}
.onboarding_card_subtitle{
    font-size: 0.9rem;
    font-weight: 400;
    color: #65676b;
    margin-bottom: 10px;
}
.onboarding_card_list{
    padding-top: 10px;
    padding-left: 16px;
    padding-right: 16px;
}
.config_btn{
    background: linear-gradient(to right,#2a2653,#ef305e);
    padding: 5px 10px;
    border-radius: 4px;
    display: inline-block;
    text-align: center;
}
.config_btn a{
    text-decoration:none;
}
.config_btn p{
    color:#fff;
    font-size:0.8rem;
}
.steps-heading .MuiStepLabel-label{
    color: #000;
    font-weight: 600;
    font-size: 0.9rem;
    font-family: 'Poppins',sans-serif;
    text-transform: capitalize;
}
.steps-heading .Mui-active{
    color: #283c86!important; 
}
.steps-heading .MuiSvgIcon-root {
    color: #000;
    font-family: 'Poppins',sans-serif;
    text-transform: capitalize;
}
.completed .steps-heading .MuiStepLabel-label{
    color: #007837!important; 
}
.completed .steps-heading .MuiSvgIcon-root{
    color: #007837!important; 
}
.product_list_info a{
    text-decoration: none;
}
.product_list_info a h5:hover{
    color: #283c86;
}
.product_list_info h5{
    color: #000;
    font-weight: 600;
    font-size: 0.9rem;
    // margin-bottom: 0.15rem;
    font-family: 'Poppins',sans-serif;
    text-transform: capitalize;
}
.product_list_info p{
    font-size: 0.8rem;
    font-weight: 400;
    color: #65676b;
    font-family: 'Poppins',sans-serif;
    text-transform: capitalize;
}
`
export default MyDiv
