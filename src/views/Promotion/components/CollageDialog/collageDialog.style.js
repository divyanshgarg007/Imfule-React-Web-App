import styled from 'styled-components'

const MyDiv = styled.div`
.close_cloud{
    position: absolute;
    right: 20px;
    top: 26px; 
}
.close_cloud svg{
    color: #283c86;
    cursor:pointer;
}

.collage_check{
    position:absolute;
    top:3px;
    right:3px;
    width: 25px;
    height: 25px;
    background: #ffffff;
    box-shadow: 1px 1px 7px #979797;
}
.collage_check svg{
    color: #000; 
    font-size:1rem;
}
.collage_check:hover{
    background: #fff;
    box-shadow: 1px 1px 7px #979797;
}
.collage_imageBox{
position:relative;
gap: 0px!important;
}

.collage_share_btn{
    display: flex;
    align-items: center;
    justify-content: end;
    margin:30px 6px;
    // position:absolute;
    // left: 50%;
    // top: 50%;
    // transform: translate(-50%, -50%);
}
// .container-grid{
//     display:grid;
//     grid-template-columns: 1fr 1fr;
//     grid-template-rows: 1fr 1fr;
//     row-gap:2px;
//     column-gap:2px;
//     padding:2px;
//     height: 320px;
//     width: 100%;
//     background: #9f9f9f;
// }
.item{
    line-height:0;
    min-height: 100px; 
    width:100%;
}
.item img{
    height:100%;
    object-fit:cover;
    width:100%;
}

.inner-item{
  height:100%;
}

// 2 image css 
.item1a2{
  grid-column-end: span 2;
}
.item1b2{
  grid-column-end: span 2;
}
.item2a2{
  grid-row-end: span 2;
}
.item2b2{
  grid-row-end: span 2;
}

// 3 image css
.item1a3 {
    grid-row-end: span 2;
  }
  .item2b3{
    grid-row-end: span 2;
  }
  .item3c3{
    grid-column-end: span 2;
  }
  .item4a3{
    grid-column-end: span 2;
  }

  // 4 image css
.item1a4{
  grid-row-end: span 3;
}
.item2b4{
  grid-row-end: span 3;
}
.item3d4{
  grid-column-end: span 3;
}
.item3a4{
  width:97px;
}
.item3b4{
  width:97px;
}
.item3c4{
  width:98px;
}

  .frames{
    margin-top:30px;
  }
.frames-flex{
    display:flex;
    column-gap:15px;
    align-items:center;
    padding: 0px 5px;
    justify-content: center;
}
  .frame-container-grid{
    display:grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    row-gap:2px;
    column-gap:2px;
    min-width: 64px;
    min-height: 70px;
    cursor:pointer;
    border: 2px solid transparent;
    padding: 1px;
  }
  .frame-item{
    line-height: 0;
    background: #302653;
  }
  .frame-item img{
    height:100%;
    object-fit:cover;
    width:100%;
}

// 2 image css
.frame-item1a2{
  grid-column-end: span 2;
}
.frame-item1b2{
  grid-column-end: span 2;
}
.frame-item2a2{
  grid-row-end: span 2;
}
.frame-item2b2{
  grid-row-end: span 2;
}

// 3 image css
  .frame-item1a3{
    grid-row-end: span 2;
  }
  .frame-item2b3{
    grid-row-end: span 2;
  }
  .frame-item3c3{
    grid-column-end: span 2;
  }
  .frame-item4a3{
    grid-column-end: span 2;
  }

  // 4 image css
  .frame-item1a4{
    grid-row-end: span 3;
  }
  .frame-item2b4{
    grid-row-end: span 3;
  }
  .frame-item3d4{
    grid-column-end: span 3;
  }
  .frame-item1b4{
    height:20px
  }
  .frame-item1c4{
    height:20px
  }
  .frame-item1d4{
    height:20px
  }
  .frame-item2a4{
    height:20px
  }
  .frame-item2c4{
    height:20px
  }
  .frame-item2d4{
    height:20px
  }
  .frame-item3a4{
    width:20px
  }
  .frame-item3b4{
    width:20px
  }
  .frame-item3c4{
    width:20px
  }

  .selectedThumb{
    border: 2px solid rgba(0, 0, 0, 0.4);
    padding: 1px;
  }
  .collage_grid{
    justify-content:center;
    height:100%;
    width:100%;
    margin-top:20px;
  }
  .collage_box_ht{
    height:100%;
    width:100%;
  }
`
export default MyDiv
