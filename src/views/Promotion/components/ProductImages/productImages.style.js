import styled from 'styled-components'

const MyDiv = styled.div`
.products_imageLists{
    margin-bottom:15px;
    display: grid;
    overflow-y: auto;
    list-style: none;
    padding: 0;
    grid-template-columns: repeat(6, 1fr)!important;
    gap: 30px!important;
    @media(max-width:767px){
        grid-template-columns: repeat(2, 1fr)!important;
    }
}
.product-title{
    font-size: 0.90rem;
    font-weight: 700;
    color:#000;
    margin-top:15px;
}
.load_btn{
    display: flex;
  justify-content: center;
  align-items: center;
}
.load_btn button{
   padding:5px 15px;
}
.empty_box {
    width: 50%;
    position: relative;
    margin: auto;
}
`
export default MyDiv
