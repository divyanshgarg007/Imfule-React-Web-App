import styled from 'styled-components'

const MyDiv = styled.div`
.welcome_img{
  padding:0;
  display: flex;
      align-items: center;
      justify-content: center;
    }
    .welcome_img img{
      max-width: 100%;
    }

  .left-bar {
    width: 100%;
    height: 100%;
    // background: linear-gradient(to top, #0d2451, #4475d5);
    background: #eee;
  }
  .custom-card {
    width: 100%;
    margin: 0 auto;
    box-shadow: none;
    background-color: transparent;
    // background-color: #eef7ff;
    @media (max-width: 767px) {
      width: 100%;
      box-shadow: none;
    }
  }
  .auth-image {
    height:52rem;
}
  .login-image {
    justify-content: center;
    text-decoration: none;
  }
  .login-image img {
    // max-width: 50px;
    // margin: 10px 0 0 0;
    width: auto;
    cursor:pointer;
    height: 75%;
  }
  .custom-card-body {
    // background:#fff;
    padding: 0px 16px 16px 16px;
    // width: 75%;
    margin: 20px 0 0 0;
  }
  .separate {
    background: #000;
    color: #fff;
    font-size: 0.9rem;
  }

  .left-side{
    // box-shadow: 0px 0 25px #ccc;
    border-top-left-radius: 20px;
    border-bottom-left-radius: 20px;
    background: #f4f5f7;
    height:52rem;
    box-shadow: 0px 0 25px #ccc;
    display: flex;
    align-items: center;
    justify-content: center;
    @media (max-width: 767px) {
      border-top-left-radius: 0px;
      border-bottom-left-radius: 0px;
      background: transparent;
      box-shadow: none;
    }
  }
  .signin_subheading{
    font-family: 'Poppins', sans-serif;
    font-size: 0.9rem;
    font-weight:500;
  }
  .signin_heading{
    font-family: 'Poppins', sans-serif;
    font-size: 1.3rem;
  }
  .text-font{
    font-family: 'Poppins', sans-serif;
    text-transform: capitalize;
  }

  .sign_in{
    flex: 0 0 80%;
    @media (max-width: 767px){
      flex: 0 0 90%;
    }
    @media (min-width: 768px) and (max-width:1024px){
      flex: 0 0 100%;
    }
  }
  .auth-container{
    height:100vh;
    align-items:center;
    justify-content:center;
    background: rgb(245 249 238);
  }
.custom-separate{
  margin:20px 0 0 0;
}
input{
  -webkit-box-shadow: 0 0 0 30px #f5f8fa inset !important;
}
input:-webkit-autofill,
input:-webkit-autofill:hover, 
input:-webkit-autofill:focus, 
input:-webkit-autofill:active
{
    -webkit-box-shadow: 0 0 0 30px white inset !important;
}
// input:-webkit-autofill:hover
// {
//   -webkit-box-shadow: 0 0 0 30px red inset !important;
// } 
input:-webkit-autofill:focus{
  -webkit-box-shadow: 0 0 0 30px #eef3f7 inset !important;
}
input:-webkit-autofill:active{
  -webkit-box-shadow: 0 0 0 30px #eef3f7 inset !important;
}
`
export default MyDiv
