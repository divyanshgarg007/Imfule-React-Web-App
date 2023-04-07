import * as React from 'react'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import Slide from '@mui/material/Slide'
import {CustomButton} from '..'
import MyDiv from './alertDialog.style'

const Transition = React.forwardRef((props, ref) => {
  return <Slide direction="up" ref={ref} {...props} />
})

export default function AlertDialog(props) {

  return (
    <MyDiv>
      <Dialog
        open={props.openDialog}
        TransitionComponent={Transition}
        keepMounted
        fullWidth
        onClose={props.handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle className="text-font"
          gutterBottom
          variant="h5"
          component="div"
          sx={{fontSize: '1.3rem', padding: '16px 24px 0!important', fontWeight: '600'}}
        >{props.alertLabel.title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description"
            variant="body1"
            color="#333"
            fontSize="0.9rem"
            fontFamily="Poppins"
            fontWeight="500"
          >
            {props.alertLabel.subtitle}
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{padding: '10px 24px 24px'}}>
          <CustomButton fieldlabel={props.alertLabel.close} variant="outlined" onClick={() => props.handleDeleteClose(props.id)} className="text-font action_button_outlined" />
          {props.alertLabel.button &&
          <CustomButton fieldlabel={props.alertLabel.button} variant="contained" onClick={() => props.handleSubmit(props.id, props.type, props.parentPostId)} className="text-font action_button" />
          }
        </DialogActions>
      </Dialog>
    </MyDiv>
  )
}
