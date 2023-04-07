import styled from 'styled-components'

const MyDiv = styled.div`
.fc-timegrid-slot{
    height:100px;
    cursor: pointer;
}
.fc-v-event{
    height:65px;
    border:none!important;
    padding: 3px 0px 0px 5px;
    margin: 1px 0px 0px 6px;
}
.scheduled{
    background-color:#283c86!important;
}
.archive{
    background-color:#62a832!important;
}
.fc .fc-popover{
    z-index: 1;
}
.fc-scroller{
    position:relative!important;
}
.fc-timegrid-event-harness{
    width: 100%;
    height: auto;
    position: relative !important;
    left: 0% !important;
    margin-right: 0% !important;
}
.fc-direction-ltr .fc-timegrid-more-link{
    display: inline-table;
    margin-top: 70px;
}
.event_info h5{
    color: #fff;
    font-weight: 600;
    font-size: 0.7rem;
    font-family: 'Poppins',sans-serif;
    text-transform: capitalize;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    line-clamp: 1;
    -webkit-box-orient: vertical
}
.event_info p{
    color: #fff;
    font-weight: 600;
    font-size: 0.7rem;
    font-family: 'Poppins',sans-serif;
    text-transform: capitalize;
}
.event_list li{
    padding:8px 0 0;
    max-width:70%;
}
.event_list .event_img img{
    width:35px;
    height:35px;
}
.event_img {
   margin-right:4px;
   min-width:auto;
}
.action_icon{
    width: 40px;
    height: 40px;
    background: transparent;
    color: #fff;
    margin-left: 0px;
}
fc-timegrid-bg-harness:hover{
    background-color: green;
}
.fc-button-group .fc--button{
    display:none;
}
.fc-timeGridWeek-button{
    border-radius: 0.25em!important;
}
.fc-toolbar-title{
    font-family: 'Poppins', sans-serif!important;
    font-size:1.4rem;
    @media(max-width:767px){
        font-size:1.2rem;
    }
}
.share_icon{
    color:#fff;
}
.action_events{
    display:flex;
    flex-direction:column;
    max-width:30%;
    position:absolute;
    top:4px;
    right:4px;
    row-gap:10px;
}
.reshare_events{
    max-width:30%;
    position:absolute;
    top:35%;
    right:4px;
}
`
export default MyDiv
