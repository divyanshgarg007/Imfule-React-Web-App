import styled from 'styled-components'

const MyDiv = styled.div`
.action_button{
    background: linear-gradient(to right, #2a2653, #ef305e);
    font-size: 0.9rem!important;
  }
  .action_button_outlined{
    background: transparent;
    border:1px solid #283c86!important;
    color: #283c86!important;
    font-size: 0.9rem!important;
  }
  .disable_action{
    background: #eee;
    color: #333!important;
    font-size: 0.9rem!important;
    text-transform: capitalize!important;
  }
  .disable_action:hover{
    background: #eee!important;
    color: #333!important;
    font-size: 0.9rem!important;
    text-transform: capitalize!important;
  }
  .progress_text{
    padding-left:10px;
  }
  .progress_icon{
    color: #283c86;
  }
`
export default MyDiv
