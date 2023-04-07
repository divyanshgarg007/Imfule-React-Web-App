import styled from 'styled-components'

const MyDiv = styled.div`
.no-scroll{
    overflow:hidden;
}
.center{
    text-align:center;
    font-size:25px;
}
.icon-right{
    position: absolute;
    right: 12px;
    top: 16px;
}

.edit_grid{
    padding: 0px 0px 15px 0px;
    align-items: center;
}
.details_title{
    margin-bottom: 0;
    font-size: 1.3rem;
    font-weight: 600;
    color: #000;
}
.details_actions{
    float:right;
    padding: 0px;
    @media(max-width:767px){
        padding:0;
        margin: 0;
    }
}
.icon_btn{
    color: #283c86;
}
.close_icon {
    float:right;
    padding: 0px;
}
.close_icon button{
    color: #283c86;
}
// .preview_grid_box{
//     padding-top: 0px!important;
//     @media(max-width:767px){
//             padding-top:0px!important;
//     }
//     @media(min-width:768px) and (max-width:1023px){
//         padding-top:0px!important;
// }
// }
.preview_title{
    font-weight: 600;
    font-size: 0.80rem;
    color: #000;
    padding: 7px 15px;
    position: absolute;
    top:-33px;
    margin: 0px 24px;
    background: #d9dfd2;
    border-radius: 0 0 15px 0;
    @media(max-width:767px){
        margin: 0px;
        top: 0;
    }
    @media(min-width:768px) and (max-width:1023px){
        margin: 0px;
        top: 0;
    }
}
.preview_box_head{
    position:relative;
    @media(max-width:767px){
        border-width: 0;
        border-style: solid;
        border-color: rgba(0, 0, 0, 0.12);
        border-bottom-width: thin;
        margin-top: 30px;
}
@media(min-width:768px) and (max-width:1023px){
    border-width: 0;
    border-style: solid;
    border-color: rgba(0, 0, 0, 0.12);
    border-bottom-width: thin;
    margin-top: 30px;   
}
`
export default MyDiv
