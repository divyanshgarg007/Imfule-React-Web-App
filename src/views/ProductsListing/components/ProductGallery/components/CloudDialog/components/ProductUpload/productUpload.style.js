import styled from 'styled-components'

const MyDiv = styled.div`

.image_check{
    position:absolute;
    top:3px;
    right:3px;
    width: 25px;
    height: 25px;
    background: #ffffff;
    box-shadow: 1px 1px 7px #979797;
}
.image_check svg{
    color: #000; 
    font-size:1rem;
}
.image_check:hover{
    background: #fff;
    box-shadow: 1px 1px 7px #979797;
}
.post_images{
    height: 200px!important;
    object-fit:cover;
}
.products_image_list{
    display: grid;
    overflow-y: auto;
    list-style: none;
    margin:0;
    padding: 0;
    grid-template-columns: repeat(3, 1fr)!important;
    gap: 30px!important;
    @media(max-width:767px){
        grid-template-columns: repeat(2, 1fr)!important;
    }
}
.delete_image{
    position: absolute;
    top: 25%;
    right: 3px;
    width: 25px;
    height: 25px;
    background: #ffffff;
    box-shadow: 1px 1px 7px #979797;
    color: #000;
}
.delete_image svg{
    font-size:1rem;
}
.delete_image:hover{
    background: #fff;
    box-shadow: 1px 1px 7px #979797;
}
`
export default MyDiv
