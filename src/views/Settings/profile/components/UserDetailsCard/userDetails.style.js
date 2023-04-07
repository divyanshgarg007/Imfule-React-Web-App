import styled from 'styled-components'

const MyDiv = styled.div`
.user-img img{
    max-width: 150px;
    border-radius: 10px;
    margin-left:24px;
    @media(max-width:767px){
        margin-left:15px;
    }
}
.forget-btn{
    float: right;
     margin-right: 25px;
     @media(max-width:767px){
        margin-left: 8px;
        float: left;
    }
    @media(min-width:768px) and (max-width:1023px){
        margin-left: 8px;
        float: left;
    }
   }
   .user_card{
    background-color: #f7f7f7;
    border-radius: 5px;
    box-shadow: 0px 0 10px #d3d3d3;
   }
   .profile_name{
    font-size:1rem;
    font-weight:500;
    color:#000;
   }
`
export default MyDiv
