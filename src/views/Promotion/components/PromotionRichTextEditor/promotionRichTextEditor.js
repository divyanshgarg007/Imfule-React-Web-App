import React from 'react'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import {connect, useSelector} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {bindActionCreators} from 'redux'
import {compose} from 'recompose'
import {Box, Typography, TextareaAutosize} from '@mui/material'
// import {getToken} from '../../../../utilities/authUtils'
import {ActionCreators} from '../../../../redux/actions'
import MyDiv from './promotionRichTextEditor.style'

function PromotionRichTextEditor(props) {
  const promotionState = useSelector((state) => state?.promotionState)
  const promotionStateIndex = promotionState?.getPromotionPosition
  const handleChange = (value) => {
    let data = value.slice(0, promotionState?.addPromotionData[promotionStateIndex]?.limitDesc)
    if (promotionState?.addPromotionData[promotionStateIndex]?.limitDesc >= data?.length) {
      props.actions.onChangeSocialMediaPromotionAction(promotionState?.addPromotionData?.map(
        (shareholder, sidx) => {
          if (promotionStateIndex !== sidx) {return shareholder} else {
            return {...shareholder, description: data,
            }
          }
        }),
      )
    }
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
          value={promotionState?.addPromotionData[promotionStateIndex]?.description}
        />
      </div>
      <Box>
        <Typography gutterBottom variant="h5" component="div" className="text-font counter_heading" >
          [{promotionState?.addPromotionData[promotionStateIndex]?.description?.length}/{promotionState?.addPromotionData[promotionStateIndex]?.limitDesc}]
        </Typography>
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
)(PromotionRichTextEditor)
