import styled from 'styled-components'

const MyDiv = styled.div`
.content-body{
    padding:0px;
}
.btn-right{
    float:right;
    @media(max-width:767px){
        float:left;
    }
}
.custom-content{
    padding:16px!important
}
// .custom-content .channel-username{
//     margin-bottom:0;
//     text-align:center;
//     margin-top:4px;
// }
.channel-icon{
    padding: 6px;
        margin-top: 5px;
}
.setting-icon{
    padding:16px;
    margin-top: 4px;    
    float:right;
}
// .custom-contents .channel-username{
//     margin-bottom:0;
//     text-align:center;
//     margin-top:4px;
// }


.btn-setting{
    margin:0;
    padding:0;
}
// .social-icon{
//     font-size: 40px;
// }
// .fb-color{
//     color:#1877f2;
// }
// .insta-color{
//     color:#E1306C;
// }
.edit_grid{
    padding: 10px 0px;
    align-items: center;
}
.social_title{
    margin-bottom: 0;
    font-size: 1.3rem;
    font-weight: 600;
    color: #000;
    @media(max-width:767px){
        font-size: 1.1rem;
    }
}
.social_heading{
    margin-bottom: 0;
    font-size: 1.1rem;
    font-weight: 500;
    color: #000;
    @media(max-width:767px){
        font-size: 0.8rem;
    }
}
.social_subheading{
    margin-bottom: 0;
    font-size: 0.9rem;
    font-weight: 500;
    color: #000;
}
.channel_name_area{
    padding:0px 12px 15px 12px!important;
}
.channel_name{
    font-size: 1rem;
    font-weight: 500;
    color: #283c86;
    margin-bottom:0;
    text-align:center;
}
.channel_icons_area{
    padding:15px 0 10px 0;
    align-item:center;
    justify-content:center;
    display:flex;
    column-gap: 15px;
}
.social_card{
    background-color: #f7f7f7;
    border-radius: 15px;
    box-shadow: 0px 0 25px #d3d3d3;
   
}
.social_card button{
    min-height: 110px;
}

.profile_actions{
    float:right;
    padding: 8px 0 8px 8px;
    @media(max-width:767px){
        padding:0;
        float:none;
        margin: 1rem 0rem 1rem 0;
    }
}
.channel_box_split{
    display: flex;
    justify-content: center;
    align-items: center;
}
.channel_box{
    border: 1px solid #c3cad2;
    box-shadow: none;
    margin-bottom:15px!important;
    border-radius:10px!important;
}
.channel_box::before{
    background-color: transparent;
}
.channel_top_header .MuiAccordionSummary-content{
    column-gap: 15px;
    align-items: center;
    justify-content: space-between;
    margin:0;
}
.channel_image_area{
    margin-top:6px;
}

.icon_btn{
    color: #283c86;
}
.icon_btn .Mui-checked{
    color: #2e7d32;
}
.icon_btn .Mui-checked+.MuiSwitch-track{
    background-color: #2e7d32;
}
.check_icon_btn{
    margin:0;
}
.check_icon_btn .Mui-checked{
    color: #2e7d32;
}
.check_icon_btn .Mui-checked+.MuiSwitch-track{
    background-color: #2e7d32;
}
.table_heading{
    font-size:1rem;
    @media(max-width:767px){
        font-size:1rem;
    }
}
.mr-3{
    margin-right:20px;
    @media(max-width:767px){
        margin-right:0px;
    }
}
`
export default MyDiv
