import React, {useState, useEffect} from 'react'
import {Grid, Box, Divider, IconButton, Typography, Card, CardActionArea, CardMedia, CardContent, CardActions} from '@mui/material'
import PropTypes from 'prop-types'
import Switch from '@mui/material/Switch'
import {Add as AddIcon, Delete as DeleteIcon} from '@mui/icons-material'
import Accordion from '@mui/material/Accordion'
import AccordionDetails from '@mui/material/AccordionDetails'
import AccordionSummary from '@mui/material/AccordionSummary'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import {styled} from '@mui/material/styles'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell, {tableCellClasses} from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import {connect, useSelector} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {bindActionCreators} from 'redux'
import {compose} from 'recompose'
import {CustomButton, Snackbar, Loader, AlertDialog} from '../../../../../components'
import {getToken} from '../../../../../utilities/authUtils'
import {ActionCreators} from '../../../../../redux/actions'
import FacebookIcon from '../../../../../images/facebook.png'
import InstagramIcon from '../../../../../images/instagram.png'
import PinterestIcon from '../../../../../images/pinterest.png'
import LinkedinIcon from '../../../../../images/linkedin.png'
import TwitterImage from '../../../../../images/twitter.png'
import MyDiv from './networkSettingsCard.style'

const NetworkSettingsCard = (props) => {
  const [channels, setChannels] = useState(false)
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState('')
  const [socialMediaData, setSocialMediaData] = useState([])
  const userState = useSelector((state) => state.userState)
  const [open, setOpen] = useState(false)
  const [selectedStore, setSelectedStore] = useState('')
  const [type, setType] = useState('')
  const [alertLabel, setAlertLabel] = useState(
    {
      title: '',
      subtitle: '',
      button: '',
      close: '',
    },
  )
  useEffect(() => {
    if (!userState.getSocialMedia?.data?.payload) {
      props.actions.getSocialMediaListAction()
    }
  }, [])
  useEffect(() => {
    if (userState.getSocialMedia?.data?.payload) {
      if (userState.getSocialMedia?.data?.payload?.length > 0) {
        setChannels(true)
      }
      setSocialMediaData(userState.getSocialMedia?.data?.payload)
    } else if (userState.getSocialMedia?.error?.payload) {
      setSocialMediaData(userState.getSocialMedia?.error?.payload)
    }
  }, [userState.getSocialMedia])
  useEffect(() => {
    if (userState.addSocialMedia?.data?.payload?.authorization_url) {
      window.location.href = userState.addSocialMedia.data.payload.authorization_url
    } else if (userState.addSocialMedia?.error?.meta) {
      setMessage(userState.addSocialMedia.error.meta?.message)
      setStatus('error')
    }
  }, [userState.addSocialMedia])
  useEffect(() => {
    if (userState.connectShopsSocialMedia?.data?.payload) {
      setMessage(userState.connectShopsSocialMedia?.data?.meta?.message)
      setStatus(userState.connectShopsSocialMedia?.data?.meta?.status)
      props.actions.cleanUpStateStore()
    }
  }, [userState.connectShopsSocialMedia])

  useEffect(() => {
    if (userState.changeSocialMediaStatus?.data?.payload) {
      setMessage(userState.changeSocialMediaStatus?.data?.meta?.message)
      setStatus(userState.changeSocialMediaStatus?.data?.meta?.status)
      props.actions.cleanUpStateStore()
    }
  }, [userState.changeSocialMediaStatus])
  useEffect(() => {
    if (userState.deleteSocialMedia?.data?.payload) {
      setMessage(userState.deleteSocialMedia?.data?.meta?.message)
      setStatus(userState.deleteSocialMedia?.data?.meta?.status)
      props.actions.cleanUpStateStore()
    }
  }, [userState.deleteSocialMedia])
  const handleConnectSocialMedia = (media) => {
    props.actions.addSocialMediaAction(media)
  }
  const handleSnackBarClose = () => {
    setTimeout(() => {
      setMessage('')
      setStatus('')
    }, 2500)
  }
  const handleToggleChange = (shops, pages) => {
    const data = {
      shop_id: shops?.id,
      social_media_id: pages?.company_social_media_id,
      social_media_page_id: pages?.id,
    }
    props.actions.connectShopsToSocialMediaAction(data)
  }
  const handleToggleWithoutPageChange = (shops, pagesId) => {
    const data = {
      shop_id: shops?.id,
      social_media_id: pagesId,
      social_media_page_id: '',
    }
    props.actions.connectShopsToSocialMediaAction(data)
  }
  const handleNetworkChange = () => {
    setChannels(!channels)
  }
  const handleSocialMediaStatusChange = (socialMediaId, status) => {
    props.actions.changeSocialMediaStatusAction(socialMediaId, status)
  }
  const handleDeleteSocial = (socialMediaId, type) => {
    const deleteData = {
      title: 'Are You Sure ?',
      subtitle: 'You have Selected to Delete Social Media',
      button: 'Delete',
      close: 'Cancel',
    }
    setAlertLabel(deleteData)
    setOpen(true)
    setSelectedStore(socialMediaId)
    setType(type)
  }
  const handleSubmit = (socialMediaId, type) => {
    setOpen(false)
    props.actions.deleteSocialMediaAction(socialMediaId)
  }
  const handleDeleteClose = () => {
    setAlertLabel('')
    setOpen(false)
    setSelectedStore('')
    setType('')
  }
  useEffect(() => {
    if (userState?.addSocialMediaResponse?.error?.meta) {
      setMessage(userState.addSocialMediaResponse?.error?.meta?.message)
      setStatus('error')
      props.actions.cleanUpStateStore()
    }
  }, [userState.addSocialMediaResponse])
  return (
    <MyDiv>
      {(userState.addSocialMedia?.loading || userState.connectShopsSocialMedia?.loading || userState.getSocialMedia?.loading) &&
      <div>
        <Loader />
      </div>
      }
      <Snackbar
        message={message}
        severity={status}
        duration={2500}
        open={message.length > 0}
        close={handleSnackBarClose}
      />
      <AlertDialog
        openDialog={open}
        handleDeleteClose={handleDeleteClose}
        handleClose={handleDeleteClose}
        alertLabel={alertLabel}
        handleSubmit={handleSubmit}
        id={selectedStore}
        type={type}
      />
      <Box className="box_tabs">
        <Grid container >
          <Grid item md={12} xs={12}>
            <CardContent className="content-body">
              <Grid container className="edit_grid" >
                <Grid item xs={12} sm={6} md={6}>
                  <Typography gutterBottom variant="h5" component="div" className="text-font social_title">
                    Social Media Account Details
                  </Typography>
                </Grid>
                {socialMediaData.length > 0 &&
                <Grid item xs={12} sm={6} md={6}>
                  <CardActions className="profile_actions">
                    <CustomButton
                      disabled={getToken('setting')?.SOCIAL_MEDIA_SETTING?.maximum_social_media <= socialMediaData?.length}
                      fieldlabel={channels ? 'Connect Account' : 'Back to list'}
                      variant="contained"
                      startIcon={channels ? <AddIcon /> : <ChevronLeftIcon />}
                      onClick={() => handleNetworkChange()}
                      className="text-font action_button"
                    />
                  </CardActions>
                </Grid>
                }
              </Grid>
              <Divider />
              {!channels && !userState.getSocialMedia?.loading &&
                <Box sx={{width: '100%'}} mt={3}>
                  <Typography gutterBottom variant="h5" component="div" className="text-font social_heading">
                    Connect New Social Media Account With Imfule
                  </Typography>
                  <Grid container rowSpacing={1} columnSpacing={{xs: 3, sm: 3, md: 3}} mt={2}>
                    {getToken('setting')?.active_social_media?.map((data) => {
                      return (<>
                        {data.slug === 'facebook' &&
                        <Grid item xs={6} sm={3} md={2}>
                          <ConnectChannels
                            onClick={() => handleConnectSocialMedia('facebook')}
                            name="Facebook / Instagram"
                            channelIcon={<><img src={FacebookIcon} /><img src={InstagramIcon} /></>}
                          />
                        </Grid>
                        }
                        {data.slug === 'pinterest' &&
                        <Grid item xs={6} sm={3} md={2}>
                          <ConnectChannels
                            onClick={() => handleConnectSocialMedia('pinterest')}
                            name="Pinterest"
                            channelIcon={<><img src={PinterestIcon} /></>}
                          />
                        </Grid>
                        }
                        {data.slug === 'twitter' &&
                        <Grid item xs={6} sm={3} md={2}>
                          <ConnectChannels
                            onClick={() => handleConnectSocialMedia('twitter')}
                            name="Twitter"
                            channelIcon={<><img src={TwitterImage} /></>}
                          />
                        </Grid>}
                      </>
                      )
                    })

                    }


                    <Grid item xs={6} sm={3} md={2}>
                      <ConnectChannels
                        onClick={() => handleConnectSocialMedia('linkedin')}
                        name="Linkedin"
                        channelIcon={<><img src={LinkedinIcon} /></>}
                      />
                    </Grid>
                  </Grid>
                </Box>
              }
              {channels &&
                <Box sx={{width: '100%'}} mt={3}>
                  <Typography gutterBottom variant="h5" component="div" className="text-font social_subheading">
                    These are the social media accounts that you have connected.
                  </Typography>
                  <Grid container rowSpacing={1} columnSpacing={{xs: 1, sm: 2, md: 3}} mt={2}>
                    <Grid item xs={12} sm={12} md={12}>
                      <ChannelsConnected
                        socialMediaData={socialMediaData}
                        handleToggleChange={handleToggleChange}
                        handleSocialMediaStatusChange={handleSocialMediaStatusChange}
                        handleDeleteSocial={handleDeleteSocial}
                        handleToggleWithoutPageChange={handleToggleWithoutPageChange}
                      />
                    </Grid>
                  </Grid>
                </Box>
              }
            </CardContent>
          </Grid>
        </Grid>
      </Box>
    </MyDiv>
  )
}

