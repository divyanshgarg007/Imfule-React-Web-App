import styled from 'styled-components'

const MyDiv = styled.div`
.mb-2{
    margin-bottom:17px;
  }
  .mb-0{
    margin-bottom:0px;
  }
  .placeholder_text input{
    font-size:0.9rem;
  }
  input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type=number] {
  -moz-appearance: textfield;
}
`
export default MyDiv
