import styled from 'styled-components'

const MyDiv = styled.div`
  .welcome_img{
    align-items: center;
    justify-content: center;
    display: flex;
  }
  .sign_in {
    margin-top: 50px;
  }
  .left-bar {
    width: 100%;
    height: 100%;
    // background: linear-gradient(to top, #0d2451, #4475d5);
    background: #eee;
  }
  .custom-card {
    width: 70%;
    margin: 0 auto;
    // background-color: #eef7ff;
    @media (max-width: 767px) {
      width: 100%;
    }
  }
  
  .login-image {
    justify-content: center;
  }
  .login-image img {
    max-width: 50px;
    margin: 0 auto;
    display: table-cell;
  }
  .custom-card-body {
    // background:#fff;
    padding: 0px 16px 16px 16px;
    margin-top:20px;
  }
  .separate {
    background: #000;
    color: #fff;
  }
`
export default MyDiv
