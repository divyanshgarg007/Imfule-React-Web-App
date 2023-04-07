import * as React from 'react'
import {Box, IconButton, Tabs, Tab, MenuItem, ListItemIcon} from '@mui/material'
import Menu from '@mui/material/Menu'
import InventoryIcon from '@mui/icons-material/Inventory'
import {useSelector} from 'react-redux'
import {styled} from '@mui/styles'
import DesktopWindowsIcon from '@mui/icons-material/DesktopWindows'
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid'
import {TabContext, TabPanel} from '@mui/lab'
import {Loader} from '..'
import FacebookIcon from '../../images/facebook.png'
import InstagramIcon from '../../images/instagram.png'
import PinterestIcon from '../../images/pinterest.png'
import TwitterImage from '../../images/twitter.png'
import LinkedinImage from '../../images/linkedin.png'
import {Facebook, Instagram, Pinterest, Twitter, Linkedin} from './Networks'
import MyDiv from './previewCard.style'

export default function PreviewCard(props) {
  const postState = useSelector((state) => state?.postState)
  const promotionState = useSelector((state) => state?.promotionState)
  const [deviceType, setDeviceType] = React.useState('desktop')
  const [facebookData, setFacebookData] = React.useState([])
  const [instagramData, setInstagramData] = React.useState([])
  const [pinterestData, setPinterestData] = React.useState([])
  const [twitterData, setTwitterData] = React.useState([])
  const [linkedinData, setLinkedinData] = React.useState([])
  const [value, setValue] = React.useState(0)
  const [isloading, setLoader] = React.useState(false)
  React.useEffect(() => {
    let fbData = []
    let instaData = []
    let pinsData = []
    let twitData = []
    let linkeData = []
    props.socialMediaType?.map(
      (data) => {
        if (data.type === 1 && data.page_name) {
          fbData?.push(data)
        } else if (data.type === 2) {
          instaData?.push(data)
        } else if (data.type === 4) {
          twitData?.push(data)
        } else if (data.type === 3 && data.page_name) {
          pinsData.push(data)
        } else if (data.type === 5) {
          linkeData?.push(data)
        }
      })
    setFacebookData(fbData)
    setInstagramData(instaData)
    setPinterestData(pinsData)
    setTwitterData(twitData)
    setLinkedinData(linkeData)
    if (postState?.addPostData[postState?.getPosition]?.page_name) {
      const socialMediaIndex = postState?.addPostData && postState?.addPostData[postState?.getPosition]?.page_id
      setValue(socialMediaIndex)
    }
    if (promotionState?.addPromotionData[promotionState?.getPromotionPosition]?.page_name) {
      const socialMediaIndex = promotionState?.addPromotionData && promotionState?.addPromotionData[promotionState?.getPromotionPosition]?.page_id
      setValue(socialMediaIndex)
    }
  }, [props.socialMediaType, postState?.getPosition, promotionState?.getPromotionPosition])

  const handleDevice = (device) => (event) => {
    event.preventDefault()
    setDeviceType(device)
  }

  const handleChange = (event, newValue) => {
    setLoader(true)
    setValue(newValue)
    setLoader(false)
  }
  const handleChangeTabValue = (index) => {
    setLoader(true)
    setValue(index)
    setLoader(false)
  }
  const [open, setOpen] = React.useState(false)
  const [btnEL, setBtnEL] = React.useState()
  const handleBtnClick = (e) => {
    setBtnEL(e.currentTarget)
    setOpen(true)
  }
  const [openInsta, setOpenInsta] = React.useState(false)
  const [btnELInsta, setBtnELInsta] = React.useState()
  const handleBtnClickInsta = (e) => {
    setBtnELInsta(e.currentTarget)
    setOpenInsta(true)
  }
  const [openPins, setOpenPins] = React.useState(false)
  const [btnELPins, setBtnELPins] = React.useState()
  const handleBtnClickPins = (e) => {
    setBtnELPins(e.currentTarget)
    setOpenPins(true)
  }
  const [openTwit, setOpenTwit] = React.useState(false)
  const [btnELTwit, setBtnELTwit] = React.useState()
  const handleBtnClickTwit = (e) => {
    setBtnELTwit(e.currentTarget)
    setOpenTwit(true)
  }
  const [openLinke, setOpenLinke] = React.useState(false)
  const [btnELLinke, setBtnELLinke] = React.useState()
  const handleBtnClickLinke = (e) => {
    setBtnELLinke(e.currentTarget)
    setOpenLinke(true)
  }
  const CustomMenuItem = styled(MenuItem)(({theme}) => ({
    '&.MuiMenuItem-root': {
      color: '#000',
      fontWeight: '500',
      fontSize: '0.9rem',
      fontFamily: 'Poppins',
      textTransform: 'capitalize',
    },
    '& .MuiListItemIcon-root': {
      color: '#283c86!important',
    },
  }))
  return (
    <MyDiv>
      {isloading &&
      <div>
        <Loader />
      </div>
      }
      <div className="toggle_icons_header">
        <Box className="toggle_icons">
          <IconButton color="primary" onClick={handleDevice('desktop')} className={`device_btn ${deviceType === 'desktop' ? 'active' : ''}`}>
            <DesktopWindowsIcon />
          </IconButton>
          <IconButton color="primary" onClick={handleDevice('mobile')} className={`device_btn ${deviceType === 'mobile' ? 'active' : ''}`}>
            <PhoneAndroidIcon />
          </IconButton>
        </Box>
      </div>
      <Box className="preview_demo_box">
        <TabContext value={value}>
          <Tabs
            value={value}
            onChange={handleChange}
            className="tab_btn"
            TabIndicatorProps={{
              style: {
                display: 'none',
              },
            }}
          >
            {facebookData?.map(
              (data, index) => {
                if (facebookData.length === 1 && data.page_name) {
                  return (
                    <Tab key={index}
                      icon={<img src={FacebookIcon} />}
                      value={data.page_id} className="text-font tab_color"
                    />
                  )
                }
              })}
            {facebookData.length > 1 &&
            <span><img src={FacebookIcon} onClick={handleBtnClick} /></span>
            }
            {instagramData?.map(
              (data, index) => {
                if (instagramData.length === 1) {
                  return (
                    <Tab key={index}
                      icon={<img src={InstagramIcon} />}
                      value={data.page_id} className="text-font tab_color"
                    />
                  )
                }
              })}
            {instagramData.length > 1 &&
            <span><img src={InstagramIcon} onClick={handleBtnClickInsta} /></span>
            }
            {pinterestData?.map(
              (data, index) => {
                if (pinterestData.length === 1 && data.page_name) {
                  return (
                    <Tab key={index}
                      icon={<img src={PinterestIcon} />}
                      value={data.page_id} className="text-font tab_color"
                    />
                  )
                }
              })}
            {pinterestData.length > 1 &&
            <span><img src={PinterestIcon} onClick={handleBtnClickPins} /></span>
            }
            {twitterData?.map(
              (data, index) => {
                if (twitterData.length === 1) {
                  return (
                    <Tab key={index}
                      icon={<img src={TwitterImage} />}
                      value={data.page_id} className="text-font tab_color"
                    />
                  )
                }
              })}
            {twitterData.length > 1 &&
            <span><img src={TwitterImage} onClick={handleBtnClickTwit} /></span>
            }
            {linkedinData?.map(
              (data, index) => {
                if (linkedinData.length === 1) {
                  return (
                    <Tab key={index}
                      icon={<img src={LinkedinImage} />}
                      value={data.page_id} className="text-font tab_color"
                    />
                  )
                }
              })}
            {linkedinData.length > 1 &&
            <span><img src={LinkedinImage} onClick={handleBtnClickLinke} /></span>
            }
          </Tabs>
          {props?.socialMediaType?.map(
            (data, index) => {
              return (
                <TabPanel key={index} value={data.page_id} className="tab_space">
                  {data.type === 1 ? <Facebook device={deviceType} socialMediaData={data} />
                    : data.type === 2 ? <Instagram device={deviceType} socialMediaData={data} />
                      : data.type === 4 ? <Twitter device={deviceType} socialMediaData={data} />
                        : data.type === 5 ? <Linkedin device={deviceType} socialMediaData={data} />
                          : <Pinterest device={deviceType} socialMediaData={data} /> }</TabPanel>
              )
            })}
        </TabContext>
        <Menu
          open={open}
          anchorEl={btnEL}
          onClose={() => setOpen(false)}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
        >
          {facebookData.map((data, index) => (
            <CustomMenuItem key={index} value={data.page_id} onClick={() => handleChangeTabValue(data.page_id)}>
              <ListItemIcon fontSize="small">
                <InventoryIcon />
              </ListItemIcon>{data.page_name}</CustomMenuItem>
          ))}
        </Menu>

        <Menu
          open={openInsta}
          anchorEl={btnELInsta}
          onClose={() => setOpenInsta(false)}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
        >
          {instagramData.map((data, index) => (
            <CustomMenuItem key={index} value={data.page_id} onClick={() => handleChangeTabValue(data.page_id)}>
              <ListItemIcon fontSize="small">
                <InventoryIcon />
              </ListItemIcon>{data.page_name}</CustomMenuItem>
          ))}
        </Menu>

        <Menu
          open={openPins}
          anchorEl={btnELPins}
          onClose={() => setOpenPins(false)}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
        >
          {pinterestData.map((data, index) => (
            <CustomMenuItem key={index} value={data.page_id} onClick={() => handleChangeTabValue(data.page_id)}>
              <ListItemIcon fontSize="small">
                <InventoryIcon />
              </ListItemIcon>{data.page_name}</CustomMenuItem>
          ))}
        </Menu>
        <Menu
          open={openTwit}
          anchorEl={btnELTwit}
          onClose={() => setOpenTwit(false)}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
        >
          {twitterData.map((data, index) => (
            <CustomMenuItem key={index} value={data.page_id} onClick={() => handleChangeTabValue(data.page_id)}>
              <ListItemIcon fontSize="small">
                <InventoryIcon />
              </ListItemIcon>{data.page_name}</CustomMenuItem>
          ))}
        </Menu>
        <Menu
          open={openLinke}
          anchorEl={btnELLinke}
          onClose={() => setOpenLinke(false)}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
        >
          {linkedinData.map((data, index) => (
            <CustomMenuItem key={index} value={data.page_id} onClick={() => handleChangeTabValue(data.page_id)}>
              <ListItemIcon fontSize="small">
                <InventoryIcon />
              </ListItemIcon>{data.page_name}</CustomMenuItem>
          ))}
        </Menu>
      </Box>
    </MyDiv>
  )
}
