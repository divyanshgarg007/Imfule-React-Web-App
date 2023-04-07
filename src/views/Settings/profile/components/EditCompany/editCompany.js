import React, {useEffect} from 'react'
import {Grid, Box, Drawer, IconButton, CardContent, CardActions, Divider, Typography} from '@mui/material'
import {Close as CloseIcon} from '@mui/icons-material'
import {CustomTextBox, CustomButton} from '../../../../../components'
import MyDiv from './editCompany.style'
export default function EditCompany(props) {
  useEffect(() => {
    props.setValues(props.companyData)
  }, [props.openDrawer])

  const handleCompanyUpdate = () => {
    props.handleUpdate(props.values)
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
                    Edit Company Details
                  </Typography>
                </Grid>
                <Grid item xs={0} md={6} sm={6} display={{xs: 'none', lg: 'block', sm: 'block'}}>
                  <CardActions className="set-right">
                    <CustomButton fieldlabel="Cancel" variant="outlined" onClick={() => props.closeDrawer()} className="text-font action_button_outlined" />
                    <CustomButton fieldlabel="Save Changes" loading={props.loading} disabled={props.loading} variant="contained" onClick={handleCompanyUpdate}
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
              <Box sx={{width: '100%'}} mt={4}>
                <Grid container>
                  <Grid item md={12} xs={12}>
                    <Grid container>
                      {/* <Grid item xs={12}>
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
                            onBlur={() => props.Validator.showMessageFor('name')}
                            helperText={props.error?.name}
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
                            onBlur={() => props.Validator.showMessageFor('address')}
                            helperText={props.error?.address}
                          />
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
                            Email
                          </Typography>
                          <CustomTextBox
                            type="text"
                            name="email"
                            value={props?.values?.email}
                            //fieldlabel="Email"
                            onChange={props.handleChange('email')}
                            error={props.error?.email || props.Validator.message('email', props?.values?.email, 'required|email')}
                            onBlur={() => props.Validator.showMessageFor('email')}
                            helperText={props.error?.email}
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
                            Country
                          </Typography>
                          <FormControl fullWidth>
                            <Select
                              labelId="demo-simple-select-label"
                              id="demo-simple-select"
                              value={props?.values?.country}
                              error={props.error?.country || props.Validator.message('country', props?.values?.country, 'required')}
                              onBlur={() => props.Validator.showMessageFor('country')}
                              //label="Country"
                              onChange={props.handleChange('country')}
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
                      {/* <Grid item xs={12}>
                        <Box>
                          <Typography
                            variant="h6"
                            color="text.primary"
                            fontSize="0.9rem"
                            className="text-font"
                          >
                            Phone
                          </Typography>
                          <CustomTextBox
                            type="number"
                            name="phone"
                            value={props.values?.phone}
                            //fieldlabel="phone"
                            onChange={props.handleChange('phone')}
                            error={props.error?.phone || props.Validator.message('phone', props?.values?.phone, 'required')}
                            onBlur={() => props.Validator.showMessageFor('phone')}
                            helperText={props.error?.phone}
                          />
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
                            Website
                          </Typography>
                          <CustomTextBox
                            type="text"
                            name="website"
                            value={props.values?.website}
                            //fieldlabel="Website"
                            onChange={props.handleChange('website')}
                            error={props.error?.website || props.Validator.message('website', props?.values?.website, 'required')}
                            onBlur={() => props.Validator.showMessageFor('website')}
                            helperText={props.error?.website}
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
                            Registration No
                          </Typography>
                          <CustomTextBox
                            type="text"
                            name="registration_no"
                            value={props.values?.registration_no}
                            onChange={props.handleChange('registration_no')}
                            error={props.error?.registration_no || props.Validator.message('registration_no', props?.values?.registration_no, 'required')}
                            onBlur={() => props.Validator.showMessageFor('registration_no')}
                            helperText={props.error?.registration_no}
                          />
                        </Box>
                      </Grid> */}
                      <Grid item xs={12} display={{xs: 'block', lg: 'none', sm: 'none'}}>
                        <CardActions className="set-right">
                          <CustomButton fieldlabel="Cancel" variant="outlined" onClick={() => props.closeDrawer()} className="text-font action_button_outlined" />
                          <CustomButton fieldlabel="Save Changes" variant="contained" loading={props.loading} disabled={props.loading} onClick={handleCompanyUpdate}
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
