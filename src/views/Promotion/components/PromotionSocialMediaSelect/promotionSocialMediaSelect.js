import {React, useEffect} from 'react'
import {Box, Grid, MenuItem, Select, FormControl, Avatar, Stack, Typography, IconButton} from '@mui/material'
import {Add as AddIcon} from '@mui/icons-material'
import {connect, useSelector} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {bindActionCreators} from 'redux'
import {compose} from 'recompose'
import DeleteIcon from '@mui/icons-material/Delete'
import InstagramImage from '../../../../images/instagram.png'
import FacebookImage from '../../../../images/facebook.png'
import PinterestImage from '../../../../images/pinterest.png'
import LinkedinImage from '../../../../images/linkedin.png'
import TwitterImage from '../../../../images/twitter.png'
import {ActionCreators} from '../../../../redux/actions'
import {getToken} from '../../../../utilities/authUtils'
import MyDiv from './promotionSocialMediaSelect.style'
function stringAvatar(name) {
  return {
    sx: {
      bgcolor: '#000',
    },
    children: `${name?.split(' ')[0][0]}`,
  }
}
function PromotionSocialMediaSelect(props) {
  const userState = useSelector((state) => state.userState)
  const promotionState = useSelector((state) => state?.promotionState)
  const promotionStateIndex = promotionState?.getPromotionPosition
  const postState = useSelector((state) => state?.postState)
  const handleAddClick = (event) => {
    props.actions.addPromotionDataAction(
      {
        currentNetwork: null,
        page_id: null,
        page_name: '',
        description: '',
        scheduled_at: null,
        post_type: null,
        image: [postState?.getSpecificAchiveData?.data?.payload?.master_image || postState?.getSpecificPostedData?.data?.payload?.master_image || props.image],
        type: '',
        pagesData: [],
        title: '',
        limitDesc: 0,
        limitTitle: 0,
      },
    )
    props.actions.getPromotionDataIndexAction(promotionState?.addPromotionData?.length)
  }
  useEffect(() => {
    props.actions.getPromotionDataIndexAction(promotionState?.addPromotionData?.length - 1)
  }, [promotionState?.addPromotionData?.length])

  const handleRemoveClick = (idx) => {
    props.actions.removeSocialMediaPromotionAction(promotionState?.addPromotionData?.filter(
      (s, sidx) => idx !== sidx,
    ),
    )
  }
  const handleEditClick = (idx) => {
    props.actions.getPromotionDataIndexAction(idx)
  }
  const handleChangeSocialMedia = (idx, evt) => {
    const selectedSocialMedia = props?.socialMediaData.filter((data) => data.social_media_user_id === evt.target.value)
    const socialMediaType = selectedSocialMedia[0]?.social_media_type
    let limitDesc
    let limitTitle
    if (socialMediaType === 1) {
      limitDesc = getToken('setting')?.SOCIAL_MEDIA_SETTING?.content_limitation?.facebook?.description
      limitTitle = getToken('setting')?.SOCIAL_MEDIA_SETTING?.content_limitation?.facebook?.title
    } else if (socialMediaType === 2) {
      limitDesc = getToken('setting')?.SOCIAL_MEDIA_SETTING?.content_limitation?.instagram?.description
      limitTitle = getToken('setting')?.SOCIAL_MEDIA_SETTING?.content_limitation?.facebook?.title
    } else if (socialMediaType === 3) {
      limitDesc = getToken('setting')?.SOCIAL_MEDIA_SETTING?.content_limitation?.pinterest?.description
      limitTitle = getToken('setting')?.SOCIAL_MEDIA_SETTING?.content_limitation?.facebook?.title
    } else if (socialMediaType === 4) {
      limitDesc = getToken('setting')?.SOCIAL_MEDIA_SETTING?.content_limitation?.twitter?.description
      limitTitle = getToken('setting')?.SOCIAL_MEDIA_SETTING?.content_limitation?.facebook?.title
    } else if (socialMediaType === 5) {
      limitDesc = getToken('setting')?.SOCIAL_MEDIA_SETTING?.content_limitation?.linkedin?.description
      limitTitle = getToken('setting')?.SOCIAL_MEDIA_SETTING?.content_limitation?.linkedin?.image
    }
    props.actions.onChangeSocialMediaPromotionAction(promotionState?.addPromotionData?.map(
      (shareholder, sidx) => {
        //Condition for facebook, pinterest and linkedin
        if (idx !== sidx) {return shareholder} else if (socialMediaType === 1 || socialMediaType === 3 || socialMediaType === 5) {
          return {...shareholder, currentNetwork: evt.target.value, type: socialMediaType, limitDesc: limitDesc, limitTitle: limitTitle,
          }
        } else if (socialMediaType === 2 || socialMediaType === 4) { // Condition for instagram and twitter
          return {...shareholder, currentNetwork: evt.target.value, type: socialMediaType, page_id: selectedSocialMedia[0]?.social_media_user_id,
            page_name: selectedSocialMedia[0]?.name, limitDesc: limitDesc, limitTitle: limitTitle,
          }
        }
      }),
    )
    props.actions.connectedPagesWithSocialMediaAction(idx, evt.target.value)
  }
  const handleChangePages = (idx, evt) => {
    props.actions.onChangeSocialMediaPromotionAction(promotionState?.addPromotionData?.map(
      (shareholder, sidx) => {
        if (idx !== sidx) {return shareholder} else {
          return {...shareholder, page_id: evt.target.value, page_name: shareholder?.pagesData?.filter((e) => e.social_media_page_id === evt.target.value)[0]?.name,
          }
        }
      }),
    )
  }
  useEffect(() => {
    if (userState?.connectedPagesWithSocialMedia?.data?.payload) {
      props.actions.onChangeSocialMediaPromotionAction(promotionState?.addPromotionData?.map(
        (shareholder, sidx) => {
          if (userState?.connectedPagesWithSocialMedia?.index !== sidx) {return shareholder} else {
            return {...shareholder, pagesData: userState?.connectedPagesWithSocialMedia?.data?.payload,
            }
          }
        }),
      )
    }
  }, [userState.connectedPagesWithSocialMedia])

  function renderPage(data, pageId) {
    let leftPages = data && data.filter(
      (fav) => !promotionState?.addPromotionData.some((w) => w.page_id === fav.social_media_page_id),
    )
    let selectedPages = leftPages.concat(data.filter(
      (fav) => fav.social_media_page_id === pageId,
    ))
    let pagesData = selectedPages && selectedPages.map((data, index) => (
      <MenuItem value={data.social_media_page_id} key={index}>
        <Stack direction="row" spacing={2} sx={{alignItems: 'center'}}>
          <Avatar className="custom-avatar" {...stringAvatar(data.name)} />
          <Typography
            variant="h6"
            color="text.primary"
            fontSize="0.8rem"
            className="text-font"
            marginLeft="5px!important"
          >
            {data.name}
          </Typography>
        </Stack>
      </MenuItem>
    ))
    return pagesData
  }
  function renderNetwork(network) {
    let leftNetwork = props.socialMediaData && props.socialMediaData.filter(
      (fav) => !promotionState?.addPromotionData.some((w) => w.currentNetwork === fav.social_media_user_id && (fav.social_media_type === 2 || fav.social_media_type === 4)),
    )
    let selectedNetwork = leftNetwork?.concat(props.socialMediaData.filter(
      (fav) => fav.social_media_user_id === network && (fav.social_media_type === 2 || fav.social_media_type === 4),
    ))
    let pagesData = selectedNetwork && selectedNetwork.map((data, index) => {
      return (<MenuItem value={data.social_media_user_id} key={index} >
        <Stack direction="row" spacing={2} sx={{alignItems: 'center'}}>
          <img src={data.social_media_type === 1 ? FacebookImage : data.social_media_type === 2 ? InstagramImage :
            data.social_media_type === 3 ? PinterestImage : data.social_media_type === 4 ? TwitterImage : LinkedinImage}
          />
          <Typography
            variant="h6"
            color="text.primary"
            fontSize="0.8rem"
            marginLeft="5px!important"
            className="text-font"
          >
            {data.name}
          </Typography>
        </Stack>
      </MenuItem>)
    })
    return pagesData
  }

  return (
    <MyDiv>
      {promotionState && promotionState.addPromotionData && promotionState.addPromotionData.map((data, index) => {
        return (
          <>
            <Grid container className={promotionStateIndex === index ? 'highlight_select' : 'product_grid'} columnSpacing={{xs: 2, sm: 2, md: 2}} key={index} onClick={() => handleEditClick(index)}>
              <Grid item xs={(data.type === 2) || (data.type === 4) ? '10' : '4'} md={(data.type === 2) || (data.type === 4) ? '11' : '4'} >
                <Box>
                  <Typography
                    variant="h6"
                    color="text.primary"
                    fontSize="0.9rem"
                    className="text-font"
                  >
                    Select
                  </Typography>
                  <FormControl fullWidth>
                    <Select className="custom-media-select slice_network_name"
                      id={`currentNetwork${index}`}
                      value={data.currentNetwork}
                      onChange={(e) => handleChangeSocialMedia(
                        index,
                        e,
                      )}
                    >
                      {renderNetwork(data.currentNetwork)}
                    </Select>
                  </FormControl>
                </Box>
              </Grid>

              {!(data.type === 2 || data.type === 4) &&
                <Grid item xs={6} md={7}>
                  <Box>
                    <Typography
                      variant="h6"
                      color="text.primary"
                      fontSize="0.9rem"
                      className="text-font"
                    >
                      {data.type === 3 ? 'Select Board' : 'Select Page'}
                    </Typography>
                    <FormControl fullWidth>
                      <Select className="custom-media-select slice_page_name"
                        value={data.page_id}
                        onChange={(e) => handleChangePages(
                          index,
                          e,
                        )}
                        id={`selectedPages${index}`}
                      >
                        {renderPage(data.pagesData, data.page_id) === null ? <MenuItem value="">
                          <Typography
                            variant="h6"
                            color="text.primary"
                            fontSize="0.9rem"
                            className="text-font"
                          >No pages available</Typography>
                        </MenuItem> : renderPage(data.pagesData, data.page_id)}
                      </Select>
                    </FormControl>
                  </Box>
                </Grid>
              }
              {promotionState?.addPromotionData?.length > 1 && (
                <Grid item xs={2} md={1}>
                  {/* <PopoverActions postId={index} handleDeletePostedList={handleRemoveClick} handleEditClick={handleEditClick} /> */}
                  <IconButton onClick={() => handleRemoveClick(index)} className="delete_media">
                    <DeleteIcon />
                  </IconButton>
                </Grid>
              )}
            </Grid>
            <Box mt={2}>
              {index === promotionState?.addPromotionData.length - 1 && promotionState?.addPromotionData[promotionStateIndex]?.type && (
                <IconButton color="primary" className="add-btn" onClick={() => handleAddClick(this, index)}>
                  <AddIcon />
                </IconButton>
              )}
            </Box>
          </>
        )
      })}
    </MyDiv>
  )
}
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(ActionCreators, dispatch),
})

export default compose(
  withRouter,
  connect(null, mapDispatchToProps),
)(PromotionSocialMediaSelect)
