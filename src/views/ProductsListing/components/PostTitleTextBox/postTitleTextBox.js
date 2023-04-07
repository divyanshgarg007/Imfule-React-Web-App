import React from 'react'
import {Box} from '@mui/material'
import {connect, useSelector} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {bindActionCreators} from 'redux'
import {compose} from 'recompose'
import {CustomTextBox} from '../../../../components'
import {ActionCreators} from '../../../../redux/actions'
import {getToken} from '../../../../utilities/authUtils'
import MyDiv from './postTitleTextBox.style'

function PostTitleTextBox(props) {
  const postState = useSelector((state) => state?.postState)
  const postStateIndex = postState?.getPosition
  const handleTextChange = (e) => {
    let limit
    if (postState?.addPostData[postStateIndex]?.type === 1) {
      limit = getToken('setting')?.SOCIAL_MEDIA_SETTING?.content_limitation?.facebook?.title
    } else if (postState?.addPostData[postStateIndex]?.type === 2) {
      limit = getToken('setting')?.SOCIAL_MEDIA_SETTING?.content_limitation?.instagram?.title
    } else if (postState?.addPostData[postStateIndex]?.type === 3) {
      limit = getToken('setting')?.SOCIAL_MEDIA_SETTING?.content_limitation?.pinterest?.title
    } else if (postState?.addPostData[postStateIndex]?.type === 4) {
      limit = getToken('setting')?.SOCIAL_MEDIA_SETTING?.content_limitation?.twitter?.title
    }
    if (limit >= e.target.value?.length) {
      props.actions.onChangeSocialMediaAction(postState?.addPostData?.map(
        (shareholder, sidx) => {
          if (postStateIndex !== sidx) {return shareholder} else {
            return {...shareholder, title: e.target.value,
            }
          }
        }),
      )
    }
  }
  return (
    <MyDiv>
      {postState?.addPostData[postStateIndex]?.type === 3 &&
        <Box mb={3} className="heading_name_box">
          <CustomTextBox
            type="text"
            name="name"
            value={postState?.addPostData[postStateIndex]?.title}
            onChange={handleTextChange}
          />
        </Box>
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
)(PostTitleTextBox)
