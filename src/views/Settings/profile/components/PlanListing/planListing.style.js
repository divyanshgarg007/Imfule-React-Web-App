import styled from 'styled-components'

const MyDiv = styled.div`
.planCard{
    background-color: #fff;
    border-radius: 5px;
    box-shadow: 0px 0 25px #d3d3d3;
    padding: 20px 20px;
    border: 1px solid #dbdbdb;
    margin: 0px 0 30px 0;
    @media(max-width:767px){
        margin: 0px 0 20px 0;
    }
}
.planTitle{
    color: #000;
    font-weight: 600;
    font-size: 1.3rem;
    margin-bottom: 10px;
}
.planPrice{
    font-size: 1.1rem;
    font-weight: 500;
    color: #283c86;
    margin-bottom: 0px;
}
.attributeName{
    color: #000;
    font-weight: 500;
    font-size: 0.9rem;
}
.planItems{
    padding: 0;
    display:block;
}
.listInfo{
    margin-bottom: 15px;
}
.listInfo span{
    display:flex;
    align-items: center;
    justify-content: space-between;
}
.purchaseBtn{
    margin-top:20px;
}

`
export default MyDiv
