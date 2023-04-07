import styled from 'styled-components'

const MyDiv = styled.div`
.content-body{
    padding:0px;
}
// .category-btn{
//     display:flex;
//     column-gap:20px;
// }
.edit_grid{
    padding: 10px 0px;
    align-items: center;
}
.detail_heading{
    margin-bottom: 0;
    font-size: 1.3rem;
    font-weight: 600;
    color: #000;
    @media(max-width:767px){
        font-size: 1.1rem;
    }
}
.profile_actions{
    float:right;
    padding: 8px 0 8px 8px;
    @media(max-width:767px){
        padding:0;
        margin: 1rem 0rem 1rem 0;
    }
}
.table_heading{
    font-size:1rem;
    @media(max-width:767px){
        font-size:1rem;
    }
}
.icon_btn{
    color: #283c86;
}
.custom-media-select .MuiSelect-select{
    font-size: 0.9rem;
    font-weight: 500;
    color: #000;
}
.btns_group{
    display: flex;
    justify-content: center;
    align-items: center;
    column-gap: 10px;
}
.sync_btn{
    background: transparent;
    border: 1px solid #283c86;
    color: #283c86;
    text-transform: capitalize!important;
    font-size: 0.9rem;
    width:128px;
}
.sync_btn:hover{
    background: transparent;
}
.success{
    color: #50cd89;
    background-color: #e8fff3;
    border-radius: 16px;   
    font-size:0.9rem;
    padding: 3px 0;
}
.failed{
    color: #cb1111;
    background-color: #fff5f8;
    border-radius: 16px;   
    font-size:0.9rem;
    padding: 3px 10px;
}
.timezone_box .MuiAutocomplete-input{
    width:100%!important;
}
.timezone_box .MuiFormControl-root input{
    font-size: 0.9rem;
    font-weight: 500;
    color: #000;
}
.timezone_box button{
    display:none;
}
.go_link{
    position: relative;
}
.go_link svg{
    color: #283c86;
    position: absolute;
    top: 21px;
    cursor:pointer;
}
.empty_box_inner{
    width: 30%;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    @media(max-width:767px){
        width: 100%;
    }
    @media(min-width:768px) and (max-width:1023px){
        width: 50%;
    }
}
.empty_box{
    height:300px;
}
.disable_sync{
    background: #eee;
    color: #333!important;
}
`
export default MyDiv
