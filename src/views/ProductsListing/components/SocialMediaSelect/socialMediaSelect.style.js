import styled from 'styled-components'

const MyDiv = styled.div`
.action_icon{
    width: 40px;
    height: 40px;
    background: rgb(238, 238, 238);
    color: rgb(40, 60, 134);
    margin-top: 22px;
    margin-left: 0px;
}
.action_icon:hover {
    background: #e9e9e9;
}
.add-btn{
    width: 40px;
    height: 40px;
    background: #eee;
    color: #283c86;
    // float:right;
}
.add-btn:hover {
    background: #e9e9e9;
}
.custom-media-select .MuiSelect-select{
    padding: 9px 14px!important;
}
.custom-media-select .MuiSelect-select img{
    max-width:25px;
}
.slice_network_name .MuiSelect-select h6{
    white-space: nowrap; 
  width: 68%; 
  overflow: hidden;
  text-overflow: ellipsis; 
  @media(max-width:767px){
    width: 50px; 
}
@media only screen 
  and (min-device-width: 1024px) 
  and (max-device-width: 1366px) 
  and (-webkit-min-device-pixel-ratio: 2){
    width: 45px; 
  }
}
.slice_page_name .MuiSelect-select h6{
    white-space: nowrap; 
    width: 68%;
  overflow: hidden;
  text-overflow: ellipsis; 
  @media(max-width:767px){
    width: 85px; 
}
@media only screen 
  and (min-device-width: 1024px) 
  and (max-device-width: 1366px) 
  and (-webkit-min-device-pixel-ratio: 2){
    width: 100%; 
  }
}
.custom-media-select .MuiSelect-select{
  border:1px solid #cccc;
}
.highlight_select .custom-media-select .MuiSelect-select{
  background: #d9dfd2;
}
.delete_media{
  color: #283c86;
  margin-top:17px;
}
`
export default MyDiv
