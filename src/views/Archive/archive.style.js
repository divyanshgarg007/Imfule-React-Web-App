import styled from 'styled-components'

const MyDiv = styled.div`
.scheduled_box{
    margin: 48px 0 70px 0;
    @media(max-width:767px){
        margin: 40px 0 60px 0;
    }
}
.scheduled_heading{
    color: #000;
    font-weight: 600;
    font-size: 1.3rem;
}
.scheduled_inner{
    margin-bottom: 15px;
}
.scheduled_table_heading{
    font-size:1rem;
    @media(max-width:767px){
        font-size:1rem;
    }
}
.inner_table_heading{
    font-size:0.9rem;
    @media(max-width:767px){
        font-size:0.9rem;
    }
}
.image_data{
    line-height:0;
    width:15%;
    @media(max-width:767px){
        width:100%;
    }
    @media(min-width:767px) and (max-width:1023px){
        width:25%;
    }
}
.image_data img{
    max-width:60px;
    height: 60px;
    object-fit: cover;
}
.ln-height{
    line-height:0;
}
.schedule_head{
    color: #000;
    font-weight: 600;
    font-size: 1rem;
}
.action_delete{
    color:#283c86;
}
.wrap_text_line{
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    line-clamp: 3;
    -webkit-box-orient: vertical;
    padding: 0;
    width: 100%;
    margin-left: -25px;
    @media(max-width:767px){
        margin-left: 0px;
        -webkit-line-clamp: 2;
    line-clamp: 2;
    padding-right: 15px;
    }
    @media(min-width:767px) and (max-width:1023px){
        margin-left: 0px;
        -webkit-line-clamp: 2;
    line-clamp: 2;
    }
}
.product-info-tab{
    display:flex;
    align-items:center;
}
.success_post{
    color: #50cd89;
    background-color: #e8fff3;
    font-family: Poppins,sans-serif;
}
.error_post{
    color: #f1416c;
    background-color: #fff5f8;
    font-family: Poppins,sans-serif;
}
.view_post{
    color: #283c86;
    background-color: #e3e8ff;
    font-family: Poppins,sans-serif;
}
.view_post:hover{
    color: #fff;
    background-color: #283c86;
}
.load_btn{
    display: flex;
  justify-content: center;
  align-items: center;
}
.load_btn button{
   padding:5px 15px;
}

.table_date{
    width: 15%;
    @media(max-width:767px){
        width:35%;
      }
}
.table_action{
    width: 10%;
    @media(max-width:767px){
        width:21%;
      }
}
.empty_box_inner{
    width:30%;
    position:absolute;
    left:50%;
    top:50%;
    transform: translate(-50%, -50%);
}
.empty_box{
    height:60vh;
}
`
export default MyDiv
