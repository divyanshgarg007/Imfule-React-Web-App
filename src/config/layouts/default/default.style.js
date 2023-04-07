import styled from 'styled-components'

const MyDiv = styled.div`
  .grow {
    flex-grow: 1;
  }
  .logo {
    height: 34.4px;
    width: 34.4px;
    margin: 40px 0px 301px 22.52px;
    background: rgba(255, 255, 255, 0.2);
    border-radius: 50%;
  }
  .selectedMenu{
    color: #F64C70!important;
  }
  .site-layout .site-layout-background {
    background: #fff;
    padding: 0px!important;
  }
  .ant-layout-sider{
    overflow: auto;
    height: 100vh;
    position: fixed;
    width: 220px!important;
    min-width: 220px!important;
    max-width: 220px!important;
    left: 0;
  }
  .ant-layout-content{
    margin-left: 20px!important;
    background-color: #FFFFFF;
    padding: 40px;
  }
  .ant-menu-item-selected{
    background-color: inherit!important;
    color: inherit!important;
  }
`
export default MyDiv
