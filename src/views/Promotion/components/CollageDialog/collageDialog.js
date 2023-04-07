/* eslint-disable no-undef */
import React, {useState, useEffect} from 'react'
import {Dialog, DialogContent, DialogTitle, Slide, Box, Grid, Divider} from '@mui/material'
import {DragDropContext, Droppable, Draggable} from 'react-beautiful-dnd'
import {Close as CloseIcon} from '@mui/icons-material'
import * as htmlToImage from 'html-to-image'
import {CustomButton} from '../../../../components'
import MyDiv from './collageDialog.style'
const Transition = React.forwardRef((props, ref) => {
  return <Slide direction="up" ref={ref} {...props} />
})

const getListStyle = () => ({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gridTemplateRows: '1fr 1fr',
  rowGap: '2px',
  columnGap: '2px',
  padding: '2px',
  height: '320px',
  width: '100%',
  background: '#9f9f9f',
})

export default function CollageDialog(props) {
  const [selectedLayout, setLayout] = useState(1)
  const layout = props?.selected?.length === 2 ? [1, 2] : [1, 2, 3, 4]
  const [items, setItems] = useState(props?.selected)
  const handleShareClick = () => {
    htmlToImage.toPng(document.getElementById('my-node'), {quality: 0.95, pixelRatio: 2})
      .then((dataUrl) => {
        props.handleImage(dataUrl)
        props.handleCollageDetails(selectedLayout)
      })
  }
  const handleLayout = (layout) => {
    setLayout(layout)
  }
  const handleClose = () => {
    props.closeCollage()
    setLayout(1)
  }
  const onDragEnd = (result) => {
    const newItems = Array.from(items)
    const [removed] = newItems.splice(result.source.index, 1)
    newItems.splice(result.destination.index, 0, removed)
    setItems(newItems)
  }
  useEffect(() => {
    setItems(props.selected)
  }, [props.selected])
  return (
    <Dialog
      open={props.openCollagePopup}
      TransitionComponent={Transition}
      keepMounted
      fullWidth
      maxWidth={'md'}
      onClose={() => handleClose()}
      className="dialog_height"
    >
      <MyDiv>
        <Grid container sx={{alignItems: 'center', padding: '20px 0px 0px!important'}}>
          <Grid xs={6} md={7}>
            <DialogTitle className="text-font" gutterBottom
              variant="h5"
              component="div"
              sx={{fontSize: '1.3rem', padding: '0px 18px!important', fontWeight: '600'}}
            >{props.title}</DialogTitle>
          </Grid>
          <Grid xs={2} md={1}>
            <Box className="close_cloud">
              <CloseIcon onClick={() => handleClose()} />
            </Box>
          </Grid>
        </Grid>
        <Box sx={{padding: '0px 18px!important'}}>
          <Divider />
        </Box>
        <DialogContent sx={{padding: '0px 15px'}}>
          <Box sx={{width: '100%'}} mt={1}>
            <Grid container className="collage_grid" >
              {layout.map((layout1, index1) => {
                return (
                  <>
                    {layout1 === selectedLayout &&
                      <Grid xs={12} md={4} key={index1}>
                        <Grid xs={12} md={12} className="collage_box_ht" id="my-node">
                          <div className="container-grid">
                            <DragDropContext onDragEnd={onDragEnd}>
                              <Droppable droppableId="droppable">
                                {(provided, snapshot) => (
                                  <div {...provided.droppableProps} ref={provided.innerRef} style={getListStyle(snapshot.isDraggingOver)}>
                                    {items.map((data, index) => (
                                      <div key={data.id} className={`item item${layout1}${String.fromCharCode(index + 97)}${items?.length}`}>
                                        <Draggable draggableId={data.id} index={index} >
                                          {(provided) => (
                                            <div className="inner-item"
                                              ref={provided.innerRef}
                                              {...provided.draggableProps}
                                              {...provided.dragHandleProps}
                                            >
                                              {data.image.type === 'product' &&
                                              <img src={data.image.image_url} />
                                              }
                                              {data.image.media_type === 'Image' &&
                                              <img src={data.image.source} />
                                              }
                                            </div>
                                          )}
                                        </Draggable>
                                      </div>
                                    ))}
                                  </div>
                                )}
                              </Droppable>
                            </DragDropContext>
                          </div>
                        </Grid>
                      </Grid>
                    }
                  </>
                )
              })
              }
            </Grid>
          </Box>
          <Box sx={{width: '100%'}} className="frames">
            <Box className="frames-flex">
              {layout.map((layout1, index1) => (
                <div className={selectedLayout === layout1 ? 'frame-container-grid selectedThumb' : 'frame-container-grid'} key={index1}>
                  {props.selected.map((data, index) => (
                    <div key={index} onClick={() => handleLayout(layout1)}className={`frame-item frame-item${layout1}${String.fromCharCode(index + 97)}${props?.selected?.length}`} />
                  ))
                  }
                </div>
              ))
              }
            </Box>
          </Box>
          <Box className="collage_share_btn">
            <CustomButton fieldlabel="Share" variant="contained"
              loading={props?.loader}
              disabled={props?.loader}
              className={props?.loader ? 'disable_action text-font' : 'text-font action_button'}
              onClick={() => handleShareClick()}
            />
          </Box>
        </DialogContent>
      </MyDiv>
    </Dialog>
  )
}
