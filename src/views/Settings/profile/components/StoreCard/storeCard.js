import {React, useState, useEffect} from 'react'
import {Grid, Box, Typography, CardActions, Divider, IconButton, Autocomplete, TextField} from '@mui/material'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell, {tableCellClasses} from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import PropTypes from 'prop-types'
import {Add as AddIcon, Delete as DeleteIcon} from '@mui/icons-material'
import {connect, useSelector} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {styled} from '@mui/material/styles'
import SyncIcon from '@mui/icons-material/Sync'
import {bindActionCreators} from 'redux'
import moment from 'moment'
import {compose} from 'recompose'
// import NorthEastIcon from '@mui/icons-material/NorthEast'
import {Snackbar, CustomButton, AlertDialog, StoreListingDialog, MessageBox, Loader} from '../../../../../components'
import {ActionCreators} from '../../../../../redux/actions'
import {getToken} from '../../../../../utilities/authUtils'
import MyDiv from './storeCard.style'
const StyledTableCell = styled(TableCell)(({theme}) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#d9dfd2',
    color: '#000',
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: '0.9rem',
    fontWeight: '500',
    color: '#000',
  },
}))

const StyledTableRow = styled(TableRow)(({theme}) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: '#fff',
  },
  '&:nth-of-type(even)': {
    backgroundColor: '#f3f3f3',
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}))

