import styled from 'styled-components'

const MyDiv = styled.div`
.empty_box{
    width:100%;
    position:relative;
}
.empty_box_inner{
    
    border: 1px dashed #2a2653;
    border-radius:5px;
    background: #eceffb;
    padding:30px;
    @media(max-width:767px){
      width:100%;
    }
    @media(min-width:768px) and (max-width:1023px){
        width:55%;
      }
}
.empty_msg{
    text-align: center;
    color: #333;
}
.schedule_btn{
    display: flex;
    justify-content: center;
    margin-top:20px;
}

// .schedule_btn button:hover{
//     background: linear-gradient(to right,#2a2653,#ef305e);
//     color: #fff!important;
//     border:1px solid #eceffb!important;
// }
`
export default MyDiv
