import styled from 'styled-components'

const MyDiv = styled.div`
.rdw-editor-main{
    height: 200px;
}
.custom_editor textarea{
    resize: none;
}
.add_field{
    border: 1px solid #eee;
    padding: 4px 0px;
    height: fit-content;
    margin-left: 4px;
        margin-bottom: 4px;
        margin-top: 0px;
}
.add_field:hover{
    background-color: #283c86!important;
    color:#fff!important;
}
.add_field:active{
   box-shadow:none;
}
.counter_heading{
    margin-bottom: 0;
    font-size: 0.8rem;
    font-weight: 400;
    color: #333;
    text-align: right;
}
`
export default MyDiv
