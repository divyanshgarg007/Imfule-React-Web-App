/* eslint-disable no-unused-vars */

import React, {useState} from 'react'
import {Chip, Box, Typography, Stack, TextareaAutosize} from '@mui/material'
import {connect, useSelector} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {bindActionCreators} from 'redux'
import {compose} from 'recompose'
// import {getToken} from '../../../../utilities/authUtils'
import Hashtags from '../Hashtags/hashtags'
import {ActionCreators} from '../../../../redux/actions'
import MyDiv from './richTextEditor.style'

function RichTextEditor(props) {
  const postState = useSelector((state) => state?.postState)
  const postStateIndex = postState?.getPosition
  const handleClick = (value) => {
    let valueNew = (postState?.addPostData[postStateIndex]?.description + value)
    let data = valueNew.slice(0, postState?.addPostData[postStateIndex]?.limitDesc)
    if (postState?.addPostData[postStateIndex]?.limitDesc >= (data?.length)) {
      props.actions.onChangeSocialMediaAction(postState?.addPostData?.map(
        (shareholder, sidx) => {
          if (postStateIndex !== sidx) {return shareholder} else {
            return {...shareholder, description: data,
            }
          }
        }),
      )
    }
  }
  const handleChange = (value) => {
    let data = value.slice(0, postState?.addPostData[postStateIndex]?.limitDesc)
    if (postState?.addPostData[postStateIndex]?.limitDesc >= data?.length) {
      props.actions.onChangeSocialMediaAction(postState?.addPostData?.map(
        (shareholder, sidx) => {
          if (postStateIndex !== sidx) {return shareholder} else {
            return {...shareholder, description: data,
            }
          }
        }),
      )
    }

  }
  const handleClean = () => {
    props.actions.onChangeSocialMediaAction(postState?.addPostData?.map(
      (shareholder, sidx) => {
        if (postStateIndex !== sidx) {return shareholder} else {
          return {...shareholder, description: '',
          }
        }
      }),
    )
  }
  const [anchorEl, setAnchorEl] = useState(false)
  const open = Boolean(anchorEl)
  const handleClickEl = (e) => {
    setAnchorEl(e.currentTarget)
  }
  const handleCloseEl = () => {
    setAnchorEl(false)
  }

  return (
    <MyDiv>
      <div className="custom_editor">
        <TextareaAutosize
          aria-label="empty textarea"
          placeholder="Description"
          style={{width: '100%', fontFamily: 'Poppins', fontSize: '0.8rem', padding: '5px 13px'}}
          minRows={10}
          onChange={(e) => handleChange(e.target.value)}
          value={postState?.addPostData[postStateIndex]?.description}
        />
      </div>
      <Box>
        <Typography gutterBottom variant="h5" component="div" className="text-font counter_heading" >
          [{postState?.addPostData[postStateIndex]?.description?.length}/{postState?.addPostData[postStateIndex]?.limitDesc}]
        </Typography>
      </Box>
      <Box >
        <Stack spacing={1} sx={{display: 'inline-block'}}>
          <Chip
            label="Title"
            component="a"
            variant="outlined"
            className="add_field text-font"
            clickable
            onClick={() => handleClick(postState?.addPostData[postStateIndex]?.description === '' ? `${props?.productData?.product_name}` : `\n${props?.productData?.product_name}`)}
          />
          <Chip
            label="Description"
            component="a"
            variant="outlined"
            clickable
            className="add_field text-font"
            onClick={() => handleClick(postState?.addPostData[postStateIndex]?.description === '' ? `${props?.productData?.clean_description}` : `\n${props?.productData?.clean_description}`)}
          />
          <Chip
            label="Product Url"
            component="a"
            variant="outlined"
            clickable
            className="add_field text-font"
            onClick={() => handleClick(postState?.addPostData[postStateIndex]?.description === '' ? `${props?.productData?.product_url}` : `\n${props?.productData?.product_url}`)}
          />
          <Chip
            label="Price"
            component="a"
            variant="outlined"
            clickable
            className="add_field text-font"
            onClick={() => handleClick(postState?.addPostData[postStateIndex]?.description === '' ? `${props?.productData?.price}` : `\n${props?.productData?.price}`)}
          />
          {/* <Chip
            label="Hashtags"
            component="a"
            variant="outlined"
            clickable
            className="add_field text-font"
            onClick={handleClickEl}
          /> */}
          <Chip
            label="Clear"
            component="a"
            variant="outlined"
            clickable
            className="add_field text-font"
            onClick={handleClean}
          />
          {/* <Hashtags openHashtag={anchorEl} closeHashtag={handleCloseEl} open={open} /> */}
        </Stack>
      </Box>
    </MyDiv>
  )
}
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(ActionCreators, dispatch),
})

export default compose(
  withRouter,
  connect(null, mapDispatchToProps),
)(RichTextEditor)