NetworkSettingsCard.propTypes = {
  title: PropTypes.string,
  startIcon: PropTypes.any,
}
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(ActionCreators, dispatch),
})

export default compose(
  withRouter,
  connect(null, mapDispatchToProps),
)(NetworkSettingsCard)

function ChannelsConnected(props) {
  const [expanded, setExpanded] = React.useState('')
  const userState = useSelector((state) => state.userState)
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false)
  }

  const label = {inputProps: {'aria-label': 'Switch demo'}}
  const StyledTableCell = styled(TableCell)(({theme}) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: '#d9dfd2',
      color: '#000',
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: '0.9rem',
      fontWeight: '500',
      color: '#000',
      fontFamily: 'Poppins',
    },
  }))

  const StyledTableRow = styled(TableRow)(({theme}) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }))
  const handleToggleChange = (shops, pages) => {
    props.handleToggleChange(shops, pages)
  }
  const handleSocialMediaStatusChange = (socialMediaId, status) => {
    const newstatus = !status
    props.handleSocialMediaStatusChange(socialMediaId, newstatus)
  }
  const getToggleStatus = (pages, shops) => {
    let item = pages?.shops?.find((data) => data.shop_id === shops.id)
    return !!item
  }
  return (
    <div>
      {props?.socialMediaData?.map((row, index) => (
        // eslint-disable-next-line prefer-template
        <Accordion expanded={expanded === 'panel' + index} onChange={handleChange('panel' + index)} className="channel_box" key={index}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
            className="channel_top_header"
          >
            <div className="channel_box_split">
              <CardMedia className="channel_image_area">
                {row?.social_media_type === 'Facebook' ? <img src={FacebookIcon} /> : row?.social_media_type === 'Pinterest'
                  ? <img src={PinterestIcon} /> : row?.social_media_type === 'Linkedin'
                    ? <img src={LinkedinIcon} /> : row?.social_media_type === 'Twitter'
                      ? <img src={TwitterImage} /> : <img src={InstagramIcon} />}
              </CardMedia>
              <Typography gutterBottom variant="h5" component="div" className="text-font social_heading" sx={{ml: 2}}>{row.name}</Typography>
            </div>
            <div className="channel_box_split">
              <IconButton color="primary" className="icon_btn mr-3" onClick={(e) => e.stopPropagation()}>
                <Switch checked={row?.status} onChange={() => handleSocialMediaStatusChange(row?.id, row?.status)} {...label} />
              </IconButton>
              <IconButton color="primary" className="icon_btn mr-3" onClick={(e) => e.stopPropagation()}>
                <DeleteIcon onClick={() => props.handleDeleteSocial(row?.id, 'delete')} />
              </IconButton>
            </div>
          </AccordionSummary>
          <Divider />
          <AccordionDetails>
            <Box sx={{width: '100%'}} mt={3} mb={2}>
              <TableContainer>
                <Table sx={{minWidth: 700}} aria-label="customized table" style={{border: '1px solid rgba(224, 224, 224, 1)'}}>
                  <TableHead>
                    <TableRow>
                      <StyledTableCell align="center" className="table_heading text-font">
                        {row?.social_media_type === 'Facebook' ? 'Page Name' : row?.social_media_type === 'Pinterest'
                          ? 'Board Name' : row?.social_media_type === 'Linkedin'
                            ? 'Page Name' : row?.social_media_type === 'Twitter'
                              ? 'Account Name' : 'Account Name'}</StyledTableCell>
                      {userState.getStore?.data?.payload?.map((shops, index) => (
                        <StyledTableCell align="center" className="table_heading text-font" key={index}>{shops.shop_name}</StyledTableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {row?.is_page && row?.page_list?.map((pages, index) => (
                      <StyledTableRow key={index}>
                        <StyledTableCell align="center">
                          {pages.name}
                        </StyledTableCell>
                        {userState.getStore?.data?.payload?.map((shops, index) => (
                          <StyledTableCell align="center" key={index}>
                            <IconButton color="primary" className="check_icon_btn" sx={{mr: 3}}>
                              <Switch checked={getToggleStatus(pages, shops)} onChange={() => handleToggleChange(shops, pages)} {...label} />
                            </IconButton>
                          </StyledTableCell>
                        ))}
                      </StyledTableRow>
                    ))}
                    {!row?.is_page &&
                      <StyledTableRow key={index}>
                        <StyledTableCell align="center">
                          {row.name}
                        </StyledTableCell>
                        {userState.getStore?.data?.payload?.map((shops, index) => {
                          return (<StyledTableCell align="center" key={index}>
                            <IconButton color="primary" className="check_icon_btn" sx={{mr: 3}}>
                              <Switch checked={!!row?.shops?.find((data) => data.shop_id === shops.id)} onChange={() => props.handleToggleWithoutPageChange(shops, row.id)} {...label} />
                            </IconButton>
                          </StyledTableCell>)
                        })}
                      </StyledTableRow>
                    }
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  )
}
ChannelsConnected.propTypes = {
  name: PropTypes.string,
  channelImage: PropTypes.any,
  settingIcon: PropTypes.any,
}

function ConnectChannels(props) {
  return (
    <div onClick={props.onClick}>
      <Card className="social_card">
        <CardActionArea>
          <Grid container>
            <Grid item xs={12} md={12}>
              <CardMedia className="channel_icons_area">
                {props.channelIcon}
              </CardMedia>
            </Grid>
            <Grid item xs={12} md={12}>
              <CardContent className="channel_name_area">
                <Typography gutterBottom variant="h5" component="div" className="channel_name text-font">
                  {props.name}
                </Typography>
              </CardContent>
            </Grid>
          </Grid>
        </CardActionArea>
        {/* </ButtonBase> */}
      </Card>
    </div>
  )
}
ConnectChannels.propTypes = {
  name: PropTypes.string,
  channelImage: PropTypes.any,
  settingIcon: PropTypes.any,
}
