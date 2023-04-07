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
    margin-top: 16px;
}
.store_names{
    font-size:0.9rem;
    color:#000;
    font-weight:600;
}
.listing_cards{
    box-shadow:none;
    width: 25%;
    @media(max-width:767px){
        width: 48%;
    }
}
.listing_store_box{
    display:flex;
    align-items:center;
    justify-content:center;
    column-gap:10px;
    flex-wrap: wrap;
    row-gap:10px;
    @media(max-width:767px){
        justify-content: flex-start;
    }
}
.close_listing{
    position: absolute;
    right: 0;
    top: 0;
    color:#283c86;
}
`
export default MyDiv
