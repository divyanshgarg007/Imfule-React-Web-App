import styled from 'styled-components'

const MyDiv = styled.div`
background-color: #f4f5f7;
.no-scroll{
    overflow:hidden;
    text-align:center;
}
.center{
    text-align:center;
    padding: 16px 24px 0!important;
}
.custom_dialog_action{
    padding: 0px 24px 24px;
}
.store_image{
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 24px;
}
.store_image img{
    max-width: 60px;
}
.custom_dialog_action .Mui-disabled{
    color: #7e818f;
}
`
export default MyDiv