const StoreCard = (props) => {
  const userState = useSelector((state) => state.userState)
  const masterState = useSelector((state) => state.masterState)
  const productState = useSelector((state) => state.productState)
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState('')
  const [openListing, setOpenListing] = useState(false)
  const [storeData, setStoreData] = useState([])
  const [open, setOpen] = useState(false)
  const [selectedStore, setSelectedStore] = useState('')
  const [syncType, setSyncType] = useState('')
  const [alertLabel, setAlertLabel] = useState(
    {
      title: '',
      subtitle: '',
      button: '',
      close: '',
    },
  )
  const data1 = []
  masterState?.timeZoneList?.data?.payload?.map((data) => {
    let obj = {
      timezone: data.timezone,
      id: data.id,
    }
    return data1.push(obj)
  })

  useEffect(() => {
    if (userState.getStore?.data?.payload) {
      const {timeZone} = Intl.DateTimeFormat().resolvedOptions()
      let storeData = []
      userState.getStore.data.payload.map((data) => {
        let currentOptions = {
            timeZone: timeZone,
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
          },
          currentFormatter = new Intl.DateTimeFormat([], currentOptions)
        storeData.push({
          ...data,
          last_synced_at: currentFormatter.format(new Date(data?.last_synced_at)),
          original_sync_at: data?.last_synced_at,
        })
      })
      setStoreData(storeData)
    }
  }, [userState.getStore])

  useEffect(() => {
    if (userState.addStore?.data?.payload) {
      if (userState.addStore.data.payload.action) {
        window.location.href = userState.addStore.data.payload.url
      } else if (userState.addStore.data.payload.company_id) {
        props.actions.importScriptAction('prestashop', userState?.addStore?.data?.payload?.id)
      }
    } else if (userState.addStore?.error?.meta) {
      setMessage(userState.addStore.error.meta?.message)
      setStatus('error')
    }
  }, [userState.addStore])

  useEffect(() => {
    if (userState.deleteStore?.data?.payload) {
      setMessage(userState.deleteStore?.data?.meta?.message)
      setStatus(userState.deleteStore?.data?.meta.status)
      props.actions.cleanUpStateStore()
    } else if (userState.deleteStore?.error?.meta) {
      setMessage(userState.deleteStore?.error.meta?.message)
      setStatus('error')
      props.actions.cleanUpStateStore()
    }
  }, [userState.deleteStore])

  useEffect(() => {
    if (productState.importScript?.data?.payload) {
      setMessage(productState.importScript?.data?.meta?.message)
      setStatus(productState.importScript?.data?.meta.status)
      props.actions.getStoreAction()
      props.actions.cleanUpStateProduct()
    } else if (productState.importScript?.error?.meta) {
      setMessage(productState.importScript?.error.meta?.message)
      setStatus('error')
      props.actions.cleanUpStateProduct()
    }
  }, [productState.importScript])

  useEffect(() => {
    if (userState.updateTimeZone?.data?.payload) {
      setMessage(userState.updateTimeZone?.data?.meta?.message)
      setStatus(userState.updateTimeZone?.data?.meta.status)
      props.actions.cleanUpStateStore()
    } else if (userState.updateTimeZone?.error?.meta) {
      setMessage(userState.updateTimeZone?.error.meta?.message)
      setStatus('error')
      props.actions.cleanUpStateStore()
    }
  }, [userState.updateTimeZone])

  const handleListing = () => {
    setOpenListing(false)
  }
  const handleListingOpen = () => {
    setOpenListing(true)
  }
  const handleSnackBarClose = () => {
    setTimeout(() => {
      setMessage('')
      setStatus('')
    }, 2500)
    props.actions.cleanUpStateStore()
  }

  const handleImportSync = (selectedStore, syncType) => {
    const confirmProduct = {
      title: 'Are You Sure ?',
      subtitle: 'You want to Sync Products',
      button: 'Confirm',
      close: 'Cancel',
    }
    setAlertLabel(confirmProduct)
    setOpen(true)
    setSelectedStore(selectedStore)
    setSyncType(syncType)
  }

  const handleDeleteOpen = (selectedStore, syncType) => {
    if (selectedStore !== getToken('selectedStore')) {
      const deleteData = {
        title: 'Are You Sure ?',
        subtitle: 'You have Selected to Delete Store',
        button: 'Delete',
        close: 'Cancel',
      }
      setAlertLabel(deleteData)
      setOpen(true)
      setSelectedStore(selectedStore)
      setSyncType(syncType)
    } else if (selectedStore === getToken('selectedStore')) {
      const deleteData = {
        title: 'Message',
        subtitle: 'You cannot delete the default store',
        close: 'OK',
      }
      setAlertLabel(deleteData)
      setOpen(true)
    }
  }

  const handleSubmit = (selectedStore, syncType) => {
    setOpen(false)
    if (syncType === 'sync') {
      props.actions.importScriptAction(selectedStore.shop_type.slug, selectedStore.id)
    } else if (syncType === 'delete') {
      props.actions.deleteStoreAction(selectedStore)
    }
  }

  const handleDeleteClose = () => {
    setAlertLabel('')
    setOpen(false)
    setSelectedStore('')
    setSyncType('')
  }
  const handleTimeZoneChange = (event, newValue, row) => {
    props.actions.updateTimeZoneAction(newValue?.id, row?.id)
  }
  useEffect(() => {
    if (userState?.addStoreResponse?.error?.meta) {
      setMessage(userState.addStoreResponse.error.meta?.message)
      setStatus('error')
    }
  }, [userState?.addStoreResponse])

  const formatMoment = (row) => {
    let dataformat = moment(row.original_sync_at).format('DD - MMM, HH:mm')
    console.log(dataformat)
    return dataformat
  }

  return (
    <MyDiv>
      <Snackbar
        message={message}
        severity={status}
        duration={2500}
        open={message?.length > 0}
        close={handleSnackBarClose}
      />
      {(userState?.deleteStore?.loading) &&
      <div>
        <Loader />
      </div>
      }
      <AlertDialog
        openDialog={open}
        handleDeleteClose={handleDeleteClose}
        handleClose={handleDeleteClose}
        alertLabel={alertLabel}
        handleSubmit={handleSubmit}
        id={selectedStore}
        type={syncType}
      />
      <StoreListingDialog openListingPopup={openListing}
        handleListing={handleListing}
      />

      <Box className="box_tabs">
        <Grid container className="edit_grid">
          <Grid item xs={6} md={6} sm={6}>
            <Typography gutterBottom variant="h5" component="div" className="text-font detail_heading">
              {/* {props.title} */}
              Store Details
            </Typography>
          </Grid>
          <Grid item xs={6} md={6} sm={6}>
            <CardActions className="profile_actions">
              <CustomButton disabled={getToken('setting')?.SHOP_SETTING?.maximum_shop <= storeData?.length}
                fieldlabel="Add store" variant="contained" onClick={() => setOpenListing(true)} startIcon={<AddIcon />} className="text-font action_button"
              />
            </CardActions>
          </Grid>
        </Grid>
        <Divider />

        <Box sx={{width: '100%'}} mt={4} mb={4}>
          {storeData && storeData.length > 0 &&
          <TableContainer style={{borderRadius: '10px 10px 0 0'}}>
            <Table sx={{minWidth: 650}} aria-label="simple table" style={{border: '1px solid rgba(224, 224, 224, 1)'}}>
              <TableHead>
                <TableRow>
                  {/* <StyledTableCell className="table_heading text-font" >Store Id</StyledTableCell> */}
                  <StyledTableCell align="left" className="table_heading text-font" >Store Name</StyledTableCell>
                  <StyledTableCell align="left" className="table_heading text-font">Store Url</StyledTableCell>
                  <StyledTableCell align="center" className="table_heading text-font">Timezone</StyledTableCell>
                  <StyledTableCell align="center" className="table_heading text-font">Sync Products</StyledTableCell>
                  <StyledTableCell align="left" className="table_heading text-font">Last Updated</StyledTableCell>
                  {/* <StyledTableCell align="center" className="table_heading text-font">Status</StyledTableCell> */}
                  <StyledTableCell align="center" className="table_heading text-font">Delete Store</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {storeData.map((row) => (
                  <StyledTableRow
                    key={row.name}
                  >
                    {/* <StyledTableCell component="th" scope="row" className="table_data text-font">
                      {row.id}
                    </StyledTableCell> */}
                    <StyledTableCell align="left" className="text-font">{row.shop_name}</StyledTableCell>
                    <StyledTableCell align="left" className="text-font go_link">{row.url}</StyledTableCell>
                    <StyledTableCell align="left" className="text-font">
                      <Autocomplete
                        className="timezone_box"
                        fullWidth
                        disableClearable
                        options={data1}
                        value={row?.timezone}
                        onChange={(newValue, receivedValue) => handleTimeZoneChange(newValue, receivedValue, row)}
                        getOptionSelected={(option, value) => option.id === value.id}
                        getOptionLabel={(option) => option.timezone}
                        size="small"
                        renderInput={(params) => <TextField {...params} size="small" />}
                      />
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <Box className="btns_group">
                        <CustomButton fieldlabel="Sync" variant="contained" endIcon={<SyncIcon />}
                          className={(productState?.importScript?.loading && selectedStore.id === row.id) ? 'disable_action text-font' : 'text-font sync_btn'}
                          onClick={() => handleImportSync(row, 'sync')}
                          loading={(productState?.importScript?.loading && selectedStore.id === row.id)}
                          disabled={(productState?.importScript?.loading && selectedStore.id === row.id)}
                        />
                      </Box>
                    </StyledTableCell>
                    <StyledTableCell align="left" className="text-font">{row.last_synced_at ? formatMoment(row) : ''}</StyledTableCell>
                    <StyledTableCell align="center">
                      <IconButton color="primary" className="icon_btn" onClick={() => handleDeleteOpen(row.id, 'delete')}>
                        <DeleteIcon />
                      </IconButton>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          }
          {(userState.getStore?.data?.payload?.length === 0 || userState.getStore?.error?.payload) &&
          <MessageBox messageTitle="Please Add Your Store" messageBtn="Add Store" handleClick={handleListingOpen} startIcon disableBtn />
          }
        </Box>
      </Box>
    </MyDiv>
  )
}
StoreCard.propTypes = {
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
)(StoreCard)
