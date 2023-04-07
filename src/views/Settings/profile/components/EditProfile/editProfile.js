/* eslint-disable no-unused-vars */
import React, {useEffect} from 'react'
import {Grid, Box, Drawer, IconButton, CardContent, CardActions, Divider, Typography} from '@mui/material'
import {Close as CloseIcon} from '@mui/icons-material'
import {CustomTextBox, CustomButton, Loader} from '../../../../../components'
import MyDiv from './editProfile.style'
export default function EditProfile(props) {
  useEffect(() => {
    props.setValues(props.userData)
  }, [props.openDrawer])

  const handleProfileUpdate = () => {
    props.handleProfileUpdate(props.values)
  }
  const drawList = (anchor) => (
    <MyDiv>
      {/* {props.loading &&
      <div>
        <Loader />
      </div>
      } */}
      <Box className="sidebar-inner">
        <Grid container>
          <Grid item md={12} xs={12}>
            <CardContent className="content-body">
              <Grid container alignItems="center" className="edit_grid">
                <Grid item xs={8} md={6} sm={6}>
                  <Typography
                    variant="h6"
                    color="#000"
                    fontSize="1.3rem"
                    fontWeight="600"
                    className="text-font"
                  >
                    Edit Profile Details
                  </Typography>
                </Grid>
                <Grid item xs={0} md={6} sm={6} display={{xs: 'none', lg: 'block', sm: 'block'}}>
                  <CardActions className="set-right" >
                    <CustomButton fieldlabel="Cancel" variant="outlined" onClick={() => props.closeDrawer()} className="text-font action_button_outlined" />
                    <CustomButton fieldlabel="Save Changes" loading={props.loading} disabled={props.loading} variant="contained" onClick={handleProfileUpdate}
                      className={props.loading ? 'disable_action text-font' : 'text-font action_button'}
                    />
                  </CardActions>
                </Grid>
                <Grid item xs={4} display={{xs: 'block', lg: 'none', sm: 'none'}}>
                  <CardActions className="mobile_icon">
                    <IconButton onClick={() => props.closeDrawer()} color="primary">
                      <CloseIcon />
                    </IconButton>
                  </CardActions>
                </Grid>
              </Grid>
              <Divider />
              <Box sx={{width: '100%'}} mt={2}>
                <Grid container>
                  <Grid item md={12} xs={12}>
                    <Grid container>
                      {/* <Grid item xs={12} mb={2}>
                        <CardMedia className="user-img">
                          <Avatar
                            alt="Remy Sharp"
                          />
                          <IconButton color="primary" className="upload-photo">
                            <EditIcon />
                          </IconButton>
                        </CardMedia>
                      </Grid> */}
                      <Grid item xs={12}>
                        <Box mt={2}>
                          <Typography
                            variant="h6"
                            color="text.primary"
                            fontSize="0.9rem"
                            className="text-font"
                          >
                            Name
                          </Typography>
                          <CustomTextBox
                            type="text"
                            name="name"
                            value={props?.values?.name}
                            //fieldlabel="Name"
                            onChange={props.handleChange('name')}
                            error={props.error?.name || props.Validator.message('name', props?.values?.name, 'required')}
                            helperText={props.error?.name}
                            onBlur={() => props.Validator.showMessageFor('name')}
                          />
                        </Box>
                      </Grid>
                      {/* <Grid item xs={12}>
                        <Box>
                          <Typography
                            variant="h6"
                            color="text.primary"
                            fontSize="0.9rem"
                            className="text-font"
                          >
                            Address
                          </Typography>
                          <CustomTextBox
                            type="text"
                            name="address"
                            value={props?.values?.address}
                            //fieldlabel="Address"
                            onChange={props.handleChange('address')}
                            error={props.error?.address || props.Validator.message('address', props?.values?.address, 'required')}
                            helperText={props.error?.address}
                            onBlur={() => props.Validator.showMessageFor('address')}
                          />
                        </Box>
                      </Grid>
                      <Grid item xs={12}>
                        <Box>
                          <Typography
                            variant="h6"
                            color="text.primary"
                            fontSize="0.9rem"
                            className="text-font"
                          >
                            Pincode
                          </Typography>
                          <CustomTextBox
                            type="number"
                            name="pincode"
                            value={props?.values?.pincode}
                            //fieldlabel="Pincode"
                            onChange={props.handleChange('pincode')}
                            error={props.error?.pincode || props.Validator.message('pincode', props?.values?.pincode, 'required')}
                            onBlur={() => props.Validator.showMessageFor('pincode')}
                            helperText={props.error?.pincode}
                          />
                        </Box>
                      </Grid>
                      <Grid item xs={12}>
                        <Box>
                          <Typography
                            variant="h6"
                            color="text.primary"
                            fontSize="0.9rem"
                            className="text-font"
                          >
                            Country
                          </Typography>
                          <FormControl fullWidth>
                            <Select
                              labelId="demo-simple-select-label"
                              id="demo-simple-select"
                              value={props?.values?.country}
                              onChange={props.handleChange('country')}
                              onBlur={() => props.Validator.showMessageFor('country')}
                              error={props.error?.country || props.Validator.message('country', props?.values?.country, 'required')}
                            >
                              {props?.countryList?.map((data) => (
                                <MenuItem key={data.id} value={data.id}>{data.name}</MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                          {(props.error?.country || props.Validator.message('country', props?.values?.country, 'required')) &&
                          <div className="error">{props.error?.country || props.Validator.message('country', props?.values?.country, 'required')}</div>}
                        </Box>
                      </Grid> */}
                      <Grid item xs={12}>
                        <Box>
                          <Typography
                            variant="h6"
                            color="text.primary"
                            fontSize="0.9rem"
                            className="text-font"
                          >
                            Phone Number
                          </Typography>
                          <CustomTextBox
                            type="number"
                            name="phone"
                            value={props.values?.phone}
                            //fieldlabel="phone"
                            onChange={props.handleChange('phone')}
                            error={props.error?.phone || props.Validator.message('phone', props?.values?.phone, 'required')}
                            onBlur={() => props.Validator.showMessageFor('phone')}
                          />
                        </Box>
                      </Grid>
                      <Grid item xs={12}>
                        <Box>
                          <Typography
                            variant="h6"
                            color="text.primary"
                            fontSize="0.9rem"
                            className="text-font"
                          >
                            Email
                          </Typography>
                          <CustomTextBox
                            type="email"
                            name="email"
                            value={props.values?.email}
                            disabled
                          />
                        </Box>
                      </Grid>
                      <Grid item xs={12} display={{xs: 'block', lg: 'none', sm: 'none'}}>
                        <CardActions className="set-right">
                          <CustomButton fieldlabel="Cancel" variant="outlined" onClick={() => props.closeDrawer()} className="text-font action_button_outlined" />
                          <CustomButton fieldlabel="Save Changes" loading={props.loading} disabled={props.loading} variant="contained" onClick={handleProfileUpdate}
                            className={props.loading ? 'disable_action text-font' : 'text-font action_button'}
                          />
                        </CardActions>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Box>
            </CardContent>
          </Grid>
        </Grid>
      </Box>
    </MyDiv>
  )

  return (
    <div>

      <Drawer
        className="sidebar"
        anchor="left"
        open={props.openDrawer}
        onClose={() => props.closeDrawer()}
      >
        {drawList('left')}
      </Drawer>

    </div>
  )
}
