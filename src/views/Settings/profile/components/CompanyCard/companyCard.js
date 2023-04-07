import {React, useState, useEffect, useRef} from 'react'
import {Grid, Box, Typography, CardActions, CardContent, Divider} from '@mui/material'
import PropTypes from 'prop-types'
import {connect, useSelector} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {bindActionCreators} from 'redux'
import {compose} from 'recompose'
import SimpleReactValidator from 'simple-react-validator'
import {Snackbar, CustomButton} from '../../../../../components'
import EditCompany from '../EditCompany/editCompany'
import {ActionCreators} from '../../../../../redux/actions'
import MyDiv from './companyCard.style'
const CompanyCard = (props) => {
  const companyState = useSelector((state) => state.companyState)
  const authState = useSelector((state) => state.authState)
  const masterState = useSelector((state) => state.masterState)
  const [openCompanyEditor, setOpenCompanyEditor] = useState(false)
  const [companyData, setCompanyData] = useState([])
  const simpleValidator = useRef(new SimpleReactValidator())
  const [, forceUpdate] = useState()
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState('')
  const [values, setValues] = useState({})
  const [countryList, setCountryList] = useState([])
  const onChangeInput = (prop) => (event) => {
    setValues({
      ...values,
      [prop]: event.target.value,
    })
  }
  const handleClose = () => {
    setOpenCompanyEditor(false)
    setValues({})
    props.actions.cleanUpCompanyState()
  }
  useEffect(() => {
    if (companyState?.companies?.data?.payload) {
      setCompanyData(companyState.companies.data.payload)
    }
  }, [companyState?.companies])
  useEffect(() => {
    if (masterState?.countries?.data) {
      setCountryList(masterState.countries.data?.payload)
    }
  }, [masterState?.countries])
  useEffect(() => {
    if (companyState?.updateCompany?.data?.payload) {
      setMessage(companyState.updateCompany.data.meta?.message)
      setStatus('success')
      handleClose()
    } else if (companyState?.updateCompany?.error?.meta) {
      setMessage(companyState.updateCompany.error.meta?.message)
      setStatus('error')
    }
  }, [companyState?.updateCompany])

  const handleCompanyUpdate = (values) => {
    let isValid = simpleValidator.current.allValid()

    if (!isValid) {
      simpleValidator.current.showMessages(true)
      forceUpdate(1)
    }
    if (simpleValidator.current.allValid()) {
      props.actions.updateCompanyAction(authState?.session?.data?.company_id, values)
    }
  }
  const handleSnackBarClose = () => {
    setTimeout(() => {
      setMessage('')
      setStatus('')
    }, 2500)
  }
  return (
    <MyDiv>
      <Snackbar
        message={message}
        severity={status}
        duration={2500}
        open={message.length > 0}
        close={handleSnackBarClose}
      />
      <EditCompany
        openDrawer={openCompanyEditor}
        closeDrawer={handleClose}
        handleUpdate={handleCompanyUpdate}
        companyData={companyData}
        countryList={countryList}
        loading={companyState?.updateCompany?.loading}
        handleChange={onChangeInput}
        setValues={setValues}
        values={values}
        error={companyState?.updateCompany?.error?.errors}
        Validator={simpleValidator.current}
      />
      <Box className="box_tabs">
        <Grid container>
          <Grid item md={12} xs={12}>
            <CardContent className="content-body">
              <Grid container className="edit_grid">
                <Grid item xs={6} md={6} sm={6}>
                  <Typography gutterBottom variant="h5" component="div" className="text-font detail_heading">
                    Company Details
                  </Typography>
                </Grid>
                <Grid item xs={6} md={6} sm={6}>
                  <CardActions className="profile_actions">
                    <CustomButton fieldlabel="Edit Company" variant="contained" onClick={() => setOpenCompanyEditor(true)} className="text-font action_button" />
                  </CardActions>
                </Grid>
              </Grid>
              <Divider />
              <Box sx={{width: '100%'}} mt={4}>
                <Grid container>
                  <Grid item md={6} xs={12}>
                    <Grid container rowSpacing={3} columnSpacing={{xs: 1, sm: 2, md: 3}}>
                      <Grid item xs={6}>
                        <Typography variant="body2"
                          className="text-font detail_title"
                        >
                          Name
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="body2" className="text-font detail_subtitle">
                          {companyData?.name}
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography
                          variant="body2"
                          className="text-font detail_title"
                        >
                          Email
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="body2" className="text-font detail_subtitle">
                          {companyData?.email}
                        </Typography>
                      </Grid>
                      {/* <Grid item xs={6}>
                        <Typography
                          variant="body2"
                          className="text-font detail_title"
                        >
                          Address
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="body2" className="text-font detail_subtitle">
                          {companyData?.address}
                        </Typography>
                      </Grid> */}
                      <Grid item xs={6}>
                        <Typography
                          variant="body2"
                          className="text-font detail_title"
                        >
                          Website
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="body2" className="text-font detail_subtitle">
                          {companyData?.website}
                        </Typography>
                      </Grid>
                      {/* <Grid item xs={6}>
                        <Typography
                          variant="body2"
                          className="text-font detail_title"
                        >
                          Registration no
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="body2" className="text-font detail_subtitle">
                          {companyData?.registration_no}
                        </Typography>
                      </Grid> */}
                      {/* <Grid item xs={6}>
                        <Typography
                          variant="body2"
                          className="text-font detail_title"
                        >
                          Phone
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="body2" className="text-font detail_subtitle">
                          {companyData?.phone}
                        </Typography>
                      </Grid> */}
                    </Grid>
                  </Grid>
                  <Grid item md={6} xs={12} />
                </Grid>
              </Box>
            </CardContent>
          </Grid>
        </Grid>
      </Box>
    </MyDiv>
  )
}
CompanyCard.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  userData: PropTypes.array,
}
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(ActionCreators, dispatch),
})

export default compose(
  withRouter,
  connect(null, mapDispatchToProps),
)(CompanyCard)
