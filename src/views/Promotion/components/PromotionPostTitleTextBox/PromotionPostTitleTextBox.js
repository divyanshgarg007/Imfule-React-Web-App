import React from 'react'
import {Box, Typography} from '@mui/material'
import {connect, useSelector} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {bindActionCreators} from 'redux'
import {compose} from 'recompose'
import {CustomTextBox} from '../../../../components'
import {ActionCreators} from '../../../../redux/actions'
import MyDiv from './PromotionPostTitleTextBox.style'

function PromotionPostTitleTextBox(props) {
  const promotionState = useSelector((state) => state?.promotionState)
  const promotionStateIndex = promotionState?.getPromotionPosition
  const handleTextChange = (e) => {
    let data = e.target.value.slice(0, promotionState?.addPromotionData[promotionStateIndex]?.limitTitle)
    if (promotionState?.addPromotionData[promotionStateIndex]?.limitTitle >= data?.length) {
      props.actions.onChangeSocialMediaPromotionAction(promotionState?.addPromotionData?.map(
        (shareholder, sidx) => {
          if (promotionStateIndex !== sidx) {return shareholder} else {
            return {...shareholder, title: data,
            }
          }
        }),
      )
    }
  }
  return (
    <MyDiv>
      {promotionState?.addPromotionData[promotionStateIndex]?.type !== '' && promotionState?.addPromotionData[promotionStateIndex]?.type === 3 &&
      <>
        <Box mb={0} className="heading_name_box">
          <CustomTextBox
            type="text"
            name="name"
            fieldlabel="Title"
            value={promotionState?.addPromotionData[promotionStateIndex]?.title}
            onChange={handleTextChange}
          />
        </Box>
        <Box>
          <Typography gutterBottom variant="h5" component="div" className="text-font counter_heading" >
            [{promotionState?.addPromotionData[promotionStateIndex]?.title?.length}/{promotionState?.addPromotionData[promotionStateIndex]?.limitTitle}]
          </Typography>
        </Box>
      </>
      }
    </MyDiv>
  )
}

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(ActionCreators, dispatch),
})

export default compose(
  withRouter,
  connect(null, mapDispatchToProps),
)(PromotionPostTitleTextBox)
