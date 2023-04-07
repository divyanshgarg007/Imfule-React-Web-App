import styled from 'styled-components'

const MyDiv = styled.div`
.picker_custom{
    width:220px;
}
.picker_custom input{
    padding: 8.5px 10px!important;
    cursor: pointer;
}
.time_grid{
    padding:0px 16px 20px;
    margin-top: -35px;
}
.custom-media-select .MuiSelect-select{
    font-size: 0.9rem;
}
.timeZone_form{
    width:140px;
    @media(max-width:767px){
        width:100%;
    }
}
.timezone_box .MuiFormControl-root input{
    font-size: 0.9rem;
    height: auto;
    min-height: 1.4375em;
}
.timezone_box button{
    display:none;
}
.dateTime_btn{
    display:flex;
    align-items:center;
    background: transparent;
    border: 1px solid #283c86;
    border-radius: 4px;
}
.dateTime_btn svg{
    color: #283c86;
    cursor:pointer;
    margin-right:10px;
    font-size: 1.4rem;
}
.action_button_date_time{
    border: none!important;
    text-transform: capitalize!important;
    font-size: 0.9rem;
    color: #283c86;
}

`
export default MyDiv
